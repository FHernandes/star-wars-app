import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharacterTable from './index';
import { getCharacterList } from '../../api/swapi';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

// Mocking API
vi.mock('../../api/swapi', () => ({
  getCharacterList: vi.fn(),
}));

let queryClient = new QueryClient();

describe('CharacterTable', () => {
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should render correctly with characters', async () => {
    (getCharacterList as vi.Mock).mockResolvedValue({
      results: [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          films: [
            'https://swapi.dev/api/films/1/',
            'https://swapi.dev/api/films/2/',
            'https://swapi.dev/api/films/3/',
            'https://swapi.dev/api/films/6/',
          ],
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
      next: null,
      previous: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <CharacterTable
          isLoadingSearch={false}
          searchPage={1}
          setSearchPage={vi.fn()}
          handleSearch={vi.fn()}
        />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/19BBY/i)).toBeInTheDocument();
      expect(screen.getByText(/^4$/i)).toBeInTheDocument();
    });
  });

  test('should show loading state', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CharacterTable
          isLoadingSearch={true}
          searchPage={1}
          setSearchPage={vi.fn()}
          handleSearch={vi.fn()}
        />
      </QueryClientProvider>,
    );

    expect(screen.getByText(/Loading../i)).toBeInTheDocument();
  });

  test('should show error message when data fails to load', async () => {
    (getCharacterList as vi.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <QueryClientProvider client={queryClient}>
        <span> test</span>
        <CharacterTable
          isLoadingSearch={false}
          searchPage={1}
          setSearchPage={vi.fn()}
          handleSearch={vi.fn()}
        />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/Data failed to load/i)).toBeInTheDocument();
    });
  });
});
