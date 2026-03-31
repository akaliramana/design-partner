# First Principles: 6-Axis Design Reasoning Framework

Every design decision is argued through these 6 axes. No decision is made by instinct or default — every choice has a reason traceable to one or more axes.

---

## Axis 1: Information Hierarchy

**Definition:** The deliberate ordering of visual elements so the eye encounters information in the intended sequence — first, second, third. Not "what's on the page" but "what's seen when."

**How to assess:**
- Squint at the screen until everything blurs. The first thing still visible is your #1 element. If it's not the most important content, the hierarchy is broken.
- Screenshot the design and shrink it to thumbnail size. If you can still identify the primary element, the hierarchy works.
- Ask: "If the user looks for exactly 2 seconds and then looks away, what did they see?" If the answer isn't the most important thing, fix it.

**How it shapes layout:**
- The #1 element gets the most visual weight: largest size, highest contrast, most whitespace around it, prime position (top-left in LTR, center if single-focus)
- #2 and #3 elements get progressively less weight but must still be discoverable
- Everything else is accessible but quiet — it exists for users who look for it, not for everyone
- Navigation, footers, and meta-information are never #1 unless the product IS navigation (search engine, directory)

**Common mistakes:**
- **Everything is bold:** When every element screams for attention, nothing gets it. The designer tried to make everything important and achieved the opposite.
- **Size without contrast:** Making text bigger doesn't create hierarchy if everything is the same color and weight. Hierarchy requires DIFFERENCE across multiple properties.
- **Position-only hierarchy:** Putting the important thing at the top but styling it the same as everything below. Users scan, they don't read top-to-bottom.

**Worked example — SaaS dashboard:**
The #1 element is the key metric the user checks every morning ("Revenue today: $14,230"). This gets: 48px font, high-contrast color, full-width positioning, and generous padding that separates it from everything else. The #2 element is the trend ("↑ 12% vs yesterday") — placed directly beneath in 16px muted text. #3 is the action area ("View details" link). The 6 secondary metrics get a grid below with 24px values and 12px labels — clearly subordinate. Navigation is a quiet sidebar with no visual weight competition.

---

## Axis 2: Action Priority

**Definition:** The classification of every interactive element into exactly one tier — primary (the thing we most want the user to do), secondary (reasonable alternatives), or tertiary (available but de-emphasized). No element exists without a tier.

**How to assess:**
- List every button, link, and interactive element on the screen
- Force-rank them: if you could only keep ONE, which survives?
- Count the primary actions. If there's more than one per viewport, you have a priority conflict.
- Check: can a user identify the primary action within 1 second of seeing the page?

**How it shapes layout:**
- **Primary action:** Highest visual prominence. Filled button, strong color, positioned in the natural eye-flow termination point (right side of a form, bottom of a card, fixed bottom bar on mobile). Only ONE per viewport.
- **Secondary actions:** Visible but visually subordinate. Outlined buttons, text links, lower contrast. Positioned near the primary but clearly secondary.
- **Tertiary actions:** Available but hidden or minimal. Text links, overflow menus, hover-revealed controls. The user who needs them can find them; everyone else isn't distracted.

**Common mistakes:**
- **Two primary buttons side by side:** "Save" and "Save & Continue" both styled as filled primary buttons. The user hesitates. Make one primary, one secondary.
- **Ghost buttons for primary actions:** Using an outlined/ghost button for the most important action because it "looks cleaner." Clean doesn't convert; clear does.
- **CTAs in unexpected places:** A primary action button in the sidebar instead of the main content area. Actions should live where the user's attention already is.

**Worked example — checkout flow:**
Primary action: "Place Order" — filled button, brand color, full-width on mobile, right-aligned on desktop, with price summary directly above it to reinforce the decision. Secondary: "Apply coupon" — text link below the order summary. Tertiary: "Edit cart," "Change shipping" — quiet text links on each section header. The entire page funnels toward the one primary action.

---

## Axis 3: Cognitive Load

**Definition:** The total mental effort required to process and act on the information presented. Every element on screen has a processing cost. The budget is finite and varies by user and context.

**How to assess:**
- Count distinct information groups on the screen. More than 5-7 groups = high load.
- Count decisions the user must make. Each decision costs cognitive effort. More than 2-3 active decisions per screen = too many.
- Ask: "Could a slightly distracted user complete the intended task?" If no, the load is too high for the context.
- Read all the text on the screen out loud. If it takes more than 15 seconds, there's too much text.

**How it shapes layout:**
- High-load content (data tables, forms, dashboards) needs aggressive chunking, clear section breaks, and progressive disclosure
- Low-load goals (landing pages, onboarding) need generous whitespace, one idea per viewport, and minimal parallel information
- Power-user tools can sustain higher load IF the user has learned the interface — but the first session must be lighter
- Every element that doesn't serve the current task is load that steals from the task that matters

**Common mistakes:**
- **Settings page with 40 options visible:** Users freeze. Progressive disclosure (categories → sections → individual settings) reduces perceived load without removing capability.
- **Form with 15 fields on one screen:** Break into logical steps. Even 15 quick fields feel overwhelming as a wall; 3 steps of 5 fields feels manageable.
- **Helper text everywhere:** When every field has a tooltip, instruction paragraph, and example, the help becomes the load. Show help contextually — on focus, on error, or on hover.

**Worked example — onboarding flow:**
Screen 1: "What's your name?" — single input, one button. Cognitive load: near zero. Screen 2: "What's your team size?" — radio buttons with 4 options. One decision, pre-selected default for the most common choice. Screen 3: "Choose your first project template" — 3 cards with image, title, one-line description. Limited choice set with visual differentiators. Total: 3 screens, 3 decisions, each trivial. The same information collected in a single form would feel like tax paperwork.

---

## Axis 4: Context of Use

**Definition:** The real-world circumstances under which the interface is used — device, environment, attention level, session frequency, and physical constraints. The same information needs different designs in different contexts.

**How to assess:**
- What device(s)? Phone, tablet, desktop, TV, kiosk?
- What environment? Office (focused), commute (distracted), outdoors (bright screen), bed (casual)?
- What attention level? Full attention (data entry), partial (monitoring), fragmented (notifications)?
- How often? Multiple times daily (needs to be fast), weekly (needs re-orientation), once (needs guidance)?
- How long per session? 5 seconds (glanceable), 5 minutes (task-focused), 5 hours (endurance)?

**How it shapes layout:**
- **Mobile on-the-go:** Large touch targets (48px minimum), minimal text input, one-column layout, critical information above the fold, thumb-zone aware placement
- **Desktop focused work:** Can support multi-column layouts, keyboard shortcuts, dense information, hover states, small click targets
- **Monitoring/ambient:** Glanceable metrics, high contrast for distance viewing, status-through-color, auto-refresh, minimal interaction required
- **Infrequent use:** Re-orientation cues (breadcrumbs, clear labels, contextual help), avoid relying on learned shortcuts or hidden features

**Common mistakes:**
- **Desktop-first responsive:** Designing a full desktop layout and squeezing it onto mobile. Mobile needs its own information architecture, not a miniaturized desktop.
- **Ignoring ambient use:** A dashboard designed for close-up desktop use gets mounted on a wall TV. 14px text is unreadable from 10 feet. Design for the actual viewing distance.
- **Assuming full attention:** Most mobile use is fragmented — waiting in line, between tasks. Interfaces that require sustained attention fail on mobile.

**Worked example — delivery tracking:**
The user checks this 5-10 times between placing an order and receiving it. Each check lasts 3-5 seconds. Context: phone, distracted, wants one answer ("where is my package?"). Design: huge status badge at top ("Out for Delivery"), estimated time in large text, map below for those who want detail. No login wall, no marketing, no upsells. The entire screen answers one question instantly. On desktop, the same information gets a wider layout with a larger map and order details sidebar — because the desktop user is more likely in a "manage my orders" mindset.

---

## Axis 5: Emotional Goal

**Definition:** The specific feeling the interface should evoke — not "good" but the precise emotional state that serves the product's purpose. Interfaces are experienced emotionally before they're processed rationally.

**How to assess:**
- Name the emotion in one word: confident, calm, excited, focused, playful, reassured, empowered, delighted?
- Check: does every visual choice reinforce this emotion? (Color palette, spacing density, type weight, animation speed, image style)
- Ask: "If this interface were a physical space, what would it feel like?" A bank lobby (trustworthy, serious), a coffee shop (warm, casual), a command center (powerful, focused)?
- Identify the ANTI-emotion: what must this NOT feel like? Cheap, corporate, cold, overwhelming, childish?

**How it shapes layout:**
- **Trust/credibility:** Conservative layouts, traditional typography, ample whitespace, muted colors, real photography. Banks, healthcare, legal.
- **Energy/excitement:** Bold colors, dynamic layouts, large imagery, asymmetric compositions, motion. Gaming, fitness, entertainment.
- **Calm/focus:** Generous spacing, limited color palette, soft corners, minimal decoration, slow transitions. Meditation, productivity, reading.
- **Playfulness:** Rounded shapes, illustrative elements, saturated colors, personality in microcopy, unexpected interactions. Consumer apps, creative tools.
- **Authority/power:** Dark themes, high contrast, dense information, sharp geometry, monospace type. Dev tools, trading platforms, analytics.

**Common mistakes:**
- **Emotion mismatch:** A children's educational app that looks like enterprise SaaS. Or a medical records system with playful bouncy animations. The emotion must match the domain.
- **No emotion at all:** Defaulting to Bootstrap/Material-UI with zero personality. The result is technically functional but emotionally empty — users have no reason to prefer it.
- **Emotion through decoration:** Adding illustrations and animations to create "delight" when the core experience is frustrating. Emotion comes from the interaction quality, not the decoration.

**Worked example — personal finance app:**
The emotional goal is "confident and in control" — not anxious about money, not lectured about spending. Color: deep navy and white with green for positive trends (NOT red/green for good/bad — that creates anxiety). Type: clean sans-serif, medium weight — not thin (feels fragile) or bold (feels aggressive). Spacing: generous but not wasteful — organized like a well-kept desk. Numbers: large and clear, always with context ("$3,200 left this month" not just "$3,200"). The vibe is "you've got this" not "look at what you spent."

---

## Axis 6: Platform Conventions

**Definition:** The established patterns, behaviors, and expectations that users bring from the platform, OS, or product category they're in. Breaking conventions costs trust and requires justification.

**How to assess:**
- What platform? Web (Chrome/Safari), iOS, Android, desktop app (Electron), embedded?
- What do the top 5 products in this category do? (Navigation placement, interaction patterns, terminology)
- Which conventions are so strong they're invisible? (Hamburger menu, pull-to-refresh, swipe-to-delete, underlined links)
- Which conventions are weak enough to challenge? (Sidebar vs top nav, card layouts, infinite scroll vs pagination)

**How it shapes layout:**
- **iOS:** Tab bar at bottom (5 items max), back button top-left, action buttons top-right, large titles that shrink on scroll, haptic feedback patterns
- **Android/Material:** Bottom nav or hamburger, FAB for primary action, snackbar confirmations, top app bar with contextual actions
- **Web SaaS:** Left sidebar navigation, top bar with search and profile, content area with page-level actions in top-right, breadcrumbs for deep navigation
- **Marketing web:** Full-width sections, sticky header with CTA, scroll-based storytelling, footer with link clusters
- **Data tools:** Toolbar at top, panel-based layouts, right-click context menus, keyboard shortcuts, dense tables

**Common mistakes:**
- **Innovating on navigation:** Putting the main nav on the right side because it's "different." Users don't want different navigation; they want invisible navigation that works where they expect it.
- **Web patterns on mobile:** Hover tooltips, right-click menus, 12px click targets. Mobile has its own interaction vocabulary.
- **Ignoring OS conventions:** An iOS app with Material Design's FAB. An Android app with iOS's segmented control. Users notice — it feels foreign.

**Worked example — project management tool:**
Category conventions (set by Asana, Linear, Jira): left sidebar with project list, main area shows task list or board view, task detail opens in a panel or modal. Convention-following: maintain this layout structure — users expect it. Convention-challenging: use a simplified task creation flow instead of the category's typical form-heavy approach. The convention challenge is justified because task creation speed is the differentiator, and the current convention is a known pain point. The rest of the layout respects what users already know.

---

## How to Argue a Decision

Every significant design choice presented to the user follows this format:

### The Decision Statement
State what was decided in one sentence.

> "The primary navigation is a left sidebar that collapses to icons on smaller screens."

### The Reasoning (cite axes)
Explain WHY using specific axes. Not all 6 — only the ones that are decisive for this choice.

> **Information Hierarchy:** The sidebar separates navigation from content, ensuring the content area maintains a clean hierarchy without competing navigation elements.
>
> **Context of Use:** Desktop users get the full sidebar with labels. Tablet users get collapsed icons. Mobile users get a bottom tab bar. Each context gets the appropriate navigation density.
>
> **Platform Conventions:** Left sidebar is the established convention for SaaS tools (Notion, Linear, Slack). Users will immediately understand the navigation without learning.

### The Tradeoff (what was considered and rejected)
Acknowledge the alternative to demonstrate rigor.

> "Top navigation was considered but rejected because the product has 8+ sections. A horizontal nav with 8+ items creates decision fatigue (Axis 3: Cognitive Load) and doesn't scale to future sections. Tab-based navigation was considered for mobile but rejected because the section count exceeds the 5-tab iOS convention (Axis 6: Platform Conventions)."

### The Confidence Level
Be honest about certainty:
- **HIGH:** Multiple axes align, conventions support it, no strong counter-argument
- **MEDIUM:** Good reasoning but tradeoffs are real; could go either way with justification
- **LOW:** Making a call under uncertainty; recommend user testing or explicit user preference

---

## Using the Framework in Practice

Not every decision needs all 6 axes. Most decisions are governed by 2-3 dominant axes:

| Decision Type | Dominant Axes |
|---|---|
| Layout structure | Information Hierarchy, Context of Use, Platform Conventions |
| Button/CTA placement | Action Priority, Context of Use |
| Information density | Cognitive Load, Context of Use |
| Visual style | Emotional Goal, Platform Conventions |
| Component choice | Platform Conventions, Cognitive Load |
| Animation/motion | Emotional Goal, Context of Use |
| Typography scale | Information Hierarchy, Context of Use, Cognitive Load |

When two axes conflict, name the conflict explicitly and explain which axis wins for this specific case and why:

> "Axis 5 (Emotional Goal: playful) suggests rounded shapes and saturated colors. Axis 6 (Platform Conventions: enterprise SaaS) suggests conservative, muted aesthetics. For this product — a creative collaboration tool used by designers — Axis 5 wins because the target users actively reject corporate aesthetics, and the product's positioning depends on feeling different from Jira."
