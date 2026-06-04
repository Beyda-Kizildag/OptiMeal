import { Search, Bell } from 'lucide-react';
import { Input } from '../ui/Input';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export function TopBar() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const displayName = user?.name || 'User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="h-20 bg-card border-b-2 border-border px-8 flex items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder={t('dashboard.searchPlaceholder') || "Find recipes, ask AI..."}
          className="pl-12 bg-accent/30 border-transparent hover:border-primary/30 focus:border-primary"
        />
      </div>

      {/* Right Side - Notifications & Avatar */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative w-11 h-11 rounded-xl bg-accent hover:bg-accent/80 flex items-center justify-center transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-electric-blue rounded-full" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3 pl-4 border-l-2 border-border">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">{displayName}</p>
            <p className="text-xs text-muted-foreground">{t('dashboard.premiumUser') || "Premium User"}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-electric-blue flex items-center justify-center text-white font-semibold shadow-md">
            {initial}
          </div>
        </div>
      </div>
    </div>
  );
}
