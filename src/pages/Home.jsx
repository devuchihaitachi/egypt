import { useEffect, useRef } from 'react';
import { useNavigation } from '../components/Router';
import { useLanguage } from '../context/LanguageContext';
import ScrollReveal from '../components/ScrollReveal';

export default function Home() {
  const { navigateTo } = useNavigation();
  const { t, language } = useLanguage();
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrolled = window.scrollY;
        bgRef.current.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
        const blurValue = Math.min(10, scrolled * 0.02);
        bgRef.current.style.filter = `blur(${blurValue}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    document.getElementById('home-intro')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-page-container">
      <div className="home-hero">
        <div
          ref={bgRef}
          className="home-hero-bg"
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.85)), url("/images/giza-hero.jpg")' }}
        />
        <div className="home-content">
          <ScrollReveal>
            <h1 className="home-title">{t('home.title')}</h1>
            <p className="home-subtitle">{t('home.subtitle')}</p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <button className="cta-button" onClick={() => navigateTo('pyramids')}>
              {t('home.cta')}
            </button>
          </ScrollReveal>
        </div>
        <div
          className="scroll-cue"
          onClick={handleScrollDown}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleScrollDown(); }}
          style={{ cursor: 'pointer' }}
          aria-label={t('home.scrollCue')}
        >
          <span className="arrow-down">&#8595;</span>
        </div>
      </div>

      <div id="home-intro" className="home-intro-section">
        <ScrollReveal>
          <div className="intro-header">
            <h2>{t('home.intro.title')}</h2>
            <p className="intro-subtitle">{t('home.intro.subtitle')}</p>
          </div>
        </ScrollReveal>

        {/* Kemet Fun Fact Box */}
        <ScrollReveal delay={50}>
          <div className="glass-panel kemet-fact-box">
            <div className="kemet-fact-icon">
              💡
            </div>
            <div className="kemet-fact-content">
              <h4>
                {t('home.kemetFactTitle')}
              </h4>
              <p>
                {t('home.kemetFactText')}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="home-intro-grid">
          <ScrollReveal delay={100}>
            <div
              className="glass-panel glass-panel-interactive home-intro-card-immersive"
              onClick={() => navigateTo('pyramids')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo('pyramids'); }}
            >
              <div
                className="home-intro-card-bg"
                style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.9) 90%), url("/images/djoser.png")' }}
              />
              <span className="card-number">01</span>
              <div className="card-immersive-content">
                <h3>{t('home.intro.pyramidsTitle')}</h3>
                <p>{t('home.intro.pyramidsDesc')}</p>
                <span className="card-explore-link">
                  {t('home.intro.pyramidsLink')} <span className="arrow-icon">{language === 'ar' ? '←' : '→'}</span>
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div
              className="glass-panel glass-panel-interactive home-intro-card-immersive"
              onClick={() => navigateTo('monuments')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo('monuments'); }}
            >
              <div
                className="home-intro-card-bg"
                style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.9) 90%), url("/images/temples.jpg")' }}
              />
              <span className="card-number">02</span>
              <div className="card-immersive-content">
                <h3>{t('home.intro.monumentsTitle')}</h3>
                <p>{t('home.intro.monumentsDesc')}</p>
                <span className="card-explore-link">
                  {t('home.intro.monumentsLink')} <span className="arrow-icon">{language === 'ar' ? '←' : '→'}</span>
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div
              className="glass-panel glass-panel-interactive home-intro-card-immersive"
              onClick={() => navigateTo('history')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo('history'); }}
            >
              <div
                className="home-intro-card-bg"
                style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.9) 90%), url("/images/narmer.png")' }}
              />
              <span className="card-number">03</span>
              <div className="card-immersive-content">
                <h3>{t('home.intro.historyTitle')}</h3>
                <p>{t('home.intro.historyDesc')}</p>
                <span className="card-explore-link">
                  {t('home.intro.historyLink')} <span className="arrow-icon">{language === 'ar' ? '←' : '→'}</span>
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div
              className="glass-panel glass-panel-interactive home-intro-card-immersive"
              onClick={() => navigateTo('pharaohs')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigateTo('pharaohs'); }}
            >
              <div
                className="home-intro-card-bg"
                style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.9) 90%), url("/images/gods.jpg")' }}
              />
              <span className="card-number">04</span>
              <div className="card-immersive-content">
                <h3>{t('home.intro.pharaohsTitle')}</h3>
                <p>{t('home.intro.pharaohsDesc')}</p>
                <span className="card-explore-link">
                  {t('home.intro.pharaohsLink')} <span className="arrow-icon">{language === 'ar' ? '←' : '→'}</span>
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}



