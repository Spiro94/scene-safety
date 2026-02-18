import { useRef } from "react";
import { useNavigate } from "react-router";
import TrendingNow from "../components/TrendingNow";

export default function Search() {
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        if (query.length > 0) {
            navigate(`/app/results?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="py-40 px-6 flex flex-col items-center gap-8 max-w-3xl mx-auto text-center">
                <h1 className="text-primary text-6xl font-semibold">Know before you watch.</h1>
                <p className="text-secondary text-base">Search any movie to find detailed trigger warnings and content context.</p>
                <input
                    ref={inputRef}
                    id="query"
                    type="text"
                    placeholder="Search movies..."
                    onChange={handleInputChange}
                    className="w-sm sm:w-2xl lg:w-3xl text-secondary py-4 px-6 bg-bg-elevated rounded-2xl"
                />
            </div>
            <TrendingNow />
        </div>
    )
}
