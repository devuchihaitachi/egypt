# Language Prefix Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modify the routing to include language prefixes (e.g. `/en/pyramids`, `/ar/pyramids`) and synchronize the language state directly with the URL.

**Architecture:** Wrap `LanguageProvider` inside `BrowserRouter` in `App.jsx`, modify `LanguageProvider` to parse language from the URL and redirect non-prefixed URLs, and update `Router.jsx` to parse page names from the second segment.

**Tech Stack:** React, Vite, react-router-dom, Vitest, React Testing Library.

## Global Constraints

- react-router-dom must be used for routing.
- The URL paths must have language prefixes (`/en/...` or `/ar/...`).
- The page sliding animations must be preserved.
- All existing tests must pass or be updated.

---

### Task 1: Update App.jsx

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: None
- Produces: `LanguageProvider` wrapped inside `BrowserRouter`

- [ ] **Step 1: Modify App.jsx**

Update `src/App.jsx` with the following content:
```javascript
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { NavigationProvider, useNavigation } from './components/Router';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pyramids from './pages/Pyramids';
import Monuments from './pages/Monuments';
import Pharaohs from './pages/Pharaohs';
import Gods from './pages/Gods';
import Hieroglyphics from './pages/Hieroglyphics';
import PlanVisit from './pages/PlanVisit';
import Culture from './pages/Culture';
import GEM from './pages/GEM';
import UNESCO from './pages/UNESCO';
import Discoveries from './pages/Discoveries';
import Timeline from './pages/Timeline';

function AppContent() {
  const { transitionDirection } = useNavigation();
  const location = useLocation();

  return (
    <div className="app-shell">
      <Navbar />
      <main
        key={location.pathname}
        className={`page-transition page-transition-${transitionDirection}`}
      >
        <Routes location={location}>
          <Route path="/:lang" element={<Home />} />
          <Route path="/:lang/pyramids" element={<Pyramids />} />
          <Route path="/:lang/monuments" element={<Monuments />} />
          <Route path="/:lang/pharaohs" element={<Pharaohs />} />
          <Route path="/:lang/gods" element={<Gods />} />
          <Route path="/:lang/culture" element={<Culture />} />
          <Route path="/:lang/gem" element={<GEM />} />
          <Route path="/:lang/unesco" element={<UNESCO />} />
          <Route path="/:lang/discoveries" element={<Discoveries />} />
          <Route path="/:lang/timeline" element={<Timeline />} />
          <Route path="/:lang/hieroglyphics" element={<Hieroglyphics />} />
          <Route path="/:lang/visit" element={<PlanVisit />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
```

- [ ] **Step 2: Commit**

Run:
```bash
git add src/App.jsx
git commit -m "feat: wrap LanguageProvider in BrowserRouter and add :lang params to routes"
```

---

### Task 2: Update LanguageContext.jsx

**Files:**
- Modify: `src/context/LanguageContext.jsx`

**Interfaces:**
- Consumes: `useLocation` and `useNavigate` from `react-router-dom`
- Produces: `LanguageProvider` with language synced from URL

- [ ] **Step 1: Modify LanguageContext.jsx**

Update `src/context/LanguageContext.jsx` with the following content:
```javascript
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse language from URL
  const segments = location.pathname.split('/').filter(Boolean);
  const pathLang = (segments[0] === 'ar' || segments[0] === 'en') ? segments[0] : null;

  // Fallback to localStorage or default
  const defaultLang = localStorage.getItem('eternal-egypt-lang') || 'en';
  const language = pathLang || defaultLang;

  useEffect(() => {
    localStorage.setItem('eternal-egypt-lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Handle redirect if URL lacks language prefix
  useEffect(() => {
    if (!pathLang) {
      const targetPath = `/${defaultLang}${location.pathname}${location.search}`;
      navigate(targetPath, { replace: true });
    }
  }, [pathLang, defaultLang, location.pathname, location.search, navigate]);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    const targetSegments = [...segments];
    if (pathLang) {
      targetSegments[0] = newLang;
    } else {
      targetSegments.unshift(newLang);
    }
    const targetPath = '/' + targetSegments.join('/') + location.search;
    navigate(targetPath);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
```

- [ ] **Step 2: Commit**

Run:
```bash
git add src/context/LanguageContext.jsx
git commit -m "feat: sync LanguageProvider with URL path language prefix"
```

---

### Task 3: Update Router.jsx

**Files:**
- Modify: `src/components/Router.jsx`

**Interfaces:**
- Consumes: `useLanguage` from `../context/LanguageContext`
- Produces: Correct page index tracking with language prefixed paths

- [ ] **Step 1: Modify Router.jsx**

Update `src/components/Router.jsx` with the following content:
```javascript
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NavigationContext = createContext();

export const pages = [
  'home',
  'pyramids',
  'monuments',
  'pharaohs',
  'gods',
  'culture',
  'gem',
  'unesco',
  'discoveries',
  'timeline',
  'hieroglyphics',
  'visit'
];

const pathToPage = (path) => {
  const segments = path.split('/').filter(Boolean);
  if (segments.length <= 1) return 'home';
  const page = segments[1];
  return pages.includes(page) ? page : 'home';
};

const pageToPath = (page, currentLang) => {
  const prefix = `/${currentLang}`;
  return page === 'home' ? prefix : `${prefix}/${page}`;
};

export function NavigationProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [transitionDirection, setTransitionDirection] = useState('forward');
  
  const currentPage = pathToPage(location.pathname);
  const prevPageRef = useRef(currentPage);

  useEffect(() => {
    const prevPage = prevPageRef.current;
    if (prevPage !== currentPage) {
      const prevIndex = pages.indexOf(prevPage);
      const currentIndex = pages.indexOf(currentPage);
      if (prevIndex !== -1 && currentIndex !== -1) {
        if (currentIndex > prevIndex) {
          setTransitionDirection('forward');
        } else {
          setTransitionDirection('backward');
        }
      }
      prevPageRef.current = currentPage;
    }
  }, [currentPage]);

  const navigateTo = (targetPage) => {
    if (!pages.includes(targetPage)) return;
    navigate(pageToPath(targetPage, language));
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

- [ ] **Step 2: Commit**

Run:
```bash
git add src/components/Router.jsx
git commit -m "feat: parse page names from second path segment in Router"
```

---

### Task 4: Fix Tests and Verify

**Files:**
- Modify: `src/components/Router.test.jsx`
- Modify: `src/App.test.jsx`

**Interfaces:**
- Consumes: Test environment components
- Produces: Passing test suite

- [ ] **Step 1: Update Router.test.jsx**

Update `src/components/Router.test.jsx` to wrap the providers properly:
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NavigationProvider, useNavigation } from './Router';
import { LanguageProvider } from '../context/LanguageContext';

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
    <MemoryRouter initialEntries={['/en']}>
      <LanguageProvider>
        <NavigationProvider>
          <TestComponent />
        </NavigationProvider>
      </LanguageProvider>
    </MemoryRouter>
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

- [ ] **Step 2: Run all tests to verify**

Run: `cmd /c npm run test`
Expected: All tests pass.

- [ ] **Step 3: Commit**

Run:
```bash
git add src/components/Router.test.jsx
git commit -m "test: update Router tests with LanguageProvider wrapping"
```
