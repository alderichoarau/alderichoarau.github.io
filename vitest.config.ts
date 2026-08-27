/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import angular from '@analogjs/vite-plugin-angular';

// Mirrors the "paths" mapping in tsconfig.json — Vite doesn't read tsconfig
// paths on its own, so the same aliases are declared here for Vitest.
const src = (path: string) => fileURLToPath(new URL(`./src/app/${path}`, import.meta.url));

export default defineConfig({
  plugins: [angular()],
  resolve: {
    alias: {
      '@app': src(''),
      '@core': src('core'),
      '@features': src('features'),
      '@shared': src('shared'),
      '@root': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      exclude: [
        'node_modules/',
        'src/test-setup.ts',
        '**/*.config.*',
        'src/main.ts',
        'src/environments/**',
      ],
      thresholds: {
        statements: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
});
