import { UserCircle, Brain, Utensils } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function HowItWorks() {
  const { t } = useLanguage();
  const steps = [
    {
      icon: UserCircle,
      number: "01",
      title: t.howItWorks.s1Title,
      description: t.howItWorks.s1Desc
    },
    {
      icon: Brain,
      number: "02",
      title: t.howItWorks.s2Title,
      description: t.howItWorks.s2Desc
    },
    {
      icon: Utensils,
      number: "03",
      title: t.howItWorks.s3Title,
      description: t.howItWorks.s3Desc
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            {t.howItWorks.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.howItWorks.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-primary/20" />
              )}
              
              <div className="relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-border">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm">{step.number}</span>
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
