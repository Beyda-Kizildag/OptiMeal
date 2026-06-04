export function BadgeCard({ 
  icon: Icon, 
  title, 
  level, 
  description, 
  progress, 
  isUnlocked, 
  color, 
  iconBg 
}: any) {
  return (
    <div className={`border-2 border-border rounded-xl p-4 flex flex-col gap-3 ${isUnlocked ? 'bg-card' : 'bg-accent/20 grayscale opacity-70'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${iconBg || 'bg-gray-400'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground">Level {level}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="w-full bg-accent rounded-full h-2 mt-auto">
        <div className={`h-2 rounded-full ${color || 'bg-gray-400'}`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
