import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { SettingsTabs } from '../components/settings/SettingsTabs';
import { HealthMetricsTab } from '../components/settings/HealthMetricsTab';
import { AIMemoryTab } from '../components/settings/AIMemoryTab';
import { AccountSecurityTab } from '../components/settings/AccountSecurityTab';

export function Settings() {
  const [activeTab, setActiveTab] = useState('health');

  return (
    <DashboardLayout>
      <div className="flex h-full">
        {/* Left Tabs */}
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Right Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'health' && <HealthMetricsTab />}
          {activeTab === 'ai-memory' && <AIMemoryTab />}
          {activeTab === 'account' && <AccountSecurityTab />}
        </div>
      </div>
    </DashboardLayout>
  );
}
