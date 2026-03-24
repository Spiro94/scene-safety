# SafeWatch

A community-powered trigger warning platform for movies and TV — know what's in a film before it knows you.

---

## Motivation

My wife loves movies, but she has several phobias that can turn a relaxing movie night into an anxious one. The problem is that standard ratings and synopses tell you almost nothing about _what kind of content_ is actually in a film. She would often start watching something only to be blindsided by a scene involving spiders, heights, or medical procedures — things that no star rating or genre tag warns you about.

SafeWatch was built to solve exactly that. It's a platform where users can report the specific triggers found in a movie — with timestamps, severity levels, and phobia categories — so that anyone can check before pressing play.

---

## Features

- **Movie search & trending discovery** — powered by the TMDB API
- **Trigger reports** — community-submitted warnings covering 45+ phobia categories (arachnophobia, claustrophobia, trypophobia, and many more)
- **Severity & timestamps** — each report includes a severity level (low / medium / high) and the approximate time the scene occurs
- **Community voting** — mark reports as helpful or not helpful to surface the most accurate ones
- **User contributions** — track your own reports and their community reception
- **Bilingual** — full English and Spanish support

---

## Tech Stack

| Category     | Library / Tool                  |
| ------------ | ------------------------------- |
| Framework    | React 19, TypeScript 5          |
| Build        | Vite 8                          |
| Styling      | Tailwind CSS 4                  |
| Routing      | React Router 7                  |
| Client state | Redux Toolkit 2 + react-redux   |
| Server state | TanStack Query v5               |
| Forms        | React Hook Form                 |
| Backend      | Supabase (Auth + PostgreSQL)    |
| External API | TMDB (The Movie Database)       |
| i18n         | i18next + react-i18next         |
| Icons        | lucide-react                    |
| Testing      | Jest 30 + React Testing Library |

---

## Architecture

### Directory Structure

```
src/
├── api/          # Supabase client and query functions
├── components/   # Reusable UI components (cards, dialogs, inputs, skeletons)
├── hooks/        # Custom React hooks — all API calls live here
├── models/       # TypeScript interfaces and types
├── pages/        # Route-level page components
├── store/        # Redux Toolkit store and slices
├── utils/        # Constants, helper functions, i18n translation files
├── i18n.ts       # i18next configuration
└── main.tsx      # App entry point — providers, router, lazy routes
```

### State Management

SafeWatch uses a deliberate two-layer state strategy:

**Redux Toolkit** (`src/store/`) handles client-only state — specifically authentication:

- `authSlice` stores the current user, loading flag, and error state
- Async thunks (`createAsyncThunk`) manage the full auth lifecycle: `initializeAuthAsync`, `signInAsync`, `signUpAsync`, `signOutAsync`
- A Supabase `onAuthStateChange` subscription drives automatic session sync

**TanStack Query v5** handles all server state via 15 custom hooks in `src/hooks/`:

- `useMovieDetails` / `useMovieDetailList` — TMDB movie data
- `useTrendingMovies` — infinite-paginated trending feed
- `useTriggerReport` / `useUserTriggerReports` — trigger report fetching
- `useSubmitTriggerReport` / `useUpdateTriggerReport` / `useDeleteReport` — mutations
- `useSubmitUserVote` — community voting
- `useUserProfile` — user stats

This separation means Redux never touches remote data, and TanStack Query never touches auth — each layer does exactly one job.

### React Patterns

| Pattern                     | Where it's used                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| **Lazy loading + Suspense** | Every route component is `lazy()`-imported; `LoadingTransition` is the Suspense fallback        |
| **Custom hooks**            | All data fetching is encapsulated in hooks — pages never call APIs directly                     |
| **Protected routes**        | `ProtectedRoute` wraps `/app/*` and redirects unauthenticated users by reading Redux auth state |
| **Intersection Observer**   | Drives infinite scroll on the Trending page                                                     |
| **React Hook Form**         | Manages form state and validation on SignIn / SignUp                                            |
| **i18next**                 | Runtime language switching between EN and ES without page reload                                |

### Routing

```
/             →  SignIn          (public)
/sign_up      →  SignUp          (public)

/app/search        →  Movie search page
/app/trending      →  Trending movies with infinite scroll
/app/movies/:id    →  Movie detail + community trigger reports
/app/results       →  Search results (query via ?q=)
/app/community     →  User's own contributions and stats
```

All `/app/*` routes are wrapped in `ProtectedRoute`.

### API Integrations

**TMDB** — movie metadata, search, and trending

- Base URL: `https://api.themoviedb.org/3`
- Auth: Bearer token stored in environment variable
- All calls go through a `tmdbFetch()` utility that injects credentials

**Supabase** — backend-as-a-service

- Auth: email/password via Supabase Auth
- Database: PostgreSQL with tables for `trigger_reports`, `trigger_report_votes`, and `user_profiles`
- Custom RPC functions: `get_trigger_reports_by_movie`, `get_full_trigger_reports`

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [TMDB API key](https://developer.themoviedb.org/docs)
- A [Supabase](https://supabase.com) project

### Environment Variables

Create a `.env` file at the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_bearer_token
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running Locally

```bash
npm install
npm run dev
```

### Other Commands

```bash
npm run build    # Type-check + production build
npm run preview  # Preview the production build locally
npm run lint     # ESLint
npm test         # Jest in watch mode
```
