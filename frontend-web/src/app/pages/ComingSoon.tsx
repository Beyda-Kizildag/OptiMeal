import { Construction } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';

interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  const { t } = useLanguage();
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] p-8">
        <div className="text-center max-w-md space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-accent flex items-center justify-center">
            <Construction className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>

          <Link to="/dashboard">
            <Button variant="primary">{t('dashboard.backToDashboard') || "Back to Dashboard"}</Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
