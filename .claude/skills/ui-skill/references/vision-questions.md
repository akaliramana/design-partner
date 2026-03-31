# Vision Question Bank

Loaded when context is THIN. Select 3-5 questions based on detected project type.
Ask VISION questions (product, users, goals) — NOT design questions (colors, fonts, layout).
The answers to these questions directly shape layout, hierarchy, and interaction decisions.

---

## Universal (any project type)

1. **Who is the primary user, and what's their skill level with tools like this?**
   [WHY THIS MATTERS] A developer dashboard vs a consumer app for retirees demands completely different information density, terminology, and interaction patterns. This single answer sets the cognitive load budget for the entire design.

2. **What is the ONE thing a user should do or understand within the first 10 seconds?**
   [WHY THIS MATTERS] This defines the visual hierarchy root. Everything else is subordinate. Without this, the design has no focal point and the layout becomes a flat grid of equally-weighted elements.

3. **What does success look like — what happens when this product is working well?**
   [WHY THIS MATTERS] Success metrics shape what gets measured, displayed, and emphasized. A product where success = "user completes a purchase" has radically different hierarchy than one where success = "user understands a trend."

4. **Is there an existing product or competitor that your users are coming FROM?**
   [WHY THIS MATTERS] Users carry mental models from previous tools. If they're migrating from Notion, they expect inline editing. If from Excel, they expect tabular data. Fighting established mental models creates friction; leveraging them creates instant familiarity.

5. **What should this feel like — fast and efficient, or calm and guided?**
   [WHY THIS MATTERS] This sets the pacing of the entire interface. Fast/efficient = dense layouts, keyboard shortcuts, minimal transitions. Calm/guided = generous whitespace, progressive disclosure, deliberate animation. You cannot optimize for both.

---

## Dashboard / Analytics

1. **What decision does the user make after looking at this dashboard?**
   [WHY THIS MATTERS] A dashboard that informs a "should I intervene?" decision needs anomaly detection and thresholds front-and-center. One that answers "how did we do this quarter?" needs trend lines and comparisons. The decision type determines what data gets top-level placement.

2. **How often do users check this — hourly monitoring or weekly review?**
   [WHY THIS MATTERS] Hourly monitoring = glanceable KPIs, status indicators, real-time data. Weekly review = summaries, trends, period comparisons. Monitoring dashboards should be scannable in 3 seconds. Review dashboards can reward deeper exploration.

3. **What's the "oh shit" signal — the metric that means something is wrong?**
   [WHY THIS MATTERS] This becomes the highest-contrast, most prominent element. It needs to be visible from across the room on a wall-mounted display, or the first thing that pops on a phone notification. Every other element defers to this alert state.

4. **Are users comparing things — time periods, segments, products?**
   [WHY THIS MATTERS] Comparison-heavy dashboards need side-by-side layouts, consistent scales, and careful color coding. Non-comparison dashboards can use the full canvas for single metrics. This fundamentally changes the grid structure.

---

## Landing Page / Marketing

1. **If a visitor reads nothing but the headline and CTA, what must they understand?**
   [WHY THIS MATTERS] This is the literal content of the two most important elements on the page. Everything else — social proof, features, visuals — exists to reinforce this core message. If you can't answer this in one sentence, the page will be unfocused.

2. **What is the visitor's state of mind when they arrive — curious, skeptical, desperate?**
   [WHY THIS MATTERS] Curious visitors need intrigue and momentum (short sections, visual hooks). Skeptical visitors need proof and credibility (testimonials, logos, data). Desperate visitors need immediate clarity and a fast path to the solution. The emotional state determines section order.

3. **What's the single conversion action — and what happens after they click?**
   [WHY THIS MATTERS] One CTA = one design focus. "Sign up free" vs "Book a demo" vs "Buy now" each imply different levels of commitment, different amounts of supporting content needed, and different urgency in the visual treatment. Post-click experience affects how much trust you need to build pre-click.

4. **Who is NOT the target audience — who should self-select OUT?**
   [WHY THIS MATTERS] Sharp positioning requires exclusion. Knowing who this ISN'T for prevents the copy and design from becoming generic. "Not for enterprises" means you can use casual language and skip compliance features. This makes the design more specific and therefore more compelling.

---

## E-commerce / Marketplace

1. **How does the buyer decide — price comparison, visual appeal, reviews, or specifications?**
   [WHY THIS MATTERS] This determines the card/listing layout entirely. Price-driven = prominent price, comparison features. Visual = large images, gallery-first. Review-driven = ratings and social proof above the fold. Spec-driven = filterable attributes, comparison tables. The decision driver becomes the visual anchor.

2. **How many products/listings are there — tens, hundreds, or thousands?**
   [WHY THIS MATTERS] Catalog size determines the navigation architecture. 20 products = curated grid, no search needed. 500 = category navigation with filters. 10,000+ = search-first with faceted filtering. Building the wrong navigation for the catalog size creates either over-engineered or unusable experiences.

3. **Is this a one-time purchase or a repeat/subscription relationship?**
   [WHY THIS MATTERS] One-time purchases need to build all trust and convey all value in a single session — heavier product pages, more social proof. Repeat purchases need fast reorder flows, saved preferences, and account-centric design. The purchase frequency determines whether the design optimizes for discovery or efficiency.

4. **What's the average order value and consideration time?**
   [WHY THIS MATTERS] A $5 impulse purchase needs a frictionless, fast checkout — minimize steps, hide complexity. A $5,000 purchase needs detailed specs, comparison tools, and trust signals. Consideration time determines how much content depth the product page needs.

---

## SaaS / Tool

1. **What does the user's workflow look like BEFORE and AFTER using this tool?**
   [WHY THIS MATTERS] Understanding the before/after reveals what the tool replaces. If it replaces a spreadsheet, the UI needs to feel at least as fast for the core task. If it replaces email threads, it needs to show conversation context. The replaced workflow sets the minimum bar for the primary interaction.

2. **What's the core action users repeat most often — the thing they do 50x per session?**
   [WHY THIS MATTERS] The most-repeated action must be the most accessible, fastest, and most refined interaction in the entire product. It gets the prime screen real estate, the keyboard shortcut, and the most polish. Everything else can have more friction.

3. **Is this a "leave it open all day" tool or a "pop in and out" tool?**
   [WHY THIS MATTERS] All-day tools need to be visually quiet (muted colors, low contrast chrome), support dense information display, and never feel fatiguing. Pop-in tools need to orient the user instantly on every visit — what changed, what needs attention, and where they left off.

4. **How does the user know they're making progress or doing it right?**
   [WHY THIS MATTERS] This defines the feedback system — progress bars, success states, completion indicators, live previews. Without this, users feel uncertain and anxious. The feedback mechanism often becomes a defining UX element (think Notion's satisfying slash commands or Linear's smooth state transitions).

---

## Internal Tool / Admin

1. **What's the cost of an error — can the user undo, or is a mistake expensive?**
   [WHY THIS MATTERS] High error cost = confirmation dialogs, preview states, undo capabilities, and visual warnings. Low error cost = fast inline editing, no friction. A billing admin tool that processes refunds needs very different safeguards than an internal wiki.

2. **How many distinct user roles interact with this, and what does each need?**
   [WHY THIS MATTERS] Role count determines whether you need one flexible interface or multiple focused views. 1-2 roles = single layout with permission-based visibility. 5+ roles = separate dashboards or deeply customizable views. Building a one-size-fits-all for many roles creates a cluttered compromise.

3. **What data do users look at vs. what data do they act on?**
   [WHY THIS MATTERS] Read-heavy interfaces need scannable tables and good search. Action-heavy interfaces need prominent controls, batch operations, and clear status indicators. Most admin tools are 80% reading, 20% acting — the layout should reflect that ratio, not give equal weight to both.

---

## Portfolio / Personal Site

1. **What should a visitor remember about you 5 minutes after leaving?**
   [WHY THIS MATTERS] This defines the brand impression and therefore the entire visual personality. "Meticulous craftsman" = fine details, precise spacing, subtle interactions. "Bold creative" = strong type, unexpected layouts, expressive color. The memorable quality becomes the design constraint.

2. **What's the desired next step — hire you, follow you, or explore your work?**
   [WHY THIS MATTERS] "Hire me" = contact info prominent, case studies with business results, professional credibility. "Follow me" = personality-forward, content samples, social links. "Explore my work" = gallery-first, minimal text, immersive presentations. The goal determines the information architecture.

3. **What medium is your work — visual (design/photo), written (code/writing), or mixed?**
   [WHY THIS MATTERS] Visual work needs large preview areas, careful image loading, and a layout that doesn't compete with the work. Written/code work needs good typography and reading experience. Mixed needs a flexible system that can present different formats without feeling inconsistent.

---

## Mobile App

1. **What's the primary use context — on the go, at a desk, or in bed?**
   [WHY THIS MATTERS] On-the-go = one-handed operation, large touch targets, minimal text input, works in bright sunlight. At a desk = can be more detailed, supports text input. In bed = dark mode essential, comfortable scroll, low visual intensity. Context determines the entire interaction model.

2. **Is this a destination app (users go TO it) or an interrupt app (it comes TO users)?**
   [WHY THIS MATTERS] Destination apps need engaging home screens and exploration flows. Interrupt apps (notifications-driven) need fast-loading, context-rich notification views and quick-action capabilities. The entry point pattern determines the navigation architecture.

3. **What native apps do your users spend the most time in?**
   [WHY THIS MATTERS] Users will unconsciously compare your app's interaction patterns to their most-used apps. If they live in Instagram, they expect gesture-heavy, visual-first interfaces. If they live in Slack, they expect text-heavy, searchable, organized channels. This sets the interaction vocabulary.

4. **Does this need to work offline, and what happens when connection is poor?**
   [WHY THIS MATTERS] Offline capability determines the entire data architecture and, visually, requires clear state indicators (synced/unsynced), optimistic UI patterns, and graceful degradation. A maps app that goes blank underground fails fundamentally.

---

## POC / Prototype (lighter set — ask 2-3 max)

1. **What's the one hypothesis you're testing with this prototype?**
   [WHY THIS MATTERS] A prototype that tests everything tests nothing. The hypothesis determines which part of the UI needs to be realistic and which can be placeholder. This focuses design effort on the one screen or flow that must feel real.

2. **Who will see this, and what decision will they make based on it?**
   [WHY THIS MATTERS] A prototype for investors needs polish and vision. A prototype for user testing needs realistic interactions but can skip visual polish. A prototype for your engineering team needs accurate component structure. The audience determines the fidelity level.

3. **What's the scope boundary — what should this explicitly NOT include?**
   [WHY THIS MATTERS] Prototypes that grow uncontrolled stop being prototypes. Knowing the boundary prevents over-building and keeps the design focused on the core hypothesis. This also prevents the skill from generating unnecessary pages or components.

---

## Brand Collateral (deck, doc, poster)

1. **What is the audience's relationship to you — cold, warm, or internal?**
   [WHY THIS MATTERS] Cold audiences (investors, new clients) need credibility and context first. Warm audiences (existing clients, partners) need updates and specifics. Internal audiences need clarity and actionability. The relationship level determines how much you explain vs assume.

2. **What's the one takeaway — if they remember a single thing, what should it be?**
   [WHY THIS MATTERS] This becomes the visual hero — the largest element, the most repeated theme, the thing that gets its own slide or section. Everything else is supporting evidence for this single point.

3. **Will this be presented live, read async, or printed?**
   [WHY THIS MATTERS] Live presentation = large type, minimal text per slide, speaker-dependent context. Async reading = self-contained, more text, narrative structure. Printed = fixed layout, no scroll, careful use of color (ink costs). The consumption mode determines information density per page/slide.

---

## Question Selection Rules

- THIN context (no brief, vague request): Ask 4-5 questions from the matching category + 1-2 universal
- MODERATE context (some details given): Ask 2-3 targeted questions that fill specific gaps
- If project type is unclear: Start with universal questions; the answers will reveal the type
- For POC/prototype: Cap at 3 questions total — speed matters more than completeness
- NEVER ask more than 5 questions total — respect the user's time
- Present questions as a numbered list, not a wall of text
- After receiving answers, confirm your understanding in ONE sentence before proceeding
