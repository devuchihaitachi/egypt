import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import { img } from '../utils/imagePath';

export default function PlanVisit() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('pyramids');

  const steps = t(`visit.plans.${activeTab}.steps`);
  const stepsArray = Array.isArray(steps) ? steps : [];

  return (
    <div className="page-view page-container">
      <ScrollReveal>
        <div className="section-header">
          <h1>{t('visit.title')}</h1>
          <p>{t('visit.subtitle')}</p>
        </div>
      </ScrollReveal>
      <div className="visit-grid">
        <ScrollReveal delay={100}>
          <div className="glass-panel visit-info-card">
            <h2>{t('visit.tipsTitle')}</h2>
            <ul>
              <li>
                <strong>{t('visit.tips.bestTime.label')}</strong> {t('visit.tips.bestTime.text')}
              </li>
              <li>
                <strong>{t('visit.tips.tickets.label')}</strong> {t('visit.tips.tickets.text')}
              </li>
              <li>
                <strong>{t('visit.tips.dress.label')}</strong> {t('visit.tips.dress.text')}
              </li>
              <li>
                <strong>{t('visit.tips.transport.label')}</strong> {t('visit.tips.transport.text')}
              </li>
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="glass-panel visit-map-card">
            <h2>{t('visit.mapTitle')}</h2>
            <div
              className="map-placeholder"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${img('/images/map.jpg')})`
              }}
            >
              <span className="map-pin cairo">{t('visit.cairo')}</span>
              <span className="map-pin luxor">{t('visit.luxor')}</span>
              <span className="map-pin aswan">{t('visit.aswan')}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Travel Itineraries Section */}
      <div className="itineraries-section" style={{ marginTop: '4rem' }}>
        <ScrollReveal>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2>{t('visit.itinerariesTitle')}</h2>
            <p>{t('visit.itinerariesSubtitle')}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="itinerary-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {['pyramids', 'monuments', 'history'].map((planKey) => (
              <button
                key={planKey}
                className={`tab-button ${activeTab === planKey ? 'active' : ''}`}
                onClick={() => setActiveTab(planKey)}
                style={{
                  background: activeTab === planKey ? 'var(--color-gold)' : 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid var(--color-gold)',
                  color: activeTab === planKey ? '#0b0b0f' : 'var(--color-gold)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  fontWeight: 'bold',
                  boxShadow: activeTab === planKey ? '0 4px 15px rgba(212, 175, 55, 0.4)' : 'none'
                }}
              >
                {t(`visit.tab${planKey.charAt(0).toUpperCase() + planKey.slice(1)}`)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} key={activeTab}>
          <div className="glass-panel itinerary-details-card">
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '0.75rem' }}>
              {t(`visit.plans.${activeTab}.title`)}
            </h3>

            {/* Itinerary Quick Meta Info */}
            <div className="itinerary-meta">
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-papyrus)', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {t('visit.durationLabel')}
                </span>
                <strong style={{ fontSize: '1.1rem', color: '#fff' }}>
                  {t(`visit.plans.${activeTab}.duration`)}
                </strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-papyrus)', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {t('visit.firstStopLabel')}
                </span>
                <strong style={{ fontSize: '1.1rem', color: '#fff' }}>
                  {t(`visit.plans.${activeTab}.firstStop`)}
                </strong>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-papyrus)', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {t('visit.transportLabel')}
                </span>
                <strong style={{ fontSize: '1.1rem', color: '#fff' }}>
                  {t(`visit.plans.${activeTab}.transport`)}
                </strong>
              </div>
            </div>

            {/* Timeline steps */}
            <div className="itinerary-timeline">
              {stepsArray.map((step, idx) => (
                <div key={idx} className="itinerary-step">
                  {/* Timeline dot */}
                  <div className="itinerary-dot" />
                  
                  <div className="itinerary-step-content">
                    <span style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontFamily: 'var(--font-heading)', fontSize: '0.9rem', letterSpacing: '1px' }}>
                      {step.time}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.2rem', margin: '0.2rem 0' }}>
                      {step.title}
                    </h4>
                    <p style={{ color: 'var(--color-papyrus)', opacity: 0.9, lineHeight: '1.5', fontSize: '0.95rem', margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

