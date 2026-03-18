import { useQueries } from '@tanstack/react-query';
import { tmdbFetch } from '../utils/constants';
import type { Movie } from '../models/movie';

function useMovieDetailList(movieIds: string[] | undefined) {
  const uniqueIds = [...new Set(movieIds)].filter(Boolean);
  return useQueries({
    queries: uniqueIds.map((id) => ({
      queryKey: ['movie-details', id],
      queryFn: () => tmdbFetch<Movie>(`/movie/${id}`),
      enabled: Boolean(id),
      staleTime: 60_000,
    })),
  });
}

export default useMovieDetailList;
