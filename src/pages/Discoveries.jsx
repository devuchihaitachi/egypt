import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import Modal from '../components/Modal';
import { Calendar, MapPin, User, Sparkles, BookOpen } from 'lucide-react';

const discoveryIds = [
  'saqqara',
  'luxor',
  'aswan',
  'tutankhamun',
  'rosetta',
  'khufuship',
  'abydos'
];

export default function Discoveries() {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedId(null);
    setIsOpen(false);
  };

  const selectedData = selectedId ? {
    title: t(`discoveries.items.${selectedId}.title`),
    year: t(`discoveries.items.${selectedId}.year`),
    location: t(`discoveries.items.${selectedId}.location`),
    discoverer: t(`discoveries.items.${selectedId}.discoverer`),
    artifacts: t(`discoveries.items.${selectedId}.artifacts`),
    details: t(`discoveries.items.${selectedId}.details`),
    significance: t(`discoveries.items.${selectedId}.significance`)
  } : null;

  return (
    <div className="page-view page-container discoveries-page">
      <ScrollReveal>
        <div className="section-header">
          <h1>{t('discoveries.title')}</h1>
          <p>{t('discoveries.subtitle')}</p>
        </div>
      </ScrollReveal>

      <div className="discoveries-grid">
        {discoveryIds.map((id, index) => (
          <ScrollReveal key={id} delay={index * 100}>
            <div
              className="glass-panel glass-panel-interactive discovery-card"
              onClick={() => handleOpenModal(id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="discovery-header">
                <span className="discovery-tag">
                  {id === 'tutankhamun' || id === 'rosetta' || id === 'khufuship'
                    ? t('discoveries.readMore')
                    : 'NEW FIND'}
                </span>
                <h3>{t(`discoveries.items.${id}.title`)}</h3>
              </div>
              <p>{t(`discoveries.items.${id}.desc`)}</p>
              
              <div className="card-meta-row">
                <span className="card-meta-item">
                  <Calendar size={14} /> {t(`discoveries.items.${id}.year`)}
                </span>
                <span className="card-meta-item">
                  <MapPin size={14} /> {t(`discoveries.items.${id}.location`)}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={selectedData?.title || ''}
      >
        {selectedData && (
          <div className="modal-details-grid">
            <div className="modal-detail-item">
              <div className="modal-detail-label">
                <Calendar size={16} />
                <span>{t('discoveries.fields.year')}</span>
              </div>
              <div className="modal-detail-value">{selectedData.year}</div>
            </div>

            <div className="modal-detail-item">
              <div className="modal-detail-label">
                <MapPin size={16} />
                <span>{t('discoveries.fields.location')}</span>
              </div>
              <div className="modal-detail-value">{selectedData.location}</div>
            </div>

            <div className="modal-detail-item modal-detail-full">
              <div className="modal-detail-label">
                <User size={16} />
                <span>{t('discoveries.fields.discoverer')}</span>
              </div>
              <div className="modal-detail-value">{selectedData.discoverer}</div>
            </div>

            <div className="modal-detail-item modal-detail-full">
              <div className="modal-detail-label">
                <Sparkles size={16} />
                <span>{t('discoveries.fields.artifacts')}</span>
              </div>
              <div className="modal-detail-value">{selectedData.artifacts}</div>
            </div>

            <div className="modal-detail-item modal-detail-full">
              <div className="modal-detail-label">
                <BookOpen size={16} />
                <span>{t('discoveries.title')}</span>
              </div>
              <div className="modal-detail-value" style={{ marginBottom: '1rem' }}>{selectedData.details}</div>
              
              <div className="modal-detail-label" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Sparkles size={16} />
                <span>{t('discoveries.fields.significance')}</span>
              </div>
              <div className="modal-detail-value">{selectedData.significance}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
