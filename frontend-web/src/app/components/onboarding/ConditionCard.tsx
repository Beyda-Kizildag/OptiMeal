import { Check } from 'lucide-react';

interface ConditionCardProps {
  id: string;
  label: string;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function ConditionCard({ id, label, selected, onToggle }: ConditionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      className={`relative flex flex-col items-center justify-center p-4 h-24 rounded-xl border-2 transition-all hover:shadow-md outline-none focus:ring-2 focus:ring-forest-green/50 ${
        selected 
          ? "border-forest-green bg-forest-green/5 text-forest-green" 
          : "border-border bg-card text-foreground hover:border-forest-green/30"
      }`}
    >
      {selected && (
        <div className="absolute top-2 right-2 text-forest-green">
          <Check className="w-4 h-4" />
        </div>
      )}
      <span className="text-sm font-medium text-center leading-tight">
        {label}
      </span>
    </button>
  );
}
