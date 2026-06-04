import { Activity, Heart, Droplet, Shield, Apple, Bone, Zap, AlertCircle } from 'lucide-react';
import { Checkbox } from '../ui/checkbox'; // Yol projenize uygunsa kalabilir
// import { Checkbox } from '../ui/Checkbox'; // Eğer C büyükse böyle olmalı

const iconMap = {
  diabetes: Droplet,
  hypertension: Heart,
  ibs: Activity,
  thyroid: Shield,
  celiac: Apple,
  heart: Heart,
  kidney: Droplet,
  liver: Activity,
  arthritis: Bone,
  gout: Zap,
  default: AlertCircle
};

interface ConditionCardProps {
  id: string;
  label: string;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function ConditionCard({ id, label, selected, onToggle }: ConditionCardProps) {
  const Icon = iconMap[id as keyof typeof iconMap] || iconMap.default;

  return (
    <button
      onClick={() => onToggle(id)}
      className={`
        relative flex flex-col items-center gap-3 p-6 rounded-xl
        border-2 transition-all duration-200
        hover:shadow-md active:scale-[0.98]
        ${selected
          ? 'border-forest-green bg-forest-green/5 shadow-sm'
          : 'border-border bg-card hover:border-forest-green/30'
        }
      `}
    >
      <div className={`
        p-3 rounded-full transition-colors
        ${selected ? 'bg-forest-green/10' : 'bg-accent'}
      `}>
        <Icon className={`w-6 h-6 ${selected ? 'text-forest-green' : 'text-muted-foreground'}`} />
      </div>

      <span className={`text-sm font-medium text-center ${selected ? 'text-forest-green' : 'text-foreground'}`}>
        {label}
      </span>

      <div className="absolute top-3 right-3">
        <Checkbox checked={selected} />
      </div>
    </button>
  );
}
