### Task 1: Scaffold React + Vite Project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `vitest.config.js`
- Create: `src/test/setup.js`

**Interfaces:**
- Produces: Base project structure and running build system.

- [ ] **Step 1: Scaffold the project structure**
  Run in workspace:
  ```powershell
  npx.cmd -y create-vite@latest ./ --template react --overwrite
  ```
  Expected: React Vite project structure created in the current directory.

- [ ] **Step 2: Install dependencies including Vitest and Lucide React**
  Run in workspace:
  ```powershell
  npm.cmd install lucide-react
  npm.cmd install -D vitest @testing-library/react @testing-library/jest-dom jsdom
  ```
  Expected: Dependencies installed successfully.

- [ ] **Step 3: Setup Vite and Vitest configuration**
  Create `vite.config.js` to support local preview:
  ```javascript
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    server: {
      port: 3000
    }
  });
  ```
  Create `vitest.config.js`:
  ```javascript
  import { defineConfig } from 'vitest/config';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.js'
    }
  });
  ```
  Create `src/test/setup.js`:
  ```javascript
  import '@testing-library/jest-dom';
  ```

- [ ] **Step 4: Clean default files and verify setup**
  Remove `src/App.css` and write a basic clean `src/App.jsx`:
  ```jsx
  import React from 'react';

  function App() {
    return (
      <div className="app">
        <h1>Eternal Egypt</h1>
      </div>
    );
  }

  export default App;
  ```
  Run test check:
  ```powershell
  npx.cmd vitest run
  ```
  Expected: Runs with no test files found (which is fine).
