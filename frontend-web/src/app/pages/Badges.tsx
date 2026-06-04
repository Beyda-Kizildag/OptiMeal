import { Leaf, Bot, Heart, Shield, Trophy, Medal, Award } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { BadgeCard } from '../components/badges/BadgeCard';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const userBadges = [
  { icon: Leaf, title: 'Clean Eating Guru', level: 5, description: 'Maintain a 90% clean eating score for 5 consecutive weeks', progress: 95, isUnlocked: true, color: 'bg-gradient-to-br from-primary to-mint-green', iconBg: 'bg-primary' },
  { icon: Bot, title: 'AI Innovator', level: 3, description: 'Asked 50+ AI nutrition questions', progress: 100, isUnlocked: true, color: 'bg-gradient-to-br from-purple to-electric-blue', iconBg: 'bg-purple' },
  { icon: Heart, title: 'Community Helper', level: 1, description: 'Liked 20 community recipes', progress: 100, isUnlocked: true, color: 'bg-gradient-to-br from-red-400 to-orange-400', iconBg: 'bg-red-500' },
  { icon: Shield, title: 'Anti-Inflammation Hero', level: 0, description: 'Maintain a 90% clean eating score for 5 consecutive weeks', progress: 60, isUnlocked: false, color: '', iconBg: '' },
  { icon: Trophy, title: 'Streak Master', level: 0, description: 'Achieve a 30-day healthy eating streak', progress: 50, isUnlocked: false, color: '', iconBg: '' },
  { icon: Medal, title: 'Recipe Creator', level: 0, description: 'Share 10 original recipes with the community', progress: 30, isUnlocked: false, color: '', iconBg: '' }
];

const globalLeaderboard = [
  { rank: 1, name: 'Sarah Martinez', xp: 8450, badges: ['🥇', '🍃', '🤖', '❤️', '🛡️'], country: '🇺🇸' },
  { rank: 2, name: 'Michael Kim', xp: 8220, badges: ['🥈', '🍃', '🤖', '❤️'], country: '🇰🇷' },
  { rank: 3, name: 'Emma Rodriguez', xp: 7980, badges: ['🥉', '🍃', '🤖'], country: '🇪🇸' },
  { rank: 4, name: 'Alex Davidson', xp: 7540, badges: ['🍃', '❤️'], country: '🇬🇧' },
  { rank: 5, name: 'Lisa Wang', xp: 7320, badges: ['🍃', '🤖'], country: '🇨🇳' }
];

export function Badges() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const displayName = user?.name || 'User';
  
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{t('badges.title', { name: displayName }) || `${displayName}'s Healthy Journey`}</h1>
          <p className="text-lg text-muted-foreground">
            {t('badges.subtitle') || "Track your achievements and see how you rank globally"}
          </p>
        </div>

        {/* My Achievements Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">{t('badges.yourCollection') || "Your Badge Collection"}</h2>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{t('badges.totalXP') || "Total XP"}</p>
                <p className="text-2xl font-bold text-primary">6,180</p>
              </div>
              <Award className="w-8 h-8 text-gold" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBadges.map((badge, index) => (
              <BadgeCard key={index} {...badge} title={t(`badges.${badge.title.replace(/\s+/g, '')}`) || badge.title} description={t(`badges.desc_${index}`) || badge.description} />
            ))}
          </div>
        </div>

        {/* Global Leaderboard Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-8 h-8 text-gold" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">{t('badges.leaderboardTitle') || "Who's Optimizing Fastest?"}</h2>
              <p className="text-sm text-muted-foreground">{t('badges.topUsers') || "Top 10 users worldwide"}</p>
            </div>
          </div>

          <div className="bg-card border-2 border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent/50 border-b-2 border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Badges</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Total XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {globalLeaderboard.map((user) => (
                    <tr key={user.rank} className={`transition-colors hover:bg-accent/30 ${user.rank === 1 ? 'bg-gold/10' : ''}`}>
                      <td className="px-6 py-4">
                        <span className="text-2xl font-bold text-muted-foreground">
                          {user.rank <= 3 ? (user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉') : `#${user.rank}`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-electric-blue flex items-center justify-center text-white font-semibold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.country}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">{user.badges.map((b, i) => <span key={i}>{b}</span>)}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="font-bold text-lg text-foreground">{user.xp.toLocaleString()}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
