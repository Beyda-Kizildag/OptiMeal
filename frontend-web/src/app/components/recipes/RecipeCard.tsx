import { Clock, Flame } from 'lucide-react';

interface RecipeCardProps {
  recipe: {
    id: string;
    title: string;
    image: string;
    prepTime: number;
    calories: number;
    protein: number;
    tags: string[];
    healthMatch: string;
  };
  onClick: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <div 
      className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-foreground">
          {recipe.healthMatch.split(' - ')[0]}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {recipe.title}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.prepTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{recipe.calories} kcal</span>
          </div>
          <div className="font-medium text-electric-blue">
            {recipe.protein}g protein
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {recipe.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx} 
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                idx === 0 ? 'bg-primary/10 text-primary' : 'bg-accent text-muted-foreground'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
