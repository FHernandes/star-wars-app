import '@testing-library/jest-dom';
import dotenv from 'dotenv';
import { vi } from 'vitest';

dotenv.config();

// Mocking `import.meta.env` in Vitest to avoid errors
Object.defineProperty(global, 'import.meta', {
  value: {
    env: {
      VITE_SWAPI_API_URL: process.env.VITE_SWAPI_API_URL || 'https://swapi.dev/api/',
      VITE_DATABANK:
        process.env.VITE_DATABANK ||
        'https://starwars-databank-server.vercel.app/api/v1/characters',
    },
  },
});
