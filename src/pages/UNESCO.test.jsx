import { render, screen, fireEvent } from '@testing-library/react';
import { beforeAll, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import UNESCO from './UNESCO';
import { LanguageProvider } from '../context/LanguageContext';

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe(el) { this.cb([{ isIntersecting: true, target: el }]); }
    unobserve() {}
    disconnect() {}
  };
});

test('renders UNESCO page and handles modal interaction', async () => {
  render(
    <MemoryRouter initialEntries={['/en/unesco']}>
      <LanguageProvider>
        <UNESCO />
      </LanguageProvider>
    </MemoryRouter>
  );

  // Check that the title is rendered
  expect(screen.getByRole('heading', { name: /^UNESCO World Heritage Sites$/i, level: 1 })).toBeInTheDocument();

  // Check that some sites are rendered
  const cairoCard = screen.getByText(/Historic Cairo/i);
  expect(cairoCard).toBeInTheDocument();
  expect(screen.getByText(/Memphis and its Necropolis/i)).toBeInTheDocument();
  expect(screen.getByText(/Wadi Al-Hitan/i)).toBeInTheDocument();

  // Click on the Cairo card to open the Modal
  fireEvent.click(cairoCard);

  // Check that the modal header contains the title
  const modalHeaders = screen.getAllByText(/Historic Cairo/i);
  // There should be two: one in the background grid, one in the modal header
  expect(modalHeaders.length).toBeGreaterThan(1);

  // Check that details inside the modal are rendered
  expect(screen.getByText(/Al-Azhar Mosque/i)).toBeInTheDocument();
  expect(screen.getByText(/traffic congestion/i)).toBeInTheDocument();

  // Close the modal
  const closeBtn = screen.getByRole('button', { name: /close modal/i });
  expect(closeBtn).toBeInTheDocument();
  fireEvent.click(closeBtn);

  // Modal should be closed (we check that the close button is no longer in the document)
  expect(screen.queryByRole('button', { name: /close modal/i })).not.toBeInTheDocument();
});
