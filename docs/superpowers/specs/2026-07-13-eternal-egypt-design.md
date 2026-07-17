# Design Spec: Eternal Egypt Website

**Date:** 2026-07-13  
**Status:** Draft  
**Author:** Antigravity (AI Coding Assistant)  
**Topic:** Eternal Egypt - Immersive Liquid Glass Website  

---

## 1. Project Goal & Overview
Create a modern, immersive, multi-page website called **"Eternal Egypt"** showcasing the wonders of ancient Egyptian civilization. The site features 9 distinct sections/pages with fluid slide transitions, backdrop-filter glassmorphism ("liquid glass"), dynamic count-up animations, and custom interactive widgets (including a Hieroglyphics Name Decoder).

---

## 2. Visual Style & Theme
*   **Background:** Deep Obsidian Black (`#0B0B0F`) with a radial gradient of Midnight Blue (`#131927`) centered on the viewport, evoking a desert night sky.
*   **Palette:**
    *   *Primary (Sandstone Beige):* `#E2C29D`
    *   *Secondary (Papyrus Cream):* `#F2E7D5`
    *   *Accent (Antique Gold):* `#D4AF37`
    *   *Contrast (Lapis Lazuli Blue):* `#23497C`
    *   *Glass Card Fill:* `rgba(15, 18, 28, 0.65)`
    *   *Glass Card Border:* `rgba(212, 175, 55, 0.18)`
*   **Typography:**
    *   *Headings:* `Cinzel`, `Marcellus` (Google Fonts) - elegant serif style suggesting stone carvings and cartouches.
    *   *Body Copy:* `Inter`, `Manrope` (Google Fonts) - highly readable modern sans-serif.
*   **Glass panels ("Liquid Glass"):**
    *   `backdrop-filter: blur(24px) saturate(130%)`
    *   Inner glow: `box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 8px 32px rgba(0, 0, 0, 0.5)`
    *   Specular sweep: A CSS linear-gradient animation on hover, mimicking light sweeping across the glass.
*   **Iconography:** Custom inline SVGs representing Egyptian icons:
    *   Ankh (Life)
    *   Eye of Horus (Protection)
    *   Scarab (Rebirth)
    *   Obelisk (Monuments)
    *   Lotus (Creation)

---

## 3. Site Structure & Pages (Single Page App routing)
The app is built as a single-page React application with smooth sliding view transitions based on navigational ordering:
1.  **Home:** Full-screen sunset pyramids background image, floating glass navbar, bold headline, call-to-action (CTA), and an animated chevron scroll indicator.
2.  **The Pyramids:** Grid of glass cards representing Giza, Saqqara, Bent, and Red Pyramids, showing key statistics (height, age, builder).
3.  **Temples & Monuments:** Carousel/cards for Karnak, Luxor Temple, Abu Simbel, and the Great Sphinx.
4.  **Pharaohs & Dynasties:** Historical timeline spanning Old, Middle, and New Kingdoms. Individual cards detailing Khufu, Hatshepsut, Ramses II, and Tutankhamun.
5.  **Gods & Mythology:** Interactive grid of the pantheon (Ra, Osiris, Isis, Anubis, Horus, Thoth). Clicking on any god launches a glass modal recounting their legend.
6.  **Hieroglyphics Decoder:** An interactive text input box. Typing letters converts them into realistic Egyptian hieroglyph glyph SVGs, with a card display that can be viewed and screenshot.
7.  **Gallery:** Masonry grid of artifacts and monuments (e.g. golden mask, statues, columns). Clicking any image opens a full-screen glass lightbox.
8.  **Plan Your Visit:** Travel guide detailing travel tips, entry prices, best seasons to visit, and a stylized map representation.
9.  **About / Contact:** Project credits, reference sources, and a functional glass-morphic contact form.

---

## 4. Technical Stack
*   **Framework:** React + Vite (Javascript/JSX)
*   **Styling:** Vanilla CSS (custom design system, utility variables, media queries)
*   **Animations:** Native CSS animations & transitions + Intersection Observer API for scroll reveals and count-ups.
*   **Icons:** Custom inline SVGs for authentic Egyptian motifs, combined with Lucide icons for standard actions (close, menu, chevron, etc.).
*   **Asset Management:** Local high-quality generated images placed in `/public/images/` folder (such as `giza-hero.jpg`, `karnak.jpg`, etc.) using AI image generation.

---

## 5. Interactions & Transitions
*   **Page Slider:** Custom page router component. Pages slide in from the right when moving forward in the navigation menu, and slide in from the left when moving backward, with a 600ms cubic-bezier transition (`cubic-bezier(0.16, 1, 0.3, 1)`).
*   **Navbar Scroll Effect:** Low opacity (e.g., 0.1) over the hero page, shifting to higher opacity (`rgba(11, 11, 15, 0.85)`) and blurred state on scroll.
*   **Scroll Reveal:** An `IntersectionObserver` wrapper component that adds a `.visible` class to elements when they enter the viewport, triggering CSS fade-in and slide-up.
*   **Dynamic Count-up:** Numbers (e.g. "4500 years old", "146 meters tall") animate up from 0 to target value when their parent enters the viewport.

---

## 6. Verification & Test Plan
*   **Responsiveness:** Verify layouts on mobile (375px+), tablet (768px+), and desktop (1200px+) views.
*   **Performance:** Check that backdrop-filter blur does not lag on mobile browsers (provide graceful fallbacks to solid dark backgrounds if blur is unsupported).
*   **Accessibility:** Proper semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`), `alt` text on all images, and keyboard navigable interactive widgets.
