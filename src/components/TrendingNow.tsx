import { Link } from 'react-router';
import { useTrendingMovies } from '../hooks/useTrendingMovies';
import { useTriggerReportCounts } from '../hooks/useTriggerReportCounts';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';

export default function TrendingNow() {
    const { isPending, error, data } = useTrendingMovies();
    const movies = data?.results.slice(0, 6) ?? [];
    const movieIds = movies.map((m) => String(m.id));
    const { data: reportCounts = {} } = useTriggerReportCounts(movieIds);

    let content;

    if (isPending) {
        content = (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                {Array.from({ length: 6 }).map((_, index) => (
                    <MovieCardSkeleton key={index} />
                ))}
            </div>
        )
    }

    if (error) {
        content = <p className='text-primary'>An error has occurred ...</p>
    }

    if (data) {
        content = <div className='grid grid-cols-6 gap-4'>
            {movies.map(movie => {
                return <MovieCard key={movie.id} movie={movie} triggerCount={reportCounts[String(movie.id)] ?? 0} />
            })}
        </div>
    }

    return (
        <>
            <div className='px-16 mb-8 flex flex-col gap-10'>
                <div className='flex justify-between '>
                    <h1 className='text-primary text-xl font-semibold'>Trending Now</h1>
                    <Link to='/app/trending' className='text-accent-teal text-sm cursor-pointer hover:text-accent-teal-light'>See all</Link>
                </div>
                {content}
            </div>
        </>
    )
}
