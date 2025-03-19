import '@testing-library/jest-dom';
import dotenv from 'dotenv';

dotenv.config();

// Mocking `import.meta.env` in Jest to avoid errors
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

// Global `fetch` mock to avoid API call failures during testing
global.fetch = jest.fn(async (url) => {
  return {
    json: async () =>
      Promise.resolve({
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        gender: 'male',
        birth_year: '19BBY',
        films: ['https://swapi.dev/api/films/1/'],
        homeworld: 'https://swapi.dev/api/planets/1/',
      }),
    ok: true,
  };
}) as jest.Mock;
