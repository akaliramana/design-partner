---
name: prototype
description: "Multi-page prototype system. Component registry, page manifest, structural auto-sync, navigation management. Tracks shared components across pages, maintains page relationships, auto-updates nav links and breadcrumbs when pages are added/removed. Use when: creating multi-page apps, adding pages, managing navigation, syncing shared components."
argument-hint: "[add-page|sync|adopt]"
---

# Prototype System

Multi-page awareness with structural syncing and connected navigation. This is what makes the skill feel like building in Figma, not just generating individual pages.

## When to Use

- Creating a multi-page application
- Adding a new page to an existing project
- Modifying shared components that affect multiple pages
- Setting up or updating navigation structure
- Adopting an existing project into the prototype system

## Core State Files

### Component Registry (`.ui-skill/registry.json`)

Tracks every shared component — where it lives, which pages use it, what props it accepts.

See: `references/component-registry.md` for full schema.

**Quick reference:**
```json
{
  "version": "1.0",
  "components": {
    "<component-name>": {
      "id": "<unique-id>",
      "type": "layout | display | navigation | form",
      "file": "<relative-path-to-file>",
      "usedIn": ["<page-id>", "..."],
      "props": { "<prop>": "<type>" },
      "lastUpdated": "<ISO-8601>"
    }
  }
}
```

### Page Manifest (`.ui-skill/manifest.json`)

Tracks all pages, their relationships, and navigation structure.

See: `references/page-manifest.md` for full schema.

**Quick reference:**
```json
{
  "version": "1.0",
  "project": { "name": "", "type": "", "stack": "", "model": "route-path | screen-id" },
  "pages": {
    "<page-id>": {
      "file": "<path>",
      "title": "<display-name>",
      "layout": "<layout-type>",
      "sharedComponents": ["<component-name>"],
      "designOverride": "<path-or-null>",
      "navOrder": 1,
      "navIcon": "<icon-name>"
    }
  },
  "navigation": {
    "primary": "sidebar | top-nav | bottom-nav",
    "items": [{ "page": "", "label": "", "icon": "", "position": "top | bottom" }]
  },
  "relationships": {
    "<page-id>": {
      "linksTo": ["<page-id>"],
      "parentOf": ["<page-id>"],
      "childOf": "<page-id> | null"
    }
  }
}
```

### Manifest Completeness Rules

Every page entry MUST have all fields populated — never leave empty or default values:

```
REQUIRED for every page:
  file        — actual file path (verified to exist)
  title       — display name for navigation
  layout      — layout type used (sidebar-content, full-width, split-panel, centered)
  sharedComponents — list of components from registry used by this page
  navOrder    — position in navigation (1-based, 0 for non-nav pages like child pages)
  navIcon     — Lucide icon name (empty string for non-nav pages)

REQUIRED for every page in relationships:
  linksTo     — page IDs this page navigates to (via buttons, links, cards)
  parentOf    — child page IDs (detail pages accessed FROM this page)
  childOf     — parent page ID if this is a child/detail page, null if top-level
```

**After creating manifest, verify:**
- Every `pages` key matches an actual route file on disk
- Every `navigation.items[].page` exists in `pages`
- Every `relationships` entry has a matching `pages` entry
- No orphaned pages (in pages but not in relationships)

### State Model Adaptation

The manifest supports two host app models. Set `project.model` accordingly:

**`route-path`** (default) — Pages are route files. Keys are URL paths (`/`, `/settings`). Verification checks HTTP status codes. Use for: Next.js, React Router, Vue Router, SvelteKit, static HTML.

**`screen-id`** — The app has one shell that swaps content by screen ID. Keys are screen names (`dashboard`, `settings`). Verification checks that the screen renders in the shell, not HTTP routes. Use for: Electron apps, mobile-web wrappers, single-shell dashboards, React Native web.

**Detection:** If the project has file-per-route structure → `route-path`. If it has a single entry point with conditional rendering → `screen-id`. Adapt the manifest to match the project, not the other way around.

## Workflows

### Add New Page

1. **Read state** — load registry.json + manifest.json
2. **Determine page type:**
   - Top-level page → add to primary navigation
   - Child page → add breadcrumb, do NOT add to primary nav
   - Modal/overlay → no nav change
3. **Auto-include shared components:**
   - Find all `type: "layout"` components in registry
   - Include them in the new page (sidebar, header, footer, etc.)
   - Register the new page in each component's `usedIn` array
4. **Establish navigation:**
   - If top-level: add nav item to manifest `navigation.items`
   - Update the nav component file (e.g., sidebar.tsx) with new link
   - Update ALL pages that render the nav component (structural sync)
5. **Set up relationships:**
   - If child: set `childOf` in relationships, add breadcrumb
   - If links to other pages: add `linksTo` entries
   - Update parent's `parentOf` array if applicable
6. **Register page** in manifest.json with ALL required fields
7. **Create design override** in `design-system/pages/` if page needs different tokens
8. **Post-creation verification:**
   - Verify the route file exists at the path specified in manifest
   - Verify the nav component includes the new link (if top-level)
   - Verify `relationships` entry exists with correct `linksTo`/`parentOf`/`childOf`
   - Route name in manifest matches the actual route path exactly

### Remove Page

1. **Read state** — load registry.json + manifest.json
2. **Remove from navigation** — update nav component, remove from manifest items
3. **Clean relationships** — remove from all `linksTo`, `parentOf`, `childOf` references
4. **Update registry** — remove page from all components' `usedIn` arrays
5. **Remove manifest entry**
6. **Check orphans** — if removed page had children, ask user what to do with them

### Structural Auto-Sync

**Triggers and actions:**

| Change | Structural sync needed |
|--------|----------------------|
| New page added | Add nav link to nav component, update manifest |
| Page removed | Remove nav link, clean relationships |
| Page renamed | Update nav label, breadcrumbs, all linksTo references |
| Navigation restructured | Update nav component on ALL pages |
| Shared layout component restructured | Verify all pages still compatible, update registry |
| Page promoted (child → top-level) | Add to primary nav, remove breadcrumb-only navigation |
| Page demoted (top-level → child) | Remove from primary nav, add breadcrumb |

**What auto-sync does NOT do:**
- Code propagation — React's import system handles this
- Style changes — design tokens cascade automatically via CSS vars
- Content updates — each page owns its content

### Adopt Existing Project

Load `../ui-skill/references/project-detection.md` for the full adoption flow.

**Quick version:**
1. Scan for shared components (layouts, headers, sidebars)
2. Identify page/route structure
3. Build registry.json from discovered components
4. Build manifest.json from discovered pages
5. Confirm with user: "I found X pages and Y shared components. Does this look right?"

## References

| Topic | File |
|-------|------|
| Component Registry Schema | `references/component-registry.md` |
| Page Manifest Schema | `references/page-manifest.md` |
| Auto-Sync Protocol | `references/auto-sync.md` |
| Navigation Patterns | `references/navigation-patterns.md` |

## Templates

| Template | File |
|----------|------|
| Registry Schema | `templates/registry-schema.md` |
| Manifest Schema | `templates/manifest-schema.md` |
