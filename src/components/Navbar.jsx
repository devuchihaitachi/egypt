import { useEffect, useState } from 'react';
import { useNavigation, pages } from './Router';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { currentPage, navigateTo } = useNavigation();
  const { t, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page) => {
    navigateTo(page);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-header-row">
        {/* Mobile Language Toggle */}
        <button
          className="mobile-lang-toggle"
          onClick={toggleLanguage}
          aria-label={t('nav.toggleLang')}
        >
          {t('nav.toggleLang')}
        </button>
      </div>

      <nav className="navbar-links">
        {pages.map((page) => (
          <button
            key={page}
            className={`nav-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => handleNav(page)}
          >
            {t(`nav.${page}`)}
          </button>
        ))}
      </nav>

      {/* Desktop Language Toggle */}
      <button
        className="nav-btn desktop-lang-toggle"
        onClick={toggleLanguage}
      >
        {t('nav.toggleLang')}
      </button>
    </header>
  );
}
