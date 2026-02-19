import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import MovieCard from "./MovieCard";
import type { Movie } from "../models/movie";

jest.mock("../utils/constants", () => ({
    BACKDROP_SIZE: "w1280",
    TMDB_IMAGE_BASE: "https://image.tmdb.org/t/p",
}));

const movie: Movie = {
    id: 1,
    original_title: "Test Movie",
    title: "Test Movie",
    overview: "A test movie overview",
    poster_path: "/test.jpg",
    backdrop_path: "/backdrop.jpg",
    release_date: "2024-01-01",
    vote_average: 8.5,
    vote_count: 100,
    genre_ids: [1, 2],
    popularity: 10.0,
    original_language: "en",
    video: false,
    adult: false,
    runtime: 120,
};

describe("MovieCard", () => {
    it("renders correctly", () => {
        render(
            <MemoryRouter>
                <MovieCard movie={movie} />
            </MemoryRouter>,
        );
        expect(
            screen.getByRole("heading", { name: /test movie/i }),
        ).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /2024/i })).toBeInTheDocument();
        expect(screen.getByRole('img', { name: /test movie/i })).toBeInTheDocument();

    });

    it("does not show a badge when triggerCount is 0", () => {
        render(
            <MemoryRouter>
                <MovieCard movie={movie} triggerCount={0} />
            </MemoryRouter>,
        );
        expect(screen.queryByText(/low|medium|high/i)).not.toBeInTheDocument();
    });

    describe('when trigger count of 1-2', () => {
        it('shows a Low Badge for', () => {
            render(
                <MemoryRouter>
                    <MovieCard movie={movie} triggerCount={2} />
                </MemoryRouter>,
            );
            expect(screen.getByText(/low/i)).toBeInTheDocument();
        })
    });

    describe('when trigger count of 3-5', () => {
        it('shows a Low Badge for', () => {
            render(
                <MemoryRouter>
                    <MovieCard movie={movie} triggerCount={4} />
                </MemoryRouter>,
            );
            expect(screen.getByText(/medium/i)).toBeInTheDocument();
        })
    });

    describe('when trigger count of 6+', () => {
        it('shows a Low Badge for', () => {
            render(
                <MemoryRouter>
                    <MovieCard movie={movie} triggerCount={10} />
                </MemoryRouter>,
            );
            expect(screen.getByText(/high/i)).toBeInTheDocument();
        })
    });
});

