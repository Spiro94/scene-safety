import { useQuery } from '@tanstack/react-query';
import { getFetchOptions, TMDB_BASE_URL } from '../utils/constants';
import type { TmdbResponse } from '../models/tmdbResponse';
import type { Movie } from '../models/movie';

export function useTrendingMovies() {
  return useQuery<TmdbResponse<Movie>>({
    queryKey: ['trending'],
    queryFn: () =>
      fetch(`${TMDB_BASE_URL}/movie/popular`, getFetchOptions()).then((res) =>
        res.json(),
      ),
  });
}
