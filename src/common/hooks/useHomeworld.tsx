import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPlanetList } from '../../api/swapi';
import { PlanetList } from '../types/homeworld';

const useHomeworld = () => {
  const query = useInfiniteQuery<PlanetList>({
    queryKey: ['planets'],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) => await getPlanetList({ pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.next ? lastPage.next.split('page=')[1] : undefined;
    },
    initialPageParam: 1,
    staleTime: 10 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  });

  // Automatically calls fetchNextPage until all pages are loaded
  React.useEffect(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [query.hasNextPage, query.isFetchingNextPage]);

  return query;
};

export default useHomeworld;
