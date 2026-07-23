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
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setupTests.ts',
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/mocks/**',
        'src/**/*.mock.ts',
        'src/types/**',
      ],
    },
  },
});
