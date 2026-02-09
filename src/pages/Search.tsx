import TrendingNow from "../components/TrendingNow";

export default function Search() {
    return (
        <>
            <div className="py-40 px-6 flex flex-col items-center gap-8 max-w-3xl mx-auto text-center">
                <h1 className="text-primary text-6xl font-semibold">Know before you watch.</h1>
                <p className="text-secondary text-base">Search any movie to find detailed trigger warnings and content context.</p>
                <input id="query" type="text" placeholder="Search movies..." prefix="" className="w-sm sm:w-2xl lg:w-3xl text-secondary py-4 px-6 bg-bg-elevated rounded-2xl" />
            </div>
            <TrendingNow />
        </>
    )
}
