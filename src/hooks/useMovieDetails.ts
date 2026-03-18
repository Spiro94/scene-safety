import { useQuery } from '@tanstack/react-query';
import { tmdbFetch } from '../utils/constants';
import type { Movie } from '../models/movie';

function useMovieDetails(movieId?: string) {
  return useQuery<Movie>({
    queryKey: ['movie-details', movieId],
    queryFn: () => tmdbFetch<Movie>(`/movie/${movieId}`),
    enabled: Boolean(movieId),
    staleTime: 60_000,
  });
}

export default useMovieDetails;
