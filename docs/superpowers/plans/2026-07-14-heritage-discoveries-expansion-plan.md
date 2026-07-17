# Expanded Archaeological Discoveries & UNESCO World Heritage Sites Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the Discoveries and UNESCO World Heritage pages with detailed Wikipedia-sourced historical content, interactive details modals, and a new section for the UNESCO Tentative List, supporting both English and Arabic language views.

**Architecture:** Update `translations.js` to contain rich metadata objects. In `Discoveries.jsx` and `UNESCO.jsx`, implement `useState` hooks to track the currently selected card ID. When a card is clicked, open the pre-existing shared `Modal` component and render the localized fields inside a structured grid. Under the UNESCO site list, render a new segment for Egypt's Tentative List with clean, responsive card layouts.

**Tech Stack:** React, Lucide React (for icons), Vanilla CSS, custom translation context.

## Global Constraints
- Keep components responsive and performant.
- Ensure RTL layouts flip layout alignments correctly (e.g. text direction, icons).
- Ensure all tests pass.

---

### Task 1: Update Translation Data in `src/i18n/translations.js`

Add all metadata, details, and tentative list translations for both English and Arabic locales.

**Files:**
- Modify: `src/i18n/translations.js`

- [ ] **Step 1: Modify English translations in `translations.js`**
  Find the `unesco` and `discoveries` nodes in the `en` translation block and expand them with metadata fields, detailed sites, and tentative list items.
- [ ] **Step 2: Modify Arabic translations in `translations.js`**
  Find the `unesco` and `discoveries` nodes in the `ar` translation block and expand them with the Arabic counterparts.
- [ ] **Step 3: Run quick node validation**
  Run a command to verify that `translations.js` compiles without syntax errors:
  Run: `node -c src/i18n/translations.js`
  Expected: No output (success).
- [ ] **Step 4: Commit**
  Run: `git add src/i18n/translations.js`
  Run: `git commit -m "i18n: expand translations for discoveries and UNESCO sites with detailed data"`

---

### Task 2: Implement Interactive Modals in Discoveries Page (`src/pages/Discoveries.jsx`)

Refactor `Discoveries.jsx` to render discovery tags (Year/Location), add click handlers, and open the `Modal` with structured metadata.

**Files:**
- Modify: `src/pages/Discoveries.jsx`
- Test: `src/pages/Discoveries.test.jsx` (New)

- [ ] **Step 1: Modify `Discoveries.jsx`**
  Import `useState` from 'react', `Modal` from `../components/Modal`, and Lucide icons `Calendar`, `MapPin`, `User`, `Sparkles`, `BookOpen` from `lucide-react`. Map the `discoveryIds` to include the 4 new discoveries: `tutankhamun`, `rosetta`, `khufuship`, `abydos`. Inside the component, add state `selectedId` and `isOpen`. Bind card click to open the modal, rendering detailed information inside the modal body in a responsive grid.
- [ ] **Step 2: Create unit test for Discoveries component**
  Write tests in `src/pages/Discoveries.test.jsx` to assert that discoveries render and that clicking a card opens the Modal containing the details.
- [ ] **Step 3: Run unit tests**
  Run: `powershell -ExecutionPolicy Bypass -Command "npm test -- --run"`
  Expected: All tests pass.
- [ ] **Step 4: Commit**
  Run: `git add src/pages/Discoveries.jsx src/pages/Discoveries.test.jsx`
  Run: `git commit -m "feat: add interactive detail modals and expand discoveries list to 7 items"`

---

### Task 3: Refactor UNESCO Page with Modals and Tentative List (`src/pages/UNESCO.jsx`)

Refactor `UNESCO.jsx` to display year/location tags, open a detail modal with monuments and threats information, and render the new UNESCO Tentative List section at the bottom.

**Files:**
- Modify: `src/pages/UNESCO.jsx`
- Test: `src/pages/UNESCO.test.jsx` (New)

- [ ] **Step 1: Modify `UNESCO.jsx`**
  Import `useState`, `Modal` and Lucide icons (`Calendar`, `MapPin`, `Building`, `ShieldAlert`, `FileText`). In the component, render the registration Year and Location on each card. Add state for the open modal. In the modal, render landmarks, historical details, and conservation status/threats. At the bottom, add a new responsive section for `unesco.tentative` using the 4 candidate sites.
- [ ] **Step 2: Create unit test for UNESCO component**
  Write tests in `src/pages/UNESCO.test.jsx` to assert that registered sites and tentative sites render, and that clicking a site card opens the details modal.
- [ ] **Step 3: Run unit tests**
  Run: `powershell -ExecutionPolicy Bypass -Command "npm test -- --run"`
  Expected: All tests pass.
- [ ] **Step 4: Commit**
  Run: `git add src/pages/UNESCO.jsx src/pages/UNESCO.test.jsx`
  Run: `git commit -m "feat: add interactive modals for UNESCO sites and introduce Tentative List section"`

---

### Task 4: Verify App and Layout Aesthetics

Perform visual and functionality checks across both English and Arabic modes.

- [ ] **Step 1: Run comprehensive tests**
  Run: `powershell -ExecutionPolicy Bypass -Command "npm test -- --run"`
  Expected: All 14 tests (including new ones) pass.
- [ ] **Step 2: Build the application to verify Vite bundle output**
  Run: `powershell -ExecutionPolicy Bypass -Command "npm run build"`
  Expected: Build succeeds with zero errors.
- [ ] **Step 3: Commit all changes**
  Run: `git status`
  Run: `git commit -am "chore: finalize verification of expanded heritage and discoveries features"`
