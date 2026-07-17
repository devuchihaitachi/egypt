import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

const cultureSections = [
  'mummification',
  'writing',
  'astronomy',
  'religion',
  'women',
  'dailyLife',
  'art'
];

export default function Culture() {
  const { t } = useLanguage();

  return (
    <div className="page-view page-container">
      <ScrollReveal>
        <div className="section-header">
          <h1>{t('culture.title')}</h1>
          <p>{t('culture.subtitle')}</p>
        </div>
      </ScrollReveal>
      <div className="culture-grid">
        {cultureSections.map((section, index) => (
          <ScrollReveal key={section} delay={index * 100}>
            <div className="glass-panel glass-panel-interactive culture-card clickable-card">
              <h2>{t(`culture.sections.${section}`)}</h2>
              <p>{t(`culture.sections.${section}Desc`)}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
