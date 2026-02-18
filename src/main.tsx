import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode, useEffect } from 'react';
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
import { useAppDispatch } from './hooks/useDispatch.ts';
import { clearAuthState, initializeAuthAsync, setAuthenticatedUser } from './store/slices/authSlice.ts';
import { onAuthStateChange } from './api/supabase.ts';
import AppLayout from './components/AppLayout.tsx';


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
        element: <AppLayout />,
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
          }
        ]
      }
    ],
  }

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppBootstrap />
      </QueryClientProvider>
    </Provider>
  </StrictMode >,
)

function AppBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuthAsync());

    const { data: subscription } = onAuthStateChange(async (_event, session) => {
      const email = session?.user?.email;
      if (email) {
        dispatch(setAuthenticatedUser({ email }));
      } else {
        dispatch(clearAuthState());
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [dispatch]);

  return <RouterProvider router={router} />;
}