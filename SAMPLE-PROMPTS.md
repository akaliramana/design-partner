# Sample Prompts — Layout and Style Stress Tests

These prompts are meant to catch boring repetition.

They are not just "can the skill build something?"
They are "can the skill avoid defaulting to the same left-sidebar SaaS shell, the same spacing rhythm, the same white-card dashboard, and the same safe visual voice?"

Use them to test:

- layout diversity
- visual range
- UX reasoning under very different contexts
- whether the skill can reject a sidebar when a sidebar is the wrong answer
- whether the skill can make something feel intentional instead of generic

---

## Global Rules for Testing

When using these prompts, evaluate the result against these anti-boring rules:

- [ ] The output should NOT default to a left sidebar unless the prompt clearly justifies it
- [ ] The layout should fit the product's actual interaction model, not a generic app shell
- [ ] The styling should have a clear point of view
- [ ] The typography should feel chosen, not default
- [ ] The page should have at least one surprising but defensible structural decision
- [ ] The experience should feel different across prompts, not like one system with swapped labels

If the skill gives you the same shell repeatedly, that is a failed test even if the code works.

---

## Prompt 1: Museum Exhibit Kiosk

**Tests:** fullscreen kiosk UX, no sidebar, oversized touch targets, cinematic visual storytelling

```
Design and build a touchscreen interface for a science museum exhibit about deep ocean creatures.

This is for a giant public display, not a laptop.
Visitors should be able to:
- explore species visually
- compare size, depth, habitat, and behavior
- trigger immersive explainers
- move through a timeline of how deep-sea exploration evolved

Important:
- a standard left sidebar would be wrong here
- this should feel like exhibit design, not website design
- touch targets must be large
- visual drama matters, but it can't turn into chaotic "edutainment"
- I want something bold, atmospheric, and spatial
```

**What to watch for:**
- full-canvas composition
- layered storytelling
- card walls and left nav should be rejected

---

## Prompt 2: Festival Schedule Builder

**Tests:** expressive consumer UI, schedule conflicts, playful branding, mobile-first event UX

```
Build a music festival app where people discover artists and build their own schedule for the weekend.

It needs:
- lineup discovery
- stage schedule by day
- saved sets
- conflict warnings when two artists overlap
- artist pages with previews and vibe tags

Important:
- do not give me a generic dashboard
- this should feel alive and stylish
- it needs to work in bright daylight on a phone
- the layout should feel more like a poster system mixed with a schedule than enterprise software
```

**What to watch for:**
- visual identity with energy
- schedule-led UX
- not just "dark mode cards with neon accents"

---

## Prompt 3: Wedding Weekend Guide

**Tests:** intimate tone, elegant mobile UX, event-driven multi-page structure, non-corporate information design

```
Build a wedding weekend guide for guests.

It should include:
- weekend schedule
- venue directions and maps
- RSVP and dietary info
- travel and hotel guidance
- event-specific details like dress code, parking, weather backup plans, and photo-sharing instructions

Important:
- this should feel elegant, intimate, and warm
- it should absolutely not look like a corporate dashboard
- a left admin-style nav would ruin it
- I want the UX to feel calm and beautiful on mobile
```

**What to watch for:**
- timeline or chapter-like navigation
- emotionally appropriate pacing
- thoughtful mobile information hierarchy

---

## Prompt 4: Restaurant Service Rush Board

**Tests:** operational urgency, distance readability, information prioritization, brutal clarity

```
Build an internal kitchen and service board for a busy restaurant during lunch rush.

It needs to show:
- incoming tickets
- time since order
- allergy flags
- station bottlenecks
- delayed tables
- items at risk of breaching service time

Important:
- this is for stressed staff working fast
- the design should feel brutally clear
- visual hierarchy matters more than prettiness
- if a left sidebar reduces legibility, do not use one
- make it feel like a tool built for service, not office work
```

**What to watch for:**
- strong urgency hierarchy
- large readable states
- serious operational UX, not "admin template with red badges"

---

## Prompt 5: Indie Bookstore Site

**Tests:** editorial commerce, warm brand, mixed content and shopping flows

```
Build a website for an indie bookstore.

It should support:
- online ordering
- staff picks
- events
- themed recommendation paths
- book clubs
- gift guides

Important:
- I do not want generic e-commerce
- this should feel literary, tactile, and warm
- make the layout feel curated, like browsing a real bookstore table
- avoid the usual hero + product grid + sidebar filter formula unless you have a very strong reason
```

**What to watch for:**
- editorial composition
- browsing as discovery
- personality without clutter

---

## Prompt 6: Sports Broadcast Companion

**Tests:** live information, score-centric hierarchy, second-screen behavior, non-sidebar composition

```
Build a second-screen companion app for live basketball games.

People should be able to:
- track score and momentum
- compare lineups
- see player shot charts
- follow key runs and turning points
- jump into quarter-by-quarter breakdowns

Important:
- this is used while watching the game
- the UX should feel live, sharp, and energetic
- the score and momentum should dominate the experience
- avoid default admin structure
```

**What to watch for:**
- live-state hierarchy
- rhythmic, broadcast-inspired layout
- no generic analytics dashboard shell

---

## Prompt 7: Luxury Real Estate Showcase

**Tests:** premium presentation, cinematic browsing, spatial storytelling, restrained but bold styling

```
Build a high-end real estate experience for showcasing architect-designed homes.

It should include:
- immersive property pages
- floorplan exploration
- neighborhood context
- scheduling a private tour
- side-by-side home comparison

Important:
- this needs to feel expensive without becoming gaudy
- it should feel more like a magazine and a gallery than a marketplace
- do not default to generic cards and left filters
```

**What to watch for:**
- sequencing
- typography confidence
- image-led layout with restraint

---

## Prompt 8: Neighborhood Mutual Aid Network

**Tests:** trust, accessibility, low-friction UX, community service layout

```
Build a neighborhood mutual aid app where people can ask for help, offer help, share resources, and coordinate pickups.

The audience is broad:
- students
- parents
- older adults
- people under stress
- people with low technical confidence

Important:
- this must feel welcoming and trustworthy
- accessibility matters more than visual flash
- avoid making it look like a marketplace clone or a startup dashboard
- the layout should feel humane and supportive
```

**What to watch for:**
- trust signals
- low cognitive load
- approachable interaction design

---

## Prompt 9: Arcade Tournament System

**Tests:** playful styling, scoreboard layouts, event energy, multiple display modes

```
Build a tournament tracker for a retro arcade event.

It needs:
- live bracket
- upcoming matches
- player profiles
- side challenges
- venue map
- giant leaderboard display mode

Important:
- this should be fun and memorable
- push the styling harder than usual
- it can be loud, but it still has to be controlled and readable
- prove the skill can do playful without producing visual junk
```

**What to watch for:**
- actual visual experimentation
- scoreboard-first thinking
- something more interesting than neon-on-black cards

---

## Prompt 10: Vet Care Portal

**Tests:** emotionally sensitive service UX, care timelines, family-facing clarity

```
Build a portal for a veterinary clinic where pet owners can manage appointments, care plans, medications, invoices, and follow-up notes.

Important:
- people are often anxious when using this
- the design should lower stress and guide the next step clearly
- it should feel deeply human and reassuring
- avoid making it look like healthcare bureaucracy software
```

**What to watch for:**
- emotional design maturity
- calm but not bland
- thoughtful hierarchy for stressful situations

---

## Prompt 11: Creative Agency Proposal Builder

**Tests:** hybrid workspace/editor, premium internal tool, narrative composition

```
Build a proposal builder for a branding and web design agency.

The team needs to:
- assemble reusable proposal sections
- insert case studies
- shape the story and flow
- adjust pricing and scope
- preview a polished client-facing output

Important:
- this should not look like CRM software
- it should feel like a cross between a publishing tool and a strategy workspace
- I want a layout with a strong editorial point of view
```

**What to watch for:**
- composition-aware UX
- publishing or canvas-like patterns
- premium internal-tool feel

---

## Prompt 12: Space Mission Timeline Explorer

**Tests:** story-driven interaction, time navigation, educational product design

```
Build an interactive explorer for major space missions.

Users should be able to:
- move through decades of missions
- compare mission goals and outcomes
- inspect spacecraft
- follow key milestones
- view relationships between missions, agencies, and technologies

Important:
- treat time as a first-class design axis
- a generic left-nav app would be the wrong structure
- I want something that feels like discovery, not filing
```

**What to watch for:**
- time-based navigation
- layered narrative
- structure driven by chronology, not app-shell convention

---

## Prompt 13: Boutique Fitness Studio Booking

**Tests:** schedule interaction, lifestyle branding, conversion + utility blend

```
Build a booking experience for a boutique fitness studio.

It should cover:
- class discovery
- trainer pages
- memberships
- booking and waitlist flow
- attendance streaks
- studio updates

Important:
- this should feel aspirational and energetic, but not cheesy
- avoid standard SaaS account-layout patterns
- I want a layout that balances conversion, schedule utility, and brand atmosphere
```

**What to watch for:**
- conversion and utility working together
- brand-forward but practical structure

---

## Prompt 14: Cybersecurity Investigation Workspace

**Tests:** expert density, analytical workflow, advanced information architecture

```
Build a threat investigation workspace for a security operations team.

Analysts need to:
- triage alerts
- inspect entity relationships
- follow attack paths
- assign ownership
- escalate incidents
- keep notes during investigation

Important:
- this is for experts
- the layout should support investigation, not just monitoring
- it should feel serious and sharp
- avoid generic dark dashboard clichés
```

**What to watch for:**
- dense but controlled layout
- real investigation flow
- structure beyond chart cards + sidebar

---

## Prompt 15: Toy for Layout Experimentation

**Tests:** whether the skill can produce radically different but coherent concepts

```
I don't care about industry realism for this one.
I want you to design a weird but usable app for collecting and trading fictional storm photographs from alternate planets.

Important:
- do not give me a standard dashboard
- push the layout and styling
- it still has to make UX sense
- I want to see whether the system can do something surprising and coherent
```

**What to watch for:**
- willingness to invent a strong visual system
- unusual layout logic
- still defensible UX

---

## Follow-Up Prompts for Structural Testing

Use these after one of the prompts above has been built.

### Follow-Up A: Force a Different Shell

```
This layout still feels too conventional.
Show me 3 structurally different navigation models for this product.
At least one of them must NOT use a left sidebar.
Explain the trade-offs, then build the strongest one.
```

### Follow-Up B: Make It More Distinctive

```
The UX works, but the visual direction still feels too safe.
Push the styling further without hurting usability.
I want a clearer point of view in typography, composition, and motion.
```

### Follow-Up C: Child Page Test

```
When I click one of the main items, I want a rich detail page with:
- profile/details
- recent activity
- related items
- actions specific to that item

This should be a child page, not a top-level nav destination.
```

### Follow-Up D: Cross-Format Brand Test

```
Now create a landing page and a short deck for the same product.
They should feel like the same designer made them, not like unrelated outputs.
```

### Follow-Up E: Critique and Rebuild

```
Review your own output like a demanding design director.
Tell me where it still feels generic, repetitive, or over-explained.
Then fix the strongest problems.
```

---

## Evaluation Checklist

After running any prompt, verify:

- [ ] The layout fits the actual interaction model
- [ ] The result does not default to the same left-sidebar shell unless truly justified
- [ ] The visual language has a clear point of view
- [ ] The typography feels intentionally chosen
- [ ] The reasoning is specific to the scenario
- [ ] The chosen direction was actually built, not just described
- [ ] `design-system/MASTER.md` exists when expected
- [ ] The default starter content is gone
- [ ] `.ui-skill/registry.json` is populated
- [ ] `.ui-skill/manifest.json` is populated
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] The UI does not collapse into generic white cards and standard app chrome unless the prompt truly calls for it
- [ ] Different prompts produce genuinely different structures

---

## Quick High-Signal Test Set

If you only want to run a few, use:

1. Prompt 1 — kiosk / fullscreen, no sidebar
2. Prompt 3 — intimate event UX, mobile-first, no corporate shell
3. Prompt 4 — operational rush board, hard hierarchy
4. Prompt 7 — premium editorial browsing
5. Prompt 9 — playful event system
6. Prompt 14 — dense expert workspace
7. Prompt 15 — pure layout/style experimentation

If the skill produces the same shell for these, it is not exploring enough.
