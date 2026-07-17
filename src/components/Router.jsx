/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NavigationContext = createContext();

export const pages = [
  'home',
  'pyramids',
  'monuments',
  'history',
  'pharaohs',
  'culture',
  'gem',
  'unesco',
  'discoveries',
  'hieroglyphics',
  'visit'
];

const pathToPage = (path) => {
  const segments = path.split('/').filter(Boolean);
  if (segments.length <= 1) return 'home';
  const page = segments[1];
  return pages.includes(page) ? page : 'home';
};

const pageToPath = (page, currentLang) => {
  const prefix = `/${currentLang}`;
  return page === 'home' ? prefix : `${prefix}/${page}`;
};

export function NavigationProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [transitionDirection, setTransitionDirection] = useState('forward');
  
  const currentPage = pathToPage(location.pathname);
  const prevPageRef = useRef(currentPage);

  useEffect(() => {
    const prevPage = prevPageRef.current;
    if (prevPage !== currentPage) {
      const prevIndex = pages.indexOf(prevPage);
      const currentIndex = pages.indexOf(currentPage);
      if (prevIndex !== -1 && currentIndex !== -1) {
        if (currentIndex > prevIndex) {
          setTransitionDirection('forward');
        } else {
          setTransitionDirection('backward');
        }
      }
      prevPageRef.current = currentPage;
    }
  }, [currentPage]);

  const navigateTo = (targetPage) => {
    if (!pages.includes(targetPage)) return;
    navigate(pageToPath(targetPage, language));
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo, transitionDirection }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
