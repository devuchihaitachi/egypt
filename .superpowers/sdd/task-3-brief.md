### Task 3: Implement Page Transition Router

**Files:**
- Create: `src/components/Router.jsx`
- Create: `src/components/Router.test.jsx`
- Modify: `src/App.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Produces: Router context or custom router component that handles forward/backward slide transitions.

- [ ] **Step 1: Write the Custom Transition Router**
  Create `src/components/Router.jsx`:
  ```jsx
  import React, { createContext, useContext, useState } from 'react';

  const NavigationContext = createContext();

  export const pages = [
    'home',
    'pyramids',
    'monuments',
    'pharaohs',
    'gods',
    'hieroglyphics',
    'gallery',
    'visit',
    'about'
  ];

  export function NavigationProvider({ children }) {
    const [currentPage, setCurrentPage] = useState('home');
    const [transitionDirection, setTransitionDirection] = useState('forward');

    const navigateTo = (targetPage) => {
      if (!pages.includes(targetPage)) return;
      const currentIndex = pages.indexOf(currentPage);
      const targetIndex = pages.indexOf(targetPage);
      
      if (targetIndex > currentIndex) {
        setTransitionDirection('forward');
      } else {
        setTransitionDirection('backward');
      }
      setCurrentPage(targetPage);
    };

    return (
      <NavigationContext.Provider value={{ currentPage, navigateTo, transitionDirection }}>
        {children}
      </NavigationContext.Provider>
    );
  }

  export function useNavigation() {
    return useContext(NavigationContext);
  }
  ```

- [ ] **Step 2: Add Route transition CSS to index.css**
  Append to `src/index.css`:
  ```css
  .router-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .page-view {
    width: 100%;
    min-height: 100vh;
    padding-top: 80px; /* navbar offset */
    box-sizing: border-box;
  }

  /* Fade & Slide animation for pages */
  @keyframes slideInForward {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInBackward {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .page-enter-forward {
    animation: slideInForward 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .page-enter-backward {
    animation: slideInBackward 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  ```

- [ ] **Step 3: Write tests for the router**
  Create `src/components/Router.test.jsx`:
  ```jsx
  import React from 'react';
  import { render, screen, fireEvent } from '@testing-library/react';
  import { NavigationProvider, useNavigation } from './Router';

  function TestComponent() {
    const { currentPage, navigateTo, transitionDirection } = useNavigation();
    return (
      <div>
        <span data-testid="current-page">{currentPage}</span>
        <span data-testid="direction">{transitionDirection}</span>
        <button onClick={() => navigateTo('pyramids')}>Go to Pyramids</button>
        <button onClick={() => navigateTo('home')}>Go to Home</button>
      </div>
    );
  }

  test('handles page transitions and directions correctly', () => {
    render(
      <NavigationProvider>
        <TestComponent />
      </NavigationProvider>
    );

    expect(screen.getByTestId('current-page').textContent).toBe('home');

    // Navigate forward
    fireEvent.click(screen.getByText('Go to Pyramids'));
    expect(screen.getByTestId('current-page').textContent).toBe('pyramids');
    expect(screen.getByTestId('direction').textContent).toBe('forward');

    // Navigate backward
    fireEvent.click(screen.getByText('Go to Home'));
    expect(screen.getByTestId('current-page').textContent).toBe('home');
    expect(screen.getByTestId('direction').textContent).toBe('backward');
  });
  ```

- [ ] **Step 4: Run the test suite**
  Run:
  ```powershell
  npx.cmd vitest run src/components/Router.test.jsx
  ```
  Expected: Test passes successfully.
