import { useState, useEffect } from 'react';
import { Lock, Bell, LogOut, Trash2, AlertTriangle } from 'lucide-react';
import { Input } from '../ui/Input';
import { Switch } from '../ui/switch';
import { Button } from '../ui/Button';

export function AccountSecurityTab() {
  const [notifications, setNotifications] = useState({
    mealReminders: true,
    weeklyReports: true,
    aiSuggestions: true,
    communityUpdates: false
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('/api/auth/preferences', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setNotifications(prev => ({ ...prev, ...data.preferences }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePreferenceChange = async (key: string, checked: boolean) => {
    const updated = { ...notifications, [key]: checked };
    setNotifications(updated);
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/auth/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPass: currentPassword, newPass: newPassword })
      });
      if (res.ok) {
        alert('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await res.json();
        alert(data.message || 'Error updating password');
      }
    } catch (e) {
      console.error(e);
      alert('Error updating password');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/auth/account', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Account & Security</h2>
        <p className="text-muted-foreground">Hesap ve Güvenlik - Manage your account settings</p>
      </div>

      {/* Change Password */}
      <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
        </div>

        <div className="space-y-4">
          <Input
            type="password"
            label="Current Password"
            placeholder="Enter current password"
            className="bg-background"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            type="password"
            label="New Password"
            placeholder="Enter new password"
            className="bg-background"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            label="Confirm New Password"
            placeholder="Confirm new password"
            className="bg-background"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button variant="primary" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleChangePassword}>
            Update Password
          </Button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Notification Settings</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-xl">
            <div>
              <p className="text-sm font-semibold text-foreground">Meal Reminders</p>
              <p className="text-xs text-muted-foreground">Get notified about meal planning</p>
            </div>
            <Switch
              checked={notifications.mealReminders}
              onCheckedChange={(checked) => handlePreferenceChange('mealReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-xl">
            <div>
              <p className="text-sm font-semibold text-foreground">Weekly Reports</p>
              <p className="text-xs text-muted-foreground">Receive your weekly health summary</p>
            </div>
            <Switch
              checked={notifications.weeklyReports}
              onCheckedChange={(checked) => handlePreferenceChange('weeklyReports', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-xl">
            <div>
              <p className="text-sm font-semibold text-foreground">AI Suggestions</p>
              <p className="text-xs text-muted-foreground">Get personalized meal suggestions</p>
            </div>
            <Switch
              checked={notifications.aiSuggestions}
              onCheckedChange={(checked) => handlePreferenceChange('aiSuggestions', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-accent/30 rounded-xl">
            <div>
              <p className="text-sm font-semibold text-foreground">Community Updates</p>
              <p className="text-xs text-muted-foreground">Stay updated with community activity</p>
            </div>
            <Switch
              checked={notifications.communityUpdates}
              onCheckedChange={(checked) => handlePreferenceChange('communityUpdates', checked)}
            />
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-destructive/5 border-2 border-destructive/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-destructive" />
          <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
        </div>

        <div className="space-y-4">
          {/* Logout */}
          <div className="flex items-center justify-between p-4 bg-card rounded-xl border-2 border-border">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Logout</p>
              <p className="text-xs text-muted-foreground">Sign out of your account on this device</p>
            </div>
            <Button
              variant="outline"
              className="border-foreground/20 hover:border-foreground/40"
              icon={<LogOut className="w-4 h-4" />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          {/* Delete Account */}
          <div className="p-4 bg-card rounded-xl border-2 border-destructive/30">
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-1">Delete Account</p>
              <p className="text-xs text-muted-foreground">
                This will permanently remove all your health data, recipes, and badges.
                ACID-compliant cascade delete ensures complete data removal.
              </p>
            </div>

            {!showDeleteConfirm ? (
              <Button
                variant="primary"
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-destructive hover:bg-destructive/90"
                icon={<Trash2 className="w-4 h-4" />}
              >
                Delete Account
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-destructive/10 border-2 border-destructive/20 rounded-xl p-4">
                  <p className="text-sm font-semibold text-destructive mb-2">⚠️ This action cannot be undone</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Type <strong>DELETE MY ACCOUNT</strong> to confirm
                  </p>
                  <Input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="Type here to confirm"
                    className="bg-background"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmText('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    disabled={deleteConfirmText !== 'DELETE MY ACCOUNT'}
                    className="bg-destructive hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDeleteAccount}
                  >
                    Permanently Delete Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
