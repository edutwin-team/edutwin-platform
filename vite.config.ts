import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import pkg from './package.json';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  base: '/',
  test: {
    globals: true, // permet d'utiliser describe/it/expect sans import
    environment: 'jsdom', // simule le DOM pour React
    setupFiles: './tests/setupTests.ts',
    include: ['tests/**/*.test.{ts,tsx}'], // fichiers de test
  },
});
