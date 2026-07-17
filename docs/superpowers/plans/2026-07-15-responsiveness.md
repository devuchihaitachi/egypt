# Eternal Egypt Responsiveness and RTL Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the "Eternal Egypt" website fully responsive, optimize RTL Arabic alignments, and refactor inline layouts into clean CSS classes.

**Architecture:** We will adjust grid definitions to use fluid CSS widths (`minmax(min(100%, Xpx), 1fr)`), update the navbar collapsing breakpoint to `1200px` to handle many menu items, and write clear RTL stylesheet overrides. Inline styling for cards and itineraries will be migrated to responsive CSS classes in `index.css`.

**Tech Stack:** React, Vanilla CSS, Vitest for automated routing tests.

## Global Constraints
- Target viewports: Mobile (320px+), Tablet (768px+), Desktop (1200px+).
- Ensure backdrop-filter blur falls back gracefully on systems/browsers without support.
- Maintain existing test coverage and pass all routing and component tests.
- Maintain project styles (e.g. glassmorphic themes, color variables).

---

### Task 1: CSS Grid and Responsive Layout Overrides

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: Existing grid class layouts and media queries.
- Produces: Updated grid classes, navbar mobile breakpoint at 1200px, and timeline RTL alignment classes.

- [ ] **Step 1: Update grid classes to use fluid layout**
  Edit `src/index.css` to update:
  - `.home-intro-grid` to `grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr))`
  - `.pyramids-grid` to `grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr))`
  - `.gods-grid` to `grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr))`
  - `.gallery-grid` to `grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr))`
  - `.visit-grid` to `grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr))`
  - `.about-grid` to `grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr))`
  - `.culture-grid` to `grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr))`
  - `.gem-exhibits-grid` to `grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr))`
  - `.unesco-grid` to `grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr))`
  - `.discoveries-grid` to `grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr))`
  - `.pyramids-features-grid` to `grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr))`

- [ ] **Step 2: Update mobile navbar collapse media query breakpoint**
  Edit `src/index.css` around line 241:
  Change `@media (max-width: 900px)` to `@media (max-width: 1200px)` for:
  - `.navbar-links { display: none; }`
  - `.mobile-toggle { display: block; }`
  Also update the desktop override `@media (max-width: 1200px) and (min-width: 768px)` to `@media (max-width: 1350px) and (min-width: 1200px)` to optimize the spacing for desktop links right before the collapse point.

- [ ] **Step 3: Add Pharaohs Timeline RTL Alignment CSS**
  Add under the `/* ===== PHARAOHS PAGE ===== */` section in `src/index.css`:
  ```css
  [dir="rtl"] .timeline-era {
    border-left: none;
    border-right: 2px solid var(--color-gold);
    padding-left: 0;
    padding-right: 2rem;
    margin-left: 0;
    margin-right: 1rem;
  }
  ```

- [ ] **Step 4: Add Mobile Page and Modal Container Padding Adjustments**
  Add mobile media queries for page container and modal adjustments:
  ```css
  @media (max-width: 768px) {
    .page-container {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
    }
  }
  @media (max-width: 480px) {
    .page-container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .modal-container {
      padding: 1.25rem 1rem;
      width: 95% !important;
    }
  }
  ```

- [ ] **Step 5: Run existing automated tests to verify build is safe**
  Run: `powershell -ExecutionPolicy Bypass -Command "npm run test"`
  Expected: PASS

---

### Task 2: CSS Classes for Kemet Fact Box and Travel Itineraries

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Consumes: React component layouts.
- Produces: CSS classes for Kemet fact box and itineraries.

- [ ] **Step 1: Write CSS classes for Kemet Fact Box**
  Add to `src/index.css` under home page section:
  ```css
  .kemet-fact-box {
    max-width: 800px;
    margin: 0 auto 4rem auto;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgba(212, 175, 55, 0.25);
    background: rgba(212, 175, 55, 0.03);
    display: flex;
    gap: 1.5rem;
    align-items: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  .kemet-fact-icon {
    font-size: 2.5rem;
    color: var(--color-gold);
    line-height: 1;
    flex-shrink: 0;
  }
  .kemet-fact-content {
    text-align: start;
  }
  .kemet-fact-content h4 {
    font-family: var(--font-heading);
    color: var(--color-gold);
    font-size: 1.2rem;
    margin: 0 0 0.5rem 0;
  }
  .kemet-fact-content p {
    color: var(--color-papyrus);
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
    opacity: 0.95;
  }
  @media (max-width: 600px) {
    .kemet-fact-box {
      flex-direction: column;
      text-align: center;
      padding: 1.5rem;
      gap: 1rem;
    }
    .kemet-fact-content {
      text-align: center;
    }
    .kemet-fact-icon {
      font-size: 2rem;
    }
  }
  ```

- [ ] **Step 2: Write CSS classes for Travel Itineraries**
  Add to `src/index.css` under plan your visit page section:
  ```css
  .itinerary-details-card {
    padding: 3rem 2.5rem;
    border-radius: 16px;
    border: 1px solid rgba(212, 175, 55, 0.2);
    background: rgba(11, 11, 15, 0.55);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  }
  .itinerary-meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2.5rem;
    background: rgba(212, 175, 55, 0.05);
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid rgba(212, 175, 55, 0.1);
  }
  .itinerary-timeline {
    position: relative;
    padding-inline-start: 2.5rem;
    border-inline-start: 2px solid rgba(212, 175, 55, 0.3);
  }
  .itinerary-step {
    position: relative;
    margin-bottom: 2rem;
  }
  .itinerary-dot {
    position: absolute;
    top: 0.2rem;
    left: -3.0rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: var(--color-gold);
    border: 3px solid #0b0b0f;
    box-shadow: 0 0 10px var(--color-gold);
  }
  [dir="rtl"] .itinerary-dot {
    left: auto;
    right: -3.0rem;
  }
  .itinerary-step-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  @media (max-width: 768px) {
    .itinerary-details-card {
      padding: 2rem 1.5rem;
    }
    .itinerary-timeline {
      padding-inline-start: 1.75rem;
    }
    .itinerary-dot {
      left: -2.15rem;
      width: 0.8rem;
      height: 0.8rem;
    }
    [dir="rtl"] .itinerary-dot {
      left: auto;
      right: -2.15rem;
    }
  }
  ```

- [ ] **Step 3: Run existing automated tests to verify compilation**
  Run: `powershell -ExecutionPolicy Bypass -Command "npm run test"`
  Expected: PASS

---

### Task 3: Refactoring `Home.jsx` layout

**Files:**
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: New `.kemet-fact-*` styles.
- Produces: Leaner, responsive Kemet Fact Box.

- [ ] **Step 1: Replace inline style on Kemet Fact Box with CSS classes**
  Open `src/pages/Home.jsx` and locate lines 70-108. Replace the inline styled elements with CSS classes:
  ```jsx
  <div className="glass-panel kemet-fact-box">
    <div className="kemet-fact-icon">💡</div>
    <div className="kemet-fact-content">
      <h4>{t('home.kemetFactTitle')}</h4>
      <p>{t('home.kemetFactText')}</p>
    </div>
  </div>
  ```

- [ ] **Step 2: Run tests to verify Home page rendering does not crash**
  Run: `powershell -ExecutionPolicy Bypass -Command "npm run test"`
  Expected: PASS

---

### Task 4: Refactoring `PlanVisit.jsx` layout

**Files:**
- Modify: `src/pages/PlanVisit.jsx`

**Interfaces:**
- Consumes: New `.itinerary-*` styles.
- Produces: Leaner, responsive Travel Itineraries layout.

- [ ] **Step 1: Replace inline style on Itinerary Details Card with classes**
  Open `src/pages/PlanVisit.jsx`.
  Locate lines 95-159. Replace with:
  ```jsx
  <div className="glass-panel itinerary-details-card">
    <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '0.75rem' }}>
      {t(`visit.plans.${activeTab}.title`)}
    </h3>

    {/* Itinerary Quick Meta Info */}
    <div className="itinerary-meta">
      <div>
        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-papyrus)', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>
          {t('visit.durationLabel')}
        </span>
        <strong style={{ fontSize: '1.1rem', color: '#fff' }}>
          {t(`visit.plans.${activeTab}.duration`)}
        </strong>
      </div>
      <div>
        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-papyrus)', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>
          {t('visit.firstStopLabel')}
        </span>
        <strong style={{ fontSize: '1.1rem', color: '#fff' }}>
          {t(`visit.plans.${activeTab}.firstStop`)}
        </strong>
      </div>
      <div>
        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-papyrus)', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>
          {t('visit.transportLabel')}
        </span>
        <strong style={{ fontSize: '1.1rem', color: '#fff' }}>
          {t(`visit.plans.${activeTab}.transport`)}
        </strong>
      </div>
    </div>

    {/* Timeline steps */}
    <div className="itinerary-timeline">
      {stepsArray.map((step, idx) => (
        <div key={idx} className="itinerary-step">
          {/* Timeline dot */}
          <div className="itinerary-dot" />
          
          <div className="itinerary-step-content">
            <span style={{ color: 'var(--color-gold)', fontWeight: 'bold', fontFamily: 'var(--font-heading)', fontSize: '0.9rem', letterSpacing: '1px' }}>
              {step.time}
            </span>
            <h4 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.2rem', margin: '0.2rem 0' }}>
              {step.title}
            </h4>
            <p style={{ color: 'var(--color-papyrus)', opacity: 0.9, lineHeight: '1.5', fontSize: '0.95rem', margin: 0 }}>
              {step.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
  ```

- [ ] **Step 2: Run tests to verify rendering**
  Run: `powershell -ExecutionPolicy Bypass -Command "npm run test"`
  Expected: PASS

---

### Task 5: Hieroglyphics, UNESCO, and Discoveries CSS and Layout Cleanup

**Files:**
- Modify: `src/index.css`
- Modify: `src/pages/UNESCO.jsx`
- Modify: `src/pages/Discoveries.jsx`

**Interfaces:**
- Consumes: Meta styling for card footers.
- Produces: CSS classes for card meta tags, responsive cartouche displays.

- [ ] **Step 1: Write shared CSS class for card footer meta tags**
  Add to `src/index.css`:
  ```css
  .card-meta-row {
    display: flex;
    gap: 1rem;
    margin-top: 1.2rem;
    font-size: 0.8rem;
    opacity: 0.8;
    color: var(--color-gold);
  }
  .card-meta-item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .unesco-campaign-card {
    padding: 2.5rem;
  }
  @media (max-width: 768px) {
    .unesco-campaign-card {
      padding: 1.5rem;
    }
  }
  .cartouche-display {
    max-width: 100%;
    width: 100%;
  }
  @media (max-width: 480px) {
    .cartouche-display {
      padding: 1.5rem 1rem;
    }
    .cartouche-border {
      padding: 1rem;
    }
    .cartouche-glyphs {
      gap: 0.75rem;
    }
    .glyph-item {
      width: 45px;
    }
    .glyph-svg {
      width: 35px;
      height: 35px;
    }
  }
  ```

- [ ] **Step 2: Refactor `src/pages/UNESCO.jsx` inline styles**
  Replace lines 69-76 and lines 84-91 with class names:
  ```jsx
  {/* Replacing unesco-card-meta inline style */}
  <div className="card-meta-row">
    <span className="card-meta-item">
      <Calendar size={14} /> {t(`unesco.sites.${site.id}Year`)}
    </span>
    <span className="card-meta-item">
      <MapPin size={14} /> {t(`unesco.sites.${site.id}Loc`)}
    </span>
  </div>
  ```
  ```jsx
  {/* Replacing unesco-campaign-card inline style */}
  <div className="glass-panel unesco-campaign-card">
  ```

- [ ] **Step 3: Refactor `src/pages/Discoveries.jsx` inline styles**
  Replace lines 69-76 with class names:
  ```jsx
  {/* Replacing discovery-meta inline style */}
  <div className="card-meta-row">
    <span className="card-meta-item">
      <Calendar size={14} /> {t(`discoveries.items.${id}.year`)}
    </span>
    <span className="card-meta-item">
      <MapPin size={14} /> {t(`discoveries.items.${id}.location`)}
    </span>
  </div>
  ```

- [ ] **Step 4: Run test suite to verify everything passes**
  Run: `powershell -ExecutionPolicy Bypass -Command "npm run test"`
  Expected: PASS
