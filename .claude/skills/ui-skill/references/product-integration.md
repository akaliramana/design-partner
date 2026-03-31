# Product Integration

Load this when adding screens to an existing project. Building a screen is not enough — it must be integrated into the product's information architecture, navigation, and shell system.

## The Integration Rule

**A screen is not "done" when it renders. It is done when a user can reach it, use it, and return from it through the product's actual navigation — on both desktop and mobile.**

---

## Step 1: IA Placement Decision

Before building, determine where this screen lives in the product. Ask one targeted question if ambiguous:

| Placement | When to use | Navigation impact |
|-----------|------------|-------------------|
| **Global nav** | Core feature, used by all users regularly | Add to primary nav (sidebar/top/bottom) on all surfaces |
| **Role-specific nav** | Only relevant to a subset of users (admin, owner, etc.) | Add to nav conditionally, or in a role-specific section |
| **Sub-page** | Detail view, settings sub-section, child of existing page | Breadcrumb + back link, NOT in primary nav |
| **Deep-link only** | Shared links, email callbacks, OAuth redirects | No nav entry. URL must work directly. |
| **Modal/overlay** | Quick action that doesn't need its own URL | No route, no nav. Triggered from parent. |

**Rule:** If the user doesn't specify placement, infer from context. If still ambiguous, ask ONE question:
"Should this be in the main navigation, or is it a sub-page of [existing page]?"

**Never create a parallel or temporary navigation pattern.** Always integrate into the product's existing shell and nav model.

---

## Step 2: Navigation Integration

### Find the existing navigation

Read the registry to find the nav component. Check:
- Is there a sidebar? Top nav? Bottom nav? Tab bar?
- Is navigation defined in a layout component or a standalone component?
- Does the nav read from a config/data file, or is it hardcoded?

### Integrate, don't duplicate

| Do | Don't |
|----|-------|
| Add the new page to the existing nav component | Create a separate nav or link bar for the new page |
| Follow the existing nav's icon style and label convention | Use a different icon library or naming style |
| Place in the logical position (near related items) | Append to the end without thought |
| Respect any grouping (primary vs secondary, top vs bottom) | Mix placement groups |

### Desktop + Mobile parity

**Every page added to desktop nav must be reachable from mobile nav too.**

Check:
- Desktop sidebar → does the mobile hamburger/drawer include the new item?
- Desktop top nav → does the mobile menu include it?
- If the project has a bottom tab bar on mobile → does it need updating?
- If the project has role-based nav visibility → does the new page follow the same rules?

```
✅ NAVIGATION PARITY CHECK:
  □ New page is in desktop navigation
  □ New page is reachable from mobile navigation
  □ Nav item uses the same icon style and label convention as existing items
  □ No parallel/temporary navigation was created
  □ If role-based: visibility rules match existing pattern
```

---

## Step 3: Shell Consistency

The new screen must use the same layout shell as other screens at its level.

| Check | What it means |
|-------|--------------|
| Same sidebar/header | The new page renders inside the same app shell, not a separate layout |
| Same spacing/padding | Content area padding matches other pages |
| Same scroll behavior | If other pages scroll the content area (not the whole page), match that |
| Same breadcrumb pattern | If other sub-pages use breadcrumbs, so should this one |
| Same page header pattern | If other pages have a title bar with actions, follow that pattern |

**If the project uses a shared layout wrapper** (AppShell, DashboardLayout, etc.), the new page MUST use it. Do not create a standalone page outside the shell.

---

## Step 4: Production States (contextual)

**Apply this for existing production apps. For greenfield POCs, mention but don't gate on it.**

For each new screen, consider:

| State | When to implement | Implementation |
|-------|------------------|----------------|
| **Empty state** | When the screen displays data that could be empty | Helpful message + action ("No items yet. Create one.") |
| **Loading state** | When data is fetched async | Skeleton or spinner, matching existing loading patterns |
| **Error state** | When data fetch can fail | Error message + retry action, matching existing error patterns |
| **Edge states** | When data can be in unusual states (zero items, 1000+ items, long text) | Handle gracefully — truncation, pagination, or scrolling |

**Rule:** Match the existing product's state patterns. If the product uses skeletons → use skeletons. If it uses spinners → use spinners. Don't introduce a new loading pattern.

---

## Step 5: Shared Component Impact

When modifying or extending shared components (shell, nav, layout):

1. **Check the registry** — which pages use this component?
2. **Verify all dependents** — does the change break any existing page?
3. **Test the change on at least one other page** — don't just check the new page
4. **Update the registry** if the component's props or structure changed

```
✅ SHARED COMPONENT IMPACT CHECK:
  □ Registry consulted for affected pages
  □ Change verified on at least one existing page (not just the new one)
  □ No existing functionality broken
  □ Registry updated if component structure changed
```

---

## Step 6: Role & Visibility (conditional)

**Only apply if the project has role-based access or visibility logic.**

Check:
- Does the project have user roles (admin, member, viewer, etc.)?
- Does existing navigation show/hide items based on role?
- Does existing content vary by role?

If yes:
- Determine which roles should see the new screen
- Apply the same visibility logic used by existing screens
- If unsure, ask: "Who should see this page — all users, or specific roles?"

If no roles exist → skip this step entirely.

---

## Step 7: Integration Verification

After building AND integrating, verify these (in addition to the standard Phase 5 checks):

```
✅ PRODUCT INTEGRATION CHECKLIST:
  □ Screen is reachable from desktop navigation (or explicitly deep-link-only)
  □ Screen is reachable from mobile navigation (if project supports mobile)
  □ Screen uses the same layout shell as other pages at its level
  □ No parallel or temporary navigation was created
  □ Page header follows existing pattern (title bar, breadcrumbs, etc.)
  □ If data-driven: empty state exists
  □ If async data: loading state exists (matching existing pattern)
  □ Shared components checked for impact on other pages
  □ If role-based project: visibility rules applied
```

---

## State Model Flexibility

The skill supports two host app models. Detect which one the project uses and adapt:

### Model A: Route-path apps (most web apps)

Pages are route files. Navigation uses URL paths. Manifest keys are route paths (`/`, `/settings`, `/team`).

This is the default model. Works for: Next.js, React Router, Vue Router, SvelteKit, etc.

### Model B: Screen-id / single-shell apps

The app has one shell and swaps content by screen ID, not URL routes. Common in: Electron apps, mobile-web wrappers, some dashboards, React Native web.

For these apps:
- Manifest keys are screen IDs instead of routes (`dashboard`, `settings`, `agent-detail`)
- Navigation triggers screen switches, not URL changes
- The "route returns 200" verification doesn't apply — verify the screen renders in the shell instead

**Detection:** If the project has a single entry point that conditionally renders different screens (switch/case, state-driven), it's Model B. If it has a file-per-route structure, it's Model A.

**The skill should adapt its manifest model to match the project, not force the project to match the manifest.**
