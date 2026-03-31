# Stack Path Mapping

When building, adapt file paths and tooling to the detected stack. Do NOT hardcode Next.js paths when the project uses a different framework.

## Detection

| Signal | Stack |
|--------|-------|
| `next.config.*` in root | Next.js |
| `vite.config.*` in root | React + Vite (or Vue/Svelte — check package.json) |
| `package.json` has `next` dep | Next.js |
| `package.json` has `vite` + `react` deps | React + Vite |
| `package.json` has `vue` dep | Vue |
| `index.html` in root with `<script>` tags | HTML + Tailwind (no framework) |
| No package.json, just .html files | Static HTML |
| Existing project with code | Use whatever it already uses — never switch |

## Path Mapping

| Concept | Next.js (App Router) | React + Vite | HTML + Tailwind |
|---------|---------------------|-------------|----------------|
| **CSS entry point** | `src/app/globals.css` | `src/index.css` | `styles/globals.css` or `<style>` in HTML |
| **Root layout** | `src/app/layout.tsx` | `src/App.tsx` (or `src/main.tsx`) | `index.html` `<body>` |
| **Root page** | `src/app/page.tsx` | `src/App.tsx` or `src/pages/Home.tsx` | `index.html` |
| **Route pages** | `src/app/<route>/page.tsx` | `src/pages/<Route>.tsx` + router | `<route>.html` |
| **Font loading** | `next/font/google` (preferred) | CSS `@import` or `<link>` in index.html | `<link>` in `<head>` |
| **Routing** | File-based (App Router) | React Router (`react-router-dom`) | `<a href>` links |
| **Shared layout** | Layout.tsx wraps children | App.tsx with `<Outlet />` | Repeated HTML or template partials |
| **Build command** | `npm run build` (next build) | `npm run build` (vite build) | N/A (static files) |
| **Dev command** | `npx next dev -p <PORT>` | `npx vite --port <PORT>` | Open file or `npx serve` |
| **Lint command** | `npm run lint` (next lint) | `npm run lint` (eslint) | N/A |

## Rules

1. **Detect stack in Phase 0 or Phase 1.** Record it in the Phase 1 checklist.
2. **Use the correct paths for the detected stack.** If the project is Vite, don't write to `src/app/globals.css`.
3. **If creating a new project and user didn't specify:** Default to Next.js, mention it, let user override.
4. **The completion gate items are path-agnostic.** "The project's CSS entry point has tokens" — not "src/app/globals.css has tokens."
5. **Font loading follows the stack.** Next.js → `next/font`. Everything else → CSS import or link tag.
