# عدسة (Adasa) — Photography Blog

React + React Router project built for Assignment 14, styled to match the
reference (`adasa-psi.vercel.app`): near-black background, single orange
accent, Cairo typeface. Renders posts/categories/site info from a local
`posts.json` file (treated as a mock API response) — no backend calls, per
the assignment brief.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Pages / Routing (`react-router-dom`)

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Hero, category shortcuts, featured + latest posts |
| `/blog` | Blog | Search, category filter, grid/list toggle, pagination |
| `/blog/:slug` | Blog Details | Full post content, tags, related posts |
| `*` (and `/404`) | 404 | Custom not-found page |

## Blog page features

- **Search** — filters by title, excerpt and tags as you type.
- **Category filter** — plain buttons (not nav/tab links) that filter by
  state, so the UI never needs a real navigation per category.
- **Grid / List view toggle**.
- **Pagination (bonus)** — 6 posts per page with numbered controls.

Search, category, view and page are all kept in the URL's query string
(`?q=&category=&view=&page=`), so results are shareable/bookmarkable and
the browser back/forward buttons work correctly.

## Project structure

```
src/
  components/   Navbar, Footer, PostCard, SearchBar, CategoryFilter,
                ViewToggle, Pagination, ScrollToTop
  pages/        Home, Blog, BlogDetails, NotFound
  data/         posts.json (mock API data) + category color mapping
  styles/       global.css (tokens/base) + layout.css (components)
```

## Data

`src/data/posts.json` is used exactly as given — the assignment's data
file, treated as if it were a JSON response from a backend.
