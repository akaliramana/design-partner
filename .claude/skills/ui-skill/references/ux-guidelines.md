# UX Guidelines — Quick Reference (§1-§10)

200+ specific, measurable UX rules organized by priority. Load during Phase 4 (build) and Flow G (review).

## Priority Order: §1-§3 CRITICAL/HIGH → check first. §4-§6 HIGH/MEDIUM → check during build. §7-§10 MEDIUM/LOW → polish pass.

---

## §1. Accessibility (CRITICAL)

- `color-contrast` — Minimum 4.5:1 for normal text, 3:1 for large text
- `focus-states` — Visible focus rings on interactive elements (2-4px)
- `alt-text` — Descriptive alt text for meaningful images
- `aria-labels` — aria-label for icon-only buttons
- `keyboard-nav` — Tab order matches visual order; full keyboard support
- `form-labels` — Use `<label>` with `for` attribute
- `skip-links` — Skip to main content for keyboard users
- `heading-hierarchy` — Sequential h1→h6, no level skip
- `color-not-only` — Don't convey info by color alone (add icon/text)
- `reduced-motion` — Respect `prefers-reduced-motion`
- `escape-routes` — Provide cancel/back in modals and multi-step flows
- `keyboard-shortcuts` — Preserve system shortcuts; offer keyboard alternatives for drag-and-drop

## §2. Touch & Interaction (CRITICAL)

- `touch-target-size` — Min 44x44pt (Apple) / 48x48dp (Material); extend hit area if needed
- `touch-spacing` — Minimum 8px gap between touch targets
- `hover-vs-tap` — Use click/tap for primary; don't rely on hover alone
- `loading-buttons` — Disable during async; show spinner
- `error-feedback` — Clear error messages near the problem
- `cursor-pointer` — Add cursor-pointer to clickable elements (Web)
- `gesture-conflicts` — Avoid horizontal swipe on main content
- `tap-delay` — Use `touch-action: manipulation` to reduce 300ms delay
- `press-feedback` — Visual feedback on press (ripple/highlight)
- `safe-area-awareness` — Keep targets away from notch, Dynamic Island, gesture bar
- `no-precision-required` — Avoid requiring pixel-perfect taps on small targets

## §3. Performance (HIGH)

- `image-optimization` — Use WebP/AVIF, responsive srcset/sizes, lazy load
- `image-dimension` — Declare width/height or aspect-ratio to prevent CLS
- `font-loading` — Use font-display: swap/optional; preload critical fonts only
- `critical-css` — Prioritize above-the-fold CSS
- `lazy-loading` — Lazy load non-hero components via dynamic import
- `bundle-splitting` — Split by route/feature (React Suspense / Next.js dynamic)
- `reduce-reflows` — Batch DOM reads then writes
- `content-jumping` — Reserve space for async content (CLS < 0.1)
- `virtualize-lists` — Virtualize lists with 50+ items
- `progressive-loading` — Skeleton screens for operations > 1s
- `debounce-throttle` — Debounce/throttle scroll, resize, input events

## §4. Style Selection (HIGH)

- `style-match` — Match style to product type (use `--design-system`)
- `consistency` — Same style across all pages
- `no-emoji-icons` — Use SVG icons (Lucide, Heroicons), NEVER emojis
- `effects-match-style` — Shadows, blur, radius aligned with chosen style
- `state-clarity` — Hover/pressed/disabled visually distinct
- `elevation-consistent` — Consistent shadow scale; no random values
- `dark-mode-pairing` — Design light/dark together; test contrast separately
- `icon-style-consistent` — One icon set (stroke width, corner radius) across product
- `primary-action` — One primary CTA per screen; secondary actions subordinate

## §5. Layout & Responsive (HIGH)

- `viewport-meta` — `width=device-width initial-scale=1` (never disable zoom)
- `mobile-first` — Design mobile-first, scale up
- `breakpoint-consistency` — Systematic breakpoints: 375 / 768 / 1024 / 1440
- `readable-font-size` — Minimum 16px body on mobile (avoids iOS auto-zoom)
- `line-length-control` — Mobile 35-60 chars; desktop 60-75 chars per line
- `horizontal-scroll` — No horizontal scroll on mobile
- `spacing-scale` — 4px/8px incremental spacing system
- `container-width` — Consistent max-width on desktop (max-w-6xl / 7xl)
- `z-index-management` — Layered scale: 0 / 10 / 20 / 40 / 100 / 1000
- `fixed-element-offset` — Fixed elements reserve safe padding for content below
- `content-priority` — Core content first on mobile; fold secondary
- `visual-hierarchy` — Hierarchy via size, spacing, contrast — not color alone

## §6. Typography & Color (MEDIUM)

- `line-height` — 1.5-1.75 for body text
- `line-length` — 65-75 characters per line
- `font-pairing` — Match heading/body font personalities
- `font-scale` — Consistent scale: 12 / 14 / 16 / 18 / 24 / 32
- `weight-hierarchy` — Bold headings (600-700), Regular body (400), Medium labels (500)
- `color-semantic` — Semantic tokens (primary, error, surface), not raw hex
- `color-dark-mode` — Desaturated/lighter variants, not inverted; test contrast separately
- `color-accessible-pairs` — Foreground/background ≥ 4.5:1 (AA) or 7:1 (AAA)
- `number-tabular` — Tabular figures for data columns, prices, timers
- `whitespace-balance` — Intentional whitespace to group/separate; avoid clutter

## §7. Animation (MEDIUM)

- `duration-timing` — 150-300ms for micro-interactions; ≤400ms for complex; never >500ms
- `transform-performance` — Only animate transform/opacity; never width/height/top/left
- `loading-states` — Skeleton/progress after 300ms
- `easing` — ease-out for enter, ease-in for exit; never linear for UI
- `motion-meaning` — Every animation = cause-effect, not decorative
- `state-transition` — State changes animate smoothly, never snap
- `exit-faster-than-enter` — Exit ~60-70% of enter duration
- `interruptible` — User tap/gesture cancels animation immediately
- `no-blocking-animation` — Never block input during animation
- `layout-shift-avoid` — Animations must not cause reflow; use transform

## §8. Forms & Feedback (MEDIUM)

- `input-labels` — Visible label per input (not placeholder-only)
- `error-placement` — Error below the field, not just at top
- `submit-feedback` — Loading → success/error on submit
- `required-indicators` — Mark required fields (asterisk)
- `empty-states` — Helpful message + action when no content
- `progressive-disclosure` — Reveal complex options progressively
- `inline-validation` — Validate on blur, not keystroke
- `error-recovery` — Error messages include recovery path (retry, edit, help)
- `focus-management` — After submit error, auto-focus first invalid field
- `destructive-emphasis` — Destructive actions use danger color, visually separated

## §9. Navigation Patterns (HIGH)

- `bottom-nav-limit` — Max 5 items with labels + icons
- `back-behavior` — Predictable and consistent; preserve scroll/state
- `deep-linking` — All key screens reachable via URL
- `nav-label-icon` — Both icon AND text label; icon-only harms discoverability
- `nav-state-active` — Current page visually highlighted
- `nav-hierarchy` — Primary vs secondary nav clearly separated
- `breadcrumb-web` — Breadcrumbs for 3+ level deep hierarchies
- `state-preservation` — Back navigation restores scroll position and filter state
- `navigation-consistency` — Nav placement stays same across all pages
- `avoid-mixed-patterns` — Don't mix Tab + Sidebar + Bottom Nav at same level
- `persistent-nav` — Core nav reachable from deep pages

## §10. Charts & Data (LOW)

- `chart-type` — Match to data: trend→line, comparison→bar, proportion→pie
- `color-guidance` — Accessible palettes; avoid red/green only
- `data-table` — Table alternative for accessibility
- `legend-visible` — Always show legend near chart
- `tooltip-on-interact` — Tooltips on hover/tap with exact values
- `responsive-chart` — Reflow on small screens (horizontal bar, fewer ticks)
- `empty-data-state` — "No data yet" + guidance, not blank chart
- `no-pie-overuse` — No pie/donut for >5 categories
- `contrast-data` — Data vs background ≥ 3:1; labels ≥ 4.5:1

---

## Common Professional UI Rules

### Icons
- SVG only, never emojis or raster PNGs
- One icon set (consistent stroke width, corner radius)
- Touch targets ≥ 44x44pt even if icon is smaller
- Consistent sizing via tokens (icon-sm, icon-md, icon-lg)

### Interaction
- Pressed feedback within 80-150ms
- Animation 150-300ms with native easing
- Disabled = reduced opacity (0.38-0.5) + cursor change + semantic disabled
- Focus order matches visual order

### Light/Dark Mode
- Primary text ≥ 4.5:1 in both modes
- Secondary text ≥ 3:1 in both modes
- Borders visible in both modes
- Token-driven theming (no hardcoded hex)
- Modal scrim 40-60% opacity

### Layout
- Safe areas respected (notch, gesture bar, status bar)
- 4/8px spacing rhythm
- No scroll content hidden behind fixed bars
- Adaptive gutters by breakpoint
