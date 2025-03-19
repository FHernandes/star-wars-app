import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharacterTable from './index';

const queryClient = new QueryClient();

describe('Character Modal Tests', () => {
  test('should open modal and display character details', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CharacterTable
          filteredCharacters={{
            count: 1,
            results: [
              {
                name: 'Luke Skywalker',
                url: 'https://swapi.dev/api/people/1/',
                birth_year: '19BBY',
                films: [],
              },
            ],
          }}
          isLoadingSearch={false}
          searchPage={1}
          setSearchPage={jest.fn()}
          handleSearch={jest.fn()}
        />
      </QueryClientProvider>,
    );

    // Click on "View more" button
    fireEvent.click(screen.getByText(/view more/i));

    // Wait for modal to appear
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});
