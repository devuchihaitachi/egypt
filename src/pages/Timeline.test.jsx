import { render, screen } from '@testing-library/react';
import { beforeAll, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Timeline from './Timeline';
import { LanguageProvider } from '../context/LanguageContext';

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe(el) { this.cb([{ isIntersecting: true, target: el }]); }
    unobserve() {}
    disconnect() {}
  };
});

test('renders the timeline page header and content', () => {
  render(
    <MemoryRouter initialEntries={['/en/timeline']}>
      <LanguageProvider>
        <Timeline />
      </LanguageProvider>
    </MemoryRouter>
  );

  // Check header title exists
  expect(screen.getByText(/Timeline of History/i)).toBeInTheDocument();

  // Check some eras are rendered
  expect(screen.getByText(/Old Kingdom/i)).toBeInTheDocument();
  expect(screen.getByText(/New Kingdom/i)).toBeInTheDocument();
  expect(screen.getByText(/Ptolemaic Period/i)).toBeInTheDocument();
});
