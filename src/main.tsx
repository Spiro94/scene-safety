import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode, Suspense, lazy, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import { store } from './store/store.ts';
import { useAppDispatch } from './hooks/useDispatch.ts';
import { clearAuthState, initializeAuthAsync, setAuthenticatedUser } from './store/slices/authSlice.ts';
import { onAuthStateChange } from './api/supabase.ts';
import LoadingTransition from './components/LoadingTransition.tsx';

const MovieDetails = lazy(() => import('./pages/MovieDetails.tsx'));
const ProtectedRoute = lazy(() => import('./pages/ProtectedRoute.tsx'));
const Results = lazy(() => import('./pages/Results.tsx'));
const Search = lazy(() => import('./pages/Search.tsx'));
const SignIn = lazy(() => import('./pages/SignIn.tsx'));
const SignUp = lazy(() => import('./pages/SignUp.tsx'));
const Trending = lazy(() => import('./pages/Trending.tsx'));
const AppLayout = lazy(() => import('./components/AppLayout.tsx'));


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
        <Suspense fallback={<LoadingTransition message="Loading page..." fullScreen />}>
          <AppBootstrap />
        </Suspense>
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
