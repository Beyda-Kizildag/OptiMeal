import { Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="OptiMeal Logo" className="w-8 h-8 object-cover rounded-md" />
              <span className="text-xl font-semibold tracking-tight">OptiMeal</span>
            </div>
            <p className="text-sm text-background/70">
              {t.footer.desc}
            </p>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="mb-4 text-sm">{t.footer.product}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">{t.footer.f1}</a></li>
              <li><a href="#" className="hover:text-background transition-colors">{t.footer.f2}</a></li>
              <li><a href="#" className="hover:text-background transition-colors">{t.footer.f3}</a></li>
              <li><a href="#" className="hover:text-background transition-colors">{t.footer.f4}</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm">{t.footer.company}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">{t.footer.c1}</a></li>
              <li><a href="#" className="hover:text-background transition-colors">{t.footer.c2}</a></li>
              <li><a href="#" className="hover:text-background transition-colors">{t.footer.c3}</a></li>
              <li><a href="#" className="hover:text-background transition-colors">{t.footer.c4}</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">{t.footer.l1}</a></li>
              <li><a href="#" className="hover:text-background transition-colors">{t.footer.l2}</a></li>
              <li><a href="#" className="hover:text-background transition-colors">{t.footer.l3}</a></li>
              <li><a href="#" className="hover:text-background transition-colors">{t.footer.l4}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/70">
          <p>{t.footer.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">Twitter</a>
            <a href="#" className="hover:text-background transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-background transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
