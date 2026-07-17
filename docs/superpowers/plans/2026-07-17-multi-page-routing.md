# Multi-Page Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the state-based page switching in the "Eternal Egypt" website to URL-based routing using react-router-dom while keeping smooth transitions.

**Architecture:** We wrap the React application with `react-router-dom`'s `BrowserRouter`, adapt the existing `Router.jsx` to map URL paths to page names, sync `currentPage` and `transitionDirection` state from URL changes, and use dynamic routes in `App.jsx`.

**Tech Stack:** React, Vite, react-router-dom, Vitest, React Testing Library.

## Global Constraints

- react-router-dom must be used for routing.
- The browser URL paths must be clean (e.g. `/pyramids`, `/monuments`).
- The page sliding animations must be preserved.
- All existing tests must pass or be updated.

---

### Task 1: Install react-router-dom

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: None
- Produces: `react-router-dom` dependency in `package.json`

- [ ] **Step 1: Install dependency**

Run: `cmd /c npm install react-router-dom`
Expected: Command completes successfully, adding `react-router-dom` to `package.json`.

- [ ] **Step 2: Verify package.json**

Run: Verify that `package.json` contains `"react-router-dom"` under dependencies.

- [ ] **Step 3: Commit**

Run:
```bash
git add package.json package-lock.json
git commit -m "chore: install react-router-dom"
```

---

### Task 2: Refactor Router.jsx

**Files:**
- Modify: `src/components/Router.jsx`

**Interfaces:**
- Consumes: `react-router-dom` hooks (`useLocation`, `useNavigate`)
- Produces: `NavigationProvider` component and `useNavigation` hook.
- `useNavigation` returns:
  - `currentPage`: string (e.g. 'home', 'pyramids')
  - `navigateTo(pageName)`: function
  - `transitionDirection`: 'forward' | 'backward'

- [ ] **Step 1: Refactor Router.jsx**

Update `src/components/Router.jsx` with the following content:
```javascript
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  if (path === '/') return 'home';
  const clean = path.replace(/^\//, '');
  return pages.includes(clean) ? clean : 'home';
};

const pageToPath = (page) => {
  return page === 'home' ? '/' : `/${page}`;
};

export function NavigationProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
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
    navigate(pageToPath(targetPage));
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
git commit -m "feat: refactor Router to use react-router-dom"
```

---

### Task 3: Update App.jsx and App.test.jsx

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`

**Interfaces:**
- Consumes: `react-router-dom` components (`BrowserRouter`, `Routes`, `Route`, `useLocation`)
- Produces: Rendered pages driven by URLs

- [ ] **Step 1: Refactor App.jsx**

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
  const { currentPage, transitionDirection } = useNavigation();
  const location = useLocation();

  return (
    <div className="app-shell">
      <Navbar />
      <main
        key={location.pathname}
        className={`page-transition page-transition-${transitionDirection}`}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/pyramids" element={<Pyramids />} />
          <Route path="/monuments" element={<Monuments />} />
          <Route path="/pharaohs" element={<Pharaohs />} />
          <Route path="/gods" element={<Gods />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/gem" element={<GEM />} />
          <Route path="/unesco" element={<UNESCO />} />
          <Route path="/discoveries" element={<Discoveries />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hieroglyphics" element={<Hieroglyphics />} />
          <Route path="/visit" element={<PlanVisit />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
}
```

- [ ] **Step 2: Refactor App.test.jsx**

Since `App` already wraps everything in `BrowserRouter`, `App.test.jsx` does not need to mock `BrowserRouter` or `MemoryRouter`. However, verify it passes.

- [ ] **Step 3: Commit**

Run:
```bash
git add src/App.jsx
git commit -m "feat: integrate react-router-dom routes in App"
```

---

### Task 4: Fix Tests

**Files:**
- Modify: `src/components/Router.test.jsx`

**Interfaces:**
- Consumes: Test environment utilities and routing components
- Produces: Passing test suite

- [ ] **Step 1: Update Router.test.jsx**

Update `src/components/Router.test.jsx` to wrap `TestComponent` in `<MemoryRouter>`:
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
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
    <MemoryRouter initialEntries={['/']}>
      <NavigationProvider>
        <TestComponent />
      </NavigationProvider>
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
git commit -m "test: update Router test to wrap MemoryRouter"
```
