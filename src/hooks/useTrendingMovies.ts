import { useQuery } from '@tanstack/react-query';
import type { TrendingResponse } from '../models/trendingResponse';
import { getFetchOptions, TMDB_BASE_URL } from '../utils/constants';

export function useTrendingMovies() {
  return useQuery<TrendingResponse>({
    queryKey: ['trending'],
    queryFn: () =>
      fetch(`${TMDB_BASE_URL}/movie/popular`, getFetchOptions()).then((res) =>
        res.json(),
      ),
  });
}
