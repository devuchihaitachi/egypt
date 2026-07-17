# Design Spec: Expanded Archaeological Discoveries & UNESCO World Heritage Sites

This design spec details the expansion of the "Archaeological Discoveries" and "UNESCO World Heritage Sites" pages with rich, Wikipedia-sourced historical content, interactive details modals, and a new section for the UNESCO Tentative List.

## Proposed Changes

### 1. Translation System Expansion (`src/i18n/translations.js`)
We will add comprehensive English and Arabic translation strings containing detailed historical information, locations, years, discoverers, key landmarks, and conservation details.

#### Discoveries Schema
- **`discoveries.fields`**: Labels for `year`, `location`, `discoverer`, `artifacts`, `significance`.
- **`discoveries.items`**: Expanded from 3 to 7 items:
  - `saqqara`: Saqqara Mummy Workshop & Tombs (2018)
  - `luxor`: Lost Golden City of Luxor (2021)
  - `aswan`: Graeco-Roman Tombs in Aswan (2019)
  - `tutankhamun`: Tomb of Tutankhamun (1922)
  - `rosetta`: The Rosetta Stone (1799)
  - `khufuship`: Khufu Solar Ship (1954)
  - `abydos`: Abydos Royal Brewery (2021)

#### UNESCO Schema
- **`unesco.fields`**: Labels for `year`, `location`, `landmarks`, `significance`, `threats`.
- **`unesco.sites`**: Detailed fields for each of the 7 registered sites (Historic Cairo, Memphis, Ancient Thebes, Nubian Monuments, Abu Mena, Saint Catherine, Wadi Al-Hitan).
- **`unesco.tentative`**: New section for Egypt's tentative list candidates:
  - `siwa`: Siwa Oasis
  - `dahshur`: Dahshur Necropolis
  - `abydos`: Abydos Sacred City
  - `rosetta`: Historic Town of Rosetta

### 2. Discoveries Page React Component (`src/pages/Discoveries.jsx`)
- Show card tags for `Year` and `Location` using Lucide icons.
- Add click handlers on discovery cards to open a detail `Modal`.
- Render a detailed metadata grid inside the modal:
  - Discovered By
  - Year & Location
  - Key Artifacts
  - Detailed Historical Narrative

### 3. UNESCO Page React Component (`src/pages/UNESCO.jsx`)
- Render registration `Year` and `Location` on the site cards.
- Add click handlers to open a detail `Modal`.
- In the modal, display:
  - Key Monuments
  - Historical Significance
  - Conservation Status & Threats (e.g. soil instability in Abu Mena)
- Add a new bottom section **UNESCO Tentative List (القائمة المؤقتة لليونسكو)** rendering 4 interactive cards of candidates with custom, clean aesthetics.

## Verification Plan

### Automated Tests
- Run `npm test` to ensure all existing test suites continue to pass.
- Add basic component rendering test assertions if needed.

### Manual Verification
- Test interactive modals for both Discoveries and UNESCO pages.
- Switch languages (EN <-> AR) to verify that text formatting, alignments, and RTL/LTR translations are fully correct and responsive.
- Verify that modals are fully dismissible by clicking the 'X' button or clicking the background overlay.
