import { useState, useEffect } from 'react';
import { Sparkles, Clock, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

interface Recipe {
  title: string;
  time: string;
  tags: string[];
  description: string;
}

export function AIMealWidget() {
  const { t } = useLanguage();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch('/api/ai/recipe', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          setRecipe(data);
        }
      } catch (err) {
        console.error('Failed to fetch recipe:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipe();
  }, []);

  const displayTitle = recipe?.title || t('dashboard.diabetesFriendlyBreakfast');
  const displayDesc = recipe?.description || t('dashboard.oatmealWithBerries');
  const displayTime = recipe?.time || `15 ${t('dashboard.min')}`;
  const displayTags = recipe?.tags || [t('dashboard.antiInflammatory'), t('dashboard.highFiber')];

  return (
    <div className="bg-gradient-to-br from-electric-blue/10 to-mint-green/10 border-2 border-electric-blue/20 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-electric-blue/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-electric-blue" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{t('dashboard.aiMealSuggestion')}</h3>
          <p className="text-xs text-muted-foreground">{t('dashboard.personalizedForYou')}</p>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 mb-4 border border-border min-h-[140px] flex flex-col justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
            <Sparkles className="w-6 h-6 animate-pulse text-electric-blue" />
            <p className="text-sm animate-pulse">Sizin için tarif hazırlanıyor...</p>
          </div>
        ) : (
          <>
            <h4 className="font-semibold text-foreground mb-2 leading-tight">{displayTitle}</h4>
            <p className="text-sm text-primary mb-3 line-clamp-2">{displayDesc}</p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{displayTime}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {displayTags.map((tag, idx) => (
                <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium ${idx % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-mint-green/20 text-mint-green-foreground'}`}>
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <Button 
        variant="primary" 
        fullWidth 
        className="bg-electric-blue hover:bg-electric-blue/90" 
        disabled={isLoading || !recipe}
        onClick={() => {
          if (!recipe) return;
          const prompt = `Lütfen bana şu tarifin tam detaylarını, malzemelerini ve yapılışını adım adım ver: ${recipe.title}`;
          window.dispatchEvent(new CustomEvent('ask-ai-recipe', { detail: prompt }));
        }}
      >
        {t('dashboard.viewFullRecipe')}
      </Button>
    </div>
  );
}
