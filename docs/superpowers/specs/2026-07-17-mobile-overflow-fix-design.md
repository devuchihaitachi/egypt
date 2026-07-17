# Design Spec: Mobile Horizontal Overflow Fix

**Date:** 2026-07-17  
**Status:** Draft  
**Author:** Antigravity (AI Coding Assistant)  
**Topic:** Fixing horizontal page overflow (empty spaces on sides) on mobile viewports.

---

## 1. Project Goal & Overview
On mobile screens, opening the **World Heritage** (UNESCO) page or the **Discoveries** page (especially the English version) causes horizontal overflow, allowing the user to scroll/move the page left and right, leaving empty spaces.

The goal is to stabilize the mobile layout so that:
1. The website is stable and cannot be scrolled horizontally on mobile devices.
2. The grid cards (UNESCO and Discoveries) scale and fit completely inside the mobile viewport.
3. Long metadata lines wrap properly instead of expanding the card width.

---

## 2. Proposed Changes

### File Modifications

#### [MODIFY] [index.css](file:///C:/Users/PC'/Documents/antigravity/friendly-noether/src/index.css)
- Update `.app-shell` to include `overflow-x: hidden` and `width: 100%` to prevent any horizontal scroll on the body container level.
- Update `.card-meta-row` to include `flex-wrap: wrap` so metadata items (such as long location names and dates) wrap onto new lines on small viewports instead of pushing the card wider.
- Add responsive overrides at the end of the file for `.unesco-card` and `.discovery-card` to reduce padding from `2rem` to `1.25rem` on mobile viewports (`max-width: 480px`) to maximize available content space and prevent clipping.

---

## 3. Verification Plan

### Automated Tests
- Run `npm run test` to verify all 15 tests pass.

### Manual Verification
- Deploy/start local server and open the website in mobile view (emulate mobile viewport under 375px/414px width in devtools).
- Navigate to the **World Heritage** page and **Discoveries** page in English.
- Verify that the page layout is locked vertically (no horizontal scrolling or side-to-side wiggle).
- Verify that the card paddings and metadata layout adjust beautifully on mobile screens.
