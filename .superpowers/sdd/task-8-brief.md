### Task 8: Assemble Application & Verify Final Build

**Files:**
- Modify: `src/App.jsx` — wire all pages, Navbar, and page transitions
- Verify: `index.html` — check title/meta tags are correct
- Verify: `npm run build` — zero errors
- Verify: `npm run lint` — zero errors
- Verify: `npx vitest run` — all tests pass

---

## App.jsx Rewrite

Replace `src/App.jsx` entirely with the following:

```jsx
import { NavigationProvider, useNavigation } from './components/Router';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Pyramids from './pages/Pyramids';
import Monuments from './pages/Monuments';
import Pharaohs from './pages/Pharaohs';
import Gods from './pages/Gods';
import Hieroglyphics from './pages/Hieroglyphics';
import Gallery from './pages/Gallery';
import PlanVisit from './pages/PlanVisit';
import About from './pages/About';

const pageComponents = {
  home: Home,
  pyramids: Pyramids,
  monuments: Monuments,
  pharaohs: Pharaohs,
  gods: Gods,
  hieroglyphics: Hieroglyphics,
  gallery: Gallery,
  visit: PlanVisit,
  about: About,
};

function AppContent() {
  const { currentPage, transitionDirection } = useNavigation();
  const PageComponent = pageComponents[currentPage] || Home;

  return (
    <div className="app-shell">
      <Navbar />
      <main
        key={currentPage}
        className={`page-transition page-transition-${transitionDirection}`}
      >
        <PageComponent />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
```

---

## index.html — Verify/Update Head Section

Ensure `index.html` has these correct meta tags (update if different):

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Explore 5,000 years of ancient Egyptian history — pyramids, pharaohs, gods, and hieroglyphics — through a stunning liquid-glass interface." />
    <title>Eternal Egypt — Journey Through Ancient History</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## CSS — Verify page-transition classes exist in index.css

Check `src/index.css` for `.page-transition`, `.page-transition-forward`, `.page-transition-backward`. If missing, append these:

```css
/* Page transitions */
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-transition {
  flex: 1;
  animation-duration: 0.4s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

.page-transition-forward {
  animation-name: slideInRight;
}

.page-transition-backward {
  animation-name: slideInLeft;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

---

## Navbar Integration Check

The `Navbar` component in `src/components/Navbar.jsx` already uses `useNavigation()` and calls `navigateTo(page)`. The pages array exported from `Router.jsx` is:
```
['home', 'pyramids', 'monuments', 'pharaohs', 'gods', 'hieroglyphics', 'gallery', 'visit', 'about']
```

The `pageComponents` map in App.jsx MUST match these exact keys:
- `home` → Home
- `pyramids` → Pyramids
- `monuments` → Monuments
- `pharaohs` → Pharaohs
- `gods` → Gods
- `hieroglyphics` → Hieroglyphics
- `gallery` → Gallery
- `visit` → PlanVisit ← note: key is 'visit', component is PlanVisit
- `about` → About

---

## Verification Steps

1. `npm.cmd run build` — must succeed with zero errors
2. `npm.cmd run lint` — zero errors
3. `npx.cmd vitest run` — all 10 tests pass
4. `npm.cmd run dev` — run dev server (wait 3 seconds), confirm it starts, kill it
