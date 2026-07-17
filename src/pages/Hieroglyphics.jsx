/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

// SVG representation for each hieroglyphic letter A-Z with translated keys
export const HIEROGLYPHS_MAP = {
  A: { nameKey: 'vulture', svg: 'M10 20 L20 10 L30 20 L20 30 Z M20 15 L25 20 L20 25 L15 20 Z' },
  B: { nameKey: 'foot', svg: 'M12 25 h8 v5 h-8 z M16 5 v20' },
  C: { nameKey: 'basket', svg: 'M5 10 h30 v10 c0 10-10 10-10 10 H15 c0 0-10 0-10-10 Z' },
  D: { nameKey: 'hand', svg: 'M5 20 h20 v5 H5 z M15 10 v10 M20 15 h5' },
  E: { nameKey: 'feather', svg: 'M10 30 Q20 5 30 30 Z M20 15 v15' },
  F: { nameKey: 'hornedViper', svg: 'M5 15 c5-5 10 5 15 0 s10-5 15 0 M10 15 v5' },
  G: { nameKey: 'jarStand', svg: 'M10 30 L15 10 h10 L30 30 Z' },
  H: { nameKey: 'reedShelter', svg: 'M10 10 h20 v20 h-20 z M15 10 v20 M25 10 v20' },
  I: { nameKey: 'reedLeaf', svg: 'M15 30 C15 10 25 10 25 30 Z' },
  J: { nameKey: 'cobra', svg: 'M10 25 C10 10 20 10 20 25 C20 30 30 30 30 20' },
  K: { nameKey: 'basketWithHandle', svg: 'M5 15 h30 v10 c0 10-10 10-10 10 H15 c0 0-10 0-10-10 Z M5 15 c0-5 5-5 5 0' },
  L: { nameKey: 'lion', svg: 'M5 25 c0-15 15-15 20-5 h10 v5 Z' },
  M: { nameKey: 'owl', svg: 'M10 20 L15 10 L20 15 L25 10 L30 20 Z M15 20 v10 M25 20 v10' },
  N: { nameKey: 'waterWave', svg: 'M5 20 L10 15 L15 20 L20 15 L25 20 L30 15 L35 20' },
  O: { nameKey: 'lasso', svg: 'M10 20 C10 10 30 10 30 20 C30 30 10 30 10 20 Z M15 20 C15 15 25 15 25 20 C25 25 15 25 15 20 Z' },
  P: { nameKey: 'stool', svg: 'M10 20 h20 v10 h-20 z' },
  Q: { nameKey: 'slope', svg: 'M5 30 L20 10 L35 30 Z' },
  R: { nameKey: 'mouth', svg: 'M5 20 C10 10 30 10 35 20 C30 30 10 30 5 20 Z' },
  S: { nameKey: 'foldedCloth', svg: 'M10 10 h10 v20 h-10 Z M20 20 h10 v10 h-10 Z' },
  T: { nameKey: 'loafOfBread', svg: 'M10 30 C10 15 30 15 30 30 Z' },
  U: { nameKey: 'quailChick', svg: 'M10 25 Q20 10 30 20 T20 30 Z' },
  V: { nameKey: 'hornedViper', svg: 'M5 15 c5-5 10 5 15 0 s10-5 15 0 M10 15 v5' },
  W: { nameKey: 'quailChick', svg: 'M10 25 Q20 10 30 20 T20 30 Z' },
  X: { nameKey: 'basketAndCloth', svg: 'M5 15 h15 v10 H5 Z M20 10 h10 v20 H20 Z' },
  Y: { nameKey: 'doubleReedLeaf', svg: 'M10 30 C10 10 18 10 18 30 Z M22 30 C22 10 30 10 30 30 Z' },
  Z: { nameKey: 'doorBolt', svg: 'M5 20 h30 M15 10 v20 M25 10 v20' }
};

// Map of Arabic characters to their closest phonetic English hieroglyphic letters
const ARABIC_TO_ENGLISH_MAP = {
  'ا': 'A', 'أ': 'A', 'إ': 'A', 'آ': 'A', 'ى': 'Y', 'ء': 'A', 'ئ': 'Y', 'ؤ': 'W',
  'ب': 'B',
  'ت': 'T', 'ة': 'T', 'ط': 'T',
  'ث': 'S', 'س': 'S', 'ص': 'S',
  'ج': 'J',
  'ح': 'H', 'خ': 'H', 'ه': 'H', 'هـ': 'H',
  'د': 'D', 'ض': 'D',
  'ذ': 'Z', 'ز': 'Z', 'ظ': 'Z',
  'ر': 'R',
  'ش': 'S',
  'ع': 'A', 'غ': 'G',
  'ف': 'F',
  'ق': 'K', 'ك': 'K',
  'ل': 'L',
  'م': 'M',
  'ن': 'N',
  'و': 'W',
  'ي': 'Y'
};

// Map of English letters back to their phonetic Arabic letters
const ENGLISH_TO_ARABIC_MAP = {
  A: 'أ', B: 'ب', C: 'ك', D: 'د', E: 'إ', F: 'ف', G: 'ج', H: 'هـ', I: 'ي', J: 'ج',
  K: 'ك', L: 'ل', M: 'م', N: 'ن', O: 'و', P: 'ب', Q: 'ق', R: 'ر', S: 'س', T: 'ت',
  U: 'و', V: 'ف', W: 'و', X: 'كس', Y: 'ي', Z: 'ز'
};

export default function Hieroglyphics() {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');

  const decoded = name
    .split('')
    .map((char) => {
      // Direct Arabic mapping
      if (ARABIC_TO_ENGLISH_MAP[char]) {
        return {
          char: ARABIC_TO_ENGLISH_MAP[char],
          originalChar: char
        };
      }
      // Direct English mapping
      const upperChar = char.toUpperCase();
      if (HIEROGLYPHS_MAP[upperChar]) {
        return {
          char: upperChar,
          originalChar: ENGLISH_TO_ARABIC_MAP[upperChar] || upperChar
        };
      }
      return null;
    })
    .filter((item) => item !== null)
    .map((item) => ({
      char: item.char,
      originalChar: item.originalChar,
      ...HIEROGLYPHS_MAP[item.char]
    }));

  return (
    <div className="page-view container-hieroglyphics">
      <ScrollReveal>
        <div className="hieroglyphics-header">
          <h1>{t('hieroglyphics.title')}</h1>
          <p>{t('hieroglyphics.subtitle')}</p>
        </div>
      </ScrollReveal>

      <div className="hieroglyphics-layout">
        <ScrollReveal delay={100}>
          <div className="glass-panel input-panel">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z\s\u0600-\u06FF]/g, ''))}
              placeholder={t('hieroglyphics.placeholder')}
              className="name-input"
              maxLength={12}
            />
            <div className="keyboard-preview">
              <small>{t('hieroglyphics.maxLengthHint')}</small>
            </div>
          </div>
        </ScrollReveal>

        {decoded.length > 0 && (
          <ScrollReveal delay={200}>
            <div className="glass-panel cartouche-display">
              <div className="cartouche-border">
                <div className="cartouche-glyphs">
                  {decoded.map((item, idx) => (
                    <div
                      key={item.char + idx}
                      className="glyph-item"
                      title={t(`hieroglyphics.charNames.${item.nameKey}`)}
                    >
                      <svg viewBox="0 0 40 40" className="glyph-svg">
                        <path
                          d={item.svg}
                          fill="none"
                          stroke="var(--color-gold)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="glyph-letter">
                        {language === 'ar' ? item.originalChar : item.char}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}

