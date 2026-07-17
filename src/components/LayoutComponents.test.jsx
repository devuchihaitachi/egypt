import { render, screen, fireEvent, act } from '@testing-library/react';
import { expect, test, beforeAll, vi } from 'vitest';
import CountUp from './CountUp';
import Modal from './Modal';
import ScrollReveal from './ScrollReveal';
import Navbar from './Navbar';
import { useNavigation, pages } from './Router';

vi.mock('./Router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigation: vi.fn(),
  };
});

const mockToggleLanguage = vi.fn();
vi.mock('../context/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key) => {
      const parts = key.split('.');
      return parts[parts.length - 1];
    },
    toggleLanguage: mockToggleLanguage,
  }),
}));

let rafCallback = null;

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe(el) { this.cb([{ isIntersecting: true, target: el }]); }
    unobserve() {}
    disconnect() {}
  };

  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    rafCallback = cb;
    return 1;
  });
});

// CountUp Tests
test('CountUp counts up to the end value', () => {
  render(<CountUp end={100} duration={1000} suffix="%" />);
  
  // Initially, it should render 0
  expect(screen.getByText(/0%/)).toBeInTheDocument();

  // First frame (startTimestamp set at timestamp = 100)
  act(() => {
    rafCallback(100);
  });
  expect(screen.getByText(/0%/)).toBeInTheDocument();

  // Second frame (timestamp = 600, progress = (600-100)/1000 = 0.5)
  act(() => {
    rafCallback(600);
  });
  expect(screen.getByText(/50%/)).toBeInTheDocument();

  // Third frame (timestamp = 1100, progress = (1100-100)/1000 = 1.0)
  act(() => {
    rafCallback(1100);
  });
  expect(screen.getByText(/100%/)).toBeInTheDocument();
});

// Modal Tests
test('Modal renders correctly when open and closed', () => {
  const onClose = vi.fn();
  
  const { rerender } = render(
    <Modal isOpen={false} onClose={onClose} title="Test Modal">
      <div>Modal Content</div>
    </Modal>
  );

  // Should not be in the document
  expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();

  // Re-render as open
  rerender(
    <Modal isOpen={true} onClose={onClose} title="Test Modal">
      <div>Modal Content</div>
    </Modal>
  );

  expect(screen.getByText('Test Modal')).toBeInTheDocument();
  expect(screen.getByText('Modal Content')).toBeInTheDocument();

  // Click close button
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(onClose).toHaveBeenCalledTimes(1);

  // Click overlay
  fireEvent.click(screen.getByTestId('modal-overlay'));
  expect(onClose).toHaveBeenCalledTimes(2);
});

// ScrollReveal Tests
test('ScrollReveal applies visible class when intersecting', () => {
  const { container } = render(
    <ScrollReveal delay={100}>
      <div>Reveal Me</div>
    </ScrollReveal>
  );

  const element = container.firstChild;
  expect(element).toHaveClass('scroll-reveal');
  expect(element).toHaveClass('visible');
  expect(element).toHaveStyle('transition-delay: 100ms');
});

// Navbar Tests
test('Navbar renders logo and all navigation links', () => {
  const navigateToMock = vi.fn();
  useNavigation.mockReturnValue({
    currentPage: 'home',
    navigateTo: navigateToMock,
  });

  render(<Navbar />);

  // Check all page links render in desktop navbar
  pages.forEach((page) => {
    // There will be a desktop button and a mobile drawer button for each page
    const buttons = screen.getAllByRole('button', { name: new RegExp(`^${page}$`, 'i') });
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });
});

test('Navbar triggers navigateTo when buttons are clicked', () => {
  const navigateToMock = vi.fn();
  useNavigation.mockReturnValue({
    currentPage: 'home',
    navigateTo: navigateToMock,
  });

  render(<Navbar />);

  // Click a navigation button (e.g. pyramids)
  const pyramidsButtons = screen.getAllByRole('button', { name: /^pyramids$/i });
  fireEvent.click(pyramidsButtons[0]);
  expect(navigateToMock).toHaveBeenLastCalledWith('pyramids');
});

test('Navbar language toggle buttons are interactive', () => {
  const navigateToMock = vi.fn();
  useNavigation.mockReturnValue({
    currentPage: 'home',
    navigateTo: navigateToMock,
  });

  render(<Navbar />);

  // Check mobile language toggle button is present
  const mobileToggle = screen.getAllByRole('button', { name: /toggleLang/i }).find(
    el => el.classList.contains('mobile-lang-toggle')
  );
  expect(mobileToggle).toBeInTheDocument();

  // Click mobile toggle
  fireEvent.click(mobileToggle);
  expect(mockToggleLanguage).toHaveBeenCalledTimes(1);

  // Check desktop language toggle button is present
  const desktopToggle = screen.getAllByRole('button', { name: /toggleLang/i }).find(
    el => el.classList.contains('desktop-lang-toggle')
  );
  expect(desktopToggle).toBeInTheDocument();

  // Click desktop toggle
  fireEvent.click(desktopToggle);
  expect(mockToggleLanguage).toHaveBeenCalledTimes(2);
});
