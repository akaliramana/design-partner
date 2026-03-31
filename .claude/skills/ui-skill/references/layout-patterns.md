# Layout Patterns Reference

Loaded when presenting layout options to the user. Each pattern includes a diagram, best-use guidance, and trade-off analysis.

---

## Dashboard Layouts

### Metric-First Dashboard

```
┌──────────────────────────────────────┐
│  Nav Bar                             │
├────────┬────────┬────────┬───────────┤
│ KPI 1  │ KPI 2  │ KPI 3  │  KPI 4   │
├────────┴────────┴────────┴───────────┤
│  Primary Chart (wide)                │
├──────────────────┬───────────────────┤
│  Secondary Chart │  Table / List     │
└──────────────────┴───────────────────┘
```

- **BEST FOR:** Executive dashboards, monitoring screens, SaaS overview pages where KPIs drive decisions.
- **TRADE-OFF:** Metrics dominate visual weight. If the user needs to explore data before seeing summaries, this layout front-loads conclusions.
- **AVOID WHEN:** Metrics are meaningless without context (e.g., the user needs to filter before any number is useful), or when there are fewer than 3 KPIs (feels empty).
- **WORKS WITH:** Desktop-first. On mobile, KPI cards stack 2x2 then 1-col; charts go full-width stacked.

### Chart-First Dashboard

```
┌──────────────────────────────────────┐
│  Nav Bar                             │
├──────────────────────────────────────┤
│                                      │
│  Hero Chart (full width, tall)       │
│                                      │
├──────────┬──────────┬────────────────┤
│  Mini 1  │  Mini 2  │  Mini 3       │
├──────────┴──────────┴────────────────┤
│  Data Table / Activity Feed          │
└──────────────────────────────────────┘
```

- **BEST FOR:** Analytics dashboards, time-series monitoring, any page where trends matter more than point-in-time numbers.
- **TRADE-OFF:** The hero chart takes significant vertical space. Users must scroll to reach secondary data. Requires a meaningful default chart — an empty chart wastes prime real estate.
- **AVOID WHEN:** The primary data is a table or list, or when there is no obvious "main" visualization.
- **WORKS WITH:** Both. Hero chart scales well to mobile full-width; mini charts stack below.

### Action-First Dashboard

```
┌──────────────────────────────────────┐
│  Nav Bar                             │
├──────────────────────────────────────┤
│  Quick Actions: [+ New] [Import] ... │
├──────────────────┬───────────────────┤
│  Recent Items    │  Notifications    │
│  - Item 1        │  - Alert A        │
│  - Item 2        │  - Alert B        │
├──────────────────┴───────────────────┤
│  Summary Table                       │
└──────────────────────────────────────┘
```

- **BEST FOR:** Operational dashboards, CRMs, project management tools — anywhere the user's first instinct is to DO something, not read something.
- **TRADE-OFF:** Analytics are secondary. If users need to understand data before acting, this layout buries insight below the fold.
- **AVOID WHEN:** The dashboard is read-only or primarily for reporting.
- **WORKS WITH:** Both. Action bar becomes sticky on mobile; panels stack.

### Split-Panel Dashboard

```
┌──────────────────────────────────────┐
│  Nav Bar                             │
├─────────────────┬────────────────────┤
│                 │                    │
│  Left Panel     │  Right Panel       │
│  (Filters /     │  (Charts / Data    │
│   Navigation /  │   that update      │
│   Sidebar)      │   based on left)   │
│                 │                    │
└─────────────────┴────────────────────┘
```

- **BEST FOR:** Data exploration tools, filtered analytics, any dashboard where changing a selection updates the view. Common in BI tools.
- **TRADE-OFF:** Horizontal space is split, so neither panel gets full width. Charts in the right panel are narrower than in a full-width layout.
- **AVOID WHEN:** There are no meaningful filters or navigation that drive the right panel. Also avoid on content that needs wide tables.
- **WORKS WITH:** Desktop-first. On mobile, left panel becomes a collapsible drawer or top filter bar; right panel goes full-width.

---

## Content / App Layouts

### Sidebar + Content

```
┌──────────────────────────────────────┐
│  Top Bar (logo, search, profile)     │
├────────┬─────────────────────────────┤
│        │                             │
│  Side  │  Main Content Area          │
│  Nav   │                             │
│        │                             │
│  ----  │                             │
│  Link1 │                             │
│  Link2 │                             │
│  Link3 │                             │
│        │                             │
└────────┴─────────────────────────────┘
```

- **BEST FOR:** Multi-section apps (settings, admin panels, docs sites, SaaS products). The sidebar provides persistent navigation context.
- **TRADE-OFF:** Sidebar eats 200-280px of horizontal space permanently. Content area is narrower, which hurts wide tables and charts.
- **AVOID WHEN:** There are fewer than 4 navigation items (overkill), or the app is content-heavy and needs full width (blog, reading app).
- **WORKS WITH:** Desktop-first. Sidebar collapses to hamburger or icon-only rail on tablet; off-canvas drawer on mobile.

### Top-Nav + Content

```
┌──────────────────────────────────────┐
│  Logo  │  Nav1  Nav2  Nav3  │ Profile│
├──────────────────────────────────────┤
│                                      │
│  Full-Width Content Area             │
│                                      │
│                                      │
│                                      │
└──────────────────────────────────────┘
```

- **BEST FOR:** Marketing sites, blogs, portfolios, apps with 3-7 top-level sections. Maximizes content width.
- **TRADE-OFF:** Top nav loses context when scrolling (unless sticky). Limited to ~7 items before it overflows.
- **AVOID WHEN:** Deep navigation hierarchies (nested sub-sections), or apps where the user constantly switches between many sections.
- **WORKS WITH:** Both. Nav items collapse to hamburger on mobile. Clean responsive story.

### Minimal / Focus Layout

```
┌──────────────────────────────────────┐
│              Logo                    │
├──────────────────────────────────────┤
│                                      │
│                                      │
│         Centered Content             │
│         (max-width ~680px)           │
│                                      │
│                                      │
└──────────────────────────────────────┘
```

- **BEST FOR:** Writing/reading apps, auth pages (login/signup), onboarding flows, checkout, single-purpose pages.
- **TRADE-OFF:** Wastes screen real estate on large monitors. No room for secondary content or navigation.
- **AVOID WHEN:** The page has multi-column data, dashboards, or needs persistent navigation.
- **WORKS WITH:** Mobile-first. Content is already narrow; scales up naturally. Best responsive story of any layout.

### Three-Column Layout

```
┌──────────────────────────────────────┐
│  Top Bar                             │
├────────┬──────────────┬──────────────┤
│        │              │              │
│  Left  │   Main       │   Right      │
│  Nav   │   Content    │   Panel      │
│        │              │  (details,   │
│        │              │   chat,      │
│        │              │   context)   │
│        │              │              │
└────────┴──────────────┴──────────────┘
```

- **BEST FOR:** Email clients, social feeds with detail panels, IDEs, Slack-style apps where context (left), content (center), and details (right) coexist.
- **TRADE-OFF:** Each column is narrow. Requires careful min-width management. Complex responsive collapse.
- **AVOID WHEN:** Content in the center column needs to be wide, or the app doesn't have a natural three-part information hierarchy.
- **WORKS WITH:** Desktop-only initially. On tablet, right panel becomes a slide-over. On mobile, each column becomes a separate view with back navigation.

---

## Landing Page Layouts

### Hero-First Landing

```
┌──────────────────────────────────────┐
│  Nav                                 │
├──────────────────────────────────────┤
│                                      │
│   Big Headline                       │
│   Subtext + CTA Button              │
│   [Hero Image / Illustration]       │
│                                      │
├──────────────────────────────────────┤
│  Feature 1  │  Feature 2  │ Feat 3  │
├──────────────────────────────────────┤
│  Social Proof / Logos               │
├──────────────────────────────────────┤
│  Footer CTA                         │
└──────────────────────────────────────┘
```

- **BEST FOR:** Product launches, SaaS homepages, any page where the value proposition is clear and can be stated in one headline.
- **TRADE-OFF:** If the hero doesn't resonate immediately, users bounce before seeing features below. Depends heavily on copy quality.
- **AVOID WHEN:** The product requires explanation (complex B2B, multi-feature platforms), or the hero image/illustration isn't ready.
- **WORKS WITH:** Both. Hero stacks naturally; feature grid goes 1-col on mobile.

### Story-Scroll Landing

```
┌──────────────────────────────────────┐
│  Nav (sticky)                        │
├──────────────────────────────────────┤
│  Section 1: Problem Statement       │
├──────────────────────────────────────┤
│  Section 2: Solution Introduction   │
├──────────────────────────────────────┤
│  Section 3: How It Works (steps)    │
├──────────────────────────────────────┤
│  Section 4: Results / Proof         │
├──────────────────────────────────────┤
│  Section 5: CTA                     │
└──────────────────────────────────────┘
```

- **BEST FOR:** Products that need explanation, B2B SaaS with complex value props, consulting/agency sites, anything where the user needs to be guided through a narrative.
- **TRADE-OFF:** Long page. Users who want to act quickly must scroll past the story. Page load can be heavy if sections include animations/media.
- **AVOID WHEN:** The product is self-explanatory, or users arrive with high intent (they already know what they want).
- **WORKS WITH:** Both. Sections are full-width blocks that stack naturally on any screen size.

### Feature-Grid Landing

```
┌──────────────────────────────────────┐
│  Nav                                 │
├──────────────────────────────────────┤
│  Brief Hero (short)                 │
├────────────┬────────────┬────────────┤
│  Feature   │  Feature   │  Feature   │
│  Card 1    │  Card 2    │  Card 3    │
├────────────┼────────────┼────────────┤
│  Feature   │  Feature   │  Feature   │
│  Card 4    │  Card 5    │  Card 6    │
├────────────┴────────────┴────────────┤
│  Pricing / CTA                      │
└──────────────────────────────────────┘
```

- **BEST FOR:** Feature-rich products, comparison pages, developer tools with many capabilities, platforms where breadth of features is the selling point.
- **TRADE-OFF:** No narrative flow. Feels like a catalog rather than a story. Users may not know where to start.
- **AVOID WHEN:** The product has one killer feature (hero-first is better), or when features need explanation beyond a card.
- **WORKS WITH:** Both. Grid reflows from 3-col to 2-col to 1-col cleanly.

### Social-Proof-Heavy Landing

```
┌──────────────────────────────────────┐
│  Nav                                 │
├──────────────────────────────────────┤
│  Hero: "Trusted by X,000 teams"     │
├──────────────────────────────────────┤
│  Logo Bar (client logos)            │
├──────────────────────────────────────┤
│  Testimonial 1 (large, featured)    │
├──────────┬──────────┬────────────────┤
│  Quote 2 │ Quote 3  │  Quote 4      │
├──────────┴──────────┴────────────────┤
│  Case Study Highlight               │
├──────────────────────────────────────┤
│  CTA                                │
└──────────────────────────────────────┘
```

- **BEST FOR:** Enterprise sales pages, products in competitive markets, any situation where trust and validation drive conversion more than feature lists.
- **TRADE-OFF:** Requires real testimonials and logos. Placeholder content kills credibility. Also delays feature information — users who want to know what the product does must scroll past proof.
- **AVOID WHEN:** You don't have testimonials yet (early-stage), or the audience is technical and wants specs, not quotes.
- **WORKS WITH:** Both. Testimonial cards stack on mobile. Logo bar scrolls horizontally or wraps.

---

## Settings / Form Layouts

### Single-Column Form

```
┌──────────────────────────────────────┐
│  Page Title                          │
├──────────────────────────────────────┤
│                                      │
│  Label                               │
│  [  Input                         ]  │
│                                      │
│  Label                               │
│  [  Input                         ]  │
│                                      │
│  Label                               │
│  [  Textarea                      ]  │
│                                      │
│  [ Cancel ]  [ Save ]               │
│                                      │
└──────────────────────────────────────┘
```

- **BEST FOR:** Simple forms (contact, login, signup), settings pages with <10 fields, any form where fields are filled top-to-bottom.
- **TRADE-OFF:** Tall page for many fields. Wastes horizontal space on desktop.
- **AVOID WHEN:** There are 15+ fields (too much scrolling), or fields naturally pair (first name / last name).
- **WORKS WITH:** Mobile-first. Already single-column; no responsive work needed.

### Grouped Sections Form

```
┌──────────────────────────────────────┐
│  Settings                            │
├──────────────────────────────────────┤
│  ── Profile ──────────────────────── │
│  Name     [               ]          │
│  Email    [               ]          │
│  Avatar   [Upload]                   │
├──────────────────────────────────────┤
│  ── Notifications ────────────────── │
│  Email alerts    [Toggle]            │
│  Push alerts     [Toggle]            │
├──────────────────────────────────────┤
│  ── Danger Zone ──────────────────── │
│  [Delete Account]                    │
└──────────────────────────────────────┘
```

- **BEST FOR:** Settings pages with multiple categories, profile edit pages, admin config screens. Groups reduce cognitive load.
- **TRADE-OFF:** Grouped sections can still be long. Users must scan section headers to find what they want.
- **AVOID WHEN:** Sections have very few fields each (1-2 per section makes grouping feel over-engineered). Use single-column instead.
- **WORKS WITH:** Both. Sections stack naturally. On desktop, can optionally show section nav on the left.

### Tabbed Form

```
┌──────────────────────────────────────┐
│  Settings                            │
├──────────────────────────────────────┤
│  [General] [Security] [Billing]      │
├──────────────────────────────────────┤
│                                      │
│  Content for selected tab            │
│                                      │
│  Field 1   [            ]            │
│  Field 2   [            ]            │
│                                      │
│  [ Save ]                            │
│                                      │
└──────────────────────────────────────┘
```

- **BEST FOR:** Settings with 3-8 distinct categories, account management pages, admin panels where each tab is self-contained.
- **TRADE-OFF:** State management — unsaved changes in Tab A when switching to Tab B. Must decide: save per-tab or save-all. Also hides content, so users may miss settings in other tabs.
- **AVOID WHEN:** Tabs have dependent fields (Field in Tab B depends on a value in Tab A), or there are only 2 categories (use grouped sections instead).
- **WORKS WITH:** Both. Tabs can become a dropdown or scrollable pill bar on mobile.

### Wizard / Multi-Step Form

```
┌──────────────────────────────────────┐
│  Step 1 of 4: Basic Info             │
├──────────────────────────────────────┤
│  ●────○────○────○  Progress          │
├──────────────────────────────────────┤
│                                      │
│  Name     [               ]          │
│  Email    [               ]          │
│                                      │
│  [ Back ]           [ Next Step ]    │
│                                      │
└──────────────────────────────────────┘
```

- **BEST FOR:** Onboarding flows, checkout processes, complex forms with 10+ fields that benefit from progressive disclosure, signup with conditional steps.
- **TRADE-OFF:** Users can't see all fields at once. Harder to go back and review. More complex to build (state across steps, validation per step, progress tracking).
- **AVOID WHEN:** The form has fewer than 6 fields (overkill), or users need to compare/reference fields across steps.
- **WORKS WITH:** Mobile-first. Each step is already focused and narrow. Excellent mobile experience.

---

## List / Detail Layouts

### Master-Detail

```
┌──────────────────────────────────────┐
│  Top Bar                             │
├─────────────┬────────────────────────┤
│             │                        │
│  Item List  │  Selected Item Detail  │
│  > Item 1   │                        │
│    Item 2   │  Title: Item 1         │
│    Item 3   │  Status: Active        │
│    Item 4   │  Description: ...      │
│    Item 5   │  [Actions]             │
│             │                        │
└─────────────┴────────────────────────┘
```

- **BEST FOR:** Email clients, message apps, customer lists, any workflow where users scan a list and drill into details without losing context.
- **TRADE-OFF:** Both panels are narrow. Detail panel can't show wide content (tables, large images).
- **AVOID WHEN:** Details are complex enough to need their own full page, or the list has very few items (under 5).
- **WORKS WITH:** Desktop-first. On mobile, list and detail become separate views with back navigation (push/pop pattern).

### Card Grid

```
┌──────────────────────────────────────┐
│  Title + Filters + [+ New]           │
├────────────┬────────────┬────────────┤
│ ┌────────┐ │ ┌────────┐ │ ┌────────┐│
│ │ Image  │ │ │ Image  │ │ │ Image  ││
│ │ Title  │ │ │ Title  │ │ │ Title  ││
│ │ Meta   │ │ │ Meta   │ │ │ Meta   ││
│ └────────┘ │ └────────┘ │ └────────┘│
├────────────┼────────────┼────────────┤
│ ┌────────┐ │ ┌────────┐ │ ┌────────┐│
│ │  ...   │ │ │  ...   │ │ │  ...   ││
│ └────────┘ │ └────────┘ │ └────────┘│
└────────────┴────────────┴────────────┘
```

- **BEST FOR:** Product catalogs, portfolio galleries, team directories, file browsers, any visual-first collection.
- **TRADE-OFF:** Cards show limited information per item. Comparing items across cards is harder than in a table. Pagination or infinite scroll needed for large datasets.
- **AVOID WHEN:** Items have many comparable fields (use a table), or the data is text-heavy without visual components.
- **WORKS WITH:** Both. Grid reflows from 3-col to 2-col to 1-col. Cards are inherently responsive-friendly.

### Table + Drawer

```
┌──────────────────────────────────────┐
│  Title + Filters + [+ New]           │
├──────────────────────────────────────┤
│  Col A  │ Col B  │ Col C  │ Actions  │
│─────────┼────────┼────────┼──────────│
│  Row 1  │ val    │ val    │ [View]   │
│  Row 2  │ val    │ val    │ [View]   │◄── click
│  Row 3  │ val    │ val    │ [View]   │
├──────────────────────────────────────┤
│  Pagination                          │
└──────────────────────────────────────┘
         opens ──►  ┌─────────────────┐
                    │  Detail Drawer  │
                    │  (slides in     │
                    │   from right)   │
                    └─────────────────┘
```

- **BEST FOR:** Data-heavy apps (admin panels, CRMs, order management) where users need to scan many rows then inspect one.
- **TRADE-OFF:** Drawer has limited width. Complex details may need a full page instead. Table can still be hard to read on small screens.
- **AVOID WHEN:** Item details are too complex for a drawer, or the table has fewer than 3 columns (master-detail may be simpler).
- **WORKS WITH:** Desktop-first. On mobile, table becomes card list or horizontally scrollable; drawer becomes full-screen modal.

### Kanban Board

```
┌──────────────────────────────────────┐
│  Board Title + Filters               │
├──────────┬──────────┬────────────────┤
│  To Do   │  In Prog │  Done          │
│ ┌──────┐ │ ┌──────┐ │ ┌──────┐      │
│ │Card 1│ │ │Card 4│ │ │Card 6│      │
│ └──────┘ │ └──────┘ │ └──────┘      │
│ ┌──────┐ │ ┌──────┐ │               │
│ │Card 2│ │ │Card 5│ │               │
│ └──────┘ │ └──────┘ │               │
│ ┌──────┐ │          │               │
│ │Card 3│ │          │               │
│ └──────┘ │          │               │
└──────────┴──────────┴────────────────┘
```

- **BEST FOR:** Project management, workflow tracking, pipeline visualization, any process with distinct stages.
- **TRADE-OFF:** Columns get narrow with 4+ stages. Doesn't scale well to large numbers of items per column. Horizontal scrolling needed for many stages.
- **AVOID WHEN:** There are more than 6 stages (too many columns), or items don't have a clear progression/status flow.
- **WORKS WITH:** Desktop-first. On mobile, columns become horizontally scrollable or switch to a list view grouped by status.

---

## E-Commerce Layouts

### Grid Browse

```
┌──────────────────────────────────────┐
│  Nav + Search + Cart                 │
├──────────────────────────────────────┤
│  Filters: [Category ▼] [Price ▼]    │
├────────────┬────────────┬────────────┤
│ ┌────────┐ │ ┌────────┐ │ ┌────────┐│
│ │ Image  │ │ │ Image  │ │ │ Image  ││
│ │ Name   │ │ │ Name   │ │ │ Name   ││
│ │ $Price │ │ │ $Price │ │ │ $Price ││
│ └────────┘ │ └────────┘ │ └────────┘│
├────────────┼────────────┼────────────┤
│ ┌────────┐ │ ┌────────┐ │ ┌────────┐│
│ │  ...   │ │ │  ...   │ │ │  ...   ││
│ └────────┘ │ └────────┘ │ └────────┘│
└────────────┴────────────┴────────────┘
```

- **BEST FOR:** Product listing pages, search results, catalogs where all products are equal priority and browsing is the primary action.
- **TRADE-OFF:** No product gets visual priority. Hard to guide users toward specific items. Relies on filters/sort to surface relevance.
- **AVOID WHEN:** You want to promote specific products, or the catalog is very small (under 6 items — use featured layout).
- **WORKS WITH:** Both. Grid reflows naturally. Filter bar collapses to a filter button/modal on mobile.

### Featured + Grid

```
┌──────────────────────────────────────┐
│  Nav + Search + Cart                 │
├──────────────────────────────────────┤
│                                      │
│  Featured Product (hero banner)      │
│  [Image]  Title + Price + [Buy]     │
│                                      │
├────────────┬────────────┬────────────┤
│  Product 1 │ Product 2  │ Product 3  │
├────────────┼────────────┼────────────┤
│  Product 4 │ Product 5  │ Product 6  │
└────────────┴────────────┴────────────┘
```

- **BEST FOR:** Homepage of a store, seasonal promotions, new arrivals — any time there is a hero product to highlight above the regular grid.
- **TRADE-OFF:** The featured product must be curated/maintained. Stale featured content hurts more than a plain grid. Grid items below get less attention.
- **AVOID WHEN:** All products should get equal visibility, or there is no clear product to feature.
- **WORKS WITH:** Both. Featured section stacks image above text on mobile; grid reflows below.

### Category-First

```
┌──────────────────────────────────────┐
│  Nav + Search + Cart                 │
├──────────────────────────────────────┤
│  ── Electronics ──────────────────── │
│  Product 1  │  Product 2  │  Prod 3  │
│  [See All Electronics →]             │
├──────────────────────────────────────┤
│  ── Clothing ─────────────────────── │
│  Product 4  │  Product 5  │  Prod 6  │
│  [See All Clothing →]               │
├──────────────────────────────────────┤
│  ── Home & Garden ────────────────── │
│  Product 7  │  Product 8  │  Prod 9  │
│  [See All Home & Garden →]          │
└──────────────────────────────────────┘
```

- **BEST FOR:** Marketplaces with distinct categories, department stores, any catalog where categories help users orient. Good for first-time visitors who don't know what to search for.
- **TRADE-OFF:** Shows fewer products per category. Users looking for a specific product must navigate through category first or use search.
- **AVOID WHEN:** There are fewer than 3 categories, or categories are unbalanced (one has 100 products, others have 3).
- **WORKS WITH:** Both. Each category row reflows to 2-col or 1-col on mobile. Category headers provide natural scroll landmarks.
