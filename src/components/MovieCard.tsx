import { Link } from 'react-router';
import type { Movie } from '../models/movie';
import { BACKDROP_SIZE, TMDB_IMAGE_BASE } from '../utils/constants';

export type MovieCardProps = {
    movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
    const releaseDate = new Date(movie.release_date);
    const posterUrl = `${TMDB_IMAGE_BASE}/${BACKDROP_SIZE}${movie.poster_path}`;
    return (
        <Link to={`/movies/${movie.id}`}>
            <div className='flex flex-col gap-2 bg-card rounded-2xl overflow-hidden max-w-xs hover:scale-105 cursor-pointer transition duration-300 ease-in-out'>
                <img className='aspect-2/3 w-full object-contain bg-black' src={posterUrl} />
                <div className='flex flex-col gap-3 p-4'>
                    <h2 className='text-primary font-semibold text-base'>{movie.original_title}</h2>
                    <h3 className='text-secondary'>{releaseDate.getFullYear()}</h3>
                </div>
            </div>
        </Link>
    )
}
