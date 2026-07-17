# Eternal Egypt Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern, immersive, multi-page website called "Eternal Egypt" featuring a liquid glass design, page transitions, and interactive components.

**Architecture:** A lightweight React + Vite Single Page Application (SPA) utilizing a custom state-based router for seamless sliding view transitions. Animations will be driven by native CSS transitions, CSS variables, and Intersection Observer API.

**Tech Stack:** React 19, Vite, Vanilla CSS, Lucide React (for common icons), Vitest (for unit tests).

## Global Constraints
- Target Node version: v24.18.0+
- Avoid Tailwind CSS (use Vanilla CSS with CSS Variables for theme design)
- Zero placeholders (TBD, TODO, etc.) in code or plans
- Handle backdrop-filter fallback for unsupported browsers via CSS features query (`@supports`)
- All assets must be loaded locally from `/public/images/`

---

### Task 1: Scaffold React + Vite Project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Test: `vitest.config.js`

**Interfaces:**
- Produces: Base project structure and running build system.

- [ ] **Step 1: Scaffold the project structure**
  Run in workspace:
  ```powershell
  npx.cmd -y create-vite@latest ./ --template react --overwrite
  ```
  Expected: React Vite project structure created in the current directory.

- [ ] **Step 2: Install dependencies including Vitest and Lucide React**
  Run in workspace:
  ```powershell
  npm.cmd install lucide-react
  npm.cmd install -D vitest @testing-library/react @testing-library/jest-dom jsdom
  ```
  Expected: Dependencies installed successfully.

- [ ] **Step 3: Setup Vite and Vitest configuration**
  Create `vite.config.js` to support local preview:
  ```javascript
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    server: {
      port: 3000
    }
  });
  ```
  Create `vitest.config.js`:
  ```javascript
  import { defineConfig } from 'vitest/config';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.js'
    }
  });
  ```
  Create `src/test/setup.js`:
  ```javascript
  import '@testing-library/jest-dom';
  ```

- [ ] **Step 4: Clean default files and verify setup**
  Remove `src/App.css` and write a basic clean `src/App.jsx`:
  ```jsx
  import React from 'react';

  function App() {
    return (
      <div className="app">
        <h1>Eternal Egypt</h1>
      </div>
    );
  }

  export default App;
  ```
  Run test check:
  ```powershell
  npx.cmd vitest run
  ```
  Expected: Runs with no test files found (which is fine, or passes if simple test added).

---

### Task 2: Setup CSS Design System & Theme

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: CSS design system containing colors, glassmorphism templates, and animations.

- [ ] **Step 1: Write index.css with CSS Variables**
  Replace contents of `src/index.css`:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    --bg-main: #0b0b0f;
    --bg-glow: radial-gradient(circle at 50% 50%, #131927 0%, #0b0b0f 80%);
    --color-sandstone: #e2c29d;
    --color-papyrus: #f2e7d5;
    --color-gold: #d4af37;
    --color-lapis: #23497c;
    --glass-fill: rgba(15, 18, 28, 0.65);
    --glass-border: rgba(212, 175, 55, 0.18);
    --glass-border-hover: rgba(212, 175, 55, 0.35);
    --font-heading: 'Cinzel', serif;
    --font-body: 'Inter', sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: var(--bg-main);
    background-image: var(--bg-glow);
    color: var(--color-papyrus);
    font-family: var(--font-body);
    overflow-x: hidden;
    min-height: 100vh;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-heading);
    color: var(--color-sandstone);
    letter-spacing: 1px;
  }

  /* Glassmorphism class */
  .glass-panel {
    background: var(--glass-fill);
    backdrop-filter: blur(24px) saturate(130%);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 8px 32px rgba(0, 0, 0, 0.5);
    transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }

  @supports not (backdrop-filter: blur(24px)) {
    .glass-panel {
      background: rgba(15, 18, 28, 0.95);
    }
  }

  /* Specular Light Sweep animation */
  .glass-panel-interactive {
    position: relative;
    overflow: hidden;
  }

  .glass-panel-interactive::after {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(212, 175, 55, 0.15) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    transition: 0.75s;
  }

  .glass-panel-interactive:hover::after {
    left: 150%;
  }

  .glass-panel-interactive:hover {
    border-color: var(--glass-border-hover);
    transform: translateY(-4px);
    box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.12), 0 12px 40px rgba(0, 0, 0, 0.6);
  }
  ```

- [ ] **Step 2: Update App.jsx to verify styling**
  Verify the glass styling:
  ```jsx
  import React from 'react';

  function App() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="glass-panel glass-panel-interactive" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px' }}>
          <h1>Eternal Egypt</h1>
          <p style={{ marginTop: '1rem', color: 'var(--color-papyrus)' }}>
            Experience the majesty of ancient history.
          </p>
        </div>
      </div>
    );
  }

  export default App;
  ```

- [ ] **Step 3: Run npm run build**
  Run:
  ```powershell
  npm.cmd run build
  ```
  Expected: Build succeeds with zero errors.

---

### Task 3: Implement Page Transition Router

**Files:**
- Create: `src/components/Router.jsx`
- Create: `src/components/Router.test.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: Router context or custom router component that handles forward/backward slide transitions.

- [ ] **Step 1: Write the Custom Transition Router**
  Create `src/components/Router.jsx`:
  ```jsx
  import React, { createContext, useContext, useState } from 'react';

  const NavigationContext = createContext();

  export const pages = [
    'home',
    'pyramids',
    'monuments',
    'pharaohs',
    'gods',
    'hieroglyphics',
    'gallery',
    'visit',
    'about'
  ];

  export function NavigationProvider({ children }) {
    const [currentPage, setCurrentPage] = useState('home');
    const [transitionDirection, setTransitionDirection] = useState('forward');

    const navigateTo = (targetPage) => {
      if (!pages.includes(targetPage)) return;
      const currentIndex = pages.indexOf(currentPage);
      const targetIndex = pages.indexOf(targetPage);
      
      if (targetIndex > currentIndex) {
        setTransitionDirection('forward');
      } else {
        setTransitionDirection('backward');
      }
      setCurrentPage(targetPage);
    };

    return (
      <NavigationContext.Provider value={{ currentPage, navigateTo, transitionDirection }}>
        {children}
      </NavigationContext.Provider>
    );
  }

  export function useNavigation() {
    return useContext(NavigationContext);
  }
  ```

- [ ] **Step 2: Add Route transition CSS to index.css**
  Append to `src/index.css`:
  ```css
  .router-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .page-view {
    width: 100%;
    min-height: 100vh;
    padding-top: 80px; /* navbar offset */
    box-sizing: border-box;
  }

  /* Fade & Slide animation for pages */
  @keyframes slideInForward {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInBackward {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .page-enter-forward {
    animation: slideInForward 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .page-enter-backward {
    animation: slideInBackward 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  ```

- [ ] **Step 3: Write tests for the router**
  Create `src/components/Router.test.jsx`:
  ```jsx
  import React from 'react';
  import { render, screen, fireEvent } from '@testing-library/react';
  import { NavigationProvider, useNavigation } from './Router';

  function TestComponent() {
    const { currentPage, navigateTo, transitionDirection } = useNavigation();
    return (
      <div>
        <span data-testid="current-page">{currentPage}</span>
        <span data-testid="direction">{transitionDirection}</span>
        <button onClick={() => navigateTo('pyramids')}>Go to Pyramids</button>
        <button onClick={() => navigateTo('home')}>Go to Home</button>
      </div>
    );
  }

  test('handles page transitions and directions correctly', () => {
    render(
      <NavigationProvider>
        <TestComponent />
      </NavigationProvider>
    );

    expect(screen.getByTestId('current-page').textContent).toBe('home');

    // Navigate forward
    fireEvent.click(screen.getByText('Go to Pyramids'));
    expect(screen.getByTestId('current-page').textContent).toBe('pyramids');
    expect(screen.getByTestId('direction').textContent).toBe('forward');

    // Navigate backward
    fireEvent.click(screen.getByText('Go to Home'));
    expect(screen.getByTestId('current-page').textContent).toBe('home');
    expect(screen.getByTestId('direction').textContent).toBe('backward');
  });
  ```

- [ ] **Step 4: Run the test suite**
  Run:
  ```powershell
  npx.cmd vitest run src/components/Router.test.jsx
  ```
  Expected: Test passes successfully.

---

### Task 4: Build Layout Components (Navbar, ScrollReveal, CountUp, Modal)

**Files:**
- Create: `src/components/Navbar.jsx`
- Create: `src/components/ScrollReveal.jsx`
- Create: `src/components/CountUp.jsx`
- Create: `src/components/Modal.jsx`

**Interfaces:**
- `ScrollReveal`: Wrapper React component that accepts `children`.
- `CountUp`: Takes `end` (number), `suffix` (string), and `duration` (ms).
- `Modal`: Takes `isOpen`, `onClose`, `title`, and `children`.

- [ ] **Step 1: Create Navbar.jsx with persistent glass design and mobile menu**
  Create `src/components/Navbar.jsx` using custom SVGs or Lucide icons:
  ```jsx
  import React, { useState, useEffect } from 'react';
  import { useNavigation, pages } from './Router';
  import { Menu, X } from 'lucide-react';

  export default function Navbar() {
    const { currentPage, navigateTo } = useNavigation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNav = (page) => {
      navigateTo(page);
      setMobileOpen(false);
    };

    return (
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-logo" onClick={() => handleNav('home')}>
          <span>ETERNAL EGYPT</span>
        </div>
        <nav className="navbar-links">
          {pages.map((page) => (
            <button
              key={page}
              className={`nav-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handleNav(page)}
            >
              {page.toUpperCase()}
            </button>
          ))}
        </nav>
        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
          <div className="mobile-drawer-content glass-panel">
            {pages.map((page) => (
              <button
                key={page}
                className={`mobile-nav-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => handleNav(page)}
              >
                {page.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>
    );
  }
  ```
  Add Navbar CSS to `src/index.css`:
  ```css
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    z-index: 1000;
    background: rgba(11, 11, 15, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
  }
  .navbar-scrolled {
    background: rgba(11, 11, 15, 0.85);
    backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--glass-border);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
  .navbar-logo {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--color-gold);
    cursor: pointer;
  }
  .navbar-links {
    display: flex;
    gap: 1.5rem;
  }
  .nav-btn {
    background: none;
    border: none;
    color: var(--color-papyrus);
    font-family: var(--font-body);
    font-size: 0.85rem;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.3s;
  }
  .nav-btn:hover, .nav-btn.active {
    color: var(--color-gold);
  }
  .mobile-toggle {
    display: none;
    background: none;
    border: none;
    color: var(--color-papyrus);
    cursor: pointer;
  }
  .mobile-drawer {
    position: fixed;
    top: 70px;
    right: -100%;
    width: 250px;
    height: calc(100vh - 70px);
    z-index: 999;
    transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .mobile-drawer.open {
    right: 0;
  }
  .mobile-drawer-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem 1.5rem;
    gap: 1.5rem;
    border-radius: 0;
    border-top: none;
    border-bottom: none;
    border-right: none;
  }
  .mobile-nav-btn {
    background: none;
    border: none;
    color: var(--color-papyrus);
    font-family: var(--font-body);
    font-size: 1rem;
    text-align: left;
    cursor: pointer;
    padding: 0.5rem 0;
    transition: color 0.3s;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  .mobile-nav-btn:hover, .mobile-nav-btn.active {
    color: var(--color-gold);
  }
  @media (max-width: 900px) {
    .navbar-links { display: none; }
    .mobile-toggle { display: block; }
  }
  ```

- [ ] **Step 2: Create ScrollReveal.jsx using IntersectionObserver**
  Create `src/components/ScrollReveal.jsx`:
  ```jsx
  import React, { useEffect, useRef, useState } from 'react';

  export default function ScrollReveal({ children, delay = 0 }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) observer.disconnect();
      };
    }, []);

    return (
      <div
        ref={ref}
        className={`scroll-reveal ${isVisible ? 'visible' : ''}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  }
  ```
  Add ScrollReveal CSS to `src/index.css`:
  ```css
  .scroll-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .scroll-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  ```

- [ ] **Step 3: Create CountUp.jsx**
  Create `src/components/CountUp.jsx`:
  ```jsx
  import React, { useEffect, useState, useRef } from 'react';

  export default function CountUp({ end, suffix = '', duration = 1500 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let startTimestamp = null;
            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              setCount(Math.floor(progress * end));
              if (progress < 1) {
                window.requestAnimationFrame(step);
              }
            };
            window.requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) observer.disconnect();
      };
    }, [end, duration]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
  }
  ```

- [ ] **Step 4: Create Modal.jsx with liquid glass styling**
  Create `src/components/Modal.jsx`:
  ```jsx
  import React from 'react';
  import { X } from 'lucide-react';

  export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    );
  }
  ```
  Add Modal CSS to `src/index.css`:
  ```css
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(12px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }
  .modal-container {
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--glass-border);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  .modal-close-btn {
    background: none;
    border: none;
    color: var(--color-papyrus);
    cursor: pointer;
  }
  .modal-close-btn:hover {
    color: var(--color-gold);
  }
  .modal-body {
    overflow-y: auto;
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--color-papyrus);
  }
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  ```

---

### Task 5: Generate Asset Images using AI Generator

**Files:**
- Create: `/public/images/giza-hero.jpg`
- Create: `/public/images/pyramids-info.jpg`
- Create: `/public/images/temples.jpg`
- Create: `/public/images/pharaohs.jpg`
- Create: `/public/images/gods.jpg`
- Create: `/public/images/hieroglyphs-bg.jpg`
- Create: `/public/images/map.jpg`

**Interfaces:**
- Produces: Beautiful, high-resolution visual assets.

- [ ] **Step 1: Generate Giza Hero image**
  Generate image with prompt: "Great Pyramids of Giza at sunset, warm cinematic golden light, photo realistic, deep blue and orange sky, high resolution, ancient landscape photography" and save to `C:\Users\PC'\Documents\antigravity\friendly-noether\public\images\giza-hero.jpg`.

- [ ] **Step 2: Generate Pyramids Info image**
  Generate image with prompt: "Saqqara step pyramid, bright desert sun, sandy dunes, historical illustration style, warm beige and gold tones" and save to `C:\Users\PC'\Documents\antigravity\friendly-noether\public\images\pyramids-info.jpg`.

- [ ] **Step 3: Generate Temples image**
  Generate image with prompt: "Ancient Egyptian temple column hall at Karnak, sun rays breaking through giant stone pillars with carvings, majestic scale, dramatic shadows" and save to `C:\Users\PC'\Documents\antigravity\friendly-noether\public\images\temples.jpg`.

- [ ] **Step 4: Generate Pharaohs image**
  Generate image with prompt: "Golden burial mask of King Tutankhamun, polished gold, lapis lazuli inlays, professional museum display lighting, dark background" and save to `C:\Users\PC'\Documents\antigravity\friendly-noether\public\images\pharaohs.jpg`.

- [ ] **Step 5: Generate Gods image**
  Generate image with prompt: "Anubis ancient Egyptian god statue, black polished obsidian, gold ornaments, mystical dark background, blue highlights" and save to `C:\Users\PC'\Documents\antigravity\friendly-noether\public\images\gods.jpg`.

- [ ] **Step 6: Generate Hieroglyphs Background**
  Generate image with prompt: "Textured papyrus paper scroll surface with ancient Egyptian hieroglyphic text patterns, highly detailed macro photography, warm brown tones" and save to `C:\Users\PC'\Documents\antigravity\friendly-noether\public\images\hieroglyphs-bg.jpg`.

- [ ] **Step 7: Generate Map image**
  Generate image with prompt: "Elegant historical map of ancient Egypt, showing the Nile river, Giza, Luxor, Abu Simbel, gold and midnight blue styling, stylized card illustration" and save to `C:\Users\PC'\Documents\antigravity\friendly-noether\public\images\map.jpg`.

---

### Task 6: Implement Hieroglyphics Name Decoder Widget

**Files:**
- Create: `src/pages/Hieroglyphics.jsx`
- Create: `src/pages/Hieroglyphics.test.jsx`

**Interfaces:**
- Produces: Mapped dictionary translate system that translates English alphanumeric letters A-Z to custom SVG hieroglyphic symbols.

- [ ] **Step 1: Write Hieroglyphics Page and decoder logic**
  Create `src/pages/Hieroglyphics.jsx` with full mapping:
  ```jsx
  import React, { useState } from 'react';
  import ScrollReveal from '../components/ScrollReveal';

  // SVG representation for each hieroglyphic letter A-Z
  export const HIEROGLYPHS_MAP = {
    A: { name: 'Vulture', svg: 'M10 20 L20 10 L30 20 L20 30 Z M20 15 L25 20 L20 25 L15 20 Z' },
    B: { name: 'Foot', svg: 'M12 25 h8 v5 h-8 z M16 5 v20' },
    C: { name: 'Basket', svg: 'M5 10 h30 v10 c0 10-10 10-10 10 H15 c0 0-10 0-10-10 Z' },
    D: { name: 'Hand', svg: 'M5 20 h20 v5 H5 z M15 10 v10 M20 15 h5' },
    E: { name: 'Feather', svg: 'M10 30 Q20 5 30 30 Z M20 15 v15' },
    F: { name: 'Horned Viper', svg: 'M5 15 c5-5 10 5 15 0 s10-5 15 0 M10 15 v5' },
    G: { name: 'Jar Stand', svg: 'M10 30 L15 10 h10 L30 30 Z' },
    H: { name: 'Reed Shelter', svg: 'M10 10 h20 v20 h-20 z M15 10 v20 M25 10 v20' },
    I: { name: 'Reed Leaf', svg: 'M15 30 C15 10 25 10 25 30 Z' },
    J: { name: 'Cobra', svg: 'M10 25 C10 10 20 10 20 25 C20 30 30 30 30 20' },
    K: { name: 'Basket with handle', svg: 'M5 15 h30 v10 c0 10-10 10-10 10 H15 c0 0-10 0-10-10 Z M5 15 c0-5 5-5 5 0' },
    L: { name: 'Lion', svg: 'M5 25 c0-15 15-15 20-5 h10 v5 Z' },
    M: { name: 'Owl', svg: 'M10 20 L15 10 L20 15 L25 10 L30 20 Z M15 20 v10 M25 20 v10' },
    N: { name: 'Water Wave', svg: 'M5 20 L10 15 L15 20 L20 15 L25 20 L30 15 L35 20' },
    O: { name: 'Lasso', svg: 'M10 20 C10 10 30 10 30 20 C30 30 10 30 10 20 Z M15 20 C15 15 25 15 25 20 C25 25 15 25 15 20 Z' },
    P: { name: 'Stool', svg: 'M10 20 h20 v10 h-20 z' },
    Q: { name: 'Slope', svg: 'M5 30 L20 10 L35 30 Z' },
    R: { name: 'Mouth', svg: 'M5 20 C10 10 30 10 35 20 C30 30 10 30 5 20 Z' },
    S: { name: 'Folded Cloth', svg: 'M10 10 h10 v20 h-10 Z M20 20 h10 v10 h-10 Z' },
    T: { name: 'Loaf of Bread', svg: 'M10 30 C10 15 30 15 30 30 Z' },
    U: { name: 'Quail Chick', svg: 'M10 25 Q20 10 30 20 T20 30 Z' },
    V: { name: 'Horned Viper', svg: 'M5 15 c5-5 10 5 15 0 s10-5 15 0 M10 15 v5' },
    W: { name: 'Quail Chick', svg: 'M10 25 Q20 10 30 20 T20 30 Z' },
    X: { name: 'Basket + Folded Cloth', svg: 'M5 15 h15 v10 H5 Z M20 10 h10 v20 H20 Z' },
    Y: { name: 'Double Reed Leaf', svg: 'M10 30 C10 10 18 10 18 30 Z M22 30 C22 10 30 10 30 30 Z' },
    Z: { name: 'Door Bolt', svg: 'M5 20 h30 M15 10 v20 M25 10 v20' }
  };

  export default function Hieroglyphics() {
    const [name, setName] = useState('');

    const decoded = name
      .toUpperCase()
      .split('')
      .filter((char) => HIEROGLYPHS_MAP[char]);

    return (
      <div className="page-view container-hieroglyphics">
        <ScrollReveal>
          <div className="hieroglyphics-header">
            <h1>Hieroglyphics Translator</h1>
            <p>Enter your English name to see how it is spelled in ancient hieroglyphs.</p>
          </div>
        </ScrollReveal>

        <div className="hieroglyphics-layout">
          <ScrollReveal delay={100}>
            <div className="glass-panel input-panel">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                placeholder="Type your name (e.g. KHUFU)"
                className="name-input"
                maxLength={12}
              />
              <div className="keyboard-preview">
                <small>Use alphabetic letters A-Z only.</small>
              </div>
            </div>
          </ScrollReveal>

          {decoded.length > 0 && (
            <ScrollReveal delay={200}>
              <div className="glass-panel cartouche-display">
                <div className="cartouche-border">
                  <div className="cartouche-glyphs">
                    {decoded.map((item, idx) => (
                      <div key={idx} className="glyph-item" title={item.name}>
                        <svg viewBox="0 0 40 40" className="glyph-svg">
                          <path
                            d={item.svg}
                            fill="none"
                            stroke="var(--color-gold)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="glyph-letter">{name[idx]?.toUpperCase()}</span>
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
  ```
  Add Hieroglyphics CSS to `src/index.css`:
  ```css
  .container-hieroglyphics {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  .hieroglyphics-header h1 {
    font-size: 2.5rem;
    color: var(--color-gold);
    margin-bottom: 0.5rem;
  }
  .hieroglyphics-layout {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 3rem;
    align-items: center;
  }
  .input-panel {
    padding: 2rem;
    width: 100%;
    max-width: 500px;
  }
  .name-input {
    width: 100%;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    color: var(--color-papyrus);
    font-size: 1.25rem;
    text-align: center;
    outline: none;
    letter-spacing: 2px;
  }
  .name-input:focus {
    border-color: var(--color-gold);
  }
  .cartouche-display {
    padding: 3rem;
    display: inline-block;
    background: radial-gradient(circle, rgba(20, 20, 30, 0.9) 0%, rgba(10, 10, 15, 0.95) 100%);
    border: 2px solid var(--color-gold);
    box-shadow: 0 0 25px rgba(212, 175, 55, 0.25);
  }
  .cartouche-border {
    border: 2px solid var(--color-gold);
    border-radius: 40px;
    padding: 1.5rem 2.5rem;
    background: rgba(0, 0, 0, 0.3);
    min-height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cartouche-glyphs {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .glyph-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
  }
  .glyph-svg {
    width: 50px;
    height: 50px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
  }
  .glyph-letter {
    font-size: 0.8rem;
    color: var(--color-sandstone);
    margin-top: 0.5rem;
  }
  ```

- [ ] **Step 2: Write tests for Hieroglyphics mapper**
  Create `src/pages/Hieroglyphics.test.jsx`:
  ```jsx
  import { HIEROGLYPHS_MAP } from './Hieroglyphics';

  test('HIEROGLYPHS_MAP maps letters to correct hieroglyphs', () => {
    expect(HIEROGLYPHS_MAP.A.name).toBe('Vulture');
    expect(HIEROGLYPHS_MAP.Z.name).toBe('Door Bolt');
    expect(HIEROGLYPHS_MAP['1']).toBeUndefined();
  });
  ```

- [ ] **Step 3: Run the test suite**
  Run:
  ```powershell
  npx.cmd vitest run src/pages/Hieroglyphics.test.jsx
  ```
  Expected: Test passes successfully.

---

### Task 7: Create All Pages (Home, Pyramids, Temples, Pharaohs, Gods, Gallery, Visit, About)

**Files:**
- Create: `src/pages/Home.jsx`
- Create: `src/pages/Pyramids.jsx`
- Create: `src/pages/Monuments.jsx`
- Create: `src/pages/Pharaohs.jsx`
- Create: `src/pages/Gods.jsx`
- Create: `src/pages/Gallery.jsx`
- Create: `src/pages/PlanVisit.jsx`
- Create: `src/pages/About.jsx`

**Interfaces:**
- Each file exports a default React functional component representing the section.

- [ ] **Step 1: Create Home.jsx**
  Create `src/pages/Home.jsx` with full bleed hero image and CTA:
  ```jsx
  import React from 'react';
  import { useNavigation } from '../components/Router';
  import ScrollReveal from '../components/ScrollReveal';

  export default function Home() {
    const { navigateTo } = useNavigation();

    return (
      <div className="home-hero" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.85)), url("/images/giza-hero.jpg")' }}>
        <div className="home-content">
          <ScrollReveal>
            <h1 className="home-title">Eternal Egypt</h1>
            <p className="home-subtitle">Journey through 5,000 years of majestic history, liquid-glass visual architecture, and timeless treasures.</p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <button className="cta-button" onClick={() => navigateTo('pyramids')}>
              EXPLORE MONUMENTS
            </button>
          </ScrollReveal>
          <div className="scroll-cue">
            <span className="arrow-down">&#8595;</span>
          </div>
        </div>
      </div>
    );
  }
  ```
  Add Home CSS to `src/index.css`:
  ```css
  .home-hero {
    height: 100vh;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    margin-top: -70px;
  }
  .home-content {
    max-width: 800px;
    padding: 2rem;
  }
  .home-title {
    font-size: 4rem;
    color: var(--color-gold);
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
    margin-bottom: 1.5rem;
  }
  .home-subtitle {
    font-size: 1.25rem;
    color: var(--color-papyrus);
    margin-bottom: 2.5rem;
    line-height: 1.6;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
  }
  .cta-button {
    background: rgba(212, 175, 55, 0.2);
    border: 1px solid var(--color-gold);
    color: var(--color-gold);
    padding: 1rem 2.5rem;
    font-family: var(--font-heading);
    font-size: 1rem;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
    transition: all 0.3s;
  }
  .cta-button:hover {
    background: var(--color-gold);
    color: #0b0b0f;
    box-shadow: 0 4px 25px rgba(212, 175, 55, 0.5);
  }
  .scroll-cue {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce 2s infinite;
  }
  .arrow-down {
    font-size: 2rem;
    color: var(--color-gold);
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
    40% { transform: translateY(-10px) translateX(-50%); }
    60% { transform: translateY(-5px) translateX(-50%); }
  }
  @media (max-width: 768px) {
    .home-title { font-size: 2.5rem; }
    .home-subtitle { font-size: 1rem; }
  }
  ```

- [ ] **Step 2: Create Pyramids.jsx with dynamic counters**
  Create `src/pages/Pyramids.jsx`:
  ```jsx
  import React from 'react';
  import ScrollReveal from '../components/ScrollReveal';
  import CountUp from '../components/CountUp';

  const pyramidsData = [
    { name: 'Great Pyramid of Giza', height: 146, age: 4580, builder: 'Khufu', desc: 'The oldest and largest of the Giza pyramids. It remained the tallest man-made structure for over 3,800 years.' },
    { name: 'Step Pyramid of Saqqara', height: 62, age: 4700, builder: 'Djoser', desc: 'Considered the world’s oldest monumental cut stone structure, designed by the legendary architect Imhotep.' },
    { name: 'Bent Pyramid of Dahshur', height: 104, age: 4620, builder: 'Sneferu', desc: 'Famous for its unique double-angle slope, reflecting a crucial transition phase in pyramid engineering.' },
    { name: 'Red Pyramid of Dahshur', height: 105, age: 4590, builder: 'Sneferu', desc: 'The world’s first successful smooth-sided true pyramid, named for the rusty reddish hue of its limestone.' }
  ];

  export default function Pyramids() {
    return (
      <div className="page-view page-container">
        <ScrollReveal>
          <div className="section-header">
            <h1>The Pyramids</h1>
            <p>Monuments of eternity, engineered by master builders to stand forever.</p>
          </div>
        </ScrollReveal>
        <div className="pyramids-grid">
          {pyramidsData.map((pyr, index) => (
            <ScrollReveal key={pyr.name} delay={index * 150}>
              <div className="glass-panel glass-panel-interactive pyramid-card">
                <h2>{pyr.name}</h2>
                <div className="stats-box">
                  <div className="stat-item">
                    <span className="stat-num"><CountUp end={pyr.height} suffix="m" /></span>
                    <span className="stat-label">Height</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-num"><CountUp end={pyr.age} suffix=" yrs" /></span>
                    <span className="stat-label">Age</span>
                  </div>
                </div>
                <p className="builder-text"><strong>Builder:</strong> {pyr.builder}</p>
                <p className="desc-text">{pyr.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    );
  }
  ```
  Add Pyramids CSS to `src/index.css`:
  ```css
  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 2rem 5rem 2rem;
  }
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }
  .section-header h1 {
    font-size: 3rem;
    color: var(--color-gold);
    margin-bottom: 1rem;
  }
  .pyramids-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }
  .pyramid-card {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .pyramid-card h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--color-sandstone);
  }
  .stats-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    padding-bottom: 1rem;
  }
  .stat-item {
    display: flex;
    flex-direction: column;
  }
  .stat-num {
    font-size: 1.8rem;
    font-family: var(--font-heading);
    color: var(--color-gold);
  }
  .stat-label {
    font-size: 0.8rem;
    color: var(--color-papyrus);
    opacity: 0.7;
    margin-top: 0.2rem;
  }
  .builder-text {
    margin-bottom: 0.5rem;
    color: var(--color-gold);
  }
  .desc-text {
    line-height: 1.5;
    font-size: 0.95rem;
  }
  ```

- [ ] **Step 3: Create Monuments.jsx**
  Create `src/pages/Monuments.jsx`:
  ```jsx
  import React from 'react';
  import ScrollReveal from '../components/ScrollReveal';

  const monumentsData = [
    { name: 'Karnak Temple', location: 'Luxor', age: '3,500 years old', desc: 'The largest temple complex ever built, spanning over 100 hectares, dedicated to Amun-Ra and other deities.' },
    { name: 'Luxor Temple', location: 'Luxor', age: '3,400 years old', desc: 'A vast sanctuary built on the banks of the Nile, famous for its grand avenue of sphinxes.' },
    { name: 'Abu Simbel', location: 'Aswan', age: '3,200 years old', desc: 'Two massive rock temples carved out of the mountainside during the reign of Ramses II, depicting four colossal statues.' },
    { name: 'Great Sphinx of Giza', location: 'Giza', age: '4,500 years old', desc: 'A monumental statue of a mythical creature with a lion’s body and a pharaoh’s head, carved from a single piece of limestone.' }
  ];

  export default function Monuments() {
    return (
      <div className="page-view page-container">
        <ScrollReveal>
          <div className="section-header">
            <h1>Temples & Monuments</h1>
            <p>Vast halls of stone, carved with hieroglyphs honoring kings and deities.</p>
          </div>
        </ScrollReveal>
        <div className="monuments-layout">
          {monumentsData.map((mon, index) => (
            <ScrollReveal key={mon.name} delay={index * 150}>
              <div className="glass-panel glass-panel-interactive monument-strip">
                <div className="strip-content">
                  <h2>{mon.name}</h2>
                  <p className="strip-meta"><strong>Location:</strong> {mon.location} &bull; <strong>Age:</strong> {mon.age}</p>
                  <p className="strip-desc">{mon.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    );
  }
  ```
  Add Monuments CSS to `src/index.css`:
  ```css
  .monuments-layout {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .monument-strip {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
  }
  .strip-content h2 {
    font-size: 1.8rem;
    color: var(--color-sandstone);
    margin-bottom: 0.5rem;
  }
  .strip-meta {
    font-size: 0.9rem;
    color: var(--color-gold);
    margin-bottom: 1rem;
  }
  .strip-desc {
    font-size: 1rem;
    line-height: 1.6;
  }
  ```

- [ ] **Step 4: Create Pharaohs.jsx**
  Create `src/pages/Pharaohs.jsx` with a vertical timeline:
  ```jsx
  import React from 'react';
  import ScrollReveal from '../components/ScrollReveal';

  const kingdoms = [
    {
      era: 'Old Kingdom (c. 2686 – 2181 BC)',
      pharaohs: [
        { name: 'Khufu', reign: 'c. 2589 – 2566 BC', achievement: 'Commissioned the Great Pyramid of Giza.' }
      ]
    },
    {
      era: 'Middle Kingdom (c. 2055 – 1650 BC)',
      pharaohs: [
        { name: 'Mentuhotep II', reign: 'c. 2061 – 2010 BC', achievement: 'Reunited Egypt, launching the Middle Kingdom.' }
      ]
    },
    {
      era: 'New Kingdom (c. 1550 – 1077 BC)',
      pharaohs: [
        { name: 'Hatshepsut', reign: 'c. 1478 – 1458 BC', achievement: 'One of Egypt’s most successful female pharaohs, expanding trade routes and building Djeser-Djeseru.' },
        { name: 'Ramses II', reign: 'c. 1279 – 1213 BC', achievement: 'Known as Ramses the Great, built Abu Simbel and reigned for an incredible 66 years.' },
        { name: 'Tutankhamun', reign: 'c. 1332 – 1323 BC', achievement: 'The boy king whose intact tomb discovered in 1922 provided the world with unmatched archaeological treasure.' }
      ]
    }
  ];

  export default function Pharaohs() {
    return (
      <div className="page-view page-container">
        <ScrollReveal>
          <div className="section-header">
            <h1>Pharaohs & Dynasties</h1>
            <p>The god-kings who ruled over the Black Land along the Nile.</p>
          </div>
        </ScrollReveal>
        <div className="timeline-container">
          {kingdoms.map((k, kIndex) => (
            <div key={k.era} className="timeline-era">
              <ScrollReveal delay={kIndex * 200}>
                <h2 className="era-title">{k.era}</h2>
              </ScrollReveal>
              <div className="era-cards">
                {k.pharaohs.map((ph, pIndex) => (
                  <ScrollReveal key={ph.name} delay={pIndex * 150}>
                    <div className="glass-panel pharaoh-card">
                      <h3>{ph.name}</h3>
                      <p className="reign-text">Reign: {ph.reign}</p>
                      <p className="achievement-text"><strong>Key Achievement:</strong> {ph.achievement}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  ```
  Add Pharaohs CSS to `src/index.css`:
  ```css
  .timeline-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  .timeline-era {
    border-left: 2px solid var(--color-gold);
    padding-left: 2rem;
    margin-left: 1rem;
  }
  .era-title {
    font-size: 1.8rem;
    color: var(--color-gold);
    margin-bottom: 2rem;
  }
  .era-cards {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .pharaoh-card {
    padding: 1.5rem 2rem;
  }
  .pharaoh-card h3 {
    font-size: 1.4rem;
    color: var(--color-sandstone);
    margin-bottom: 0.5rem;
  }
  .reign-text {
    font-size: 0.9rem;
    color: var(--color-papyrus);
    opacity: 0.8;
    margin-bottom: 0.5rem;
  }
  .achievement-text {
    line-height: 1.5;
  }
  ```

- [ ] **Step 5: Create Gods.jsx**
  Create `src/pages/Gods.jsx` with modal popups:
  ```jsx
  import React, { useState } from 'react';
  import ScrollReveal from '../components/ScrollReveal';
  import Modal from '../components/Modal';

  const godsData = [
    { name: 'Ra', title: 'Sun God', myth: 'The king of deities and father of creation. He sailed across the sky in his solar barque by day, and fought the chaos serpent Apophis in the underworld by night.' },
    { name: 'Osiris', title: 'Lord of the Underworld', myth: 'The god of resurrection and agriculture. He was murdered by his brother Seth, but restored to life by his wife Isis to rule over the Land of the Dead.' },
    { name: 'Isis', title: 'Goddess of Magic', myth: 'The divine mother and master of magic. She resurrected Osiris and protected their young son Horus until he could claim the throne of Egypt.' },
    { name: 'Anubis', title: 'Guardian of Mummification', myth: 'The jackal-headed god who guided souls to the Hall of Ma’at, weighing their hearts against the feather of truth.' },
    { name: 'Horus', title: 'The Sky God', myth: 'The falcon-headed god of kingship. He battled Seth to avenge his father Osiris, losing his eye which became a symbol of protection.' },
    { name: 'Thoth', title: 'God of Wisdom', myth: 'The ibis-headed patron of scribes, writing, science, and magic, responsible for keeping the celestial records.' }
  ];

  export default function Gods() {
    const [selectedGod, setSelectedGod] = useState(null);

    return (
      <div className="page-view page-container">
        <ScrollReveal>
          <div className="section-header">
            <h1>Gods & Mythology</h1>
            <p>Meet the pantheon of divine beings who held balance over the cosmos.</p>
          </div>
        </ScrollReveal>
        <div className="gods-grid">
          {godsData.map((god, index) => (
            <ScrollReveal key={god.name} delay={index * 120}>
              <div
                className="glass-panel glass-panel-interactive god-card"
                onClick={() => setSelectedGod(god)}
              >
                <h2>{god.name}</h2>
                <h4>{god.title}</h4>
                <button className="read-myth-btn">READ MYTH</button>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <Modal
          isOpen={selectedGod !== null}
          onClose={() => setSelectedGod(null)}
          title={selectedGod?.name}
        >
          <p style={{ color: 'var(--color-gold)', fontStyle: 'italic', marginBottom: '1rem' }}>
            {selectedGod?.title}
          </p>
          <p>{selectedGod?.myth}</p>
        </Modal>
      </div>
    );
  }
  ```
  Add Gods CSS to `src/index.css`:
  ```css
  .gods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  .god-card {
    padding: 2.5rem;
    text-align: center;
    cursor: pointer;
  }
  .god-card h2 {
    font-size: 2rem;
    color: var(--color-gold);
    margin-bottom: 0.5rem;
  }
  .god-card h4 {
    font-size: 1rem;
    color: var(--color-papyrus);
    opacity: 0.8;
    margin-bottom: 1.5rem;
  }
  .read-myth-btn {
    background: none;
    border: 1px solid var(--glass-border);
    color: var(--color-gold);
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    font-family: var(--font-heading);
    border-radius: 4px;
    transition: all 0.3s;
  }
  .read-myth-btn:hover {
    background: var(--color-gold);
    color: #0b0b0f;
  }
  ```

- [ ] **Step 6: Create Gallery.jsx**
  Create `src/pages/Gallery.jsx` with lightbox:
  ```jsx
  import React, { useState } from 'react';
  import ScrollReveal from '../components/ScrollReveal';
  import { X } from 'lucide-react';

  const galleryImages = [
    { title: 'The Great Sphinx', path: '/images/giza-hero.jpg', caption: 'The mysterious Sphinx guarding the pyramids at Giza.' },
    { title: 'Karnak Pillar Hall', path: '/images/temples.jpg', caption: 'Gigantic columns etched with ancient stories.' },
    { title: 'Golden Mask', path: '/images/pharaohs.jpg', caption: 'The stunning burial mask of Tutankhamun.' },
    { title: 'Step Pyramid', path: '/images/pyramids-info.jpg', caption: 'Djoser’s monumental step tomb at Saqqara.' },
    { title: 'Guardian God', path: '/images/gods.jpg', caption: 'Mystic Obsidian statue of Anubis.' },
    { title: 'Papyrus Text', path: '/images/hieroglyphs-bg.jpg', caption: 'Detailed close up of papyrus paper with hieroglyphs.' }
  ];

  export default function Gallery() {
    const [lightboxIndex, setLightboxIndex] = useState(null);

    return (
      <div className="page-view page-container">
        <ScrollReveal>
          <div className="section-header">
            <h1>Gallery</h1>
            <p>Artifacts and monuments displaying the pinnacle of ancient Egyptian craftsmanship.</p>
          </div>
        </ScrollReveal>
        <div className="gallery-grid">
          {galleryImages.map((img, index) => (
            <ScrollReveal key={img.title} delay={index * 100}>
              <div
                className="glass-panel glass-panel-interactive gallery-item"
                onClick={() => setLightboxIndex(index)}
              >
                <img src={img.path} alt={img.title} className="gallery-img" />
                <div className="gallery-overlay">
                  <h3>{img.title}</h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {lightboxIndex !== null && (
          <div className="lightbox-overlay" onClick={() => setLightboxIndex(null)}>
            <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>
              <X size={32} />
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={galleryImages[lightboxIndex].path}
                alt={galleryImages[lightboxIndex].title}
                className="lightbox-img"
              />
              <div className="lightbox-caption glass-panel">
                <h3>{galleryImages[lightboxIndex].title}</h3>
                <p>{galleryImages[lightboxIndex].caption}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  ```
  Add Gallery CSS to `src/index.css`:
  ```css
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  .gallery-item {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 250px;
    padding: 0;
  }
  .gallery-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  .gallery-item:hover .gallery-img {
    transform: scale(1.08);
  }
  .gallery-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1.5rem;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    display: flex;
    align-items: flex-end;
  }
  .gallery-overlay h3 {
    font-size: 1.25rem;
    color: var(--color-gold);
  }
  .lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.9);
    z-index: 3000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .lightbox-close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
  }
  .lightbox-content {
    max-width: 90%;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .lightbox-img {
    max-width: 100%;
    max-height: 70vh;
    border-radius: 8px;
    box-shadow: 0 0 30px rgba(212,175,55,0.2);
  }
  .lightbox-caption {
    padding: 1.5rem 2rem;
    text-align: center;
    max-width: 500px;
  }
  .lightbox-caption h3 {
    color: var(--color-gold);
    margin-bottom: 0.5rem;
  }
  ```

- [ ] **Step 7: Create PlanVisit.jsx**
  Create `src/pages/PlanVisit.jsx`:
  ```jsx
  import React from 'react';
  import ScrollReveal from '../components/ScrollReveal';

  export default function PlanVisit() {
    return (
      <div className="page-view page-container">
        <ScrollReveal>
          <div className="section-header">
            <h1>Plan Your Visit</h1>
            <p>Practical travel advice to embark on your own journey to the Land of the Pharaohs.</p>
          </div>
        </ScrollReveal>
        <div className="visit-grid">
          <ScrollReveal delay={100}>
            <div className="glass-panel visit-info-card">
              <h2>Practical Tips</h2>
              <ul>
                <li><strong>Best Time to Go:</strong> October to April, when temperatures are cooler and pleasant for outdoor exploration.</li>
                <li><strong>Entry Tickets:</strong> Can be bought at sites or online. Ensure you have physical cash (Egyptian Pounds) for smaller sites.</li>
                <li><strong>Dress Code:</strong> Modest clothing is recommended when visiting religious and archaeological sites.</li>
                <li><strong>Local Transport:</strong> Uber is widely available in Cairo. For Luxor and Aswan, pre-booked tours are recommended.</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass-panel visit-map-card">
              <h2>Interactive Map</h2>
              <div className="map-placeholder" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/images/map.jpg")' }}>
                <span className="map-pin cairo">Cairo &bull; Giza</span>
                <span className="map-pin luxor">Luxor</span>
                <span className="map-pin aswan">Aswan</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    );
  }
  ```
  Add PlanVisit CSS to `src/index.css`:
  ```css
  .visit-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }
  .visit-info-card {
    padding: 2.5rem;
  }
  .visit-info-card h2 {
    color: var(--color-gold);
    margin-bottom: 1.5rem;
  }
  .visit-info-card ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .visit-info-card li {
    font-size: 1rem;
    line-height: 1.5;
  }
  .visit-info-card li strong {
    color: var(--color-sandstone);
  }
  .visit-map-card {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
  }
  .visit-map-card h2 {
    color: var(--color-gold);
    margin-bottom: 1.5rem;
  }
  .map-placeholder {
    height: 300px;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    position: relative;
    border: 1px solid var(--glass-border);
  }
  .map-pin {
    position: absolute;
    background: rgba(11,11,15,0.85);
    color: var(--color-gold);
    padding: 0.3rem 0.8rem;
    border-radius: 12px;
    border: 1px solid var(--color-gold);
    font-size: 0.8rem;
    font-weight: bold;
    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
  }
  .map-pin.cairo { top: 20%; left: 35%; }
  .map-pin.luxor { top: 60%; left: 45%; }
  .map-pin.aswan { top: 80%; left: 48%; }
  ```

- [ ] **Step 8: Create About.jsx**
  Create `src/pages/About.jsx` with contact form:
  ```jsx
  import React, { useState } from 'react';
  import ScrollReveal from '../components/ScrollReveal';

  export default function About() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <div className="page-view page-container">
        <ScrollReveal>
          <div className="section-header">
            <h1>About & Sources</h1>
            <p>Credits, research bibliography, and custom feedback portal.</p>
          </div>
        </ScrollReveal>
        <div className="about-grid">
          <ScrollReveal delay={100}>
            <div className="glass-panel about-info">
              <h2>Credits & Bibliography</h2>
              <p>Eternal Egypt is an educational resource built to showcase the architecture and myths of ancient Egyptian history.</p>
              <h3 style={{ marginTop: '1.5rem', color: 'var(--color-sandstone)' }}>Sources</h3>
              <ul className="sources-list">
                <li>British Museum Department of Egypt and Sudan</li>
                <li>Ministry of Tourism and Antiquities, Egypt</li>
                <li>The Theban Mapping Project</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass-panel contact-form-card">
              <h2>Send a message</h2>
              {submitted ? (
                <div className="success-msg">
                  <p>Thank you! Your message has traveled down the Nile to us.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <input type="text" placeholder="Your Name" required className="form-input" />
                  <input type="email" placeholder="Your Email" required className="form-input" />
                  <textarea placeholder="Your Message" required rows={4} className="form-input" />
                  <button type="submit" className="cta-button" style={{ alignSelf: 'flex-start' }}>SEND MESSAGE</button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    );
  }
  ```
  Add About CSS to `src/index.css`:
  ```css
  .about-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }
  .about-info {
    padding: 2.5rem;
  }
  .about-info h2 {
    color: var(--color-gold);
    margin-bottom: 1.5rem;
  }
  .about-info p {
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  .sources-list {
    margin-top: 1rem;
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .contact-form-card {
    padding: 2.5rem;
  }
  .contact-form-card h2 {
    color: var(--color-gold);
    margin-bottom: 1.5rem;
  }
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .form-input {
    width: 100%;
    padding: 0.8rem 1rem;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--glass-border);
    border-radius: 6px;
    color: var(--color-papyrus);
    font-family: var(--font-body);
    outline: none;
  }
  .form-input:focus {
    border-color: var(--color-gold);
  }
  .success-msg {
    color: var(--color-gold);
    font-weight: bold;
    padding: 1rem;
    border: 1px solid var(--glass-border);
    border-radius: 6px;
    background: rgba(212, 175, 55, 0.05);
  }
  ```

---

### Task 8: Assemble Application & Verify Build

**Files:**
- Modify: `src/App.jsx`
- Modify: `index.html`

**Interfaces:**
- Connects NavigationProvider, Navbar, custom Router views, and specific page components.

- [ ] **Step 1: Write main assembly code in App.jsx**
  Replace `src/App.jsx` with the final composition code:
  ```jsx
  import React from 'react';
  import { NavigationProvider, useNavigation } from './components/Router';
  import Navbar from './components/Navbar';
  import Home from './pages/Home';
  import Pyramids from './pages/Pyramids';
  import Monuments from './pages/Monuments';
  import Pharaohs from './pages/Pharaohs';
  import Gods from './pages/Gods';
  import Hieroglyphics from './pages/Hieroglyphics';
  import Gallery from './pages/Gallery';
  import PlanVisit from './pages/PlanVisit';
  import About from './pages/About';

  function MainLayout() {
    const { currentPage, transitionDirection } = useNavigation();

    const renderPage = () => {
      switch (currentPage) {
        case 'home':
          return <Home />;
        case 'pyramids':
          return <Pyramids />;
        case 'monuments':
          return <Monuments />;
        case 'pharaohs':
          return <Pharaohs />;
        case 'gods':
          return <Gods />;
        case 'hieroglyphics':
          return <Hieroglyphics />;
        case 'gallery':
          return <Gallery />;
        case 'visit':
          return <PlanVisit />;
        case 'about':
          return <About />;
        default:
          return <Home />;
      }
    };

    const transitionClass = transitionDirection === 'forward' ? 'page-enter-forward' : 'page-enter-backward';

    return (
      <div className="router-container">
        <Navbar />
        {/* We key by current page to force re-mounting and trigger the CSS page transition animation */}
        <main key={currentPage} className={`page-view ${transitionClass}`}>
          {renderPage()}
        </main>
      </div>
    );
  }

  export default function App() {
    return (
      <NavigationProvider>
        <MainLayout />
      </NavigationProvider>
    );
  }
  ```

- [ ] **Step 2: Update HTML template head title**
  Modify `index.html` to set title and fonts:
  ```html
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👑</text></svg>" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Eternal Egypt: Journey through the pyramids, temples, dynasties, mythology and secrets of ancient Egyptian civilization." />
      <title>Eternal Egypt — Journey into Antiquity</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.jsx"></script>
    </body>
  </html>
  ```

- [ ] **Step 3: Run full verification build**
  Run:
  ```powershell
  npm.cmd run build
  ```
  Expected: Build succeeds with zero errors, outputting bundled assets in `dist/`.
