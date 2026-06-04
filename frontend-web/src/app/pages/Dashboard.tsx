import { TrendingUp } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { AIChatSidebar } from '../components/dashboard/AIChatSidebar';
import { NutritionWidget } from '../components/dashboard/NutritionWidget';
import { AIMealWidget } from '../components/dashboard/AIMealWidget';
import { LeaderboardWidget } from '../components/dashboard/LeaderboardWidget';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const userName = user?.name || '';
  const inflammationScore = user ? `${user.lastAnalysisScore}/10` : '7.2/10';

  return (
    <DashboardLayout showAISidebar aiSidebar={<AIChatSidebar />}>
      <div className="p-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-mint-green rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">
            {t('dashboard.greeting', { name: userName || 'User' })}
          </h1>
          <p className="text-lg text-white/90 mb-4">
            {t('dashboard.subtitle') || 'Your health report is optimized. Check your weekly inflammation score.'}
          </p>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 w-fit">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">{t('dashboard.inflammationScoreText') || 'Inflammation Score'}: {inflammationScore}</span>
          </div>
        </div>

        {/* Key Performance Widgets */}
        <div className="grid lg:grid-cols-3 gap-6">
          <NutritionWidget />
          <AIMealWidget />
          <LeaderboardWidget />
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-card border-2 border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">{t('dashboard.weeklyMeals') || 'Weekly Meals'}</p>
            <p className="text-2xl font-bold text-foreground">24</p>
            <p className="text-xs text-primary mt-1">+3 {t('dashboard.fromLastWeek') || 'from last week'}</p>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">{t('dashboard.aiConsultations') || 'AI Consultations'}</p>
            <p className="text-2xl font-bold text-foreground">18</p>
            <p className="text-xs text-electric-blue mt-1">{t('dashboard.activeThisWeek') || 'Active this week'}</p>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">{t('dashboard.recipesSaved') || 'Recipes Saved'}</p>
            <p className="text-2xl font-bold text-foreground">42</p>
            <p className="text-xs text-mint-green-foreground mt-1">8 {t('dashboard.newThisWeek') || 'new this week'}</p>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground mb-1">{t('dashboard.streakDays') || 'Streak Days'}</p>
            <p className="text-2xl font-bold text-foreground">15</p>
            <p className="text-xs text-gold-foreground mt-1">{t('dashboard.personalBest') || 'Personal best!'}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
