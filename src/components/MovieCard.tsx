import { Link, useLocation } from 'react-router';
import type { Movie } from '../models/movie';
import { BACKDROP_SIZE, TMDB_IMAGE_BASE } from '../utils/constants';
import { getTriggerBadgeLevel } from '../utils/helpers';
import Fallback from '../assets/no-image.png';

export type MovieCardProps = {
    movie: Movie;
    from?: string;
    triggerCount?: number;
};

const badgeStyles = {
    low: 'bg-accent-teal-muted text-accent-teal',
    medium: 'bg-accent-amber-muted text-accent-amber',
    high: 'bg-accent-red-muted text-accent-red',
} as const;

const badgeLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
} as const;

export default function MovieCard({
    movie,
    from,
    triggerCount = 0,
}: MovieCardProps) {
    const location = useLocation();
    const [year] = movie.release_date.split('-');
    const posterUrl = `${TMDB_IMAGE_BASE}/${BACKDROP_SIZE}${movie.poster_path}`;
    const badgeLevel = getTriggerBadgeLevel(triggerCount);
    const shouldShowBadge = badgeLevel !== 'none';
    const currentPath = `${location.pathname}${location.search}${location.hash}`;
    const sourcePath = from ?? currentPath;

    return (
        <Link to={`/app/movies/${movie.id}`} state={{ from: sourcePath }}>
            <div className='flex flex-col gap-2 bg-card rounded-2xl overflow-hidden max-w-xs hover:scale-105 cursor-pointer transition duration-300 ease-in-out'>
                <img
                    className='aspect-2/3 w-full object-cover bg-black'
                    src={posterUrl}
                    alt={movie.original_title}
                    onError={(e) => {
                        e.currentTarget.src = Fallback;
                        e.currentTarget.onerror = null;
                    }}
                />
                <div className='flex flex-col gap-3 p-4 items-start'>
                    <div className='flex items-center justify-between gap-2'>
                        <h2 className='text-primary font-semibold text-base line-clamp-1'>
                            {movie.original_title}
                        </h2>

                    </div>
                    <h3 className='text-secondary'>{year}</h3>
                    {shouldShowBadge && (
                        <span
                            className={`rounded-full px-3 py-2 text-xs font-semibold ${badgeStyles[badgeLevel]}`}
                        >
                            {badgeLabels[badgeLevel]}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
