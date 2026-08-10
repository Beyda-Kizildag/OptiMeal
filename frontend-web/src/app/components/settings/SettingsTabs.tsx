import { User, Brain, Shield } from 'lucide-react';

const tabs = [
  {
    id: 'health',
    label: 'Health & Personal Metrics',
    labelTr: 'Sağlık & Metrikler',
    icon: User
  },
  {
    id: 'ai-memory',
    label: 'AI Memory & Personalization',
    labelTr: 'AI Hafızası',
    icon: Brain
  },
  {
    id: 'account',
    label: 'Account & Security',
    labelTr: 'Hesap ve Güvenlik',
    icon: Shield
  }
];

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  return (
    <div className="w-64 bg-card border-r-2 border-border p-4 space-y-2">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Settings</h2>
        <p className="text-sm text-muted-foreground">Ayarlar</p>
      </div>

      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-xl
              transition-all duration-200 text-left
              ${isActive
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-foreground hover:bg-accent'
              }
            `}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
            <div className="flex-1">
              <p className={`text-sm font-semibold ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
                {tab.label}
              </p>
              <p className={`text-xs ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                {tab.labelTr}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
