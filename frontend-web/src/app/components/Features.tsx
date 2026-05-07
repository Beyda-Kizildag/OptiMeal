import { Brain, Heart, ShoppingCart, Calendar, TrendingUp, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

export function Features() {
  const { t } = useLanguage();
  const features = [
    {
      icon: Brain,
      title: t.features.f1Title,
      description: t.features.f1Desc,
      color: "bg-primary"
    },
    {
      icon: Heart,
      title: t.features.f2Title,
      description: t.features.f2Desc,
      color: "bg-primary"
    },
    {
      icon: ShoppingCart,
      title: t.features.f3Title,
      description: t.features.f3Desc,
      color: "bg-primary"
    },
    {
      icon: Calendar,
      title: t.features.f4Title,
      description: t.features.f4Desc,
      color: "bg-primary"
    },
    {
      icon: TrendingUp,
      title: t.features.f5Title,
      description: t.features.f5Desc,
      color: "bg-primary"
    },
    {
      icon: Shield,
      title: t.features.f6Title,
      description: t.features.f6Desc,
      color: "bg-primary"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-accent">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {t.features.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.features.desc}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card rounded-2xl p-6 hover:shadow-lg transition-all border border-border group hover:border-primary/50"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-card rounded-3xl p-8 lg:p-12 shadow-xl border border-border">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <span className="text-sm text-primary">{t.features.featTag}</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl text-foreground">
              {t.features.featTitle}
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t.features.featDesc}
            </p>
            
            <ul className="space-y-3">
              {[
                t.features.featL1,
                t.features.featL2,
                t.features.featL3,
                t.features.featL4
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1683348758702-5163a4ec3e81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjB1c2luZyUyMHNtYXJ0cGhvbmUlMjBoZWFsdGglMjBhcHB8ZW58MXx8fHwxNzc0MzI5Mjc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Person using health app"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
