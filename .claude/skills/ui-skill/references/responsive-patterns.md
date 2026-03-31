# Responsive Patterns & Edit-Awareness Rules

Loaded when handling responsive issues or verifying edits don't break responsiveness.

---

## Edit-Awareness Rules

Every edit to a UI file should trigger a mental check against these rules. If any rule matches, verify the responsive impact before committing the change.

### Column Changes

**Trigger:** Adding a column, changing grid-cols, adding a flex sibling.

**Check:**
- Does the new column have a mobile collapse rule? Every `grid-cols-N` where N > 1 needs a `grid-cols-1` base or `md:grid-cols-N` prefix.
- If adding a column to an existing grid, verify the reflow still works: 3-col → 2-col → 1-col. Don't end up with 4-col → 1-col (skipping 2-col is jarring).
- Does the new column have a min-width that could cause overflow on tablet?

**Fix pattern:**
```html
<!-- Before: 2-col grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">

<!-- After adding 3rd column: must add lg breakpoint -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

### Sidebar Width Changes

**Trigger:** Changing sidebar width, adding sidebar padding, adding sidebar content that is wider.

**Check:**
- At 1024px (lg breakpoint), is the remaining content area still usable? A 320px sidebar on a 1024px screen leaves only 704px for content.
- If the sidebar grows past 280px, verify the `lg:` breakpoint is sufficient or if you need `xl:` for the sidebar to appear.
- Does the mobile drawer version still work? Wider sidebars may need wider drawers on mobile.

**Fix pattern:**
```html
<!-- If sidebar grows, consider adjusting breakpoint -->
<aside class="hidden lg:block lg:w-64">  <!-- 256px: fine at lg -->
<aside class="hidden xl:block xl:w-80">  <!-- 320px: needs xl -->
```

### Content Addition

**Trigger:** Adding text, adding a component, adding an image, adding a table.

**Check:**
- Does the new content overflow its container on a 320px screen?
- If adding a table, does it have horizontal scroll or a mobile card fallback?
- If adding an image, does it have `max-w-full` and `h-auto`?
- If adding text, does it have `break-words` or `truncate` for long strings (URLs, emails, IDs)?
- If adding a fixed-width element inside a flex container, does the flex parent have `flex-wrap` or does the child have `min-w-0`?

**Fix pattern:**
```html
<!-- Table: add horizontal scroll wrapper -->
<div class="overflow-x-auto">
  <table class="min-w-[600px]">...</table>
</div>

<!-- Image: responsive by default -->
<img class="w-full h-auto max-w-full" src="..." alt="...">

<!-- Long text: prevent overflow -->
<span class="truncate block">user-id-1234567890abcdef</span>
```

### Typography Modifications

**Trigger:** Changing font size, changing font weight, changing line height.

**Check:**
- If increasing a heading size, does it still fit on a 375px screen? A `text-5xl` heading (48px) may need to be `text-3xl md:text-4xl lg:text-5xl`.
- If changing body text size, verify it stays between 14px and 18px on mobile.
- If changing line height, check that touch targets in nearby elements still meet 44px minimum.

**Fix pattern:**
```html
<!-- Scale headings responsively -->
<h1 class="text-2xl md:text-3xl lg:text-5xl font-bold">
```

### Fixed Element Addition

**Trigger:** Adding `fixed`, `sticky`, adding a banner, toast, FAB, or bottom bar.

**Check:**
- Does the fixed element overlap scrollable content? Add padding/margin to the content area to compensate.
- On mobile, does the fixed element leave enough visible content? A sticky header (64px) + bottom nav (64px) on a 568px screen leaves only 440px.
- Do multiple fixed elements stack? Check z-index ordering.
- Does the fixed element respect safe areas on notched phones? Add `pb-safe` or `env(safe-area-inset-bottom)`.

**Fix pattern:**
```html
<!-- Fixed bottom bar: add padding to main content -->
<main class="pb-20">  <!-- height of fixed bar + breathing room -->
  ...
</main>
<div class="fixed bottom-0 inset-x-0 h-16 bg-white border-t">
  ...
</div>
```

---

## Component-Level Responsive Patterns

### Navigation

**Desktop sidebar → Tablet icon rail → Mobile bottom nav/hamburger**

```
lg+ (1024px):               md (768px):         < md (mobile):
┌────────┬───────────┐     ┌───┬────────────┐   ┌────────────────┐
│ Logo   │           │     │ ☰ │            │   │ [☰]  Title     │
│ Nav 1  │ Content   │     │ ◨ │  Content   │   ├────────────────┤
│ Nav 2  │           │     │ ⚙ │            │   │  Content       │
│ Nav 3  │           │     │   │            │   ├────────────────┤
└────────┴───────────┘     └───┴────────────┘   │ 🏠 📊 ➕ 💬 👤 │
                                                └────────────────┘
```

Implementation strategy:
- `lg:` — Full sidebar with labels
- `md:` — Icon-only rail (w-16) or keep hamburger
- Base — Off-canvas drawer triggered by hamburger, OR persistent bottom nav for high-frequency navigation

### Tables

Three mobile strategies — pick based on data:

**Strategy 1: Horizontal scroll** (best for data-dense tables, few rows)
```html
<div class="overflow-x-auto -mx-4 px-4">
  <table class="min-w-[700px] w-full">...</table>
</div>
```

**Strategy 2: Card view** (best for many rows, few key fields)
```html
<!-- Desktop: table -->
<table class="hidden md:table">...</table>

<!-- Mobile: cards -->
<div class="md:hidden space-y-3">
  <div class="rounded-lg border p-4">
    <div class="font-medium">Row Title</div>
    <div class="text-sm text-gray-500">Field: Value</div>
    <div class="text-sm text-gray-500">Field: Value</div>
  </div>
</div>
```

**Strategy 3: Hide columns** (best for wide tables where some columns are optional)
```html
<th class="hidden lg:table-cell">Low Priority Column</th>
<td class="hidden lg:table-cell">Value</td>
```

### Forms

**Multi-column → Single column on mobile**

```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label>First Name</label>
    <input class="w-full h-11">
  </div>
  <div>
    <label>Last Name</label>
    <input class="w-full h-11">
  </div>
  <!-- Full-width field spans both columns -->
  <div class="md:col-span-2">
    <label>Address</label>
    <input class="w-full h-11">
  </div>
</div>
```

Key mobile form rules:
- Inputs must be full-width on mobile (w-full)
- Input height minimum 44px (h-11) for touch
- Labels above inputs, never beside them on mobile
- Submit button full-width on mobile, auto-width on desktop: `w-full md:w-auto`

### Modals

**Centered on desktop → Full-screen sheet on mobile**

```html
<!-- Overlay -->
<div class="fixed inset-0 bg-black/50 z-40">
  <!-- Modal -->
  <div class="
    fixed inset-0 md:inset-auto
    md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
    md:max-w-lg md:w-full md:rounded-xl
    bg-white overflow-y-auto
  ">
    <!-- Content -->
  </div>
</div>
```

Mobile modal rules:
- Full-screen (inset-0) below md breakpoint
- Add a visible close button (not just clicking outside)
- Scroll internally (`overflow-y-auto` on the modal, not the page)
- Respect safe area insets at bottom

### Cards

**Grid reflow with maintained visual hierarchy**

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  <div class="rounded-xl border p-4 md:p-6">
    <img class="w-full h-40 md:h-48 object-cover rounded-lg">
    <h3 class="mt-3 text-lg font-semibold">Title</h3>
    <p class="mt-1 text-sm text-gray-600 line-clamp-2">Description</p>
  </div>
</div>
```

Card responsive rules:
- Image height can decrease on mobile but maintain aspect ratio
- Title and description font sizes stay the same (cards are already compact)
- Card padding decreases on mobile (p-4 vs p-6)
- Gap between cards decreases on mobile
- Single-column cards on mobile should NOT be full viewport width — keep horizontal padding (px-4 on the grid container)

### Images

Three responsive image concerns:

**1. Sizing:** Always constrain to container
```html
<img class="w-full h-auto max-w-full object-cover">
```

**2. Aspect ratio:** Maintain with aspect-ratio utility
```html
<div class="aspect-video overflow-hidden rounded-lg">
  <img class="w-full h-full object-cover">
</div>
```

**3. Art direction:** Different crops for different screens
```html
<!-- Show wide landscape on desktop, tighter crop on mobile -->
<img class="w-full h-48 md:h-64 lg:h-80 object-cover
            object-center md:object-top">
```

---

## Layout-Level Responsive Patterns

### Sidebar + Content → Stacked on Mobile

```
Desktop (lg+):                    Mobile (< lg):
┌────────┬───────────────────┐   ┌─────────────────────┐
│        │                   │   │ [☰]  App Title      │
│ Side   │  Main Content     │   ├─────────────────────┤
│ bar    │                   │   │                     │
│        │                   │   │  Main Content       │
│        │                   │   │  (full width)       │
│        │                   │   │                     │
└────────┴───────────────────┘   └─────────────────────┘
```

```html
<div class="flex">
  <aside class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
    ...
  </aside>
  <main class="flex-1 lg:pl-64">
    <!-- Mobile header -->
    <header class="sticky top-0 z-10 lg:hidden">
      <button>☰</button>
    </header>
    ...
  </main>
</div>
```

### Dashboard Grid → Scrollable Cards on Mobile

```
Desktop:                         Mobile:
┌──────┬──────┬──────┐          ┌────────────────┐
│ KPI1 │ KPI2 │ KPI3 │          │ KPI1           │
├──────┴──────┴──────┤          ├────────────────┤
│  Chart (wide)      │          │ KPI2           │
├──────────┬─────────┤          ├────────────────┤
│  Chart   │  List   │          │ KPI3           │
└──────────┴─────────┘          ├────────────────┤
                                │ Chart          │
                                ├────────────────┤
                                │ Chart          │
                                ├────────────────┤
                                │ List           │
                                └────────────────┘
```

Alternatively, KPI cards can be a horizontal scrollable row on mobile:
```html
<!-- Horizontal scroll KPIs on mobile -->
<div class="flex overflow-x-auto gap-3 pb-2 md:grid md:grid-cols-3 md:overflow-visible">
  <div class="min-w-[200px] md:min-w-0 flex-shrink-0 md:flex-shrink">KPI 1</div>
  <div class="min-w-[200px] md:min-w-0 flex-shrink-0 md:flex-shrink">KPI 2</div>
  <div class="min-w-[200px] md:min-w-0 flex-shrink-0 md:flex-shrink">KPI 3</div>
</div>
```

### Split Panel → Tabbed View on Mobile

```
Desktop:                         Mobile:
┌──────────┬─────────────┐      ┌──────────────────┐
│          │             │      │ [List] [Detail]  │
│  List    │  Detail     │      ├──────────────────┤
│  Panel   │  Panel      │      │                  │
│          │             │      │  Active Tab      │
│          │             │      │  Content          │
│          │             │      │                  │
└──────────┴─────────────┘      └──────────────────┘
```

On mobile, two approaches:
1. **Tab switching** (shown above) — both panels exist, toggle visibility
2. **Push navigation** — list is the default view; tapping an item pushes to detail view with a back button

Push navigation is generally better for master-detail UX on mobile because it gives the detail view full screen width.

---

## Testing Checklist Per Breakpoint

Run this checklist after any UI edit. Focus on the breakpoints closest to the change.

### 320px — Smallest Phone

| Check | What to look for |
|-------|------------------|
| Overflow | No horizontal scrollbar on body. Scroll the page — nothing extends past the viewport edge. |
| Text | All text visible. No text cut off by container edges. Headings wrap, don't overflow. |
| Touch | All interactive elements (buttons, links, inputs) are at least 44x44px. |
| Fixed elements | Sticky headers and bottom bars don't overlap content. Main content has enough padding to clear them. |
| Images | All images fit within their containers. No images wider than the screen. |
| Forms | Inputs are full-width. Keyboard doesn't obscure the active input (scroll into view). |

### 768px — Tablet

| Check | What to look for |
|-------|------------------|
| Grid | Two-column grids are active. Content isn't still stuck in single column. |
| Sidebar | Either hidden (hamburger) or a narrow rail. Not a full 256px sidebar cramming content. |
| Navigation | Transition from mobile to tablet nav is clean. No nav items cut off. |
| Tables | Tables either scroll horizontally or show card fallback. Not squeezed with invisible columns. |
| Modals | Centered dialogs, not fullscreen (unless content is large). |
| Split views | If using split panel, both panels have usable width. Otherwise, fallback to stacked/tabbed. |

### 1024px — Desktop

| Check | What to look for |
|-------|------------------|
| Sidebar | Visible if the layout has one. Full labels, not just icons. |
| Navigation | Full desktop nav. No hamburger menu. All items visible. |
| Grid | Maximum column count reached (3-col or 4-col). |
| Content width | Content area uses width well. Not too narrow with excessive margins. |
| Modals | Centered, properly sized (max-w-md to max-w-2xl). |
| Hover states | Interactive elements show hover/focus states (not just mobile tap styles). |

### 1440px — Large Desktop

| Check | What to look for |
|-------|------------------|
| Max width | Content has a max-width and is centered. Not stretching to fill the full viewport. |
| Line length | Prose text is max ~80 characters per line. Use max-w-prose or max-w-2xl. |
| Spacing | Layout feels balanced. No awkward gaps between fixed-width sidebar and fluid content. |
| Grid | Cards and grid items aren't oversized. Maintain reasonable proportions. |
| Images | Images don't upscale beyond their natural resolution. Use max-w constraints. |
