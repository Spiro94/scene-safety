import { Plus } from "lucide-react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useUserTriggerReports } from "../hooks/useTriggerReports";
import StatCard from "../components/StatCard";
import useMovieDetailList from "../hooks/useMovieDetailList";
import { capitalize, dateAgo } from "../utils/helpers";

export default function Community() {
    const navigate = useNavigate();
    const { data, isPending, error } = useUserTriggerReports();
    const recentContribution = data?.sort((a, b) => new Date(b.created_at ?? Date.now()).getTime() - new Date(a.created_at ?? Date.now()).getTime()).slice(0, 3);
    const movieIds = recentContribution?.map(report => report.tmdb_movie_id);
    const uniqueMovieIds = [...new Set(movieIds)].filter(Boolean);

    const queries = useMovieDetailList(movieIds);

    function handleNewContribution() {
        navigate('/app/trending');
    }

    function calculateHelpfulVotes() {
        return data!.map(report => report.helpful_votes).reduce((prev, curr) => prev + curr, 0).toString();
    }

    function calculateAccuracyRating() {
        const totalAccuracy = data!.map(report => report.accuracy_score).reduce((prev, curr) => prev + curr, 0).toString();
        return totalAccuracy === '0' ? 'N/A' : (parseFloat(totalAccuracy) / data!.length).toFixed(2) + '%';
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
            {
                isPending && <p>Loading...</p>
            }
            {
                error && <p className="text-red-500">Error loading contributions. Please try again later.</p>
            }
            {
                data && (
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
                            {
                                uniqueMovieIds!.map((movieId, index) => {
                                    const movieQuery = queries[index];
                                    const reports = data.filter(report => report.tmdb_movie_id === movieId);
                                    return <>
                                        {reports.map(report => {
                                            return <div key={report.tmdb_movie_id} className="border-b-border border-b last:border-0 p-5">
                                                <div className="flex gap-2">
                                                    {movieQuery?.isPending && <p>Loading movie details...</p>}
                                                    {movieQuery?.isError && <p className="text-red-500">Error loading movie details</p>}
                                                    {movieQuery?.data && <p>{movieQuery.data.title}</p>}
                                                    — <p>{capitalize(report.trigger_type)}</p>
                                                </div>
                                                <p className="text-muted text-sm">Tagged {dateAgo(new Date(report.created_at ?? Date.now()))}</p>
                                            </div>
                                        })}
                                    </>
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}
