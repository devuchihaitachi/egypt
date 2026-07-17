# Design Spec: High-Quality Image Integration & Interactive Modals

Integrate high-quality, public-domain, watermark-free images from Wikimedia Commons for all pyramids, monuments, rulers, and deities, introducing card preview images and split-screen detail modals.

## Proposed Changes

### 1. Image Download Automation Script
- Create `scripts/download-images.js` which maps each entity ID (e.g., `khufu`, `abusimbel`, `anubis`) to its English Wikipedia article title.
- Query Wikipedia API (`https://en.wikipedia.org/w/api.php`) for page image properties with high-resolution thumbnails.
- Download and save each image to `public/images/items/{id}.jpg`.
- Implement fallback images if download fails or is unavailable.

### 2. Pyramids Page (`src/pages/Pyramids.jsx`)
- Update cards to show a thumbnail image at the top of each card.
- Make the pyramid cards clickable.
- Clicking a card opens a Modal displaying:
  - Left column (LTL) / Right column (RTL): Large pyramid image.
  - Right column (LTL) / Left column (RTL): Pyramid Name, Builder, Age, Height (in stylized glass sub-cards), and description.

### 3. Monuments Page (`src/pages/Monuments.jsx`)
- Update monument list strips to display a thumbnail on one side (based on active language layout).
- Make the strips clickable.
- Clicking opens a Modal displaying:
  - Side A: Large monument image.
  - Side B: Title, Location, Age, and Description.

### 4. Gods & Rulers Page (`src/pages/Gods.jsx`)
- Add a circular or rounded thumbnail image inside each Ruler and Deity card.
- Redesign the existing details Modal:
  - Change from single-column scroll to split side-by-side layout.
  - Side A: High-quality historical image/statue.
  - Side B: Ruler name, reign/title, and accomplishments/myth.

### 5. Translation Adjustments (`src/i18n/translations.js`)
- Ensure all descriptions are structured properly.
- No translation key changes needed, as we will use the existing keys and structure.

## Verification Plan

### Manual Verification
- Run the download script to ensure all 77 images are successfully fetched and saved in `public/images/items/`.
- Verify the UI on desktop and mobile layout (responsive stack).
- Verify RTL (Arabic) flips the image/text side alignment correctly.
