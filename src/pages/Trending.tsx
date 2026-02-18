import { useInfiniteQuery } from '@tanstack/react-query'
import MovieCard from '../components/MovieCard'
import type { TrendingResponse } from '../models/trendingResponse'
import { getFetchOptions, TMDB_BASE_URL } from '../utils/constants'
import { useEffect, useRef } from 'react'
import MovieCardSkeleton from '../components/MovieCardSkeleton'
import { useTriggerReportCounts } from '../hooks/useTriggerReportCounts'

export default function Trending() {
    const loadMoreRef = useRef<HTMLDivElement>(null)

    const {
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        ...result
    } = useInfiniteQuery<TrendingResponse>({
        queryKey: ['trending-page'],
        queryFn: ({ pageParam }) =>
            fetch(`${TMDB_BASE_URL}/movie/popular?page=${pageParam}`, getFetchOptions())
                .then(res => res.json()),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            // TMDB returns page and total_pages
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1
            }
            return undefined
        },
    })

    const movieIds = result?.data?.pages.flatMap(page => page.results).map(movie => String(movie.id)) ?? []

    const { data: reportCounts = {} } = useTriggerReportCounts(movieIds);


    // Intersection Observer to trigger loading more
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage()
                }
            },
            { threshold: 0.1 }
        )

        const currentRef = loadMoreRef.current
        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    if (result.isPending) {
        return (
            <div className='px-16 py-8 max-w-7xl mx-auto'>
                <h1 className='text-primary text-4xl font-semibold mb-8'>Trending movies</h1>
                <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6'>
                    {Array.from({ length: 12 }).map((_, index) => (
                        <MovieCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        )
    }

    if (result.error) {
        return <div className='text-primary'>Error loading</div>
    }

    // Flatten all pages into a single array of movies
    const movies = result.data.pages.flatMap(page => page.results)

    return (
        <div className='px-16 py-8 max-w-7xl mx-auto'>
            <h1 className='text-primary text-4xl font-semibold mb-8'>Trending movies</h1>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6'>
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} triggerCount={reportCounts[String(movie.id)] ?? 0} />
                ))}
                {isFetchingNextPage && Array.from({ length: 6 }).map((_, index) => (
                    <MovieCardSkeleton key={`loading-${index}`} />
                ))}
            </div>
            {/* Sentinel element - triggers load when scrolled into view */}
            <div ref={loadMoreRef} className='h-10 mt-4'>
                {isFetchingNextPage && movies.length > 0 && (
                    <div className='text-secondary text-center'>Loading more...</div>
                )}
            </div>
        </div>
    )
}
