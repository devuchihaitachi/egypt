# Design Spec: Multi-Page URL Routing

**Date:** 2026-07-17  
**Status:** Approved  
**Author:** Antigravity (AI Coding Assistant)  
**Topic:** Converting Single Page App State Navigation into React-Router URLs

---

## 1. Project Goal & Overview
Currently, the "Eternal Egypt" website acts as a Single Page Application (SPA) where pages are swapped using a custom state-based React Router (`Router.jsx`). However, the URL path in the browser address bar remains at `http://localhost:3000/` regardless of the page the user is viewing. 

The goal is to split the website into distinct URL paths (e.g., `/pyramids`, `/monuments`, `/timeline`) using `react-router-dom` so that:
1. Every section has its own unique, shareable URL.
2. Browser back and forward button navigation works seamlessly.
3. The custom page slide transition animations (forward/backward) are preserved.
4. Minimal code changes are made to individual page files.

---

## 2. Proposed Changes

### Dependencies
- Add `react-router-dom` to the project dependencies.

### File Modifications

#### [MODIFY] [Router.jsx](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/components/Router.jsx)
We will refactor `Router.jsx` to wrap `react-router-dom`. It will:
- Define URL path mapping for each page.
- Expose `currentPage`, `navigateTo`, and `transitionDirection` via the existing `useNavigation` hook.
- Implement a `useEffect` hook to calculate the slide transition direction (left-to-right or right-to-left) by comparing the indices of the old path and new path whenever the URL pathname changes.

#### [MODIFY] [App.jsx](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/App.jsx)
- Wrap the entire application hierarchy inside `BrowserRouter` from `react-router-dom` (in `App.jsx`).
- Render page transitions properly when the router switches path views.

---

## 3. Verification Plan

### Automated Tests
- Run existing Vitest tests: `npm run test` or `vitest run`
- Update unit tests in `src/components/Router.test.jsx` and `src/components/LayoutComponents.test.jsx` to mock or support `react-router-dom` navigation.

### Manual Verification
- Start the server: `npm run dev`
- Navigate to different pages (Home, Pyramids, Monuments, etc.) and check that:
  - The browser address bar changes to `/pyramids`, `/monuments`, etc.
  - The page content changes correctly.
  - The sliding page transition works as expected in both directions.
  - Pressing the browser's back and forward buttons changes the page content and updates the URL correctly.
  - Reloading the page at a path (e.g. `http://localhost:3000/pyramids`) directly loads that page rather than resetting to Home.
