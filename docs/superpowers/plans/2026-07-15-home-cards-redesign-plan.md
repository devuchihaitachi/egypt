# Home Page Immersive Cards Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the shortcut cards on the home page to feature full-bleed background images with zoom hover effects, gold glowing borders, and stylized transparent numbering.

**Architecture:** Modify `src/pages/Home.jsx` to render immersive card layouts with separate background elements and serial numbers. Add new custom CSS classes inside `src/index.css` to manage layout, transitions, transforms, and hover effects, with full RTL support.

**Tech Stack:** React, Vanilla CSS, Lucide React (for layout structure).

## Global Constraints
- Do not break existing page transition animations.
- Ensure all layouts remain fully responsive.
- Ensure RTL mode reverses layout/translation directions correctly.

---

### Task 1: Refactor Home page Markup (`src/pages/Home.jsx`)

Refactor the shortcut cards inside the intro section to support absolute-positioned backgrounds and numbering metadata.

**Files:**
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Modify card layout in `Home.jsx`**
  Modify lines 111-167 to change the cards to use the `home-intro-card-immersive` class, add `<div className="home-intro-card-bg" style={{ backgroundImage: "url(...)" }} />`, add `<span className="card-number">XX</span>`, and wrap the text content inside `<div className="card-immersive-content">`.
- [ ] **Step 2: Run build syntax check**
  Run: `powershell -ExecutionPolicy Bypass -Command "npm run build"`
  Expected: Builds successfully with zero syntax errors.
- [ ] **Step 3: Commit**
  (Skip git commands as Git is not installed).

---

### Task 2: Implement Card Styles (`src/index.css`)

Add CSS classes to manage the immersive cards, full-bleed backgrounds, hover transitions, and RTL direction-flipping.

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add card and background styles in `index.css`**
  Append immersive card classes (`.home-intro-card-immersive`, `.home-intro-card-bg`, `.card-number`, `.card-immersive-content`, `.arrow-icon`) at the bottom of `index.css`. Add transition parameters.
- [ ] **Step 2: Add hover transformations**
  Define scaling transforms on hover for `.home-intro-card-bg`, border-glows on hover for `.home-intro-card-immersive`, and sliding translations for `.arrow-icon`.
- [ ] **Step 3: Add RTL specific flip overrides**
  In RTL mode (`[dir="rtl"]`), adjust the position coordinates of the card number watermark and reverse the arrow transition from sliding right (`translateX(6px)`) to sliding left (`translateX(-6px)`).
- [ ] **Step 4: Commit**
  (Skip git commands).

---

### Task 3: Verify and Build

Run full verification suites.

- [ ] **Step 1: Run unit tests**
  Run: `powershell -ExecutionPolicy Bypass -Command "npm test -- --run"`
  Expected: All tests pass.
- [ ] **Step 2: Verify Vite build compilation**
  Run: `powershell -ExecutionPolicy Bypass -Command "npm run build"`
  Expected: Build succeeds with zero errors.
