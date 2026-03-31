# Breakpoints & Responsive System

Loaded during build and edit phases. Defines the breakpoint system used across all generated UI.

---

## Standard Breakpoints

| Token | Min Width | Tailwind Prefix | Typical Devices                     |
|-------|-----------|-----------------|-------------------------------------|
| xs    | 0px       | (default)       | Small phones (iPhone SE, Galaxy S)  |
| sm    | 640px     | `sm:`           | Large phones (landscape), small tablets |
| md    | 768px     | `md:`           | Tablets (iPad Mini, iPad portrait)  |
| lg    | 1024px    | `lg:`           | Tablets (landscape), small laptops  |
| xl    | 1280px    | `xl:`           | Laptops, desktops                   |
| 2xl   | 1536px    | `2xl:`          | Large desktops, external monitors   |

### Critical Test Points

These are the exact widths where layouts most commonly break:

- **320px** — Smallest supported phone (iPhone SE)
- **375px** — Standard phone (iPhone 12/13/14)
- **768px** — Tablet portrait (iPad)
- **1024px** — Tablet landscape / small laptop
- **1280px** — Standard laptop
- **1440px** — Common desktop

---

## Mobile-First Approach

All styles are written mobile-first. Base styles target the smallest screen. Breakpoint prefixes add overrides as the screen gets wider.

```
Base styles      →  sm:overrides  →  md:overrides  →  lg:overrides
(0px+)              (640px+)         (768px+)         (1024px+)
```

### How to read mobile-first classes

```html
<!-- This means: -->
<div class="flex flex-col md:flex-row lg:gap-8">
<!--
  0-767px:    flex-col (stacked)
  768px+:     flex-row (side by side)
  1024px+:    flex-row + gap-8 (side by side, wider gap)
-->
```

### Rule: Always start with mobile styles, then add breakpoints upward.

Wrong:
```html
<div class="flex-row md:flex-col">  <!-- desktop-first thinking -->
```

Right:
```html
<div class="flex flex-col md:flex-row">  <!-- mobile-first -->
```

---

## What Changes at Each Breakpoint

### xs → sm (640px): Minor Adjustments

| Property       | Change                                          |
|----------------|-------------------------------------------------|
| Layout         | No major changes. Still single-column.          |
| Typography     | Base sizes remain. No scaling yet.              |
| Spacing        | Padding may increase slightly (p-4 → sm:p-6).  |
| Navigation     | Still mobile nav (hamburger or bottom nav).     |
| Touch targets  | Minimum 44px maintained.                        |

### sm → md (768px): First Major Shift

| Property       | Change                                          |
|----------------|-------------------------------------------------|
| Layout         | Single-column → two-column where appropriate. Grid starts reflowing (grid-cols-1 → md:grid-cols-2). |
| Typography     | Heading sizes increase one step.                |
| Spacing        | Gap and padding increase (gap-4 → md:gap-6).   |
| Navigation     | Hamburger may become visible top nav. Bottom nav may persist or switch. |
| Components     | Cards can sit side by side. Tables may show more columns. |

### md → lg (1024px): Desktop Layout

| Property       | Change                                          |
|----------------|-------------------------------------------------|
| Layout         | Sidebar becomes visible (hidden → lg:block). Full desktop layout engages. Grid goes to 3-col (md:grid-cols-2 → lg:grid-cols-3). |
| Typography     | Full desktop type scale active.                 |
| Spacing        | Desktop spacing (gap-6 → lg:gap-8, p-6 → lg:p-8). |
| Navigation     | Full sidebar or expanded top nav. No hamburger. |
| Components     | Modals are centered dialogs (not full-screen). Split panels active. |

### lg → xl (1280px): Wide Desktop

| Property       | Change                                          |
|----------------|-------------------------------------------------|
| Layout         | Content max-width may engage. Extra columns possible (xl:grid-cols-4). |
| Typography     | Rarely changes. Already at desktop scale.       |
| Spacing        | Wider outer margins. max-w-7xl or similar centering. |
| Navigation     | No change from lg.                              |
| Components     | Wider cards, more breathing room.               |

### xl → 2xl (1536px): Large Screens

| Property       | Change                                          |
|----------------|-------------------------------------------------|
| Layout         | Max-width container prevents content from stretching too wide. Centered with auto margins. |
| Typography     | No change.                                      |
| Spacing        | Outer margins grow. Inner spacing stable.       |
| Navigation     | No change.                                      |
| Components     | No change. Guard against overly wide content.   |

---

## Common Responsive Patterns

### 1. Sidebar Collapse

```
Desktop (lg+):                    Mobile (< lg):
┌────────┬───────────────┐       ┌───────────────────┐
│Sidebar │ Content       │       │ [☰] Title         │
│        │               │  →    ├───────────────────┤
│        │               │       │ Content            │
└────────┴───────────────┘       └───────────────────┘
```

Tailwind implementation:
```html
<!-- Sidebar -->
<aside class="hidden lg:block lg:w-64 lg:fixed lg:inset-y-0">
  <!-- nav items -->
</aside>

<!-- Mobile header with hamburger -->
<header class="lg:hidden flex items-center p-4">
  <button>☰</button>
  <span>Title</span>
</header>

<!-- Content -->
<main class="lg:ml-64">
  <!-- page content -->
</main>
```

### 2. Grid Reflow

```
Desktop (lg):          Tablet (md):          Mobile (< md):
┌────┬────┬────┐      ┌──────┬──────┐       ┌────────────┐
│ 1  │ 2  │ 3  │      │  1   │  2   │       │     1      │
├────┼────┼────┤  →   ├──────┼──────┤  →    ├────────────┤
│ 4  │ 5  │ 6  │      │  3   │  4   │       │     2      │
└────┴────┴────┘      ├──────┼──────┤       ├────────────┤
                      │  5   │  6   │       │     3      │
                      └──────┴──────┘       └────────────┘
```

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
```

### 3. Typography Scaling

| Element    | Mobile (base) | Tablet (md)  | Desktop (lg) |
|------------|---------------|------------- |--------------|
| h1         | text-2xl      | md:text-3xl  | lg:text-4xl  |
| h2         | text-xl       | md:text-2xl  | lg:text-3xl  |
| h3         | text-lg       | md:text-xl   | lg:text-2xl  |
| body       | text-sm       | md:text-base | text-base    |
| caption    | text-xs       | text-xs      | text-sm      |

Note: body text should not exceed `text-base` (16px) on any screen. Headings scale but body stays readable.

### 4. Touch Target Sizing

Minimum touch targets by context:

| Context              | Minimum Size | Tailwind         |
|----------------------|-------------|------------------|
| Primary actions      | 48px        | h-12 min-w-12    |
| Secondary actions    | 44px        | h-11 min-w-11    |
| List items           | 48px height | min-h-12 py-3    |
| Icon buttons         | 44px        | h-11 w-11        |
| Form inputs          | 44px height | h-11             |

On desktop (lg+), targets can be smaller since there is no touch:
```html
<button class="h-11 lg:h-9 px-4 lg:px-3">
```

### 5. Navigation Transformation

```
Desktop:     Logo  Nav1  Nav2  Nav3  Nav4     Profile
Tablet:      Logo  Nav1  Nav2  [More ▼]       Profile
Mobile:      [☰]   Logo                       Profile
```

The navigation transform at each breakpoint:

```html
<!-- Full nav: desktop only -->
<nav class="hidden lg:flex items-center gap-6">
  <a>Nav 1</a><a>Nav 2</a><a>Nav 3</a><a>Nav 4</a>
</nav>

<!-- Hamburger: mobile only -->
<button class="lg:hidden">☰</button>
```

---

## Responsive Verification Checklist

Run through this at each breakpoint after building or editing:

### At 320px (smallest phone)
- [ ] No horizontal scroll on the page body
- [ ] Text is readable without zooming (min 14px)
- [ ] Buttons and links have 44px+ touch targets
- [ ] No content hidden behind fixed elements
- [ ] Images don't overflow their containers
- [ ] Form inputs are full-width and tappable

### At 768px (tablet)
- [ ] Grid has reflowed appropriately (not stuck at 1-col if 2-col fits)
- [ ] Sidebar is either hidden or appropriately sized
- [ ] Navigation is usable (not too many items crammed)
- [ ] Modal/drawer is not still fullscreen if content is small
- [ ] Tables show key columns (hide non-essential on tablet)

### At 1024px (small desktop)
- [ ] Sidebar is visible if the layout uses one
- [ ] Full navigation is shown (no hamburger)
- [ ] Content area uses available width well
- [ ] Modals are centered, not fullscreen
- [ ] Grid has reached its max column count

### At 1440px (large desktop)
- [ ] Content has a max-width (not stretching to fill 1440px)
- [ ] Line lengths are readable (max ~80ch for prose)
- [ ] Layout is centered with balanced margins
- [ ] No awkward gaps from fixed-width elements in a fluid layout

---

## Common Mistakes to Avoid

### 1. Fixed widths that break mobile
```html
<!-- BAD: will overflow on phones -->
<div class="w-[800px]">

<!-- GOOD: responsive -->
<div class="w-full max-w-[800px]">
```

### 2. Missing flex-wrap
```html
<!-- BAD: items will overflow -->
<div class="flex gap-4">

<!-- GOOD: wraps on small screens -->
<div class="flex flex-wrap gap-4">
```

### 3. Forgetting to hide elements properly
```html
<!-- BAD: display:none removes from accessibility tree -->
<!-- (OK for decorative, bad for functional elements) -->

<!-- GOOD for responsive show/hide: -->
<div class="hidden md:block">Desktop content</div>
<div class="md:hidden">Mobile content</div>
```

### 4. Text overflow without handling
```html
<!-- BAD: long text breaks layout -->
<h2>Very Long Title That Goes On And On</h2>

<!-- GOOD: truncate or wrap -->
<h2 class="truncate">Very Long Title...</h2>
<!-- or -->
<h2 class="break-words">Very Long Title That Wraps</h2>
```

### 5. Images without responsive sizing
```html
<!-- BAD: oversized image breaks layout -->
<img src="photo.jpg" width="1200">

<!-- GOOD: responsive image -->
<img src="photo.jpg" class="w-full h-auto max-w-full">
```

### 6. Padding that wastes space on mobile
```html
<!-- BAD: 32px padding on a 320px screen = only 256px content -->
<div class="p-8">

<!-- GOOD: scale padding with screen -->
<div class="p-4 md:p-6 lg:p-8">
```

### 7. Forgetting min-width: 0 on flex children
```html
<!-- BAD: flex child with long content overflows -->
<div class="flex">
  <div>Long text that won't shrink...</div>
</div>

<!-- GOOD: allow shrinking -->
<div class="flex">
  <div class="min-w-0 truncate">Long text that truncates</div>
</div>
```
