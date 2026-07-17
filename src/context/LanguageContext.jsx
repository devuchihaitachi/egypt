/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse language from URL
  const segments = location.pathname.split('/').filter(Boolean);
  const pathLang = (segments[0] === 'ar' || segments[0] === 'en') ? segments[0] : null;

  // Fallback to localStorage or default
  const defaultLang = localStorage.getItem('eternal-egypt-lang') || 'en';
  const language = pathLang || defaultLang;

  useEffect(() => {
    localStorage.setItem('eternal-egypt-lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Handle redirect if URL lacks language prefix
  useEffect(() => {
    if (!pathLang) {
      const targetPath = `/${defaultLang}${location.pathname}${location.search}`;
      navigate(targetPath, { replace: true });
    }
  }, [pathLang, defaultLang, location.pathname, location.search, navigate]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    const targetSegments = [...segments];
    if (pathLang) {
      targetSegments[0] = newLang;
    } else {
      targetSegments.unshift(newLang);
    }
    const targetPath = '/' + targetSegments.join('/') + location.search;
    navigate(targetPath);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
