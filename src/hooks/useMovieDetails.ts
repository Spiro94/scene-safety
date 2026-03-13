import { useQuery } from '@tanstack/react-query';
import { getFetchOptions, TMDB_BASE_URL } from '../utils/constants';
import type { Movie } from '../models/movie';

function useMovieDetails(movieId?: string) {
  return useQuery<Movie>({
    queryKey: ['movie-details', movieId],
    queryFn: () =>
      fetch(`${TMDB_BASE_URL}/movie/${movieId}`, getFetchOptions()).then(
        (res) => res.json(),
      ),
    enabled: Boolean(movieId),
    staleTime: 60_000,
  });
}

export default useMovieDetails;
