import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { RecipeFilters } from '../components/recipes/RecipeFilters';
import { RecipeCard } from '../components/recipes/RecipeCard';
import { RecipeDetailPanel } from '../components/recipes/RecipeDetailPanel';
import { useLanguage } from '../context/LanguageContext';

export const getRecipesData = (lang: string) => {
  const isTr = lang === 'tr';
  return [
    {
      id: '1',
      title: isTr ? 'Orman Meyveli Diyabet Dostu Yulaf' : 'Diabetes-Friendly Oatmeal with Mixed Berries',
      image: 'https://images.unsplash.com/photo-1497888329096-51c27beff665?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxoZWFsdGh5JTIwYnJlYWtmYXN0JTIwb2F0bWVhbCUyMGJlcnJpZXN8ZW58MXx8fHwxNzgwNDkwOTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: 15,
      calories: 280,
      protein: 12,
      healthMatch: isTr ? 'Diyabet profiline uygun - Düşük Gİ & Kararlı kan şekeri' : 'Optimized for your Diabetes profile - Low GI & stable blood sugar',
      tags: isTr ? ['Diyabet-Dostu', 'Yüksek-Lif', 'Düşük Gİ'] : ['Diabetes-Friendly', 'High-Fiber', 'Low GI'],
      ingredients: isTr ? [
        '1/2 su bardağı yulaf ezmesi',
        '1 su bardağı şekersiz badem sütü',
        '1/2 su bardağı karışık orman meyvesi (yaban mersini, çilek, ahududu)',
        '1 yemek kaşığı chia tohumu',
        '1 çay kaşığı tarçın',
        '1 yemek kaşığı badem ezmesi',
        'İsteğe bağlı: tatlandırmak için stevia'
      ] : [
        '1/2 cup steel-cut oats',
        '1 cup unsweetened almond milk',
        '1/2 cup mixed berries (blueberries, strawberries, raspberries)',
        '1 tbsp chia seeds',
        '1 tsp cinnamon',
        '1 tbsp almond butter',
        'Optional: stevia to taste'
      ],
      instructions: isTr ? [
        'Küçük bir tencerede badem sütünü hafifçe kaynatın.',
        'Yulafları ekleyin ve ateşi kısın. Ara sıra karıştırarak 10-12 dakika pişirin.',
        'Yulaflar pişerken orman meyvelerini yıkayın ve hazırlayın.',
        'Yulaflar kremamsı bir kıvam alınca ateşten alın, chia tohumu ve tarçını ekleyin.',
        'Bir kaseye aktarın, üzerine orman meyveleri ve badem ezmesini ekleyin.',
        'Daha fazla tatlılık isterseniz kan şekerini yükseltmeden stevia ekleyebilirsiniz.'
      ] : [
        'In a small pot, bring almond milk to a gentle boil.',
        'Add steel-cut oats and reduce heat to low. Simmer for 10-12 minutes, stirring occasionally.',
        'While oats cook, wash and prepare your mixed berries.',
        'Once oats are creamy and cooked through, remove from heat and stir in chia seeds and cinnamon.',
        'Transfer to a bowl and top with mixed berries and almond butter.',
        'Add stevia if desired for extra sweetness without raising blood sugar.'
      ],
      aiNote: isTr ? 'Bu tarifi 3 Haziran 2026 tarihinde, sabah enerji metriklerin düşük olduğu ve glikoz değerlerinin sürdürülebilir bir enerjiye ihtiyaç duyduğunu gösterdiği için oluşturdum.' : 'I generated this recipe on June 3, 2026, because your morning energy metrics were low and your glucose readings suggested a need for sustained energy release.'
    },
    {
      id: '2',
      title: isTr ? 'Akdeniz Usulü Kinoa Kasesi' : 'Mediterranean Quinoa Power Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwYXZvY2FkbyUyMHNhbGFkJTIwcHJvdGVpbnxlbnwxfHx8fDE3ODA0OTA5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: 25,
      calories: 420,
      protein: 18,
      healthMatch: isTr ? 'Anti-enflamatuar bileşenler sağlık hedeflerini destekler' : 'Anti-inflammatory ingredients support your health goals',
      tags: isTr ? ['Anti-Enflamatuar', 'Yüksek-Protein', 'Glutensiz'] : ['Anti-Inflammatory', 'High-Protein', 'Gluten-Free'],
      ingredients: isTr ? [
        '1 su bardağı haşlanmış kinoa',
        '1/2 su bardağı nohut, kavrulmuş',
        '1 su bardağı karışık yeşillik (ıspanak, roka)',
        '1/2 dilimlenmiş avokado',
        '1/4 su bardağı ikiye bölünmüş çeri domates',
        '2 yemek kaşığı humus',
        '1 yemek kaşığı zeytinyağı',
        '1 yemek kaşığı limon suyu',
        'Taze otlar (maydanoz, nane)'
      ] : [
        '1 cup cooked quinoa',
        '1/2 cup chickpeas, roasted',
        '1 cup mixed greens (spinach, arugula)',
        '1/2 avocado, sliced',
        '1/4 cup cherry tomatoes, halved',
        '2 tbsp hummus',
        '1 tbsp olive oil',
        '1 tbsp lemon juice',
        'Fresh herbs (parsley, mint)'
      ],
      instructions: isTr ? [
        'Kinoayı paket üzerindeki talimatlara göre haşlayın ve hafifçe soğumaya bırakın.',
        'Fırını 200°C\'ye ısıtın. Nohutları biraz zeytinyağı ve kırmızı toz biberle harmanlayın.',
        'Nohutları çıtır olana kadar 20 dakika kavurun.',
        'Geniş bir kasede yeşillikleri taban olarak yayın.',
        'Üzerine haşlanmış kinoa, kavrulmuş nohut, çeri domates ve avokado dilimlerini ekleyin.',
        'Zeytinyağı ve limon suyunu gezdirin.',
        'Humus ve taze otlarla süsleyerek servis yapın.'
      ] : [
        'Cook quinoa according to package instructions and let cool slightly.',
        'Preheat oven to 400°F (200°C). Toss chickpeas with a little olive oil and roasted paprika.',
        'Roast chickpeas for 20 minutes until crispy.',
        'In a large bowl, arrange mixed greens as the base.',
        'Add cooked quinoa, roasted chickpeas, cherry tomatoes, and avocado slices.',
        'Drizzle with olive oil and lemon juice.',
        'Top with hummus and garnish with fresh herbs.'
      ],
      aiNote: isTr ? 'Akdeniz lezzetlerine olan tercihinize ve eklem sağlığınızı desteklemek için anti-enflamatuar yemeklere ihtiyacınıza dayanarak oluşturuldu.' : 'Created based on your preference for Mediterranean flavors and your need for anti-inflammatory meals to support joint health.'
    },
    {
      id: '3',
      title: isTr ? 'Fırınlanmış Sebzeli Izgara Somon' : 'Grilled Salmon with Roasted Vegetables',
      image: 'https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwc2FsbW9uJTIwcXVpbm9hJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3ODA0OTA5NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      prepTime: 30,
      calories: 380,
      protein: 35,
      healthMatch: isTr ? 'Yüksek omega-3 içeriği kalp sağlığını destekler' : 'High omega-3 content supports cardiovascular health',
      tags: isTr ? ['Kalp Dostu', 'Yüksek-Protein', 'Anti-Enflamatuar'] : ['Heart-Healthy', 'High-Protein', 'Anti-Inflammatory'],
      ingredients: isTr ? [
        '170g doğal somon fileto',
        '1 su bardağı brokoli',
        '1 su bardağı dilimlenmiş dolmalık biber',
        '1/2 su bardağı çeri domates',
        '2 yemek kaşığı zeytinyağı',
        '2 diş ince doğranmış sarımsak',
        '1 dilimlenmiş limon',
        'Taze dereotu',
        'Deniz tuzu ve karabiber'
      ] : [
        '6 oz wild-caught salmon fillet',
        '1 cup broccoli florets',
        '1 cup bell peppers, sliced',
        '1/2 cup cherry tomatoes',
        '2 tbsp olive oil',
        '2 cloves garlic, minced',
        '1 lemon, sliced',
        'Fresh dill',
        'Sea salt and black pepper'
      ],
      instructions: isTr ? [
        'Fırını 220°C\'ye ayarlayın ve fırın tepsisine yağlı kağıt serin.',
        'Sebzeleri 1 yemek kaşığı zeytinyağı, sarımsak, tuz ve karabiber ile harmanlayıp tepsiye yayın.',
        'Sebzeleri 15 dakika fırınlayın.',
        'Somonu kalan zeytinyağı, tuz ve karabiberle marine edip üzerine limon dilimlerini ekleyin.',
        'Somonu sebzelerin yanına ekleyin ve 12-15 dakika daha fırınlayın.',
        'Taze dereotu ile süsleyip servis edin.'
      ] : [
        'Preheat oven to 425°F (220°C) and line a baking sheet.',
        'Toss vegetables with 1 tbsp olive oil, garlic, salt, and pepper. Spread on baking sheet.',
        'Roast vegetables for 15 minutes.',
        'Season salmon with remaining olive oil, salt, pepper, and top with lemon slices.',
        'Add salmon to the baking sheet with vegetables and roast for additional 12-15 minutes.',
        'Check salmon is cooked through (internal temp 145°F).',
        'Garnish with fresh dill and serve immediately.'
      ],
      aiNote: isTr ? 'Bu omega-3 açısından zengin tarifi, daha fazla kalp dostu yağa ihtiyacınız olduğunu gösteren haftalık beslenme verilerinizi analiz ettikten sonra önerdim.' : 'I recommended this omega-3 rich recipe after analyzing your weekly nutrition data, which showed a need for more heart-healthy fats.'
    }
  ];
};

export function Recipes() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const recipesData = getRecipesData(language);
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipesData[0] | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleFilterToggle = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleCardClick = (recipe: typeof recipesData[0]) => {
    setSelectedRecipe(recipe);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedRecipe(null), 300);
  };

  // Filter recipes based on search and active filters
  const filteredRecipes = recipesData.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilters = activeFilters.length === 0 ||
                          activeFilters.some(filter =>
                            recipe.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
                          );

    return matchesSearch && matchesFilters;
  });

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mint-green to-electric-blue flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {language === 'tr' ? 'Tarif Defterim' : 'My Recipe Notebook'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'tr' ? 'Sağlık profilinize özel yapay zeka tarafından oluşturulmuş tarifler' : 'AI-generated recipes personalized for your health profile'}
            </p>
          </div>
        </div>

        {/* Filters */}
        <RecipeFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilters={activeFilters}
          onFilterToggle={handleFilterToggle}
          language={language}
        />

        {/* Recipe Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              {filteredRecipes.length} {language === 'tr' ? 'Kaydedilen Tarif' : `Saved Recipe${filteredRecipes.length !== 1 ? 's' : ''}`}
            </h2>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map(recipe => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => handleCardClick(recipe)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {language === 'tr' ? 'Tarif bulunamadı' : 'No recipes found'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'tr' ? 'Arama veya filtrelerinizi ayarlamayı deneyin' : 'Try adjusting your search or filters'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recipe Detail Panel */}
      <RecipeDetailPanel
        recipe={selectedRecipe}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        language={language}
      />
    </DashboardLayout>
  );
}
