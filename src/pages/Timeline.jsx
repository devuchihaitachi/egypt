/* eslint-disable react/prop-types */
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

const erasKeys = ['early', 'old', 'middle', 'new', 'late', 'ptolemaic', 'coptic', 'islamic', 'modern'];

export default function Timeline({ hideHeader = false }) {
  const { t } = useLanguage();

  return (
    <div className={`page-view page-container timeline-page ${hideHeader ? 'sub-page' : ''}`}>
      {!hideHeader && (
        <ScrollReveal>
          <div className="section-header">
            <h1>{t('timeline.title')}</h1>
            <p>{t('timeline.subtitle')}</p>
          </div>
        </ScrollReveal>
      )}

      <div className="timeline-container" style={hideHeader ? { marginTop: '1rem' } : {}}>
        <div className="timeline-spine"></div>

        {erasKeys.map((key, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div 
              key={key} 
              className={`timeline-item ${isLeft ? 'left-item' : 'right-item'}`}
            >
              <ScrollReveal delay={index * 100}>
                <div className="timeline-badge-dot"></div>
                <div className="glass-panel glass-panel-interactive timeline-card">
                  <div className="timeline-card-header">
                    <span className="era-date">{t(`timeline.eras.${key}.date`)}</span>
                    <h2 className="era-title">{t(`timeline.eras.${key}.name`)}</h2>
                  </div>
                  <div className="timeline-card-body">
                    <p className="era-desc">{t(`timeline.eras.${key}.desc`)}</p>
                    <div className="era-facts">
                      <strong>{t('monuments.location') === 'الموقع' ? 'أهم المعالم والأحداث:' : 'Key Highlights:'}</strong>
                      <span className="facts-content"> {t(`timeline.eras.${key}.facts`)}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          );
        })}
      </div>
    </div>
  );
}
