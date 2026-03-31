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
        - Build passes, lint clean, all routes verified.
```

One prompt. The skill rejected a sidebar, proposed two operational layouts with specific reasoning, built the one you picked, and verified it — including visual review at multiple screen sizes.

## The pipeline

design-partner is a process, not a tool. Each phase produces an artifact that the next phase requires:

**Detect → Understand → Reason → Design System → Build → Verify**

| Phase | Your specialist | What they do |
|-------|----------------|--------------|
| **Phase 0** | **Project Detective** | Detects project state (new, existing, managed). Finds existing design systems (tokens, themes, components) and adopts them as source of truth. |
| **Phase 1** | **UX Researcher** | Gauges what you've already told it. Asks vision questions only if context is thin — never asks "what color?" Always asks "who uses this and why?" |
| **Phase 2** | **Senior Designer** | Reasons through layout from first principles. Presents 2-3 ASCII options with trade-offs. Rejects patterns that don't fit the context. Waits for your choice. |
| **Phase 3** | **Design System Architect** | Adopts your existing design system if one exists. Otherwise generates one from a knowledge base of 67 styles, 161 palettes, 57 font pairings, and 99 UX guidelines. |
| **Phase 4** | **Builder** | Writes real files. Registers shared components. Updates page manifest. Integrates into product navigation. Enforces responsive breakpoints. Removes unused imports. Does not stop until the app builds. |
| **Phase 5** | **QA Reviewer** | Runs lint. Runs build. Starts the app. Verifies every route. Takes screenshots if Playwright or gstack is available. Checks product integration (nav parity, shell consistency). |

**The key rule:** Planning is not a deliverable. Building is. If the skill stops after presenting layout options or generating a design system, it has failed. Phases 3→4→5 execute as a continuous pipeline after you select a layout.

## Your team

### Core UI/UX
The primary design intelligence. Detects, reasons, builds, verifies.

| Skill | Your specialist | What they do |
|-------|----------------|--------------|
| `ui-skill` | **Design Partner** | The brain. First-principles reasoning, layout options, artifact gates, build orchestration, verification. Everything routes through here. |
| `ui-styling` | **Frontend Craftsperson** | Tailwind CSS for visual styling, Radix/shadcn for accessible behavioral primitives. Responsive, dark mode, hand-crafted output. |
| `design-system` | **Token Architect** | Three-layer token architecture (primitive → semantic → component). CSS variables, spacing scales, systematic design. |

### Prototype
Multi-page product structure. The Figma-like connected experience.

| Skill | Your specialist | What they do |
|-------|----------------|--------------|
| `prototype` | **Prototype Engineer** | Component registry, page manifest, structural auto-sync. When you add a page, the sidebar updates on every page. When you edit a shared component, all pages reflect it. |

### Branding
Downstream brand and collateral. Same tokens as the app — one source of truth.

| Skill | Your specialist | What they do |
|-------|----------------|--------------|
| `brand` | **Brand Director** | Brand identity, voice, on-demand templates. Pitch decks, documents, one-pagers, posters — all matching the app's design language. Built only when asked. |
| `design` | **Visual Designer** | Logos (55 styles), corporate identity (50+ deliverables), icons (15 styles), social media images. AI-generated via Gemini. |
| `slides` | **Presentation Designer** | Strategic HTML presentations with Chart.js, copywriting formulas, and contextual slide strategies. |
| `banner-design` | **Banner Designer** | 22 art direction styles across social, ads, web, and print. Platform-specific dimensions. |

## Quick start

**Requirements:** [Claude Code](https://claude.ai/code), Node.js, Python 3

### Install

```bash
git clone https://github.com/akaliramana/design-partner.git
cd design-partner
bash install.sh /path/to/your/project
```

That's it. Open your project in Claude Code and describe what you want to build.

### What gets installed

```
your-project/
├── .claude/skills/     ← 8 skill modules (the design partner)
├── .ui-skill/          ← State files (component registry + page manifest)
├── design-system/      ← Design system output directory
├── CLAUDE.md           ← Build pipeline instructions
└── eslint.config.*     ← .claude/ excluded from linting (auto-patched)
```

## What it handles

### For new projects
Full pipeline: understand context → reason through layout → generate design system from knowledge base → build responsive UI → register components → verify.

### For existing projects
Detects your design system (DESIGN_SYSTEM.md, theme.js, tailwind theme, CSS variables, component patterns). Audits it for completeness. Adopts it as source of truth. Builds within it. Reviews against it. Only invents where gaps exist.

### For multi-page apps
Shared components tracked in a registry. Pages tracked in a manifest with navigation and relationships. When you add a page, nav updates everywhere. When you edit a shared component, all pages reflect it. Child pages get breadcrumbs, not nav entries.

### For brand collateral
Pitch decks, documents, one-pagers, posters — generated on demand using the same design tokens as the app. HTML first (maximum design control), with optional PPTX/DOCX export. Build only what's asked for.

### For existing UI review
200+ specific UX rules across 10 categories (accessibility, touch, performance, style, layout, typography, animation, forms, navigation, charts). Audits your UI, presents findings, fixes issues iteratively.

## Supported stacks

| Stack | Status |
|-------|--------|
| Next.js (App Router) | Full support |
| React + Vite | Full support |
| HTML + Tailwind | Full support |
| Vue, Nuxt, Svelte, Astro | Stack guidelines available |
| React Native, Flutter, SwiftUI | Stack guidelines available |

## Enforcement

The skill doesn't just suggest — it enforces. Two hooks run automatically:

| Hook | Type | What it does |
|------|------|-------------|
| Design system gate | PreToolUse | Warns if you write UI code before establishing a design system |
| Responsive check | PostToolUse | Warns if a component lacks responsive Tailwind classes |

Plus 8 phase checklists and a completion gate with 14 conditions that must pass before the skill declares "done."

## Optional: Visual review

If [Playwright](https://playwright.dev/) or [gstack](https://github.com/garrytan/gstack) is installed, the skill takes screenshots at 3 breakpoints (375px, 768px, 1440px) and reviews them visually before declaring done. Finds layout breaks, spacing issues, and AI-slop patterns that code inspection alone can't catch.

```bash
# Quick setup
npm install -D playwright && npx playwright install chromium
```

## Architecture

8 skills, 14 reference files, a BM25 search engine over 14 CSV databases, 2 enforcement hooks, and a 5-phase pipeline with artifact gates.

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full design — including the enforcement model (inspired by gstack), test learnings, design system adoption protocol, and product integration layer.

## Credits

Built on [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) by NextLevelBuilder. The original skill provides the base foundations for UI design themes.

What this repo adds over the base: first-principles reasoning orchestrator, design system adoption, multi-page prototype system, artifact gate enforcement, product integration layer, visual review pipeline, responsive hooks, and the complete build lifecycle.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
