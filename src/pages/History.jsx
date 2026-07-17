import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import Timeline from './Timeline';

const timelineEras = [
  { id: 'predynastic' },
  { id: 'early' },
  { id: 'old' },
  { id: 'transition1' },
  { id: 'middle' },
  { id: 'transition2' },
  { id: 'new' },
  { id: 'late' },
  { id: 'ptolemaic' },
  { id: 'coptic' },
  { id: 'islamic' },
  { id: 'modern' }
];

export default function History() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dynasties');

  return (
    <div className="page-view page-container pharaohs-timeline-page">
      <ScrollReveal>
        <div className="section-header">
          <h1>{t('history.title')}</h1>
          <p>{t('history.subtitle')}</p>
        </div>
      </ScrollReveal>

      {/* Tabs */}
      <ScrollReveal delay={100}>
        <div className="history-tabs-container">
          <div className="history-tabs">
            <button
              className={`tab-btn ${activeTab === 'dynasties' ? 'active' : ''}`}
              onClick={() => setActiveTab('dynasties')}
            >
              {t('history.tabDynasties')}
            </button>
            <button
              className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
              onClick={() => setActiveTab('timeline')}
            >
              {t('history.tabTimeline')}
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* View Switcher */}
      {activeTab === 'dynasties' ? (
        <div className="timeline-container">
          {timelineEras.map((era, index) => (
            <div key={era.id} className="timeline-era">
              <ScrollReveal delay={index * 100}>
                <h2 className="era-title">{t(`history.eras.${era.id}`)}</h2>
              </ScrollReveal>
              <div className="era-cards">
                <ScrollReveal delay={index * 100 + 50}>
                  <div className="glass-panel pharaoh-card">
                    <h3>{t(`history.items.${era.id}.name`)}</h3>
                    <p className="reign-text">
                      {t('history.reign')}: {t(`history.items.${era.id}.reign`)}
                    </p>
                    <p className="achievement-text">
                      <strong>{t('history.achievement')}:</strong> {t(`history.items.${era.id}.achievement`)}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Timeline hideHeader={true} />
      )}
    </div>
  );
}
