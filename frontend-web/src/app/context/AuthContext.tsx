import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  lastAnalysisScore: number;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch('/api/health/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        const profile = await res.json();
        let email = profile?.user?.email || '';
        let name = profile?.user?.name || '';
        
        // Fallback: decode JWT to get email if relation failed
        if (!email && token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            email = payload.email || '';
            if (!name) name = payload.name || '';
          } catch(e) {
            console.error('Failed to parse JWT payload');
          }
        }

        name = name || email.split('@')[0] || 'User';
        const score = profile?.lastAnalysisScore || 0;

        setUser({
          name,
          email,
          lastAnalysisScore: score
        });
      } else if (res.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshProfile: fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
