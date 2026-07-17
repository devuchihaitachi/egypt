/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

export const pages = [
  'home',
  'pyramids',
  'monuments',
  'pharaohs',
  'gods',
  'culture',
  'gem',
  'unesco',
  'discoveries',
  'timeline',
  'hieroglyphics',
  'visit'
];

const pathToPage = (path) => {
  if (path === '/') return 'home';
  const clean = path.replace(/^\//, '');
  return pages.includes(clean) ? clean : 'home';
};

const pageToPath = (page) => {
  return page === 'home' ? '/' : `/${page}`;
};

export function NavigationProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
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
    navigate(pageToPath(targetPage));
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
