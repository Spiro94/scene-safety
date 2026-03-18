import { useQuery } from '@tanstack/react-query';
import { tmdbFetch } from '../utils/constants';
import type { TmdbResponse } from '../models/tmdbResponse';
import type { Movie } from '../models/movie';

export function useTrendingMovies() {
  return useQuery<TmdbResponse<Movie>>({
    queryKey: ['trending'],
    queryFn: () => tmdbFetch<TmdbResponse<Movie>>('/movie/popular'),
  });
}
