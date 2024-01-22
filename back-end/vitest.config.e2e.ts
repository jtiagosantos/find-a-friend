import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e.spec.ts'],
    globals: true,
    root: './',
    environment: './prisma/environments/vitest-environment-prisma.ts',
  },
  plugins: [swc.vite()],
});
