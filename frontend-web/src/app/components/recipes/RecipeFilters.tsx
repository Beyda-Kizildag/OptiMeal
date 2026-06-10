import { Search, SlidersHorizontal } from 'lucide-react';

interface RecipeFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeFilters: string[];
  onFilterToggle: (filterId: string) => void;
  language: string;
}

export function RecipeFilters({ searchQuery, onSearchChange, activeFilters, onFilterToggle, language }: RecipeFiltersProps) {
  const isTr = language === 'tr';
  
  const filterOptions = [
    { id: 'Diabetes-Friendly', label: isTr ? 'Diyabet Dostu' : 'Diabetes-Friendly' },
    { id: 'Anti-Inflammatory', label: isTr ? 'Anti-Enflamatuar' : 'Anti-Inflammatory' },
    { id: 'Heart-Healthy', label: isTr ? 'Kalp Dostu' : 'Heart-Healthy' },
    { id: 'High-Protein', label: isTr ? 'Yüksek Protein' : 'High-Protein' },
    { id: 'Low-Carb', label: isTr ? 'Düşük Karbonhidrat' : 'Low-Carb' },
    { id: 'Vegan', label: 'Vegan' },
    { id: 'Gluten-Free', label: isTr ? 'Glutensiz' : 'Gluten-Free' },
  ];
  return (
    <div className="bg-card border-2 border-border rounded-2xl p-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder={isTr ? "Kayıtlı tariflerde, malzemelerde, etiketlerde ara..." : "Search saved recipes, ingredients, tags..."}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-border bg-background focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground font-medium bg-accent px-4 py-2 rounded-lg">
          <SlidersHorizontal className="w-5 h-5" />
          <span>{isTr ? 'Filtreler' : 'Filters'}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filterOptions.map(filter => {
          const isActive = activeFilters.includes(filter.id);
          return (
            <button
              key={filter.id}
              onClick={() => onFilterToggle(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'bg-accent text-foreground hover:bg-border'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
