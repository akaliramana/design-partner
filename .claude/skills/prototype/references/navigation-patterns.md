# Navigation Patterns

## Primary Navigation Types

### Sidebar Navigation
Best for: Apps with 3-10 top-level sections, desktop-first, deep hierarchies.

```
┌──────┬────────────────────────┐
│ Logo │                        │
│──────│   Page Content          │
│ Nav1 │                        │
│ Nav2 │                        │
│ Nav3 │                        │
│      │                        │
│──────│                        │
│ Nav5 │ (bottom-positioned)    │
└──────┴────────────────────────┘
```

**Responsive behavior:**
- Desktop (≥1024px): Full sidebar with labels
- Tablet (768-1023px): Collapsed icon-only sidebar
- Mobile (<768px): Hidden, hamburger toggle OR bottom nav

**Implementation:**
- Sidebar component reads `navigation.items` from manifest
- `activeItem` prop highlights current page
- Bottom-positioned items (like Settings) use `position: "bottom"`

### Top Navigation
Best for: Marketing sites, landing pages, 3-6 top-level sections.

```
┌────────────────────────────────┐
│ Logo   Nav1  Nav2  Nav3   CTA  │
├────────────────────────────────┤
│                                │
│        Page Content            │
│                                │
└────────────────────────────────┘
```

**Responsive behavior:**
- Desktop: Horizontal nav items
- Mobile: Hamburger menu

### Bottom Navigation (Mobile)
Best for: Mobile apps, 3-5 top-level sections.

```
┌────────────────────────────────┐
│                                │
│        Page Content            │
│                                │
├────────────────────────────────┤
│  ic1    ic2    ic3    ic4      │
│ Nav1   Nav2   Nav3   Nav4     │
└────────────────────────────────┘
```

**Rules:**
- Maximum 5 items
- Always show labels with icons
- Highlight active item
- Don't put destructive actions here

## Child Page Navigation

Child pages are NOT in primary navigation. They use:

### Breadcrumbs
```
Team Members > John Smith
Analytics > Campaign #1234
```

**Rules:**
- Show breadcrumb in the header area
- Each segment is clickable (navigates to that level)
- Current page (last segment) is NOT clickable
- Preserve parent's scroll position when navigating back

### Back Button
For mobile or when breadcrumbs are too long:
```
← Back to Team Members
```

## Navigation Update Protocol

When adding a page:

1. **Top-level page:**
   - Add to `navigation.items` in manifest
   - Add nav link to sidebar/nav component
   - Choose appropriate icon (Lucide)
   - Decide position (top group or bottom group)

2. **Child page:**
   - Do NOT add to navigation.items
   - Add breadcrumb in header
   - Add click handler on parent page's list/card
   - Set up route (dynamic route like `[id]`)
   - Add back navigation

3. **Settings/utility pages:**
   - Add to navigation.items with `position: "bottom"`
   - Visually separate from main nav items

## Navigation Consistency Rules

1. Navigation placement stays the same across ALL pages
2. Active state clearly indicates current page
3. Never mix sidebar + bottom nav at the same hierarchy level
4. Deep links must work — every page reachable via URL
5. Back behavior must be predictable (browser back = previous page)
6. Preserve scroll position when navigating back
