/**
 * Returns the correct image path, accounting for the Vite base URL
 * so images work both locally (/) and on GitHub Pages (/egypt/).
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const img = (path) => `${base}${path}`;
