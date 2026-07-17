### Task 4: Build Layout Components (Navbar, ScrollReveal, CountUp, Modal)

**Files:**
- Create: `src/components/Navbar.jsx`
- Create: `src/components/ScrollReveal.jsx`
- Create: `src/components/CountUp.jsx`
- Create: `src/components/Modal.jsx`
- Modify: `src/index.css` (add component styles)

**Interfaces:**
- `ScrollReveal`: Wrapper React component that accepts `children` and optional `delay` (ms).
- `CountUp`: Takes `end` (number), `suffix` (string), and optional `duration` (ms).
- `Modal`: Takes `isOpen` (boolean), `onClose` (function), `title` (string), and `children`.
- `Navbar`: Persistently floats at the top, collapses on mobile into a slide-out drawer from the right.

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
