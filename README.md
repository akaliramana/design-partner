# design-partner

A UI, UX, prototype, and branding skill suite for [Claude Code](https://claude.ai/code).

**This is not a component library or a CSS framework.** It's a design thinking partner that reasons about your product from first principles before writing code. It argues trade-offs, rejects layouts that don't fit the context, builds production-grade UI, maintains multi-page prototypes, adopts your existing design system, and generates brand collateral — all from the same source of truth.

## See it work

```
You:    Build an internal kitchen and service board for a busy restaurant
        during lunch rush. It needs incoming tickets, time since order,
        allergy flags, station bottlenecks, delayed tables, and items at
        risk of breaching service time. This is for stressed staff working
        fast — visual hierarchy matters more than prettiness.

Claude: Got it — operational tool for high-pressure kitchen staff, not
        a dashboard for managers. Before I design, one thing:

        Is this for a single screen mounted in the kitchen, or do
        different stations (grill, expo, front) see different views?

You:    Single screen, everyone sees the same board.

Claude: That changes the layout fundamentally. Here are two options:

        OPTION A: Ticket Stream
        ┌──────────────────────────────────────────┐
        │ ⚠ BREACHING    │  ACTIVE TICKETS          │
        │ table 4 (12m)  │  #127  burger, no gluten  │
        │ table 9 (11m)  │  #128 2x fish, allergy    │
        │────────────────│  #129 steak med-rare       │
        │ BOTTLENECK     │  #130 pasta, extra salad   │
        │ 🔴 Grill (4)   │  ...                       │
        └──────────────────────────────────────────┘
        WHY: Breaching items and bottlenecks are always visible on the
        left — the stuff that needs immediate action. Active tickets flow
        on the right. No navigation, no chrome, no clicks needed.
        TRADE-OFF: No per-station filtering.

        OPTION B: Time-Priority Wall
        ┌──────────────────────────────────────────┐
        │  ⏱ 12m table 4  │ ⏱ 8m table 7  │ NEW   │
        │  burger, fries   │ 2x fish       │ #131  │
        │  🔴 GRILL        │ 🟡 FRY         │ pasta │
        │  ⚠ NO GLUTEN    │               │       │
        ├──────────────────────────────────────────┤
        │  STATION LOAD: Grill ████░ 4  Fry ██░ 2 │
        └──────────────────────────────────────────┘
        WHY: Every ticket IS a card, sorted by urgency. Oldest and most
        critical are largest and leftmost. Station load bar at the bottom
        shows bottlenecks at a glance.
        TRADE-OFF: Harder to scan by station.

        A sidebar would be wrong here — nobody is navigating during
        a lunch rush. Which direction?

You:    Option B, but keep the allergy flags more prominent.

Claude: [runs design system search → generates tokens for high-contrast
         operational UI → writes globals.css, layout, components, ticket
         cards with pulsing allergy badges → registers shared components
         → updates manifest → runs lint → runs build → starts dev server
         → takes screenshots at 1920px and 768px → reviews screenshots
         → fixes tablet overflow → re-verifies]

        Done. Running at localhost:3001. Here's what I built:
        - Time-priority ticket wall with urgency-sorted cards
        - Allergy flags pulse with red border + icon (visible from 3m)
        - Station load bar with live bottleneck indicators
        - Breaching tickets auto-expand and shift left
        - Responsive: works on mounted screen (1920px) and tablet (768px)
        - Build passes, lint clean, all pages verified.
```

One prompt. The skill rejected a sidebar, proposed two operational layouts with specific reasoning, built the one you picked, and verified it — including visual review at multiple screen sizes.

## When to use it

| Scenario | What the skill does |
|----------|-------------------|
| **Build a new app from scratch** | Understands your product, reasons through layout, generates design system, builds responsive multi-page UI, verifies everything. |
| **Add a screen to an existing product** | Detects your existing design system (tokens, components, layouts). Adopts it as source of truth. Builds the new screen within your system. Integrates into your real navigation and shell. |
| **Grow a product across pages** | Tracks shared components, syncs navigation when pages are added/removed, maintains page relationships (parent/child, breadcrumbs). |
| **Generate brand collateral from your app** | Pitch decks, documents, one-pagers, posters — using the same design tokens as the app. One source of truth, many outputs. |
| **Build from a wireframe into an existing product** | Reads your wireframe or screenshot, adopts your existing design system, builds the screen, places it in the correct navigation, verifies integration. |
| **Review and improve existing UI** | Audits against UX guidelines (accessibility, touch targets, performance, layout, typography, animation, forms, navigation, charts). Presents specific findings, fixes iteratively. |

### When NOT to use it

- Backend-only work, APIs, databases, infrastructure
- Generic code generation unrelated to UI/design
- Branding/design asset generation (logos, CIP, icons) requires [Gemini API](https://aistudio.google.com/apikey) setup — see [Branding setup](#branding-setup) below

## The pipeline

design-partner is a process, not a tool. Each phase produces an artifact that the next phase requires:

**Detect → Understand → Reason → Design System → Build → Verify**

| Phase | Your specialist | What they do |
|-------|----------------|--------------|
| **Phase 0** | **Project Detective** | Detects project state (new, existing, managed). Finds existing design systems (tokens, themes, components) and adopts them as source of truth. |
| **Phase 1** | **UX Researcher** | Gauges what you've already told it. Asks vision questions only if context is thin — never asks "what color?" Always asks "who uses this and why?" |
| **Phase 2** | **Senior Designer** | Reasons through layout from first principles. Presents 2-3 ASCII options with trade-offs. Rejects patterns that don't fit the context. Waits for your choice. |
| **Phase 3** | **Design System Architect** | Adopts your existing design system if one exists. Otherwise generates one from a curated knowledge base of UI styles, color palettes, font pairings, and UX guidelines. |
| **Phase 4** | **Builder** | Writes real files. Registers shared components. Updates page manifest. Integrates into product navigation. Enforces responsive breakpoints. Does not stop until the app builds. |
| **Phase 5** | **QA Reviewer** | Runs lint. Runs build. Starts the app. Verifies every route. Takes screenshots if Playwright or gstack is available. Checks product integration (nav parity, shell consistency). |

**The key rule:** Planning is not a deliverable. Building is. If the skill stops after presenting layout options or generating a design system, it has failed. Phases 3→4→5 execute as a continuous pipeline after you select a layout.

## How to think about the suite

**Most users only interact with `ui-skill`.** It's the orchestrator — the brain that routes to everything else. You describe what you want, it handles the rest.

### Core UI/UX — the mainline workflow

| Skill | Your specialist | What they do |
|-------|----------------|--------------|
| `ui-skill` | **Design Partner** | The brain. First-principles reasoning, layout options, artifact gates, build orchestration, verification. |
| `ui-styling` | **Frontend Craftsperson** | Tailwind CSS for visual styling, Radix/shadcn for accessible behavioral primitives. |
| `design-system` | **Token Architect** | Three-layer token architecture (primitive → semantic → component). CSS variables, spacing scales. |

### Prototype — multi-page product structure

| Skill | Your specialist | What they do |
|-------|----------------|--------------|
| `prototype` | **Prototype Engineer** | Component registry, page manifest, structural auto-sync. Add a page → sidebar updates everywhere. Edit a shared component → all pages reflect it. |

### Branding — optional downstream workflows

These are companion skills for brand and collateral work. They use the same design tokens as the app. The Core UI/UX workflow does not require them.

| Skill | Your specialist | What they do |
|-------|----------------|--------------|
| `brand` | **Brand Director** | On-demand templates: pitch decks, documents, one-pagers, posters. |
| `design` | **Visual Designer** | Logos, corporate identity, icons, social media images. *Requires Gemini API.* |
| `slides` | **Presentation Designer** | Strategic HTML presentations with Chart.js and copywriting formulas. |
| `banner-design` | **Banner Designer** | Multi-format banners across social, ads, web, and print. |

## Quick start

**Requirements:** [Claude Code](https://claude.ai/code), Node.js, Python 3

```bash
git clone https://github.com/akaliramana/design-partner.git
cd design-partner
bash install.sh /path/to/your/project
```

That's it. Open your project in Claude Code and describe what you want to build.

> **What happens:** The GitHub repo is the source package. `install.sh` copies the skill files into your project's `.claude/skills/` directory. Your project receives only the installed skills and state files — the repo itself is not needed after install.

### What gets installed

```
your-project/
├── .claude/skills/     ← Skill modules (the design partner)
├── .ui-skill/          ← State files (component registry + page manifest)
├── design-system/      ← Design system output directory
├── CLAUDE.md           ← Build pipeline instructions
└── eslint.config.*     ← .claude/ excluded from linting (auto-patched)
```

## Supported stacks

| Stack | Support level |
|-------|-------------|
| **Next.js** (App Router) | Primary — tested end-to-end |
| **React + Vite** | Primary — tested end-to-end |
| **HTML + Tailwind** | Primary — tested end-to-end |
| Vue, Nuxt, Svelte, Astro | Stack guidelines available, not primary test targets |
| React Native, Flutter, SwiftUI | Stack guidelines available, not primary test targets |

The design reasoning, design system adoption, and prototype system are stack-agnostic. Stack-specific behavior only applies at the build layer (file paths, font loading, routing conventions).

## Enforcement

The skill doesn't just suggest — it enforces:

| Mechanism | What it does |
|-----------|-------------|
| **Design system gate** (PreToolUse hook) | Warns if you write UI code before establishing a design system |
| **Responsive check** (PostToolUse hook) | Warns if a component lacks responsive Tailwind classes |
| **Phase checklists** | Each phase has a checklist that must pass before proceeding |
| **Completion gate** | Multiple conditions must all pass before the skill declares "done" |

## Optional: Visual review

If [Playwright](https://playwright.dev/) or [gstack](https://github.com/garrytan/gstack) is installed, the skill takes screenshots at 3 breakpoints (375px, 768px, 1440px) and reviews them visually before declaring done.

```bash
# Quick setup (optional)
npm install -D playwright && npx playwright install chromium
```

## Branding setup

The Core UI/UX workflow requires no additional setup. The branding/design companion skills (logo generation, corporate identity, icons) use Gemini for AI image generation. If you want to use them:

```bash
export GEMINI_API_KEY="your-key"  # https://aistudio.google.com/apikey
pip install google-genai pillow
```

These flows are optional — the main UI skill works without them.

## Maturity

| Area | Status |
|------|--------|
| Core UI/UX (reasoning, building, verification) | Stable — primary workflow |
| Prototype (multi-page, registry, manifest) | Stable — primary workflow |
| Design system adoption (existing projects) | Stable — tested on real projects |
| Branding (decks, docs, posters) | Functional — companion workflow |
| Design assets (logos, CIP, icons) | Requires Gemini API — specialized workflow |

## Architecture

The skill is built as a modular system with skills organized into three groups, on-demand reference files, a BM25 search engine over curated CSV databases, and enforcement hooks.

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full design — including the enforcement model, test learnings, design system adoption protocol, and product integration layer. See [SAMPLE-PROMPTS.md](SAMPLE-PROMPTS.md) for test and demo prompts.

## Credits

Built on [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) by NextLevelBuilder. The original skill provides the BM25 search engine, CSV knowledge databases, font assets, and sub-skill foundations (ui-styling, design-system, brand, design, slides, banner-design).

What this repo adds: first-principles reasoning orchestrator, design system adoption, multi-page prototype system, artifact gate enforcement, product integration layer, visual review pipeline, responsive hooks, and the complete build lifecycle.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
