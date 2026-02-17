import { Navigate, Outlet, useLocation } from 'react-router';
import { useAppSelector } from '../hooks/useAppSelector';

export default function ProtectedRoute() {
  const location = useLocation();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) return <div>Checking session...</div>;
  if (isAuthenticated) return <Outlet />;
  return (
    <Navigate
      to="/"
      replace
      state={{ from: `${location.pathname}${location.search}${location.hash}` }}
    />
  );
}
