import { Trophy, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const leaderboardData = [
  { rank: 1, name: 'Sarah M.', points: 2850, badge: '🥇', color: 'bg-gold/20' },
  { rank: 2, name: 'Michael K.', points: 2720, badge: '🥈', color: 'bg-gray-200' },
  { rank: 3, name: 'Emma R.', points: 2680, badge: '🥉', color: 'bg-orange-200' },
  { rank: 4, name: 'Alex D.', points: 2540, badge: '', color: '' },
  { rank: 5, name: 'Lisa W.', points: 2420, badge: '', color: '' }
];

export function LeaderboardWidget() {
  const { t } = useLanguage();
  return (
    <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-gold" />
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.communityLeaderboard')}</h3>
      </div>

      <div className="space-y-3">
        {leaderboardData.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              user.color || 'bg-accent/30 hover:bg-accent/50'
            }`}
          >
            <div className="w-8 text-center font-bold text-muted-foreground">
              {user.badge || `#${user.rank}`}
            </div>

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-mint-green flex items-center justify-center text-white font-semibold text-sm">
              {user.name.charAt(0)}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-foreground text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.points} XP</p>
            </div>

            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          {t('dashboard.yourRank')}: <span className="font-semibold text-foreground">#12</span> (2,180 XP)
        </p>
      </div>
    </div>
  );
}
