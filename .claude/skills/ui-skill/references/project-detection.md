# Project Detection

Loaded on first activation. Determines what kind of project the skill is working with and selects the appropriate workflow.

---

## Detection Logic Flowchart

```
START
  │
  ├─ Check 1: Does .ui-skill/ directory exist?
  │   ├─ YES → Check: Does .ui-skill/manifest.json exist?
  │   │   ├─ YES → SKILL-MANAGED PROJECT (continue existing)
  │   │   └─ NO  → PARTIAL SETUP (repair/complete setup)
  │   │
  │   └─ NO → Check: Does src/ or app/ or pages/ exist?
  │       ├─ YES → Check: Does package.json exist?
  │       │   ├─ YES → EXISTING PROJECT, NOT MANAGED (adoption flow)
  │       │   └─ NO  → EXISTING PROJECT, NO PACKAGE MANAGER (adoption flow, manual stack)
  │       │
  │       └─ NO → Check: Are there any .html, .vue, .svelte, .tsx files?
  │           ├─ YES → EXISTING PROJECT, FLAT STRUCTURE (adoption flow)
  │           └─ NO  → NEW PROJECT (full workflow)
  │
  ├─ Check 2 (ALWAYS — even for managed projects):
  │   Does an existing design system exist?
  │   Look for: DESIGN_SYSTEM.md, theme.js/ts, custom tailwind theme,
  │   CSS custom properties, component patterns
  │   ├─ YES → Load references/design-system-audit.md
  │   │        Audit system → Adopt as source of truth → Phase 3 Path A
  │   └─ NO  → Phase 3 Path B (generate via search engine)
  │
END
```

**Important:** Check 2 runs for ALL project types, including managed projects. A managed project might have gained a design system since last time, or the skill might not have detected one previously.

---

## Path 1: New Project

**Indicators:** No existing code, no .ui-skill/ directory. User is starting fresh.

**Workflow:**
1. Run vision questions (load `vision-questions.md`, select by project type or use universal)
2. Detect or ask about desired stack (see Stack Detection below)
3. Create `.ui-skill/` directory structure:
   ```
   .ui-skill/
   ├── manifest.json      # Pages, components, current state
   ├── registry.json       # Shared component registry
   └── MASTER.md          # Design system documentation
   ```
4. Initialize manifest.json with project metadata and empty page/component arrays
5. Generate MASTER.md with design system decisions based on vision answers
6. Begin building from the first page/component

**manifest.json initial structure:**
```json
{
  "project": {
    "name": "",
    "type": "",
    "stack": "",
    "created": "",
    "description": ""
  },
  "designSystem": {
    "reference": "design-system/MASTER.md"
  },
  "pages": [],
  "components": [],
  "currentState": {
    "lastModified": "",
    "lastAction": ""
  }
}
```

---

## Path 2: Skill-Managed Project

**Indicators:** `.ui-skill/manifest.json` exists and is populated.

**Workflow:**
1. Read `.ui-skill/manifest.json` — understand project state, pages, components
2. Read `design-system/MASTER.md` — load the design system
3. Read `.ui-skill/registry.json` — load shared components
4. Check `currentState.lastAction` to understand where the user left off
5. Assess what exists vs what the manifest claims exists (file verification)
6. Resume from current state — ask the user what they want to work on next

**What to verify on resume:**
- Do all files listed in manifest.json actually exist on disk?
- Has any file been modified outside the skill (check file timestamps vs manifest's lastModified)?
- Are there files in the project that aren't tracked in the manifest? (User may have added files manually)

If discrepancies are found, reconcile silently for minor issues (update manifest) or flag for the user if significant (missing pages, structural changes).

---

## Path 3: Existing Project, Not Managed (Adoption Flow)

**Indicators:** Source code exists (src/, app/, pages/, or loose files) but no `.ui-skill/` directory.

This is the most complex path. The skill must understand the existing codebase before it can work with it.

### Step 1: Stack Detection

Identify the framework and tooling (see Stack Detection section below).

### Step 2: Scan for Shared Components

Look for a components directory. Common locations by framework:

| Framework | Common Paths |
|---|---|
| React/Next.js | `src/components/`, `components/`, `app/components/` |
| Vue/Nuxt | `src/components/`, `components/` |
| Svelte/SvelteKit | `src/lib/components/`, `src/components/` |
| Angular | `src/app/shared/`, `src/app/components/` |
| HTML/Tailwind | Look for repeated HTML patterns across files |

For each component found, extract:
- **Name:** File name / export name
- **Path:** Relative path from project root
- **Props/API:** For React — read the props interface or PropTypes. For Vue — read the props definition. For Svelte — read exported let declarations.
- **Usage count:** How many files import this component (rough count)
- **Visual role:** What it does in the UI (button, card, modal, layout wrapper, etc.)

### Step 3: Identify Page Structure

Scan for pages/routes. Detection method by framework:

| Framework | How to Find Pages |
|---|---|
| Next.js (App Router) | `app/**/page.tsx` or `app/**/page.jsx` |
| Next.js (Pages Router) | `pages/**/*.tsx` or `pages/**/*.jsx` (exclude `_app`, `_document`) |
| React (React Router) | Read router config — look for `Route` components or `createBrowserRouter` |
| Vue/Nuxt | `pages/**/*.vue` |
| SvelteKit | `src/routes/**/+page.svelte` |
| Angular | Read routing modules — `*-routing.module.ts` |
| Static HTML | Each `.html` file is a page |

For each page found, extract:
- **Route/path:** The URL path
- **File path:** Location on disk
- **Components used:** Which shared components it imports
- **Layout:** Which layout wrapper it uses (if any)

### Step 4: Build registry.json from Existing Code

```json
{
  "components": [
    {
      "name": "Button",
      "path": "src/components/ui/Button.tsx",
      "type": "primitive",
      "props": ["variant", "size", "disabled", "onClick", "children"],
      "usedIn": ["src/app/dashboard/page.tsx", "src/app/settings/page.tsx"],
      "usageCount": 14,
      "description": "Primary interactive button with variant support"
    },
    {
      "name": "MetricCard",
      "path": "src/components/dashboard/MetricCard.tsx",
      "type": "composite",
      "props": ["title", "value", "change", "icon"],
      "usedIn": ["src/app/dashboard/page.tsx"],
      "usageCount": 4,
      "description": "Dashboard metric display with trend indicator"
    }
  ],
  "categories": {
    "primitive": ["Button", "Input", "Badge", "Avatar"],
    "composite": ["MetricCard", "UserRow", "ProjectCard"],
    "layout": ["Sidebar", "PageHeader", "Container"]
  }
}
```

### Step 5: Build manifest.json from Existing Code

Populate the manifest with discovered pages, components, and project metadata. Include:
- Stack and framework version (from package.json)
- All discovered pages with their routes
- All discovered shared components with their locations
- The detected design patterns (see Step 6)

### Step 6: Extract Design Patterns into MASTER.md

Analyze the existing code to extract the design system that's already in use (even if undocumented):

**Colors:** Scan for Tailwind config, CSS variables, or theme files. Extract the palette that's actually being used.
- Check: `tailwind.config.js` → `theme.extend.colors`
- Check: `src/styles/globals.css` or similar → CSS custom properties (`:root { --primary: ... }`)
- Check: `theme.ts` or `theme.js` → styled-components/emotion theme objects
- Fallback: scan for the most-used color values in the codebase

**Typography:** Extract font families, sizes, and weights in use.
- Check: Tailwind config for font family customization
- Check: CSS imports or `<link>` tags for Google Fonts / font files
- Check: global styles for base font-size and line-height
- Scan for the most common text size classes or style values

**Spacing:** Identify the spacing scale in use.
- Tailwind projects: the default scale OR customized `theme.extend.spacing`
- CSS projects: scan for the most-used margin/padding values to identify the base unit

**Component patterns:** Identify recurring visual patterns.
- How are cards styled? (Shadow, border, border-radius, background)
- How are buttons styled? (Fill, outline, ghost — which variants exist)
- How are forms laid out? (Label position, spacing, error states)
- How are sections separated? (Borders, backgrounds, whitespace)

Write these findings into `design-system/MASTER.md` as the documented design system.

### Step 7: Confirmation with User

Before proceeding, present a summary to the user:

> "I've analyzed your existing project. Here's what I found:
>
> **Stack:** Next.js 14 with App Router, Tailwind CSS, TypeScript
> **Pages:** 5 pages (dashboard, settings, profile, auth/login, auth/signup)
> **Shared components:** 12 components in src/components/
> **Design patterns:** [summary of extracted colors, type, spacing]
>
> I've created .ui-skill/ with manifest.json, registry.json, and MASTER.md based on your existing code. Want me to proceed with this understanding, or should I adjust anything?"

Wait for user confirmation before building anything new.

---

## Stack Detection

### Automated Detection (from package.json)

Read `package.json` and check dependencies:

| Dependency | Stack |
|---|---|
| `next` | Next.js (check version: 13+ = likely App Router) |
| `react` + `react-dom` (no next) | React (check for react-router, vite, CRA) |
| `vue` | Vue (check for nuxt, vite) |
| `nuxt` | Nuxt |
| `svelte` | Svelte (check for @sveltejs/kit) |
| `@angular/core` | Angular |
| `astro` | Astro |
| `gatsby` | Gatsby |
| `remix` / `@remix-run/*` | Remix |

**Styling detection:**

| Indicator | Styling Approach |
|---|---|
| `tailwindcss` in dependencies + `tailwind.config.*` | Tailwind CSS |
| `styled-components` in dependencies | Styled Components |
| `@emotion/react` in dependencies | Emotion |
| `.module.css` files present | CSS Modules |
| `sass` / `node-sass` in dependencies | SCSS/Sass |
| `@chakra-ui/react` | Chakra UI |
| `@radix-ui/*` | Radix (likely with Tailwind or custom CSS) |
| `@shadcn/*` or `components/ui/` with Radix primitives | shadcn/ui |
| `@mui/material` | Material UI |
| `antd` | Ant Design |

**UI library detection:**

Check for shadcn/ui specifically — it's common and affects how components are managed:
- Look for `components.json` in project root
- Look for `src/components/ui/` with files matching shadcn patterns (button.tsx, card.tsx, dialog.tsx)
- Look for `@radix-ui/*` primitives in package.json

### No package.json

If no package.json exists:
- Check for `.html` files → Static HTML site
- Check for `composer.json` → PHP (Laravel, WordPress theme)
- Check for `Gemfile` → Ruby (Rails)
- Check for `requirements.txt` or `pyproject.toml` → Python (Django, Flask with templates)
- Check for `go.mod` → Go (with template files)
- If only `.html` + `.css` + `.js` files → Vanilla HTML/CSS/JS

---

## Edge Cases

### Monorepo

**Detection:** `packages/` or `apps/` directory, OR `workspaces` field in package.json, OR `pnpm-workspace.yaml`, OR `lerna.json`, OR `turbo.json`.

**Handling:**
- Ask the user which package/app they want to work on
- Scope all detection to that specific package directory
- Create `.ui-skill/` inside the specific package, not at the monorepo root
- Be aware that shared packages may contain components used across apps

### Multiple Apps in One Repo (Non-Monorepo)

**Detection:** Multiple framework configs (e.g., both `next.config.js` and `vite.config.ts`), or multiple entry points that suggest separate apps.

**Handling:**
- Ask the user which app context to operate in
- Scope detection to the identified app directory

### No Framework (Vanilla HTML/CSS/JS)

**Detection:** No framework dependencies, just `.html`, `.css`, `.js` files.

**Handling:**
- Use vanilla HTML structure for page detection (each .html = a page)
- Component detection: look for repeated HTML patterns, partials, or JS-injected components
- Offer to use Tailwind via CDN or a build step if the user wants utility CSS
- Build registry.json with "component" entries pointing to CSS classes or HTML patterns rather than importable modules

### Existing Design System / Component Library

**Detection:** The project has a `packages/design-system` or `src/design-system` directory, or imports from an internal package like `@company/ui`.

**Handling:**
- Treat the existing design system as the source of truth
- Read it thoroughly before extracting MASTER.md — use their tokens, not inferred patterns
- registry.json should reference the design system components as the base layer
- New components build ON TOP of the design system, never duplicating its primitives

### Static Site Generator

**Detection:** Astro, Gatsby, Hugo (`hugo.toml`), Jekyll (`_config.yml`), Eleventy (`.eleventy.js`).

**Handling:**
- Page detection follows the SSG's routing conventions
- Component detection varies: Astro has `.astro` components, Hugo has partials in `layouts/partials/`, Jekyll uses `_includes/`
- Style extraction may come from theme configuration rather than CSS files

---

## Detection Output Format

After detection, the skill internally stores a detection result used to configure all subsequent operations:

```json
{
  "detectionResult": {
    "projectState": "new | skill-managed | existing-unmanaged",
    "stack": {
      "framework": "next.js",
      "frameworkVersion": "14.2.0",
      "router": "app",
      "language": "typescript",
      "styling": "tailwind",
      "stylingVersion": "3.4.0",
      "uiLibrary": "shadcn",
      "packageManager": "pnpm"
    },
    "structure": {
      "sourceDir": "src/",
      "pagesDir": "src/app/",
      "componentsDir": "src/components/",
      "stylesDir": "src/styles/",
      "publicDir": "public/"
    },
    "pages": [
      { "route": "/", "file": "src/app/page.tsx" },
      { "route": "/dashboard", "file": "src/app/dashboard/page.tsx" }
    ],
    "components": {
      "total": 12,
      "primitive": 5,
      "composite": 7
    },
    "designSystem": {
      "hasExisting": true,
      "source": "tailwind.config.ts + src/styles/globals.css",
      "extractedTo": "design-system/MASTER.md"
    },
    "edgeCases": {
      "isMonorepo": false,
      "hasDesignSystem": false,
      "isStaticSite": false
    }
  }
}
```

This result is NOT written to disk — it's used in-session to configure file paths, component patterns, and build commands. The persistent representation is in `.ui-skill/manifest.json`.
