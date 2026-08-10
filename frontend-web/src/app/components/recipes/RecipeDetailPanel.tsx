import { X, Clock, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface RecipeDetailPanelProps {
  recipe: any;
  isOpen: boolean;
  onClose: () => void;
  language: string;
}

export function RecipeDetailPanel({ recipe, isOpen, onClose, language }: RecipeDetailPanelProps) {
  const isTr = language === 'tr';
  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-background h-full shadow-2xl overflow-y-auto transform transition-transform border-l border-border animate-in slide-in-from-right duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="h-72 relative">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="p-8 -mt-20 relative z-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag: string, idx: number) => (
              <span key={idx} className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-6">{recipe.title}</h2>

          <div className="grid grid-cols-3 gap-4 mb-8 bg-card rounded-2xl p-4 border border-border">
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold">{recipe.prepTime} min</p>
              <p className="text-xs text-muted-foreground">{isTr ? 'Hazırlama' : 'Prep Time'}</p>
            </div>
            <div className="text-center border-l border-r border-border">
              <div className="flex justify-center mb-1">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <p className="text-sm font-semibold">{recipe.calories} kcal</p>
              <p className="text-xs text-muted-foreground">{isTr ? 'Kalori' : 'Calories'}</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-1">
                <div className="w-5 h-5 rounded-full border-2 border-electric-blue" />
              </div>
              <p className="text-sm font-semibold text-electric-blue">{recipe.protein}g</p>
              <p className="text-xs text-muted-foreground">{isTr ? 'Protein' : 'Protein'}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-electric-blue/10 to-mint-green/10 rounded-2xl p-5 mb-8 border border-electric-blue/20 flex gap-4">
            <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-electric-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{isTr ? 'Neden bu profilinize uygun' : 'Why this fits your profile'}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{recipe.aiNote}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">{isTr ? 'Malzemeler' : 'Ingredients'}</h3>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">{isTr ? 'Hazırlanışı' : 'Instructions'}</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((step: string, idx: number) => (
                  <li key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 font-bold text-foreground">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          
          <div className="mt-12 flex gap-4">
            <Button variant="primary" fullWidth className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isTr ? 'Yemek Planına Ekle' : 'Add to Meal Plan'}
            </Button>
            <Button variant="outline" fullWidth>
              {isTr ? 'Kaydedilenlerden Çıkar' : 'Remove from Saved'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
