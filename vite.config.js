import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User site (gorkemergune.github.io) serves from root, so base = '/'.
// If you ever convert this to a project site (username.github.io/repo-name),
// change base to '/repo-name/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
