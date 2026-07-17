# Remove GEM Informational Opening Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the informational full opening note card from the GEM page.

**Architecture:** Modify `src/pages/GEM.jsx` to delete the `<div className="glass-panel gem-info-note">` block.

**Tech Stack:** React, Vitest.

## Global Constraints

- No React state changes.
- All existing tests must pass or be updated.

---

### Task 1: Update GEM.jsx

**Files:**
- Modify: `src/pages/GEM.jsx`

**Interfaces:**
- Consumes: None
- Produces: Cleaner GEM page view markup without the info banner card

- [ ] **Step 1: Remove the informational note banner block**

In `src/pages/GEM.jsx`, delete:
```javascript
          {/* Informational Banner about full opening */}
          <div className="glass-panel gem-info-note">
            <p>{t('gem.fullOpeningNote')}</p>
          </div>
```

- [ ] **Step 2: Commit**

Run:
```bash
git add src/pages/GEM.jsx
git commit -m "feat: remove full opening informational note from GEM page"
```

---

### Task 2: Verify and Test

**Files:**
- None

**Interfaces:**
- Consumes: Test runner
- Produces: Passing test suite

- [ ] **Step 1: Run all tests to verify**

Run: `cmd /c npm run test`
Expected: All 15 tests pass.
