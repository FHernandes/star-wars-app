import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');

  // Convert Vite env variables into process.env
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => ({
      ...prev,
      [`process.env.${key}`]: JSON.stringify(val),
    }),
    {},
  );

  return {
    server: {
      port: 3000,
      open: false,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      mockReset: true,
    },
    plugins: [react()],
    define: envWithProcessPrefix,
  };
});
