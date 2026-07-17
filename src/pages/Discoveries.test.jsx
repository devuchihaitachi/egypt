import { render, screen, fireEvent } from '@testing-library/react';
import { beforeAll, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Discoveries from './Discoveries';
import { LanguageProvider } from '../context/LanguageContext';

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe(el) { this.cb([{ isIntersecting: true, target: el }]); }
    unobserve() {}
    disconnect() {}
  };
});

test('renders discoveries page and handles modal interaction', async () => {
  render(
    <MemoryRouter initialEntries={['/en/discoveries']}>
      <LanguageProvider>
        <Discoveries />
      </LanguageProvider>
    </MemoryRouter>
  );

  // Check that the title is rendered
  expect(screen.getByText(/Archaeological Discoveries/i)).toBeInTheDocument();

  // Check that some discoveries are rendered
  const saqqaraCard = screen.getByText(/Mummy Workshop & Tombs in Saqqara/i);
  expect(saqqaraCard).toBeInTheDocument();
  expect(screen.getByText(/Tomb of Tutankhamun/i)).toBeInTheDocument();
  expect(screen.getByText(/The Rosetta Stone/i)).toBeInTheDocument();

  // Click on the Saqqara card to open the Modal
  fireEvent.click(saqqaraCard);

  // Check that the modal header contains the title
  const modalHeaders = screen.getAllByText(/Mummy Workshop & Tombs in Saqqara/i);
  // There should be two: one in the background grid, one in the modal header
  expect(modalHeaders.length).toBeGreaterThan(1);

  // Check that details inside the modal are rendered
  expect(screen.getByText(/Egyptian-German Mission/i)).toBeInTheDocument();
  expect(screen.getByText(/gilded silver mask/i)).toBeInTheDocument();

  // Close the modal
  const closeBtn = screen.getByRole('button', { name: /close modal/i });
  expect(closeBtn).toBeInTheDocument();
  fireEvent.click(closeBtn);

  // Modal should be closed (we check that the close button is no longer in the document)
  expect(screen.queryByRole('button', { name: /close modal/i })).not.toBeInTheDocument();
});
