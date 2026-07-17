# Design Spec: Responsive Page Section Headers

**Date:** 2026-07-17  
**Status:** Draft  
**Author:** Antigravity (AI Coding Assistant)  
**Topic:** Scaling down page headers (`.section-header h1`) on tablets and mobile screens to prevent overflow.

---

## 1. Project Goal & Overview
On mobile viewports, page headers like "Archaeological Discoveries" (`t('discoveries.title')`) render at a fixed `3rem` (48px) size. This is too large for narrow screens, causing the headline text to break boundaries or overflow.

The goal is to implement responsive typography rules for `.section-header h1` that scale dynamically across viewports.

---

## 2. Proposed Changes

### File Modifications

#### [MODIFY] [index.css](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/index.css)
- Inside the `@media (max-width: 768px)` media query:
  - Add `.section-header h1 { font-size: 2.2rem; }` to reduce font size on tablet/mobile screens.
- Inside the `@media (max-width: 480px)` media query:
  - Add `.section-header h1 { font-size: 1.75rem; }` to scale the headings down further on small mobile phone screens.

---

## 3. Verification Plan

### Automated Tests
- Run `npm run test` to verify all 15 tests pass.

### Manual Verification
- Deploy/start local server and open the website in mobile view.
- Navigate to the **Discoveries** page in English.
- Verify that the heading "Archaeological Discoveries" displays fully without overflow or clipping.
