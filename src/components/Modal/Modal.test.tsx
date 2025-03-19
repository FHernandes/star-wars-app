import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Modal from './index';
import { getCharacter, getHomeworld } from '../../api/swapi';
import { getCharacterByName } from '../../api/databank';

// API Mock
vi.mock('../../api/swapi', () => ({
  getCharacter: vi.fn(),
  getHomeworld: vi.fn(),
}));

vi.mock('../../api/databank', () => ({
  getCharacterByName: vi.fn(),
}));

const queryClient = new QueryClient();

describe('Modal', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should display character details correctly', async () => {
    // Mock to return a valid character
    (getCharacter as vi.Mock).mockResolvedValue({
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
      birth_year: '19BBY',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/2/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/6/',
      ],
      homeworld: 'https://swapi.dev/api/planets/1/',
    });

    // Mock to return the character's homeworld
    (getHomeworld as vi.Mock).mockResolvedValue({
      name: 'Tatooine',
      terrain: 'desert',
      climate: 'arid',
      population: '200000',
    });

    // Mock to return the character image
    (getCharacterByName as vi.Mock).mockResolvedValue({
      image: 'https://example.com/luke-skywalker.jpg',
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Modal isOpen={true} onClose={vi.fn()} id={1} />
      </QueryClientProvider>,
    );

    // Wait for character's data to load
    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/1.72/i)).toBeInTheDocument(); // Height (in meters)
      expect(screen.getByText(/77/i)).toBeInTheDocument(); // Mass (kg)
      expect(screen.getByText(/male/i)).toBeInTheDocument(); // Gender
      expect(screen.getByText(/19BBY/i)).toBeInTheDocument(); // Birth year
      expect(screen.getByText(/4/i)).toBeInTheDocument(); // Number of films
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument(); // Homeworld Name
      expect(screen.getByText(/desert/i)).toBeInTheDocument(); // Homeworld Terrain
      expect(screen.getByText(/arid/i)).toBeInTheDocument(); // Homeworld Climate
      expect(screen.getByText(/200000/i)).toBeInTheDocument(); // Homeworld Population
    });

    // Wait for the character's image to load
    await waitFor(() => {
      expect(screen.getByRole('img', { name: /Luke Skywalker/i })).toHaveAttribute(
        'src',
        'https://example.com/luke-skywalker.jpg',
      );
    });
  });
});
