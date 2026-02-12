import { useQuery } from '@tanstack/react-query';
import { Plus, ShieldAlert } from 'lucide-react';
import { useRef } from 'react';
import { useParams } from 'react-router';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import TriggerCard from '../components/TriggerCard';
import TriggerCardSkeleton from '../components/TriggerCardSkeleton';
import { useTriggerReport } from '../hooks/useTriggerReport';
import type { Movie } from '../models/movie';
import { BACKDROP_SIZE, getFetchOptions, TMDB_BASE_URL, TMDB_IMAGE_BASE } from '../utils/constants';
import { normalizeRuntime } from '../utils/helpers';



export default function MovieDetails() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        dialogRef.current!.showModal();
    };

    const closeModal = () => {
        dialogRef.current!.close();
    };
    const { movieId } = useParams<{ movieId: string }>();

    const { isPending, error, data } = useQuery<Movie>({
        queryKey: ['movie-details', movieId],
        queryFn: () => fetch(`${TMDB_BASE_URL}/movie/${movieId}`, getFetchOptions()).then(res => res.json())
    })
    const { isPending: reportIsPending, error: reportError, data: reportData } = useTriggerReport(movieId)

    if (!movieId) {
        return <>No movie ID - 404</>
    }

    if (isPending) {
        return <>Loading...</>
    }

    if (error || !movieId) {
        return <>Error</>
    }

    const posterUrl = `${TMDB_IMAGE_BASE}/${BACKDROP_SIZE}${data.poster_path}`;
    const releaseDate = new Date(data.release_date);

    return (
        <div className='px-16 py-8 text-primary mx-auto max-w-7xl'>
            <BackButton />
            <div className='flex gap-8 mt-8'>
                <img src={posterUrl} alt={data.original_title} className='w-48 rounded-2xl' />
                <div className="flex flex-col gap-4">
                    <h1 className='font-bold text-4xl'>{data.original_title}</h1>
                    <div className="inline-flex gap-4 text-secondary text-sm ">
                        <h2>{releaseDate.getFullYear()}</h2>
                        <h2>{normalizeRuntime(data.runtime)}</h2>
                    </div>
                    <p className='text-secondary text-sm/relaxed max-w-prose '>
                        {data.overview}
                    </p>
                </div>
            </div>
            <div className='mt-8'>
                <div className='flex justify-between items-center'>
                    <div className='inline-flex gap-3 items-center'><ShieldAlert className='text-accent-amber'></ShieldAlert> <h2 className='font-semibold text-2xl'>Trigger Warnings</h2></div>
                    <div className='inline-flex items-center gap-4'>
                        {reportData && <p className='text-secondary text-sm'>{`${reportData.length} triggers identified`}</p>}
                        <Button onClick={() => { openModal() }}><Plus size={16} />Report trigger</Button>
                    </div>
                    <Dialog movieId={movieId} ref={dialogRef} onClose={closeModal}></Dialog>
                </div>
                <div className='mt-6 flex flex-col gap-4'>
                    {reportIsPending && Array.from({ length: 3 }).map((_, index) => (
                        <TriggerCardSkeleton key={index} />
                    ))}
                    {!reportIsPending && reportError && (
                        <p className='text-secondary text-sm'>Could not load trigger warnings.</p>
                    )}
                    {!reportIsPending && !reportError && reportData?.map(report => {
                        return <TriggerCard key={report.id} report={report} />
                    })}
                </div>
            </div>
        </div>
    )
}
