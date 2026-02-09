import { useQuery } from '@tanstack/react-query';
import type { Movie } from '../models/movie';
import { BACKDROP_SIZE, getFetchOptions, TMDB_BASE_URL, TMDB_IMAGE_BASE } from '../utils/constants';
import { useParams } from 'react-router';



export default function MovieDetails() {
    const { movieId } = useParams<{ movieId: string }>();


    const { isPending, error, data } = useQuery<Movie>({
        queryKey: ['movie-details', movieId],
        queryFn: () => fetch(`${TMDB_BASE_URL}/${movieId}`, getFetchOptions()).then(res => res.json())
    })



    if (isPending) {
        return <>Loading...</>
    }

    if (error) {
        return <>Error</>
    }

    const posterUrl = `${TMDB_IMAGE_BASE}/${BACKDROP_SIZE}${data.poster_path}`;
    const releaseDate = new Date(data.release_date);

    return (
        <div className='px-8 py-6 text-primary '>
            <div className='flex gap-6'>
                <img src={posterUrl} alt={data.original_title} className='w-48' />
                <div className="flex flex-col gap-4">
                    <h1 className='font-bold text-4xl'>{data.original_title}</h1>
                    <div className="inline-flex gap-4 text-secondary text-sm ">
                        <h2>{releaseDate.getFullYear()}</h2>
                        <h2>{data.runtime}</h2>
                    </div>
                    <p className='text-secondary text-sm'>
                        {data.overview}
                    </p>
                </div>
            </div>
        </div>
    )
}
