import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from './en';
import { zh } from './zh';

export type Language = 'en' | 'zh';

export type TranslationKeys = keyof typeof en;

export interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKeys) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  en,
  zh,
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  // Check if we're in the browser environment
  const isBrowser = typeof window !== 'undefined';
  
  const [lang, setLang] = useState<Language>(() => {
    if (isBrowser) {
      // Try to get language from localStorage
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && Object.keys(translations).includes(savedLang)) {
        return savedLang;
      }
      
      // Try to get language from browser
      const browserLang = navigator.language.split('-')[0] as Language;
      if (browserLang && Object.keys(translations).includes(browserLang)) {
        return browserLang;
      }
    }
    
    // Default to English
    return 'en';
  });

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('language', lang);
    }
  }, [lang, isBrowser]);

  const t = (key: TranslationKeys) => {
    return translations[lang][key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};