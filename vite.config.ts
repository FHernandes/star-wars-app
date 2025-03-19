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
    plugins: [react()],
    define: envWithProcessPrefix,
  };
});
