import type { Movie } from './movie';

export type TrendingResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};
