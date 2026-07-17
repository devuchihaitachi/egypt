# Design Spec: Home Page Immersive Cards Redesign

Redesign the shortcut cards on the home page (`src/pages/Home.jsx`) to feature immersive full-bleed image backgrounds, parallax hover zoom effects, gold-glowing borders, and classic numbering overlays, providing a luxurious, museum-archive digital experience.

## Proposed Changes

### 1. Home Page Component (`src/pages/Home.jsx`)
- Refactor the cards inside `home-intro-grid` to use the new immersive container structure.
- Add background images mapping to the 4 sections:
  1. Pyramids -> `/images/pyramids-info.jpg`
  2. Monuments -> `/images/temples.jpg`
  3. Pharaohs -> `/images/pharaohs.jpg`
  4. Gods -> `/images/gods.jpg`
- Embed large, semi-transparent number labels (`01`, `02`, `03`, `04`) in the top-right of each card.
- Structure content overlay using a dedicated wrapper (`card-immersive-content`).
- Add a sliding arrow helper element (`arrow-icon`) to the explore link.

### 2. Styling System (`src/index.css`)
- Introduce `.home-intro-card-immersive` with `overflow: hidden`, `position: relative`, and custom dimensions.
- Implement background image overlay `.home-intro-card-bg` with absolute positioning and a clean transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`.
- Configure hover states:
  - Scale background image by `1.08`.
  - Add gold inset and outset box-shadow glow.
  - Slide arrow icon using `transform: translateX(6px)`.
- Style the big serial number watermark (`.card-number`) using a serif font with low opacity.

## Verification Plan

### Automated Tests
- Run `npm test` to verify that existing test suites (specifically for layout components) continue to pass.

### Manual Verification
- View the home page in both English and Arabic locales.
- Verify that card borders, numbering, and arrow transitions adapt to the RTL layout (e.g. arrow points left `←` and translates left on hover in Arabic, numbers align correctly).
- Verify responsiveness on mobile screen widths (cards stacking cleanly).
