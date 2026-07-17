### Task 6: Implement Hieroglyphics Name Decoder Widget

**Files:**
- Create: `src/pages/Hieroglyphics.jsx`
- Create: `src/pages/Hieroglyphics.test.jsx`

**Interfaces:**
- Produces: Mapped dictionary translate system that translates English alphanumeric letters A-Z to custom SVG hieroglyphic symbols.

- [ ] **Step 1: Write Hieroglyphics Page and decoder logic**
  Create `src/pages/Hieroglyphics.jsx` with full mapping:
  ```jsx
  import React, { useState } from 'react';
  import ScrollReveal from '../components/ScrollReveal';

  // SVG representation for each hieroglyphic letter A-Z
  export const HIEROGLYPHS_MAP = {
    A: { name: 'Vulture', svg: 'M10 20 L20 10 L30 20 L20 30 Z M20 15 L25 20 L20 25 L15 20 Z' },
    B: { name: 'Foot', svg: 'M12 25 h8 v5 h-8 z M16 5 v20' },
    C: { name: 'Basket', svg: 'M5 10 h30 v10 c0 10-10 10-10 10 H15 c0 0-10 0-10-10 Z' },
    D: { name: 'Hand', svg: 'M5 20 h20 v5 H5 z M15 10 v10 M20 15 h5' },
    E: { name: 'Feather', svg: 'M10 30 Q20 5 30 30 Z M20 15 v15' },
    F: { name: 'Horned Viper', svg: 'M5 15 c5-5 10 5 15 0 s10-5 15 0 M10 15 v5' },
    G: { name: 'Jar Stand', svg: 'M10 30 L15 10 h10 L30 30 Z' },
    H: { name: 'Reed Shelter', svg: 'M10 10 h20 v20 h-20 z M15 10 v20 M25 10 v20' },
    I: { name: 'Reed Leaf', svg: 'M15 30 C15 10 25 10 25 30 Z' },
    J: { name: 'Cobra', svg: 'M10 25 C10 10 20 10 20 25 C20 30 30 30 30 20' },
    K: { name: 'Basket with handle', svg: 'M5 15 h30 v10 c0 10-10 10-10 10 H15 c0 0-10 0-10-10 Z M5 15 c0-5 5-5 5 0' },
    L: { name: 'Lion', svg: 'M5 25 c0-15 15-15 20-5 h10 v5 Z' },
    M: { name: 'Owl', svg: 'M10 20 L15 10 L20 15 L25 10 L30 20 Z M15 20 v10 M25 20 v10' },
    N: { name: 'Water Wave', svg: 'M5 20 L10 15 L15 20 L20 15 L25 20 L30 15 L35 20' },
    O: { name: 'Lasso', svg: 'M10 20 C10 10 30 10 30 20 C30 30 10 30 10 20 Z M15 20 C15 15 25 15 25 20 C25 25 15 25 15 20 Z' },
    P: { name: 'Stool', svg: 'M10 20 h20 v10 h-20 z' },
    Q: { name: 'Slope', svg: 'M5 30 L20 10 L35 30 Z' },
    R: { name: 'Mouth', svg: 'M5 20 C10 10 30 10 35 20 C30 30 10 30 5 20 Z' },
    S: { name: 'Folded Cloth', svg: 'M10 10 h10 v20 h-10 Z M20 20 h10 v10 h-10 Z' },
    T: { name: 'Loaf of Bread', svg: 'M10 30 C10 15 30 15 30 30 Z' },
    U: { name: 'Quail Chick', svg: 'M10 25 Q20 10 30 20 T20 30 Z' },
    V: { name: 'Horned Viper', svg: 'M5 15 c5-5 10 5 15 0 s10-5 15 0 M10 15 v5' },
    W: { name: 'Quail Chick', svg: 'M10 25 Q20 10 30 20 T20 30 Z' },
    X: { name: 'Basket + Folded Cloth', svg: 'M5 15 h15 v10 H5 Z M20 10 h10 v20 H20 Z' },
    Y: { name: 'Double Reed Leaf', svg: 'M10 30 C10 10 18 10 18 30 Z M22 30 C22 10 30 10 30 30 Z' },
    Z: { name: 'Door Bolt', svg: 'M5 20 h30 M15 10 v20 M25 10 v20' }
  };

  export default function Hieroglyphics() {
    const [name, setName] = useState('');

    const decoded = name
      .toUpperCase()
      .split('')
      .filter((char) => HIEROGLYPHS_MAP[char]);

    return (
      <div className="page-view container-hieroglyphics">
        <ScrollReveal>
          <div className="hieroglyphics-header">
            <h1>Hieroglyphics Translator</h1>
            <p>Enter your English name to see how it is spelled in ancient hieroglyphs.</p>
          </div>
        </ScrollReveal>

        <div className="hieroglyphics-layout">
          <ScrollReveal delay={100}>
            <div className="glass-panel input-panel">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                placeholder="Type your name (e.g. KHUFU)"
                className="name-input"
                maxLength={12}
              />
              <div className="keyboard-preview">
                <small>Use alphabetic letters A-Z only.</small>
              </div>
            </div>
          </ScrollReveal>

          {decoded.length > 0 && (
            <ScrollReveal delay={200}>
              <div className="glass-panel cartouche-display">
                <div className="cartouche-border">
                  <div className="cartouche-glyphs">
                    {decoded.map((item, idx) => (
                      <div key={idx} className="glyph-item" title={item.name}>
                        <svg viewBox="0 0 40 40" className="glyph-svg">
                          <path
                            d={item.svg}
                            fill="none"
                            stroke="var(--color-gold)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="glyph-letter">{name[idx]?.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    );
  }
  ```
  Add Hieroglyphics CSS to `src/index.css`:
  ```css
  .container-hieroglyphics {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  .hieroglyphics-header h1 {
    font-size: 2.5rem;
    color: var(--color-gold);
    margin-bottom: 0.5rem;
  }
  .hieroglyphics-layout {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 3rem;
    align-items: center;
  }
  .input-panel {
    padding: 2rem;
    width: 100%;
    max-width: 500px;
  }
  .name-input {
    width: 100%;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    color: var(--color-papyrus);
    font-size: 1.25rem;
    text-align: center;
    outline: none;
    letter-spacing: 2px;
  }
  .name-input:focus {
    border-color: var(--color-gold);
  }
  .cartouche-display {
    padding: 3rem;
    display: inline-block;
    background: radial-gradient(circle, rgba(20, 20, 30, 0.9) 0%, rgba(10, 10, 15, 0.95) 100%);
    border: 2px solid var(--color-gold);
    box-shadow: 0 0 25px rgba(212, 175, 55, 0.25);
  }
  .cartouche-border {
    border: 2px solid var(--color-gold);
    border-radius: 40px;
    padding: 1.5rem 2.5rem;
    background: rgba(0, 0, 0, 0.3);
    min-height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .cartouche-glyphs {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  .glyph-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60px;
  }
  .glyph-svg {
    width: 50px;
    height: 50px;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
  }
  .glyph-letter {
    font-size: 0.8rem;
    color: var(--color-sandstone);
    margin-top: 0.5rem;
  }
  ```

- [ ] **Step 2: Write tests for Hieroglyphics mapper**
  Create `src/pages/Hieroglyphics.test.jsx`:
  ```jsx
  import React from 'react';
  import { render, screen, fireEvent } from '@testing-library/react';
  import Hieroglyphics, { HIEROGLYPHS_MAP } from './Hieroglyphics';

  test('HIEROGLYPHS_MAP maps letters to correct hieroglyphs', () => {
    expect(HIEROGLYPHS_MAP.A.name).toBe('Vulture');
    expect(HIEROGLYPHS_MAP.Z.name).toBe('Door Bolt');
    expect(HIEROGLYPHS_MAP['1']).toBeUndefined();
  });

  test('translates inputs to hieroglyphic cartouche', () => {
    render(<Hieroglyphics />);
    const input = screen.getByPlaceholderText(/Type your name/);
    fireEvent.change(input, { target: { value: 'ABC' } });
    
    // Check that we render the glyph items (vulture, foot, basket)
    expect(screen.getByTitle('Vulture')).toBeInTheDocument();
    expect(screen.getByTitle('Foot')).toBeInTheDocument();
    expect(screen.getByTitle('Basket')).toBeInTheDocument();
  });
  ```

- [ ] **Step 3: Run the test suite**
  Run:
  ```powershell
  npx.cmd vitest run src/pages/Hieroglyphics.test.jsx
  ```
  Expected: Test passes successfully.
