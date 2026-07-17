import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import App from './App';

describe('App', () => {
  beforeAll(() => {
    global.IntersectionObserver = class {
      constructor(cb) { this.cb = cb; }
      observe(el) { this.cb([{ isIntersecting: true, target: el }]); }
      unobserve() {}
      disconnect() {}
    };
  });

  it('renders Egypt: Cradle of Civilization heading', () => {
    render(<App />);
    expect(screen.getByText('Egypt: Cradle of Civilization')).toBeInTheDocument();
  });
});

