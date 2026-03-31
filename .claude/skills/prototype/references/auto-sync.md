# Structural Auto-Sync Protocol

## What Auto-Sync Is

Updating **structural references** when pages or shared components change:
- Navigation links (sidebar items, breadcrumbs, route configs)
- Layout shell includes (which pages include which shared components)
- Page relationships (parent/child, linksTo)
- Manifest and registry state files

## What Auto-Sync Is NOT

- **Code propagation** — React's import system handles this. If you edit `sidebar.tsx`, every page importing `<Sidebar />` already gets the change.
- **Style cascading** — CSS variables and design tokens cascade automatically.
- **Content sync** — Each page owns its content independently.

## Trigger → Action Table

| Trigger | Actions |
|---------|---------|
| **New page added** | 1. Add page to manifest.json `pages` 2. Add to `relationships` 3. If top-level: add nav item to `navigation.items` + update nav component file 4. Register shared components in registry `usedIn` |
| **Page removed** | 1. Remove from manifest `pages` + `navigation.items` 2. Remove from ALL `relationships` entries 3. Remove from ALL registry component `usedIn` arrays 4. Check for orphaned children |
| **Page renamed** | 1. Update manifest `title` 2. Update `navigation.items` label 3. Update breadcrumb text in parent references |
| **Nav restructured** | 1. Update `navigation.items` order/grouping 2. Regenerate nav component file 3. All pages re-render nav via import (automatic) |
| **Shared component restructured** | 1. Update registry entry 2. Check all `usedIn` pages for compatibility 3. If props changed: update all usage sites |
| **Page promoted** (child → top-level) | 1. Add to `navigation.items` 2. Remove `childOf` 3. Remove from parent's `parentOf` 4. Remove breadcrumb, add nav entry |
| **Page demoted** (top-level → child) | 1. Remove from `navigation.items` 2. Set `childOf` to parent 3. Add to parent's `parentOf` 4. Add breadcrumb |

## Sync Procedure

When any of the above triggers occur:

```
1. Read current registry.json and manifest.json
2. Apply the changes to state files
3. Identify affected source files:
   - Nav component (sidebar.tsx, nav.tsx, etc.)
   - Breadcrumb config (if child pages involved)
   - Route config (if using explicit routing)
   - Layout wrappers (if shared component inclusion changed)
4. Update each affected source file
5. Write updated registry.json and manifest.json
6. Verify: read the nav component and confirm all pages are correctly linked
```

## Conflict Resolution

| Conflict | Resolution |
|----------|-----------|
| Two pages claim same navOrder | Ask user which should come first |
| Component removed but still in usedIn | Remove from usedIn, warn user |
| Child page's parent was deleted | Ask user: promote to top-level or delete? |
| Registry out of sync with code | Re-scan codebase, rebuild registry, confirm with user |
