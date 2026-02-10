export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const BACKDROP_SIZE = 'w1280';

export function getFetchOptions(method: string = 'GET') {
  return {
    method: method.toUpperCase(),
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };
}
