# Cognitive Load Framework

Loaded when reasoning about information density, complexity, or "how much is too much." This framework provides concrete tools for assessing and managing cognitive load in UI design.

---

## Core Laws

### Miller's Law: 7 +/- 2 Items

**The principle:** Working memory holds approximately 7 (±2) items at once. This isn't about screen elements — it's about distinct GROUPS the user must mentally track simultaneously.

**In practice:**
- A navigation menu with 12 ungrouped items exceeds the budget. The same 12 items grouped into 3 categories (4 items each) = 3 chunks, well within budget.
- A dashboard with 15 separate metrics is overload. The same 15 metrics in 4 thematic groups (Revenue, Users, Performance, Health) = 4 chunks.
- A form with 10 ungrouped fields feels overwhelming. The same 10 fields in 3 labeled sections (Personal, Address, Payment) feels manageable.

**Practical threshold:**
- Top-level navigation items: 5-7 max without grouping
- Cards/items visible simultaneously: 6-9 before the grid becomes noise
- Form fields per visible section: 5-7 before you need a new group or step
- Options in a dropdown: 7-10 before you need search or categorization

**When to break the rule:** Power users with learned interfaces can handle more. A code editor's command palette can list 50+ items because the user is actively filtering with search, not holding them all in memory.

### Hick's Law: Decision Time Scales with Options

**The principle:** The time to make a decision increases logarithmically with the number of options. Each additional choice adds decision cost, even when the "right" choice is obvious.

**In practice:**
- 2 options: near-instant decision (~300ms)
- 4 options: noticeable pause (~500ms)
- 8 options: real deliberation (~700ms)
- 16+ options: decision fatigue, potential abandonment

**Design implications:**
- Pricing pages: 3 tiers is the sweet spot. 5+ tiers cause paralysis. If you must offer 5, visually recommend one.
- Settings: Don't expose all options at once. Curate "common" settings; hide "advanced" behind a clear toggle.
- Product variants: If 20 color options exist, show the 4 most popular with a "See all colors" expansion.
- CTAs: One primary, one secondary. Three CTAs on the same screen is a decision point the user didn't ask for.

**When to break the rule:** When all options are equivalent and the user is BROWSING, not DECIDING. A photo gallery, a music playlist, an article feed — these benefit from abundance because the user is exploring, not choosing.

---

## Progressive Disclosure

**Definition:** Reveal information and options as they become relevant, not all at once. The interface grows in complexity as the user's need for complexity grows.

### The Layering Model

**Layer 1 — Glanceable (0-2 seconds):** What the user needs to orient and decide whether to engage further. Headlines, status indicators, primary metrics, key images.

**Layer 2 — Scannable (2-10 seconds):** The details needed to make a decision or take action. Supporting data, descriptions, secondary actions, related items.

**Layer 3 — Deep (10+ seconds):** Full detail for users who specifically need it. Expandable sections, linked detail pages, advanced settings, historical data.

### Implementation Patterns

| Pattern | When to Use | Example |
|---|---|---|
| Accordion/expand | Content that some users need, most don't | FAQ sections, advanced settings |
| Tabs | Parallel content categories of similar weight | Product description / Reviews / Specs |
| Step-by-step | Sequential tasks with dependencies | Checkout flow, onboarding wizard |
| Hover/focus reveal | Supporting info for specific elements | Tooltip on data point, preview on link |
| Modal/drawer | Focused sub-tasks that interrupt the main flow | Edit forms, detail views, confirmations |
| "Show more" | Lists where the first N items cover most cases | Comments, search results, related items |
| Inline expansion | Details that should stay in context | Expandable table row, read-more text |

### Progressive Disclosure Anti-Patterns

- **Disclosure for the sake of cleanliness:** Hiding essential information behind a click just to make the page look minimal. If 80% of users need the info, show it.
- **Russian nesting dolls:** Three levels of expansion to reach important content. If you need to click → expand → scroll → expand again, the hierarchy is too deep.
- **Mystery meat disclosure:** Expansion triggers with no indication of what's hidden. Users won't click "Show more" if they can't predict what "more" is.

---

## Chunking and Grouping

**Definition:** Organizing related elements into distinct visual groups, reducing the number of individual items the brain must process.

### Grouping Hierarchy (strongest to weakest)

1. **Enclosure:** A border or background color around related items. Strongest grouping signal. Use for major sections.
2. **Proximity:** Items close together are perceived as related. The gap between groups should be 2-3x the gap within groups.
3. **Similarity:** Items that look alike (same color, size, shape) are perceived as related. Use for repeated elements like cards or list items.
4. **Alignment:** Items sharing an edge or centerline feel connected. The foundation of grid-based layouts.
5. **Continuity:** Items arranged along a line or curve feel related. Use for step indicators, timelines, process flows.

### Practical Chunking Rules

**Spacing ratios that create clear groups:**
- Within a group: 8-12px between elements
- Between groups: 24-32px (2-3x the within-group spacing)
- Between sections: 48-64px (4-6x the within-group spacing)
- The ratio matters more than the absolute values. If within-group is 16px, between-group must be at least 32px to feel separate.

**Labels and headers as chunk anchors:**
- Every visual group needs either a label/header or to be so obviously related that a label is redundant
- A group of 4 cards with product images needs no label (visual content self-explains)
- A group of 4 metrics (revenue, users, conversion, churn) needs a section label or individual labels

---

## Visual Hierarchy as Load Reducer

Visual hierarchy is a cognitive load tool, not just an aesthetic one. Done right, it tells the user what to process first, making a complex screen feel simple because the brain has a processing ORDER rather than facing everything at once.

### The Squint Test (Quantified)

When you squint at the design:
- **Level 1 (visible while squinting):** 1-2 elements. These are what the page IS ABOUT.
- **Level 2 (visible at arm's length):** 3-5 elements. These support or detail Level 1.
- **Level 3 (visible at reading distance):** Everything else. Available when sought.

If more than 3 elements compete at Level 1, the hierarchy is flat and the cognitive load is high regardless of the actual element count.

### Contrast Budget

Think of contrast as a budget. You have a limited amount of "visual loudness" to distribute:
- **High contrast** (dark text on light bg, brand color, large size): Reserve for 1-2 elements per viewport
- **Medium contrast** (dark gray text, medium size, secondary colors): The workhorse for most content
- **Low contrast** (light gray, small size, icons): De-emphasize without hiding

**The rule:** If you increase contrast on one element, decrease it on another. Total contrast across the page should feel balanced, not uniformly loud.

---

## When Density Is OK vs. When It's Not

### High density is appropriate when:

- **Users are experts with learned interfaces.** Bloomberg Terminal users don't want whitespace — they want data. Excel power users expect dense grids. The interface respects their expertise by not dumbing things down.
- **The task is comparison or monitoring.** Comparing 50 rows of data requires seeing them simultaneously. A sparse, card-based layout forces scrolling that makes comparison impossible.
- **Scan speed matters more than comprehension speed.** A log viewer, a stock ticker, a server monitoring dashboard — the user is scanning for anomalies, not reading every entry.
- **Users self-selected for density.** A user who chose "compact view" is explicitly requesting density. Respect the preference.

**Guidelines for dense interfaces:**
- Typographic hierarchy must be razor-sharp — in dense layouts, hierarchy is the only load reducer
- Row striping or subtle borders become essential (they create micro-groups)
- Fixed headers and sticky columns prevent disorientation in large data sets
- Interactive elements need clear affordances — in density, "clickable" isn't obvious from layout alone

### Low density is required when:

- **Users are new or infrequent.** First-time users can't pattern-match — every element is novel and costs full cognitive processing.
- **The task involves a decision with consequences.** Checkout, account deletion, permission changes. Low density focuses attention and reduces error.
- **The emotional goal is calm or trustworthy.** Healthcare, finance, meditation — whitespace communicates "we're not trying to overwhelm you."
- **The primary content is media.** Photos, videos, illustrations need breathing room. Dense grids of images become noise.
- **Mobile context.** Smaller screens have inherently lower density budgets. What's scannable at 1440px becomes overwhelming at 375px.

**Guidelines for sparse interfaces:**
- Every element must earn its presence — in sparse layouts, each element receives more attention, so filler is more noticeable
- Whitespace must be intentional, not just "padding: 40px on everything" — varied spacing creates rhythm
- Large text sizes need careful font weight — bold at 48px can feel oppressive

---

## Assessment Checklist

When evaluating whether a screen has appropriate cognitive load:

### Quick Check (30 seconds)

1. **Squint test:** While squinting, can you identify exactly 1-2 focal points? If more: hierarchy is flat.
2. **Count the groups:** How many distinct visual groups are on screen? If more than 7: consolidate or paginate.
3. **Count the decisions:** How many things is the user asked to decide or choose? If more than 2: simplify or sequence.
4. **Read all text aloud:** Does it take more than 15 seconds? If yes: too much text visible at once.
5. **One-sentence test:** Can you say in one sentence what this screen is for? If not: the screen is trying to do too much.

### Deep Check (5 minutes)

1. **Identify every interactive element.** Are there more than 10 visible simultaneously? Consider collapsing, grouping, or progressive disclosure.
2. **Trace the eye path.** From entry point to primary action — how many "stops" does the eye make? More than 4 stops = too much competing for attention.
3. **Imagine the distracted user.** Someone using this on their phone while walking. Could they complete the primary task? If not, and this is a mobile context, load is too high.
4. **Check the fold.** What's above the fold? If it's trying to cram everything visible without scrolling, it's probably too dense. Good above-fold content gives a clear #1 element and a reason to scroll.
5. **Look for redundancy.** Is the same information communicated twice? (Icon + label + tooltip all saying the same thing.) Remove the redundancy — it's load without value.

### Threshold Reference Table

| Element | Light (consumer) | Medium (prosumer) | Dense (power user) |
|---|---|---|---|
| Nav items visible | 4-5 | 6-8 | 10-15 (grouped) |
| Cards per viewport | 3-4 | 6-9 | 12+ (list/compact) |
| Form fields per step | 3-5 | 5-8 | 10+ (single page) |
| Metrics on dashboard | 3-4 large | 6-8 mixed | 15+ (grouped) |
| Table columns visible | 4-5 | 6-8 | 12+ (scrollable) |
| Text per section | 2-3 sentences | Paragraph | Dense but structured |
| Actions per context | 1 primary, 1 secondary | 1 primary, 2 secondary | Multiple, keyboard-accessible |
