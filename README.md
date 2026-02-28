# TunaFin Landing Page

Informational landing page for [TunaFin](https://tunafin.io) — portfolio tracker and trade analysis app.

## Logo

Place your logo SVG at `public/logo.svg`. It will be used in the nav and footer. If the file is missing, a broken image will appear until you add it.

## Tech Stack

- Vite + React 18 + Tailwind CSS
- Deployed to GitHub Pages via GitHub Actions

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `dist/`.

## Deployment

1. Push to GitHub
2. Enable GitHub Pages: Settings > Pages > Source: **GitHub Actions**
3. Ensure DNS for tunafin.io points to GitHub Pages (see [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))

The workflow deploys on every push to `main`.
