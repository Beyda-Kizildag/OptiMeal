import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/Button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent to-background">
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary">{t.hero.tag}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
              {t.hero.title1} <span className="text-primary">{t.hero.title2}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t.hero.desc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  {t.hero.startBtn}
                </Button>
              </Link>
              
              <Button variant="outline" size="lg">
                {t.hero.learnBtn}
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-muted-foreground">{t.hero.rating}</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="text-sm text-muted-foreground">{t.hero.users}</span>
              <div className="h-4 w-px bg-border" />
              <span className="text-sm text-muted-foreground">{t.hero.hipaa}</span>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-3xl transform translate-x-8 translate-y-8" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1621758745802-6c16a087ca32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwbWVhbCUyMG51dHJpdGlvbiUyMHBsYW5uaW5nfGVufDF8fHx8MTc3NDMyOTI3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Healthy meal planning"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}