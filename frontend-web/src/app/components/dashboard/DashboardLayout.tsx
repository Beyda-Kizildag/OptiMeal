import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface DashboardLayoutProps {
  children: ReactNode;
  showAISidebar?: boolean;
  aiSidebar?: ReactNode;
}

export function DashboardLayout({ children, showAISidebar = false, aiSidebar }: DashboardLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-background flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <div className="flex-1 flex min-h-0">
          {/* Center Content */}
          <main className={`flex-1 overflow-y-auto ${showAISidebar ? 'pr-0' : ''}`}>
            {children}
          </main>

          {/* Right AI Sidebar */}
          {showAISidebar && aiSidebar}
        </div>
      </div>
    </div>
  );
}
