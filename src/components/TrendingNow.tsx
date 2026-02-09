import { useQuery } from '@tanstack/react-query';
import type { TrendingResponse } from '../models/trendingResponse';
import { getFetchOptions, TMDB_BASE_URL } from '../utils/constants';
import MovieCard from './MovieCard';
import { Link } from 'react-router';

export default function TrendingNow() {
    const { isPending, error, data } = useQuery<TrendingResponse>({
        queryKey: ['trending'],
        queryFn: () => fetch(`${TMDB_BASE_URL}/popular`, getFetchOptions()).then(res => res.json())
    })

    let content;

    if (isPending) {
        content = <p className='text-primary'>Loading info</p>
    }

    if (error) {
        content = <p className='text-primary'>An error has occurred ...</p>
    }

    if (data) {
        content = <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
            {data.results.slice(0, 6).map(movie => {
                return <MovieCard key={movie.id} movie={movie} />
            })}
        </div>
    }

    return (
        <>
            <div className='px-16 mb-8 flex flex-col gap-10'>
                <div className='flex justify-between '>
                    <h1 className='text-primary text-xl font-semibold'>Trending Now</h1>
                    <Link to='/trending' className='text-accent-teal text-sm cursor-pointer hover:text-accent-teal-light'>See all</Link>
                </div>
                {content}
            </div>
        </>
    )
}
