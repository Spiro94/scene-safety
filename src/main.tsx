import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import Search from './pages/Search.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Trending from './pages/Trending.tsx';
import MovieDetails from './pages/MovieDetails.tsx';
import Results from './pages/Results.tsx';
import ProtectedRoute from './pages/ProtectedRoute.tsx';
import SignIn from './pages/SignIn.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    element: <ProtectedRoute />,
    path: '/app',
    children: [
      {
        path: "/app/search",
        element: <Search />,
      },
      {
        path: '/app/trending',
        element: <Trending />
      },
      {
        path: '/app/movies/:movieId',
        element: <MovieDetails />
      },
      {
        path: '/app/results',
        element: <Results />
      }],
  }

]);

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode >,

)
