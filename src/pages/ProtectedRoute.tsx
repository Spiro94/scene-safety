import { useTranslation } from 'react-i18next';
import { Navigate, Outlet, useLocation } from 'react-router';
import LoadingTransition from '../components/LoadingTransition';
import { useAppSelector } from '../hooks/useAppSelector';

export default function ProtectedRoute() {
  const { t } = useTranslation();
  const location = useLocation();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  if (loading) return <LoadingTransition message={t('protectedRoute.checkingSession')} fullScreen />;
  if (isAuthenticated) return <Outlet />;
  return (
    <Navigate
      to="/"
      replace
      state={{ from: `${location.pathname}${location.search}${location.hash}` }}
    />
  );
}
