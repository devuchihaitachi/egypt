# Design Spec: Responsiveness and RTL Optimization

**Date:** 2026-07-15  
**Status:** Draft  
**Author:** Antigravity (AI Coding Assistant)  
**Topic:** Immersive Responsiveness & Arabic RTL Layout Adjustments  

---

## 1. Project Goal & Overview
Ensure the "Eternal Egypt" website looks premium, visually stunning, and works flawlessly on any device viewport (from small mobile screens of 320px up to wide desktops). This includes optimizing grid layouts, migrating inline style overrides to responsive CSS classes, fixing the navigation drawer breakpoint, and correcting Arabic RTL alignments (such as the Pharaohs timeline line and border offsets).

---

## 2. Identified Layout Issues & Solutions

### A. CSS Grid Card Overflow on Small Screens
*   **Problem:** Grids like `.pyramids-grid`, `.gods-grid`, `.culture-grid`, and `.discoveries-grid` use static minimum widths (e.g. `minmax(320px, 1fr)`). When the screen width is less than 380px, the viewport width minus side paddings becomes less than 320px, resulting in horizontal scrolling and broken card elements.
*   **Solution:** Adjust grid definitions to use modern, fluid minmax queries: `repeat(auto-fit, minmax(min(100%, Xpx), 1fr))`. This guarantees cards automatically shrink to fit viewports narrower than their default target column widths.

### B. Navbar Collisions on Medium Screen Sizes (Tablets)
*   **Problem:** The website has 12 distinct pages, causing the horizontal links in the desktop navbar to overflow or collide with the logo on viewports between `900px` and `1200px`.
*   **Solution:** Increase the media query breakpoint for the mobile menu toggle and links from `900px` to `1200px`. Viewports smaller than `1200px` will collapse the navbar into the hamburger icon and use the responsive glassmorphic drawer.

### C. Arabic RTL Alignment Discrepancies
*   **Problem:** The Pharaohs historical timeline page `.timeline-era` has hardcoded left borders and margins (`border-left`, `padding-left`, `margin-left`). In Arabic RTL mode, the timeline line should appear on the right side of the cards.
*   **Solution:** Implement explicit `[dir="rtl"]` CSS overrides to mirror borders, paddings, and margins.

### D. Inline Styles and Mobile Padding Squeezing
*   **Problem:** Elements like the Kemet Fact Box (`Home.jsx`) and Travel Itineraries (`PlanVisit.jsx`) use inline flex/grid styles with static padding (e.g., `padding: 3rem 2.5rem`), causing them to shrink awkwardly and crowd text on screens under `480px`.
*   **Solution:** Migrate these inline styles to proper CSS classes (`.kemet-fact-box`, `.itinerary-details-card`, `.itinerary-timeline`, `.itinerary-dot`) in `index.css`. Add media query overrides to reduce paddings and switch flex directions to `column` on small viewports.

---

## 3. Proposed File Changes

### 1. `src/index.css`
*   Modify all card grids to use `minmax(min(100%, Xpx), 1fr)`.
*   Change the media query breakpoint for `.navbar-links` and `.mobile-toggle` to `1200px`.
*   Add RTL overrides for `.timeline-era`.
*   Create new responsive classes:
    *   `.kemet-fact-box`, `.kemet-fact-icon`, `.kemet-fact-content`
    *   `.itinerary-details-card`, `.itinerary-meta`, `.itinerary-timeline`, `.itinerary-step`, `.itinerary-dot`, `.itinerary-step-content`
*   Add mobile media query overrides for:
    *   `.page-container` (reducing padding-left/right to `1.25rem` or `1rem` below `768px`).
    *   `.modal-container` (reducing padding and increasing container width on small viewports).
    *   `.kemet-fact-box` (switching display from horizontal flex to vertical column).
    *   `.itinerary-details-card` and `.itinerary-timeline` (downscaling padding and dots).

### 2. `src/pages/Home.jsx`
*   Remove inline styles on the Kemet Fact Box and apply classes `.kemet-fact-box`, `.kemet-fact-icon`, and `.kemet-fact-content`.

### 3. `src/pages/PlanVisit.jsx`
*   Remove inline styles on the Travel Itineraries container, tabs, meta cards, and timeline steps.
*   Apply the new `.itinerary-*` CSS classes and utilize explicit RTL selectors for dot positioning instead of React language checks in JS style properties.

### 4. `src/pages/Discoveries.jsx` & `src/pages/UNESCO.jsx`
*   Move inline styles in meta spans and details wrappers to CSS classes.

---

## 4. Verification & Testing Plan
*   **Automated Tests:** Execute the test suite `npm run test` to verify that routing and rendering are unaffected.
*   **Manual/Responsive Verification:**
    *   Inspect layouts at Mobile viewports (320px - 480px) on simulated browsers.
    *   Inspect layouts at Tablet viewports (768px - 1024px).
    *   Verify the navbar collapses to hamburger at `< 1200px`.
    *   Verify that both English (LTR) and Arabic (RTL) renders mirror correctly.
