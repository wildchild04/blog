# Wildchild Blog (Jekyll + Vite + React)

This project uses Jekyll for static site hosting and React (via Vite) for the blog UI and client-side routing.

## Stack

- Jekyll (Ruby)
- Vite + React + TypeScript
- HashRouter (`react-router-dom`)
- `@wildchild/design-system` (private repo via SSH)

## Routing Model

- Jekyll serves the shell page at `/`.
- React handles in-app routes via hash paths:
  - `/#/` (blog home)
  - `/#/post/:slug` (blog post page)

## Scripts

- `npm run dev`
  - Runs Jekyll in development mode (`--livereload`)
  - Runs Vite dev server for HMR
  - `index.html` loads scripts from `http://127.0.0.1:5173/...`

- `npm run run-jekyll`
  - Builds Vite bundle first
  - Installs Ruby gems (if needed)
  - Serves Jekyll with `JEKYLL_ENV=production`
  - `index.html` loads `/assets/js/blog-app.js`

- `npm run build`
  - Builds Vite output into `assets/js/blog-app.js`

- `npm run typecheck`
  - Runs TypeScript type checks

## First-Time Setup

```bash
npm install
npm run bundle-install
```

## Local Development

```bash
npm run dev
```

Open `http://127.0.0.1:4000/`.

## Production-Like Local Serve

```bash
npm run run-jekyll
```

## CI / GitHub Pages

Workflow file: `.github/workflows/pages.yml`

Build steps:
1. `npm ci`
2. `npm run build`
3. `bundle exec jekyll build`
4. Deploy `_site`
