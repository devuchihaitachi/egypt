### Task 2: Setup CSS Design System & Theme

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: CSS design system containing colors, glassmorphism templates, and animations.

- [ ] **Step 1: Write index.css with CSS Variables**
  Replace contents of `src/index.css`:
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

  :root {
    --bg-main: #0b0b0f;
    --bg-glow: radial-gradient(circle at 50% 50%, #131927 0%, #0b0b0f 80%);
    --color-sandstone: #e2c29d;
    --color-papyrus: #f2e7d5;
    --color-gold: #d4af37;
    --color-lapis: #23497c;
    --glass-fill: rgba(15, 18, 28, 0.65);
    --glass-border: rgba(212, 175, 55, 0.18);
    --glass-border-hover: rgba(212, 175, 55, 0.35);
    --font-heading: 'Cinzel', serif;
    --font-body: 'Inter', sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: var(--bg-main);
    background-image: var(--bg-glow);
    color: var(--color-papyrus);
    font-family: var(--font-body);
    overflow-x: hidden;
    min-height: 100vh;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-heading);
    color: var(--color-sandstone);
    letter-spacing: 1px;
  }

  /* Glassmorphism class */
  .glass-panel {
    background: var(--glass-fill);
    backdrop-filter: blur(24px) saturate(130%);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08), 0 8px 32px rgba(0, 0, 0, 0.5);
    transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }

  @supports not (backdrop-filter: blur(24px)) {
    .glass-panel {
      background: rgba(15, 18, 28, 0.95);
    }
  }

  /* Specular Light Sweep animation */
  .glass-panel-interactive {
    position: relative;
    overflow: hidden;
  }

  .glass-panel-interactive::after {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(212, 175, 55, 0.15) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-25deg);
    transition: 0.75s;
  }

  .glass-panel-interactive:hover::after {
    left: 150%;
  }

  .glass-panel-interactive:hover {
    border-color: var(--glass-border-hover);
    transform: translateY(-4px);
    box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.12), 0 12px 40px rgba(0, 0, 0, 0.6);
  }
  ```

- [ ] **Step 2: Update App.jsx to verify styling**
  Verify the glass styling:
  ```jsx
  import React from 'react';

  function App() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="glass-panel glass-panel-interactive" style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px' }}>
          <h1>Eternal Egypt</h1>
          <p style={{ marginTop: '1rem', color: 'var(--color-papyrus)' }}>
            Experience the majesty of ancient history.
          </p>
        </div>
      </div>
    );
  }

  export default App;
  ```

- [ ] **Step 3: Run npm run build**
  Run:
  ```powershell
  npm.cmd run build
  ```
  Expected: Build succeeds with zero errors.
