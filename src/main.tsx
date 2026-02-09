import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import Search from './pages/Search.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Trending from './pages/Trending.tsx';
import MovieDetails from './pages/MovieDetails.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: '/trending',
    element: <Trending />
  },
  {
    path: '/movies/:movieId',
    element: <MovieDetails />
  }
]);

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode >,

)
