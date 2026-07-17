import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../context/LanguageContext';
import Modal from '../components/Modal';
import { Calendar, MapPin, Building, ShieldAlert, FileText } from 'lucide-react';

const sitesList = [
  { id: 'cairo', type: 'Cultural' },
  { id: 'memphis', type: 'Cultural' },
  { id: 'thebes', type: 'Cultural' },
  { id: 'nubia', type: 'Cultural' },
  { id: 'abumena', type: 'Cultural' },
  { id: 'stcatherine', type: 'Cultural' },
  { id: 'whalevalley', type: 'Natural' }
];

export default function UNESCO() {
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

  const selectedSite = sitesList.find(s => s.id === selectedId);
  const selectedData = selectedId && selectedSite ? {
    title: t(`unesco.sites.${selectedId}`),
    desc: t(`unesco.sites.${selectedId}Desc`),
    year: t(`unesco.sites.${selectedId}Year`),
    location: t(`unesco.sites.${selectedId}Loc`),
    landmarks: t(`unesco.sites.${selectedId}Landmarks`),
    details: t(`unesco.sites.${selectedId}Details`),
    threats: t(`unesco.sites.${selectedId}Threats`),
    type: selectedSite.type
  } : null;

  return (
    <div className="page-view page-container unesco-page">
      <ScrollReveal>
        <div className="section-header">
          <h1>{t('unesco.title')}</h1>
          <p>{t('unesco.subtitle')}</p>
        </div>
      </ScrollReveal>
      
      <div className="unesco-grid">
        {sitesList.map((site, index) => (
          <ScrollReveal key={site.id} delay={index * 100}>
            <div
              className="glass-panel glass-panel-interactive unesco-card"
              onClick={() => handleOpenModal(site.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="unesco-card-header">
                <h3>{t(`unesco.sites.${site.id}`)}</h3>
                <span className={`unesco-badge ${site.type.toLowerCase()}`}>
                  {site.type === 'Cultural' ? t('unesco.typeCultural') : t('unesco.typeNatural')}
                </span>
              </div>
              <p>{t(`unesco.sites.${site.id}Desc`)}</p>

              <div className="card-meta-row">
                <span className="card-meta-item">
                  <Calendar size={14} /> {t(`unesco.sites.${site.id}Year`)}
                </span>
                <span className="card-meta-item">
                  <MapPin size={14} /> {t(`unesco.sites.${site.id}Loc`)}
                </span>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <div className="unesco-campaign-section" style={{ marginTop: '3rem' }}>
        <ScrollReveal>
          <div className="glass-panel unesco-campaign-card">
            <h2 style={{ color: 'var(--color-gold)', marginBottom: '1rem', fontSize: '1.8rem' }}>
              {t('unesco.nubiaRescue.title')}
            </h2>
            <p style={{ lineHeight: '1.7', color: 'var(--color-papyrus)', fontSize: '0.98rem', margin: 0 }}>
              {t('unesco.nubiaRescue.desc')}
            </p>
          </div>
        </ScrollReveal>
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
                <span>{t('unesco.fields.year')}</span>
              </div>
              <div className="modal-detail-value">{selectedData.year}</div>
            </div>

            <div className="modal-detail-item">
              <div className="modal-detail-label">
                <MapPin size={16} />
                <span>{t('unesco.fields.location')}</span>
              </div>
              <div className="modal-detail-value">{selectedData.location}</div>
            </div>

            <div className="modal-detail-item modal-detail-full">
              <div className="modal-detail-label">
                <Building size={16} />
                <span>{t('unesco.fields.landmarks')}</span>
              </div>
              <div className="modal-detail-value">{selectedData.landmarks}</div>
            </div>

            <div className="modal-detail-item modal-detail-full">
              <div className="modal-detail-label">
                <FileText size={16} />
                <span>{t('unesco.fields.significance')}</span>
              </div>
              <div className="modal-detail-value">{selectedData.details}</div>
            </div>

            <div
              className={`modal-detail-item modal-detail-full ${selectedId === 'abumena' ? 'threat-danger' : ''}`}
              style={selectedId === 'abumena' ? {
                border: '1px solid rgba(220, 53, 69, 0.3)',
                background: 'rgba(220, 53, 69, 0.03)'
              } : {}}
            >
              <div className="modal-detail-label" style={selectedId === 'abumena' ? { color: '#ff6b6b' } : {}}>
                <ShieldAlert size={16} />
                <span>{t('unesco.fields.threats')}</span>
              </div>
              <div className="modal-detail-value">{selectedData.threats}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
