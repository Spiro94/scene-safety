import { useQueries } from '@tanstack/react-query';
import { getFetchOptions, TMDB_BASE_URL } from '../utils/constants';

function useMovieDetailList(movieIds: string[] | undefined) {
  const uniqueIds = [...new Set(movieIds)].filter(Boolean);
  return useQueries({
    queries: uniqueIds.map((id) => ({
      queryKey: ['movie-details', id],
      queryFn: () =>
        fetch(`${TMDB_BASE_URL}/movie/${id}`, getFetchOptions()).then((res) =>
          res.json(),
        ),
      enabled: Boolean(id),
      staleTime: 60_000,
    })),
  });
}

export default useMovieDetailList;
