import { Heart, Menu } from 'lucide-react';
import { Link } from 'react-router';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

export function Header() {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl text-foreground">OptiMeal</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              {t.header.features}
            </a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
              {t.header.howItWorks}
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
              {t.header.pricing}
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              {t.header.about}
            </a>
          </nav>
          
          {/* CTA Buttons & Language Switcher */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            
            <Link 
              to="/login"
              className="hidden md:block text-foreground hover:text-primary transition-colors"
            >
              {t.header.signIn}
            </Link>
            <Link 
              to="/signup"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg transition-colors"
            >
              {t.header.getStarted}
            </Link>
            <button className="md:hidden text-foreground">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}