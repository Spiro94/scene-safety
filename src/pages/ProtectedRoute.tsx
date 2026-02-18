import { Navigate, Outlet, useLocation } from 'react-router';
import LoadingTransition from '../components/LoadingTransition';
import { useAppSelector } from '../hooks/useAppSelector';

export default function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) return <LoadingTransition message="Checking session..." fullScreen />;
  if (isAuthenticated) return <Outlet />;
  return (
    <Navigate
      to="/"
      replace
      state={{ from: `${location.pathname}${location.search}${location.hash}` }}
    />
  );
}
