import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { searchCharacterByName } from '../../api/swapi';
import { CharacterList } from '../types/character';

const useSearchCharacter = (name: string) => {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery<CharacterList>({
    queryKey: ['search', name],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) =>
      await searchCharacterByName(name, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.next ? lastPage.next.split('page=')[1] : undefined;
    },
    initialPageParam: 1,
    staleTime: 10 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  });

  // Invalidate query when have a different search name
  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['search'] });
  }, [name, queryClient]);

  // Automatically calls fetchNextPage until all pages are loaded
  React.useEffect(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [query.hasNextPage, query.isFetchingNextPage]);

  return query;
};

export default useSearchCharacter;
