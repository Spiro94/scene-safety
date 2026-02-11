import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router';
import { getFetchOptions, TMDB_BASE_URL } from '../utils/constants';
import useDebounce from '../hooks/debounce';
import type { SearchResponse } from '../models/searchResponse';
import type { Movie } from '../models/movie';
import MovieCard from '../components/MovieCard';
import Button from '../components/Button';
import { ArrowLeftCircleIcon } from 'lucide-react';

export default function Results() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const query = searchParams.get("q") || "";
    const debouncedSearch = useDebounce(query, 500);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(query.length, query.length);
        }
    }, []);

    const { data, isLoading } = useQuery<SearchResponse>({
        queryKey: ['results', debouncedSearch],
        queryFn: () => fetch(`${TMDB_BASE_URL}/search/movie?query=${debouncedSearch}`, getFetchOptions()).then(res => res.json(),),
        enabled: debouncedSearch.length > 0,

    });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newQuery = event.target.value;
        if (newQuery.length > 0) {
            // Update URL without adding to history stack
            navigate(`/results?q=${encodeURIComponent(newQuery)}`, { replace: true });
        } else {
            // Navigate back to search page if query is empty
            navigate('/', { replace: true });
        }
    }

    return (

        <div className='flex flex-col gap-4 items-start px-8 py-6 max-w-7xl mx-auto'>
            <Link to={'/'}>
                <Button type='ghost'><ArrowLeftCircleIcon></ArrowLeftCircleIcon> Back to home</Button>
            </Link>
            <input
                ref={inputRef}
                id="query"
                type="text"
                placeholder="Search movies..."
                defaultValue={query}
                onChange={handleInputChange}
                autoFocus
                className="w-sm sm:w-2xl lg:w-3xl text-secondary py-4 px-6 bg-bg-elevated rounded-2xl"
            />
            {isLoading && <p className='text-primary'>Loading...</p>}
            {(data && data.results) && (
                <>
                    <span className='text-primary text-sm'>{data.results.length} results <span className='text-secondary'>for "{debouncedSearch}"</span></span>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-4 mt-8'>
                        {data.results.map((movie: Movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                </>
            )}
        </div>

    );
}