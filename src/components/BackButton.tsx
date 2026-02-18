import { ChevronLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'

type BackButtonProps = {
    fallbackTo?: string;
};

function normalizeAppPath(path: string) {
    if (path.startsWith('/app/')) return path;
    if (path.startsWith('/')) return `/app${path}`;
    return `/app/${path}`;
}

export default function BackButton({ fallbackTo = '/app/search' }: BackButtonProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as { from?: string } | null)?.from;
    const normalizedFrom = from ? normalizeAppPath(from) : undefined;

    const handleBack = () => {
        if (normalizedFrom) {
            navigate(normalizedFrom);
            return;
        }

        if (window.history.length > 1) {
            navigate(-1);
            return;
        }

        navigate(fallbackTo, { replace: true });
    };

    return (
        <button
            onClick={handleBack}
            className='inline-flex gap-4 text-secondary cursor-pointer items-center hover:text-primary transition duration-200 ease-in-out'
        >
            <ChevronLeft />
            Back
        </button>
    )
}
