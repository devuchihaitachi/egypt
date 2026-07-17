import { render, screen, fireEvent } from '@testing-library/react';
import { beforeAll, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Hieroglyphics, { HIEROGLYPHS_MAP } from './Hieroglyphics';
import { LanguageProvider } from '../context/LanguageContext';

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe(el) { this.cb([{ isIntersecting: true, target: el }]); }
    unobserve() {}
    disconnect() {}
  };
});

test('HIEROGLYPHS_MAP maps letters to correct hieroglyphs', () => {
  expect(HIEROGLYPHS_MAP.A.nameKey).toBe('vulture');
  expect(HIEROGLYPHS_MAP.Z.nameKey).toBe('doorBolt');
  expect(HIEROGLYPHS_MAP['1']).toBeUndefined();
});

test('translates inputs to hieroglyphic cartouche', () => {
  render(
    <MemoryRouter initialEntries={['/en/hieroglyphics']}>
      <LanguageProvider>
        <Hieroglyphics />
      </LanguageProvider>
    </MemoryRouter>
  );
  const input = screen.getByPlaceholderText(/Type a name/i);
  fireEvent.change(input, { target: { value: 'ABC' } });
  
  // Check that we render the glyph items (vulture, foot, basket)
  expect(screen.getByTitle('Vulture')).toBeInTheDocument();
  expect(screen.getByTitle('Foot')).toBeInTheDocument();
  expect(screen.getByTitle('Basket')).toBeInTheDocument();
});

test('translates Arabic inputs to hieroglyphic cartouche', () => {
  render(
    <MemoryRouter initialEntries={['/en/hieroglyphics']}>
      <LanguageProvider>
        <Hieroglyphics />
      </LanguageProvider>
    </MemoryRouter>
  );
  const input = screen.getByPlaceholderText(/Type a name/i);
  fireEvent.change(input, { target: { value: 'أحمد' } });
  
  // 'أ' -> A (Vulture), 'ح' -> H (Reed Shelter), 'م' -> M (Owl), 'د' -> D (Hand)
  expect(screen.getByTitle('Vulture')).toBeInTheDocument();
  expect(screen.getByTitle('Reed Shelter')).toBeInTheDocument();
  expect(screen.getByTitle('Owl')).toBeInTheDocument();
  expect(screen.getByTitle('Hand')).toBeInTheDocument();
});

test('shows Arabic letters under glyphs when language is Arabic', () => {
  localStorage.setItem('eternal-egypt-lang', 'ar');
  render(
    <MemoryRouter initialEntries={['/ar/hieroglyphics']}>
      <LanguageProvider>
        <Hieroglyphics />
      </LanguageProvider>
    </MemoryRouter>
  );
  
  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'أحمد' } });
  
  // Under Arabic page, 'أحمد' should show the exact Arabic letters underneath
  expect(screen.getByText('أ')).toBeInTheDocument();
  expect(screen.getByText('ح')).toBeInTheDocument();
  expect(screen.getByText('م')).toBeInTheDocument();
  expect(screen.getByText('د')).toBeInTheDocument();

  // Reset language to default english
  localStorage.setItem('eternal-egypt-lang', 'en');
});


