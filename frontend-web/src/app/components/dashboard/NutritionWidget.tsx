import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';

export function NutritionWidget() {
  const { t } = useLanguage();
  
  const nutritionData = [
    { name: t('dashboard.cleanFoods'), value: 65, color: '#7A9B76' },
    { name: t('dashboard.inflammatory'), value: 15, color: '#FF6B6B' },
    { name: t('dashboard.neutral'), value: 20, color: '#A8E6CF' }
  ];

  return (
    <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.weeklyNutrition')}</h3>
        <span className="text-2xl font-bold text-primary">65%</span>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={nutritionData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {nutritionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-2">
        {nutritionData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-semibold text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
