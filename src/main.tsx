import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import MovieDetails from './pages/MovieDetails.tsx';
import ProtectedRoute from './pages/ProtectedRoute.tsx';
import Results from './pages/Results.tsx';
import Search from './pages/Search.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import Trending from './pages/Trending.tsx';
import { store } from './store/store.ts';


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/sign_up',
    element: <SignUp />
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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode >,

)
