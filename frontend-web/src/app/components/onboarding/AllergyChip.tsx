interface AllergyChipProps {
  id: string;
  label: string;
  selected: boolean;
  onToggle: (id: string) => void;
}

export function AllergyChip({ id, label, selected, onToggle }: AllergyChipProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors hover:shadow-sm outline-none focus:ring-2 focus:ring-forest-green/50 ${
        selected
          ? "border-forest-green bg-forest-green text-white"
          : "border-border bg-card text-foreground hover:border-forest-green/30"
      }`}
    >
      {label}
    </button>
  );
}
