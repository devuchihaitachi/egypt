import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import Modal from '../components/Modal';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from '../components/ImageWithFallback';
import { img } from '../utils/imagePath';

const categories = ['pharaonic', 'obelisks', 'grecoRoman', 'coptic', 'islamic', 'modern', 'natural'];

const monumentMap = {
  pharaonic: ['sphinx', 'karnakLuxor', 'valleyKings', 'abusimbel', 'edfuPhilae', 'dendera', 'komOmbo', 'tanis', 'amarna'],
  obelisks: ['unfinishedObelisk', 'hatshepsutObelisk', 'senusretObelisk', 'luxorParisObelisk', 'londonNeedle', 'newyorkNeedle', 'lateranRomeObelisk'],
  grecoRoman: ['qaitbayPompey', 'komShoqafa'],
  coptic: ['hangingChurch', 'abuSerga', 'babylonFort', 'catherineNatrun'],
  islamic: ['amrMosque', 'azharMoizz', 'citadelSaladin', 'ibnTulun', 'sinaiCastles', 'suhaymi', 'sultanHassanRifai', 'ghouri'],
  modern: ['abdeenManial', 'baronPalace', 'suezCanal', 'montazah', 'aishaFahmy', 'oldCataract'],
  natural: ['whaleValley', 'oasisTombs']
};



export default function Monuments() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('pharaonic');
  const [selectedMonumentId, setSelectedMonumentId] = useState(null);

  return (
    <div className="page-view page-container monuments-page">
      <ScrollReveal>
        <div className="section-header">
          <h1>{t('monuments.title')}</h1>
          <p>{t('monuments.subtitle')}</p>
        </div>
      </ScrollReveal>

      {/* Category Tabs */}
      <ScrollReveal delay={100}>
        <div className="monuments-tabs-container">
          <div className="monuments-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {t(`monuments.categories.${cat}`)}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Monuments Grid */}
      <div className="monuments-layout" key={activeCategory}>
        {monumentMap[activeCategory].map((id, index) => (
          <ScrollReveal key={id} delay={index * 120}>
            <div 
              className="glass-panel glass-panel-interactive monument-strip clickable-card"
              onClick={() => setSelectedMonumentId(id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedMonumentId(id);
                }
              }}
            >
              <div className="strip-thumb-container">
                <ImageWithFallback
                  src={img(`/images/items/${id}.jpg`)}
                  fallbackSrc={img('/images/temples.jpg')}
                  alt={t(`monuments.items.${id}.name`)}
                  className="strip-thumb-img"
                />
              </div>
              <div className="strip-info-content">
                <h2>{t(`monuments.items.${id}.name`)}</h2>
                <p className="strip-meta">
                  <strong>{t('monuments.location')}:</strong> {t(`monuments.items.${id}.location`)} &bull;{' '}
                  <strong>{t('monuments.age')}:</strong> {t(`monuments.items.${id}.age`)}
                </p>
                <p className="strip-desc-preview">{t(`monuments.items.${id}.desc`).substring(0, 120)}...</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={selectedMonumentId !== null}
        onClose={() => setSelectedMonumentId(null)}
        title={selectedMonumentId ? t(`monuments.items.${selectedMonumentId}.name`) : ''}
      >
        {selectedMonumentId && (
          <div className="split-modal-content">
            <div className="split-modal-image-side">
              <ImageWithFallback
                src={img(`/images/items/${selectedMonumentId}.jpg`)}
                fallbackSrc={img('/images/temples.jpg')}
                alt={t(`monuments.items.${selectedMonumentId}.name`)}
                className="split-modal-image"
              />
            </div>
            <div className="split-modal-text-side">
              <p className="modal-builder-info" style={{ marginTop: 0 }}>
                <strong>{t('monuments.location')}:</strong> {t(`monuments.items.${selectedMonumentId}.location`)}
              </p>
              <p className="modal-builder-info">
                <strong>{t('monuments.age')}:</strong> {t(`monuments.items.${selectedMonumentId}.age`)}
              </p>
              <div className="modal-description-text">
                <p>{t(`monuments.items.${selectedMonumentId}.desc`)}</p>
              </div>
              {selectedMonumentId === 'abusimbel' && (
                <div className="modal-info-note" style={{ marginTop: '1.5rem', padding: '1rem', border: '1px dashed rgba(212, 175, 55, 0.4)', borderRadius: '8px', background: 'rgba(212, 175, 55, 0.05)' }}>
                  <h4 style={{ color: 'var(--color-gold)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)', fontSize: '1rem', marginTop: 0 }}>{t('monuments.nubiaRescueTitle')}</h4>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>{t('monuments.nubiaRescueDesc')}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

