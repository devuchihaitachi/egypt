import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import CountUp from '../components/CountUp';
import Modal from '../components/Modal';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from '../components/ImageWithFallback';
import { img } from '../utils/imagePath';

const gizaPyramids = [
  { id: 'khufu', height: 146, age: 4580 },
  { id: 'khafre', height: 143, age: 4550 },
  { id: 'menkaure', height: 65, age: 4520 }
];

const otherPyramids = [
  { id: 'djoser', height: 62, age: 4700 },
  { id: 'bent', height: 104, age: 4620 },
  { id: 'red', height: 105, age: 4590 }
];



export default function Pyramids() {
  const { t } = useLanguage();
  const [selectedPyramid, setSelectedPyramid] = useState(null);

  const renderPyramidGrid = (pyramids) => (
    <div className="pyramids-grid">
      {pyramids.map((pyr, index) => (
        <ScrollReveal key={pyr.id} delay={index * 150}>
          <div 
            className="glass-panel glass-panel-interactive pyramid-card clickable-card"
            onClick={() => setSelectedPyramid(pyr)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedPyramid(pyr);
              }
            }}
          >
            <div className="card-thumb-container">
              <ImageWithFallback
                src={img(`/images/items/pyramid_${pyr.id}.jpg`)}
                fallbackSrc={img('/images/pyramids-info.jpg')}
                alt={t(`pyramids.items.${pyr.id}.name`)}
                className="card-thumb-img"
              />
            </div>
            <div className="card-info-content">
              <h2>{t(`pyramids.items.${pyr.id}.name`)}</h2>
              <div className="stats-box">
                <div className="stat-item">
                  <span className="stat-num">
                    <CountUp end={pyr.height} suffix={t('pyramids.heightUnit')} />
                  </span>
                  <span className="stat-label">{t('pyramids.height')}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">
                    <CountUp end={pyr.age} suffix={t('pyramids.ageUnit')} />
                  </span>
                  <span className="stat-label">{t('pyramids.age')}</span>
                </div>
              </div>
              <p className="builder-text">
                <strong>{t('pyramids.builder')}:</strong> {t(`pyramids.items.${pyr.id}.builder`)}
              </p>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );

  return (
    <div className="page-view page-container pyramids-page">
      <ScrollReveal>
        <div className="section-header">
          <h1>{t('pyramids.title')}</h1>
          <p>{t('pyramids.subtitle')}</p>
        </div>
      </ScrollReveal>

      {/* Giza Section */}
      <div className="pyramids-section-title">
        <h2>{t('pyramids.gizaSection')}</h2>
      </div>
      {renderPyramidGrid(gizaPyramids)}

      {/* Dahshur & Saqqara Section */}
      <div className="pyramids-section-title">
        <h2>{t('pyramids.dahshurSection')}</h2>
      </div>
      {renderPyramidGrid(otherPyramids)}

      {/* Features & Discoveries */}
      <div className="pyramids-section-title">
        <h2>{t('pyramids.featuresTitle')}</h2>
      </div>
      <div className="pyramids-features-grid">
        <ScrollReveal delay={100}>
          <div className="glass-panel pyramid-feature-card">
            <h3>{t('pyramids.solarBoat.title')}</h3>
            <p>{t('pyramids.solarBoat.desc')}</p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="glass-panel pyramid-feature-card">
            <h3>{t('pyramids.builderTruth.title')}</h3>
            <p>{t('pyramids.builderTruth.desc')}</p>
          </div>
        </ScrollReveal>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={selectedPyramid !== null}
        onClose={() => setSelectedPyramid(null)}
        title={selectedPyramid ? t(`pyramids.items.${selectedPyramid.id}.name`) : ''}
      >
        {selectedPyramid && (
          <div className="split-modal-content">
            <div className="split-modal-image-side">
              <ImageWithFallback
                src={img(`/images/items/pyramid_${selectedPyramid.id}.jpg`)}
                fallbackSrc={img('/images/pyramids-info.jpg')}
                alt={t(`pyramids.items.${selectedPyramid.id}.name`)}
                className="split-modal-image"
              />
            </div>
            <div className="split-modal-text-side">
              <div className="modal-stats-row">
                <div className="glass-panel modal-stat-card">
                  <span className="stat-label">{t('pyramids.height')}</span>
                  <span className="stat-num">{selectedPyramid.height} {t('pyramids.heightUnit')}</span>
                </div>
                <div className="glass-panel modal-stat-card">
                  <span className="stat-label">{t('pyramids.age')}</span>
                  <span className="stat-num">{selectedPyramid.age} {t('pyramids.ageUnit')}</span>
                </div>
              </div>
              <p className="modal-builder-info">
                <strong>{t('pyramids.builder')}:</strong> {t(`pyramids.items.${selectedPyramid.id}.builder`)}
              </p>
              <div className="modal-description-text">
                <p>{t(`pyramids.items.${selectedPyramid.id}.desc`)}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

