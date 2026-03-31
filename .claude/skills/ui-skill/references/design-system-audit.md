# Design System Audit & Adoption

Load this when Phase 0b detects an existing design system. This reference guides how to audit, adopt, and build within a project's existing design system rather than generating a new one.

## Detection Patterns

Scan the project for these files. Any match indicates an existing design system:

### Tier 1: Documented system (strongest signal)
- `DESIGN_SYSTEM.md`, `design-system.md`, `DESIGN.md`
- `docs/design-system.*`, `docs/brand-guidelines.*`
- `design-tokens.json`, `tokens.json`

### Tier 2: Programmatic tokens
- `theme.js`, `theme.ts`, `theme/index.*`
- `tailwind.config.*` with custom `theme.extend` or `@theme` block in CSS
- `globals.css` / `variables.css` with project-specific `--color-*`, `--font-*`, `--space-*` variables (not defaults from a framework)
- `styles/tokens.*`, `styles/theme.*`

### Tier 3: Component patterns
- `/components/ui/` with 3+ consistent components
- `/components/shared/` with layout components
- `/design/components/`, `/design/layouts/`
- Template files: `*.template.jsx`, `*.template.tsx`
- Shell/layout components: `AppShell.*`, `ScreenLayout.*`, `DashboardLayout.*`, `PageLayout.*`

### Tier 4: Weak signals (check but don't assume)
- A lone `tailwind.config.ts` with no custom theme → framework default, not a design system
- A `globals.css` with only Tailwind imports → not custom tokens
- A `components/` dir with 1-2 files → not a pattern yet

**Rule:** Tier 1 or Tier 2 match = definitely adopt. Tier 3 only = adopt component patterns but generate tokens. Tier 4 only = treat as new project.

## Audit Checklist

Read every detected file and assess:

### Tokens (from theme files, CSS vars, or docs)

| Token category | What to look for | Complete? |
|---------------|-----------------|-----------|
| **Colors** | Primary, secondary, background, surface, text (primary + secondary), border, status colors (success, warning, danger) | Need at least: primary, background, text, border |
| **Typography** | Font families (heading + body), size scale (at least 4 sizes), weight hierarchy | Need at least: one font family, 3+ sizes |
| **Spacing** | Consistent scale (4px, 8px, 16px, etc.) or documented spacing tokens | Acceptable if implied by existing CSS |
| **Border radius** | Consistent values across components | Acceptable if implied |
| **Shadows** | Elevation scale | Optional — can infer |
| **Dark/light mode** | Explicit mode handling or single-mode design | Note which mode, don't assume |

### Components (from component files)

| Component type | What to look for | Adopt? |
|---------------|-----------------|--------|
| **Layout shell** | App wrapper, sidebar, header, footer | YES — always adopt if exists |
| **Navigation** | Sidebar nav, top nav, bottom nav, breadcrumbs | YES — adopt the pattern |
| **Form elements** | Buttons, inputs, selects, toggles | YES if consistent style |
| **Display elements** | Cards, badges, avatars, status indicators | YES if consistent style |
| **Templates** | New page templates, screen templates | YES — this IS the build pattern |

### Rules / documentation (from markdown/docs)

| Rule type | What to look for |
|-----------|-----------------|
| **Responsive rules** | Breakpoints, mobile-first, tablet adaptations |
| **Naming conventions** | Component naming, file structure, CSS class patterns |
| **Accessibility rules** | Contrast requirements, focus states, ARIA patterns |
| **Do/don't patterns** | Explicit guidance on what to avoid |

## Audit Report Format

After reading all files, produce this report (internally, shown to user):

```
Design System Audit for [Project Name]
───────────────────────────────────────

Source files found:
  • [file1] — [what it contains]
  • [file2] — [what it contains]

Tokens:
  ✓ Colors: [count] tokens ([list: primary, bg, text, etc.])
  ✓ Typography: [font names], [count] sizes
  ✓/✗ Spacing: [found or not]
  ✓/✗ Border radius: [found or not]
  ✓/✗ Shadows: [found or not]
  ✓/✗ Dark/light mode: [which mode]

Components:
  ✓/✗ Layout shell: [component name or "none"]
  ✓/✗ Navigation: [component name or "none"]
  ✓/✗ Shared components: [count] found
  ✓/✗ Templates: [template name or "none"]

Rules:
  ✓/✗ Responsive: [documented or implied]
  ✓/✗ Naming conventions: [documented or inferred]

Assessment:
  [COMPLETE / MOSTLY COMPLETE / PARTIAL]

Adoption plan:
  ADOPT: [list what will be used as-is]
  FILL:  [list what the skill will add because it's missing]
```

## Adoption Protocol

### Step 1: Extract tokens

Read the existing token sources and create a normalized token set:

```typescript
// Extract from whichever source exists:
// theme.js → read exports
// DESIGN_SYSTEM.md → parse color/font tables
// globals.css → parse CSS custom properties
// tailwind.config → parse theme.extend

const adoptedTokens = {
  colors: { /* from project */ },
  typography: { /* from project */ },
  spacing: { /* from project, or default 4/8px grid */ },
  radii: { /* from project, or infer from components */ },
};
```

### Step 2: Adopt component patterns

If the project has layout components (shell, sidebar, navigation):
- **USE THEM.** Do not create competing versions.
- Import and extend them, don't replace them.
- If they need modification, modify them — don't create a parallel component.

If the project has a screen template:
- **Follow it** for new pages.
- Match its structure, naming, and import patterns.

### Step 3: Write MASTER.md as adoption record

MASTER.md in adopted projects is NOT a generated design system. It's a record of:
- What was adopted (with file references)
- What gaps were filled
- What the skill will enforce going forward

```markdown
## Context
- Product: [from user]
- Design System: ADOPTED from existing project
- Source files: [list]
- Adoption date: [date]

## Adopted Tokens
### Colors (from theme.js)
| Token | Value | Source |
|-------|-------|--------|
| --color-primary | #2563EB | theme.js:3 |
| --color-background | #F8FAFC | theme.js:5 |
...

### Typography (from DESIGN_SYSTEM.md)
- Heading: Inter
- Body: Work Sans
- Source: DESIGN_SYSTEM.md §Typography

## Gaps Filled by Skill
- Spacing scale: adopted 4/8px grid (implied by existing CSS, not documented)
- Responsive breakpoints: added standard 375/768/1024/1440 (not found in project)
- Registry: created .ui-skill/registry.json from existing components
- Manifest: created .ui-skill/manifest.json from existing routes
```

### Step 4: Build within the adopted system

From this point forward:
- **Tokens come from the project, not the search engine.** Do not run search.py for design system.
- **New components follow existing patterns.** Match the style, naming, file structure.
- **New pages use existing layouts/shells.** Don't create new shells unless explicitly needed.
- **Review checks against the adopted system.** "Does this match the project's tokens?" not "Does this match our generated tokens?"

## Handling Conflicts

| Conflict | Resolution |
|----------|-----------|
| User asks for a style that contradicts the existing system | Tell the user: "Your design system uses X. You're asking for Y. Want me to update the system or make an exception?" |
| Existing tokens are insufficient for a new feature | Fill the gap minimally, document in MASTER.md "Gaps Filled" section |
| Existing component needs modification | Modify in place (don't duplicate). Update registry if structure changes. |
| Project has two conflicting style patterns | Ask user which is canonical. Adopt that one. |

## When NOT to Adopt

- The project has a `tailwind.config.ts` with zero customization → framework default, not a design system
- The project has scattered inline styles with no consistency → no system to adopt
- The user explicitly says "start fresh" or "ignore the existing styles" → generate new system
- The existing system is from a template (e.g., create-next-app starter) → not a real design system
