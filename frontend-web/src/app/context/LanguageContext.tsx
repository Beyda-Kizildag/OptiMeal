import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../i18n/translations';

type Language = 'en' | 'tr';
type TranslationKeys = typeof translations.en;

type TFunction = ((key: string) => any) & TranslationKeys;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TFunction;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('tr');
  
  const tFn = (path: string) => {
    return path.split('.').reduce((obj: any, key) => obj && obj[key], translations[language]) || path;
  };

  const t = Object.assign(tFn, translations[language]);

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
