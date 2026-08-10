import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/Button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

export function CTA() {
  const { t } = useLanguage();
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-3xl shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          
          <div className="relative grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16">
            {/* Left Content */}
            <div className="space-y-6 text-primary-foreground">
              <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
                {t.cta.title}
              </h2>
              
              <p className="text-lg opacity-90">
                {t.cta.desc}
              </p>
              
              <ul className="space-y-3">
                {[
                  t.cta.l1,
                  t.cta.l2,
                  t.cta.l3,
                  t.cta.l4
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <Link to="/signup">
                  <Button 
                    variant="primary" 
                    size="lg"
                    icon={<ArrowRight className="w-5 h-5" />}
                    className="bg-background text-primary hover:bg-background/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {t.cta.startBtn}
                  </Button>
                </Link>
                
                <p className="text-sm opacity-75 mt-4">
                  {t.cta.trusted}
                </p>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1757332051150-a5b3c4510af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBoZWFsdGh5JTIwZWF0aW5nfGVufDF8fHx8MTc3NDMyOTI3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Fresh vegetables healthy eating"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}