import { Navigate, Outlet, useLocation } from 'react-router';

export default function ProtectedRoute() {

    const location = useLocation();

    if (true) {
        return <Outlet />
    }

    return <Navigate to='/' replace state={{ from: location }} />
}
