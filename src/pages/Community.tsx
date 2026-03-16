import { Plus } from "lucide-react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useUserTriggerReports } from "../hooks/useTriggerReports";
import StatCard from "../components/StatCard";
import useMovieDetailList from "../hooks/useMovieDetailList";
import { capitalize, dateAgo } from "../utils/helpers";

function CommunitySkeleton() {
    return (
        <div className='flex flex-col gap-8 px-16 py-8 text-primary mx-auto max-w-7xl animate-pulse'>
            <header className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    <div className="h-9 w-80 rounded bg-bg-elevated" />
                    <div className="h-4 w-md rounded bg-bg-elevated" />
                </div>
                <div className="h-10 w-44 rounded-xl bg-bg-elevated" />
            </header>

            <div className="flex flex-col gap-8">
                <div className="flex gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="h-28 flex-1 rounded-2xl bg-card ring-1 ring-border" />
                    ))}
                </div>
                <div className="h-7 w-64 rounded bg-bg-elevated" />
                <div className="rounded-2xl bg-card ring-1 ring-border">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="border-b-border border-b last:border-0 p-5">
                            <div className="h-5 w-72 rounded bg-input" />
                            <div className="mt-3 h-4 w-40 rounded bg-input" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Community() {
    const navigate = useNavigate();
    const { data, isPending, error } = useUserTriggerReports();
    const recentContribution = data?.slice().sort((a, b) => new Date(b.created_at ?? Date.now()).getTime() - new Date(a.created_at ?? Date.now()).getTime()).slice(0, 3);
    const movieIds = recentContribution?.map(report => report.tmdb_movie_id);
    const uniqueMovieIds = [...new Set(movieIds)].filter(Boolean);

    const queries = useMovieDetailList(movieIds);

    function handleNewContribution() {
        navigate('/app/trending');
    }

    function handleReportClick(movieId: string) {
        navigate(`/app/movies/${movieId}`);
    }

    function calculateHelpfulVotes() {
        return data!.map(report => report.helpful_votes).reduce((prev, curr) => prev + curr, 0).toString();
    }

    function calculateAccuracyRating() {
        const totalHelpful = data!.reduce((sum, r) => sum + r.helpful_votes, 0);
        const totalVotes = data!.reduce((sum, r) => sum + r.helpful_votes + r.not_helpful_votes, 0);
        if (totalVotes === 0) return 'N/A';
        return (totalHelpful / totalVotes * 100).toFixed(2) + '%';
    }

    if (isPending) {
        return <CommunitySkeleton />;
    }

    if (error || !data) {
        return (
            <div className='flex flex-col gap-8 px-16 py-8 text-primary mx-auto max-w-7xl'>
                <header className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold">Community Contributions</h1>
                        <p className="text-secondary">
                            Help others by tagging trigger content and sharing context.
                        </p>
                    </div>
                    <Button onClick={handleNewContribution}><Plus size={16} /> New Contribution</Button>
                </header>
                <p className='text-secondary text-sm'>Could not load contributions. Please try again.</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-8 px-16 py-8 text-primary mx-auto max-w-7xl'>
            <header className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold">Community Contributions</h1>
                    <p className="text-secondary">
                        Help others by tagging trigger content and sharing context.
                    </p>
                </div>
                <Button onClick={handleNewContribution}><Plus size={16} /> New Contribution</Button>

            </header>
            <div className="flex flex-col gap-8">
                <div className="flex gap-4">
                    <StatCard value={data.length.toString()} description="Your Contributions" />
                    <StatCard value={calculateAccuracyRating()} description="Accuracy Rating" />
                    <StatCard value={calculateHelpfulVotes()} description="Helpful Votes" valueColor="text-accent-amber" />
                </div>
                <header>
                    <h2 className="text-xl font-semibold">Your Recent Contributions</h2>
                </header>
                <div className="rounded-2xl bg-card ring-1 ring-border">
                    {(() => {
                        const rows = uniqueMovieIds.flatMap((movieId, index) => {
                            const movieQuery = queries[index];
                            const reports = data.filter(report => report.tmdb_movie_id === movieId);
                            return reports.map(report => ({ report, movieQuery }));
                        });

                        return rows.map(({ report, movieQuery }, rowIndex) => {
                            const isFirst = rowIndex === 0;
                            const isLast = rowIndex === rows.length - 1;
                            const roundedClass = isFirst && isLast
                                ? 'rounded-2xl'
                                : isFirst
                                    ? 'rounded-t-2xl'
                                    : isLast
                                        ? 'rounded-b-2xl'
                                        : '';
                            const borderClass = isLast ? '' : 'border-b border-b-border';

                            return <div key={report.id} onClick={() => handleReportClick(report.tmdb_movie_id)} className={`${borderClass} p-5 cursor-pointer hover:bg-bg-elevated transition-colors duration-200 ${roundedClass}`.trim()}>
                                <div className="flex gap-2">
                                    {movieQuery?.isPending && <span className='text-secondary text-sm'>Loading movie details...</span>}
                                    {movieQuery?.isError && <span className='text-secondary text-sm'>Unknown movie</span>}
                                    {movieQuery?.data && <p>{movieQuery.data.title}</p>}
                                    — <p>{capitalize(report.trigger_type)}</p>
                                </div>
                                <p className="text-muted text-sm">Tagged {dateAgo(new Date(report.created_at ?? Date.now()))} · {report.helpful_votes} helpful votes</p>
                            </div>
                        });
                    })()}
                </div>
            </div>
        </div>
    )
}
