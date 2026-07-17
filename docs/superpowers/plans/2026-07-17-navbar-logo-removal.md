# Navbar Logo Removal & Category Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the Navbar logo and align categories from left-to-right (English) and right-to-left (Arabic) with desktop language toggle on the opposite side.

**Architecture:** Remove logo from `Navbar.jsx` and move language toggle to direct child of navbar, update flex styles in `index.css` for `.navbar` and `.desktop-lang-toggle`, and remove logo assertions in `LayoutComponents.test.jsx`.

**Tech Stack:** React, Vite, react-router-dom, Vitest, React Testing Library.

## Global Constraints

- react-router-dom must be used for routing.
- The logo must be removed.
- Categories must start from left in English, right in Arabic.
- All existing tests must pass or be updated.

---

### Task 1: Update Navbar.jsx

**Files:**
- Modify: `src/components/Navbar.jsx`

**Interfaces:**
- Consumes: None
- Produces: Navbar markup without logo and with moved desktop language toggle

- [ ] **Step 1: Modify Navbar.jsx**

Update `src/components/Navbar.jsx` with the following content:
```javascript
import { useEffect, useState } from 'react';
import { useNavigation, pages } from './Router';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { currentPage, navigateTo } = useNavigation();
  const { t, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page) => {
    navigateTo(page);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-header-row">
        {/* Mobile Language Toggle */}
        <button
          className="mobile-lang-toggle"
          onClick={toggleLanguage}
          aria-label={t('nav.toggleLang')}
        >
          {t('nav.toggleLang')}
        </button>
      </div>

      <nav className="navbar-links">
        {pages.map((page) => (
          <button
            key={page}
            className={`nav-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => handleNav(page)}
          >
            {t(`nav.${page}`)}
          </button>
        ))}
      </nav>

      {/* Desktop Language Toggle */}
      <button
        className="nav-btn desktop-lang-toggle"
        onClick={toggleLanguage}
      >
        {t('nav.toggleLang')}
      </button>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

Run:
```bash
git add src/components/Navbar.jsx
git commit -m "feat: remove logo and restructure desktop lang toggle position in Navbar"
```

---

### Task 2: Update index.css

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: None
- Produces: Flex styles aligning categories to start and pushing lang toggle to end

- [ ] **Step 1: Update desktop navbar styling**

Find `.navbar` in `src/index.css` (around line 139) and update it:
```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: flex-start; /* categories start from left in LTR */
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;
  background: rgba(11, 11, 15, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
  gap: 2rem;
}
```

- [ ] **Step 2: Update desktop lang toggle margins**

Find `.desktop-lang-toggle` (around line 194) and update it:
```css
.desktop-lang-toggle {
  margin-left: auto; /* push to far right in LTR */
  margin-right: 1rem;
  border: 1px solid var(--color-gold);
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
  color: var(--color-gold);
}
```

- [ ] **Step 3: Update RTL overrides**

Find `[dir="rtl"] .desktop-lang-toggle` (around line 210) and update it:
```css
[dir="rtl"] .desktop-lang-toggle {
  margin-left: 1rem;
  margin-right: auto; /* push to far left in RTL */
}
```

- [ ] **Step 4: Update mobile header row styling**

Find `.navbar-header-row` inside `@media (max-width: 1200px)` (around line 233) and update it:
```css
  .navbar-header-row {
    display: flex;
    justify-content: flex-end; /* push mobile toggle to end */
    align-items: center;
    width: 100%;
    height: 40px;
  }
```

- [ ] **Step 5: Commit**

Run:
```bash
git add src/index.css
git commit -m "style: align categories to start and push lang toggle using flex auto margins"
```

---

### Task 3: Update LayoutComponents.test.jsx

**Files:**
- Modify: `src/components/LayoutComponents.test.jsx`

**Interfaces:**
- Consumes: None
- Produces: Passing unit tests for Navbar component

- [ ] **Step 1: Remove logo assertions**

In `src/components/LayoutComponents.test.jsx`, remove the lines checking for logo text:
- Find and delete: `expect(screen.getByText('logo')).toBeInTheDocument();` (around line 127)
- Find and delete the "Click logo" test block (around lines 146-158):
```javascript
  // Click logo
  const logo = screen.getByText('logo').closest('.navbar-logo');
  expect(logo).toBeInTheDocument();
  fireEvent.click(logo);
  expect(navigateToMock).toHaveBeenLastCalledWith('home');

  // Trigger logo onKeyDown with Enter
  fireEvent.keyDown(logo, { key: 'Enter', code: 'Enter' });
  expect(navigateToMock).toHaveBeenLastCalledWith('home');

  // Trigger logo onKeyDown with Space
  fireEvent.keyDown(logo, { key: ' ', code: 'Space' });
  expect(navigateToMock).toHaveBeenLastCalledWith('home');
```

- [ ] **Step 2: Commit**

Run:
```bash
git add src/components/LayoutComponents.test.jsx
git commit -m "test: remove logo checks from Navbar tests"
```

---

### Task 4: Fix Tests and Verify

**Files:**
- None (or verify files)

**Interfaces:**
- Consumes: Test runner
- Produces: Passing test suite

- [ ] **Step 1: Run all tests to verify**

Run: `cmd /c npm run test`
Expected: All 15 tests pass.
