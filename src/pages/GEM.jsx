import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

const exhibitsList = ['tutankhamun', 'staircase', 'solarBoat'];

export default function GEM() {
  const { t } = useLanguage();

  return (
    <div className="page-view page-container gem-page">
      <ScrollReveal>
        <div className="section-header">
          <h1>{t('gem.title')}</h1>
          <p>{t('gem.subtitle')}</p>
        </div>
      </ScrollReveal>

      {/* Centered Real Photograph of GEM */}
      <ScrollReveal delay={150}>
        <div className="gem-hero-container">
          <img 
            src="/images/gem.jpg" 
            alt={t('gem.title')} 
            className="gem-hero-img"
          />
          <div className="gem-hero-meta">
            <div className="glass-panel gem-meta-badge">
              {t('gem.openingDate')}
            </div>
            <div className="glass-panel gem-meta-badge">
              {t('gem.location')}
            </div>
            <div className="glass-panel gem-meta-badge">
              {t('gem.area')}
            </div>
            <div className="glass-panel gem-meta-badge">
              {t('gem.totalArtifacts')}
            </div>
            <div className="glass-panel gem-meta-badge">
              {t('gem.openingHours')}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="gem-section-divider">
        <h2>{t('gem.exhibitsTitle')}</h2>
      </div>

      <div className="gem-exhibits-grid">
        {exhibitsList.map((id, index) => (
          <ScrollReveal key={id} delay={index * 150}>
            <div className="glass-panel glass-panel-interactive gem-exhibit-card">
              <h3>{t(`gem.exhibits.${id}`)}</h3>
              <p>{t(`gem.exhibits.${id}Desc`)}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}


