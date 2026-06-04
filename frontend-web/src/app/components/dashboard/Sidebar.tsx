import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  ChefHat,
  FileText,
  Users,
  Award,
  Settings
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function Sidebar() {
  const location = useLocation();
  const { t } = useLanguage();

  const navigationItems = [
    { icon: LayoutDashboard, label: t('nav.dashboard') || 'Dashboard', path: '/dashboard' },
    { icon: ChefHat, label: t('nav.recipes') || 'Recipe Generator', path: '/dashboard/recipes' },
    { icon: FileText, label: t('nav.health') || 'Health Report', path: '/dashboard/health' },
    { icon: Users, label: t('nav.community') || 'Community', path: '/dashboard/community' },
    { icon: Award, label: t('nav.badges') || 'Badges', path: '/dashboard/badges' },
    { icon: Settings, label: t('nav.settings') || 'Settings', path: '/dashboard/settings' }
  ];

  return (
    <aside className="w-20 bg-card border-r-2 border-border flex flex-col items-center py-6 gap-2">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-mint-green rounded-xl flex items-center justify-center">
          <span className="text-2xl">🥗</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                w-14 h-14 rounded-xl flex items-center justify-center
                transition-all duration-200 relative group
                ${isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }
              `}
            >
              <Icon className="w-6 h-6" />

              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-2 bg-foreground text-background rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
