# Nimbus (Click-to-Fix sample site)

A small React + Vite marketing site ("Nimbus") that serves as the **host application** for the Click-to-Fix demo. It is intentionally a plain, realistic landing page (nav, hero, logos, features, pricing, testimonial, CTA, footer) so you have something concrete to click on and edit.

## What makes it special

A Babel plugin (`datasrc-babel-plugin.js`) stamps each rendered host element with:

- `data-src="file:line:col"` - the exact source location, and
- `data-comp="ComponentName"` - the owning component.

This is the "source stamping" that lets the Click-to-Fix extension map a clicked DOM element back to its source. The extension also reads React fiber props/names at runtime for extra enrichment.

### Staging-instrumented build (enriched data on a deployed site)

For the extension to work against a *deployed* site (e.g. on Vercel), the built output must carry the same enrichment a dev server has. This build emits it by default (`vite build`):

| Feature | Why | How |
|---|---|---|
| `data-src` / `data-comp` stamps | map a click to source (resolution R1) | Babel plugin runs in the build |
| Sourcemaps ("the map") | map a location back to source when a stamp is missing (R2) | `build.sourcemap` |
| Un-mangled component names | keep the runtime fiber walk useful after minify | `esbuild.keepNames` |
| `<meta name="c2f-build-sha">` / `c2f-build-flavor` | build/release identity the extension can read off the DOM | injected at build time (uses `VERCEL_GIT_COMMIT_SHA` when present) |

Instrumentation is **on by default** for this sample (its whole purpose is to be the host). Set `CLICK_TO_FIX=0` to produce a clean, un-instrumented build:

```bash
CLICK_TO_FIX=0 npm run build   # no stamps, no sourcemaps (production-clean)
```

> A real production app would invert this (opt-in) so source paths never ship to end users. See §5/§12 of the technical design.

The app also emits a `c2f:hmr` window event after each Vite HMR update, which the overlay listens for to re-capture the page after an edit.

## Deploy to Vercel

`vercel.json` is preconfigured (framework `vite`, build `npm run build`, output `dist`). Import the repo in Vercel and it deploys as a staging-instrumented build with no extra settings. The commit SHA is picked up automatically from `VERCEL_GIT_COMMIT_SHA`.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server on port 5173 (with `data-src` stamping) |
| `npm run build` | Type-check and build the production bundle to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |

## Tech stack

- React 18
- Vite 6
- TypeScript
- A custom dev-only Babel plugin for `data-src` stamping
