# Anti-AI-Slop Guidelines

Loaded during the build phase. Every output must pass the craft test: "Would a senior designer at a top startup approve this?" If the answer is "it looks AI-generated," it fails.

---

## What AI-Slop Looks Like

These are the telltale patterns that immediately mark a design as machine-generated. Avoid every single one.

### The Signature Patterns

1. **The blue-to-purple gradient.** The single most common AI default. Usually appears on hero sections, buttons, or background blobs. It screams "I didn't choose a palette." Also: teal-to-blue, pink-to-purple, any two-color gradient that appears because the model defaulted to it rather than because the design demands it.

2. **The centered everything layout.** Heading centered. Subheading centered. CTA centered. Three cards centered in a row. Feature section — centered. Every section is a centered headline, centered paragraph, centered element. Real designs use left-alignment as the default and center only for deliberate emphasis.

3. **The uniform card grid.** Three identical cards in a row, same height, same padding, same icon-title-description structure. Then another row of three. Then another. No hierarchy between cards, no visual variation, no reason to look at one before another.

4. **Generic hero text.** "Welcome to [Product Name] — The All-in-One Solution for [Category]." Followed by "Get Started" and "Learn More" buttons side by side. This is a content template, not a design.

5. **Decorative blob backgrounds.** Blurred gradient circles floating behind content for no reason. They add visual noise without meaning. A blob in the top-right, a blob in the bottom-left — pure decoration.

6. **Icon-title-description triplets.** Repeated three or four times in a features section. Each with a generic icon (lightbulb, gear, shield, chart), a two-word title, and a one-sentence description. All visually identical. Nothing distinguishes one feature from another.

7. **"Lorem ipsum" energy in real text.** Text that technically isn't placeholder but reads like it: "Our platform leverages cutting-edge technology to deliver seamless experiences." This is AI-generated copy pretending to be real.

8. **Uniform spacing everywhere.** Every section has 80px top and bottom padding. Every card has 24px internal padding. Every gap is 16px. No rhythm, no breathing, no intentional compression or expansion.

9. **The testimonial section.** Three cards. Headshot circle. Name and title. A quote in italics. Star rating. All identical in structure and visual weight. Looks like a template because it is.

10. **Shadow soup.** Every card, button, and container has a drop shadow. Often the same shadow. Creates a visual field of floating rectangles with no ground plane logic.

---

## What Hand-Crafted Design Looks Like

The qualities that distinguish intentional, human-designed interfaces:

### Intentional Asymmetry
Not everything is the same size or weight. A hero section might have a large heading on the left and a smaller supporting visual on the right. A feature grid might have one large featured item and three smaller items. Hierarchy through size variation, not uniform grids.

### Meaningful Negative Space
Whitespace isn't uniform padding — it's a design tool. More space around the most important element. Tighter space within a group. A deliberate pause between sections of different intent. The spacing has rhythm, like music has rests.

### Restraint in Color
One or two accent colors used sparingly and purposefully. Large areas of neutral. Color only appears when it MEANS something — a status, an action, a brand moment. Not color for decoration.

### Typographic Personality
The typeface was chosen, not defaulted. The scale has clear jumps (not 14, 15, 16, 17 — more like 14, 18, 24, 36). Font weight carries meaning (bold for emphasis, not for everything). Line-height and letter-spacing are adjusted for each size, not a uniform ratio.

### Specific, Not Generic
Real product names, realistic data, plausible user names, actual-feeling content. A dashboard shows "$14,230" not "$XX,XXX." A user profile shows "Sarah Chen, Product Lead at Stripe" not "John Doe, Role at Company."

### Visual Tension
Something is slightly unexpected. An oversized number. A word in a different color. An image that breaks the grid. A section where the layout shifts. This isn't randomness — it's deliberate surprise that creates interest.

---

## Specific Guidelines by Element

### Typography

**DO:**
- Choose a type scale with clear hierarchy: display (36-48px), heading (24-30px), subheading (18-20px), body (15-16px), caption (12-13px)
- Use weight AND size to create hierarchy — a 16px bold can outrank a 20px regular
- Set line-height contextually: headings at 1.1-1.2, body at 1.5-1.6, captions at 1.3-1.4
- Adjust letter-spacing: tighter for large display text (-0.02em to -0.04em), default for body, wider for tiny all-caps labels (0.05em to 0.1em)
- Mix a serif and sans-serif with purpose (serif for editorial headings, sans for UI) OR commit fully to one family with diverse weights

**DON'T:**
- Use font-size as the only hierarchy lever (bigger is not automatically more important)
- Default to Inter/System UI without considering if it serves the brand
- Use more than 2 typefaces (or 3 weights of the same face) without clear purpose
- Set all text at medium/regular weight — it flattens the hierarchy
- Apply the same line-height to all sizes

### Color

**DO:**
- Build from a single brand hue, then derive the palette: primary, a tinted neutral, semantic colors (success/warning/error), and backgrounds
- Use color to encode MEANING: blue for links/interactive, green for success, red for errors, amber for warnings — consistently
- Make the primary color scarce. If everything is blue, nothing is blue. Use it for primary actions and key brand moments only.
- Test contrast ratios: 4.5:1 minimum for body text, 3:1 for large text and UI elements
- Use tinted neutrals (warm grays if brand is warm, cool grays if brand is cool) — pure gray (#808080) feels lifeless

**DON'T:**
- Default to blue. Especially blue primary + blue links + blue icons + blue accent. It's the most common AI-slop color because it's the "safest" choice.
- Use gradients as decoration. A gradient on a button should reinforce a brand direction, not exist because "it looks nice."
- Apply background colors to every section for visual variety (alternating white/gray/white/gray). Use whitespace and layout shifts to differentiate sections.
- Use more than 3-4 colors in a single view (excluding grays and semantic colors)
- Choose colors that look good in isolation but don't work as a system

### Spacing

**DO:**
- Use a base unit (4px or 8px) but DON'T apply it uniformly. Different contexts need different density.
- Create breathing room around the #1 element — it should have noticeably more whitespace than anything else
- Compress spacing within tightly related groups (label + input: 4-6px, items in a list: 8-12px)
- Expand spacing between unrelated sections (48-80px between major sections)
- Use vertical rhythm: section padding should relate to the type scale (e.g., section gap = 3-4x the body line-height)

**DON'T:**
- Apply `gap: 24px` to every flex container and call it done
- Use identical padding on every card, every section, every container
- Let spacing become monotonous — if every gap is the same, none of them communicate anything
- Ignore the edges — padding from content to screen edge should adapt to screen width (16px mobile, 24px tablet, 40-80px desktop, max-width containers on large screens)

### Layout

**DO:**
- Start with left-aligned content as the default. Center-alignment is for deliberate focal points only (hero CTAs, modal content, empty states).
- Create hierarchy between sections: a hero section is taller and more prominent than a features section. A primary content area is wider than a sidebar.
- Use asymmetric layouts when content justifies it: 60/40 splits, text-left image-right, offset grids.
- Vary section layouts throughout the page: full-width hero, contained grid, split layout, single column quote. The variety creates rhythm.
- Let one element break the grid occasionally — a full-bleed image, an oversized pullquote, a sidebar that extends past its column.

**DON'T:**
- Center every section vertically and horizontally to create "balance" — this creates monotony, not balance
- Use the same column structure for every section (three-column grid top to bottom)
- Make every section the same height/proportion
- Default to a 12-column grid when the content only needs 8 columns of width (use max-width containers)

### Components

**DO:**
- Create visual hierarchy WITHIN cards: the image/metric is the star, the title supports, the description is quiet, the action is clearly subordinate or revealed on hover
- Vary card sizes when items have different importance (a featured item gets a large card, secondary items get compact cards)
- Use consistent but not identical card styles — all cards share a system but can vary in emphasis, size, and information density
- Design empty states and loading states with the same care as populated states
- Make interactive affordances crystal clear — buttons look like buttons, links look like links, draggable items look draggable

**DON'T:**
- Create a grid of 6+ identical cards with identical visual weight
- Use the same card component for fundamentally different content types (a user profile and a metric and a task should not all be "Card")
- Add shadows to everything — use shadows selectively for elevated elements (dropdowns, modals, floating actions)
- Default to rounded corners on everything (choose your corner-radius strategy: sharp for professional, slightly rounded for friendly, fully rounded for playful — then be consistent)

### Interactions and Motion

**DO:**
- Use transitions for state changes: hover (150-200ms), page transitions (200-300ms), content reveal (300-500ms)
- Ease-out for entrances (elements decelerating into place), ease-in for exits (elements accelerating away)
- Make hover states meaningful: change in ONE property that indicates interactivity (background shift, slight lift, underline)
- Use motion to show spatial relationships: a sidebar slides in from the side, a modal fades up from the trigger point, deleted items collapse

**DON'T:**
- Add bounce/spring to everything — bouncy animations feel toy-like unless the brand is explicitly playful
- Use the same transition for every interaction (a menu opening and a page loading need different timings)
- Animate things entering from random directions — motion should be spatially logical
- Add loading spinners or skeleton screens where content loads in <100ms — instant should feel instant
- Use `transition: all 0.3s ease` as a universal solution

### Content and Placeholder Text

**DO:**
- Use realistic, specific content that matches the product domain:
  - Names: "Sarah Chen," "Marcus Johnson," "Priya Patel" (diverse, realistic)
  - Companies: Use real-seeming names — "Meridian Labs," "Cove Analytics," "Basecamp" (if appropriate)
  - Numbers: "$14,230 MRR," "2,847 active users," "99.7% uptime" (specific, plausible)
  - Dates: Use actual recent dates, not "January 1, 2024"
  - Emails: "sarah@meridian.io" not "user@example.com"
- Write microcopy with personality: "No projects yet — create your first one" not "No data available"
- Make empty states helpful: show the user what this area looks like when populated, or provide the action to populate it

**DON'T:**
- Use "Lorem ipsum" or obvious placeholder text in any visible output
- Use "Welcome to [Product Name]" as hero text
- Use "Get Started" and "Learn More" as the only CTA pair
- Default to "John Doe" or "Jane Smith" for user names
- Write descriptions that could apply to any product ("Our powerful platform enables seamless collaboration")
- Use "Feature One," "Feature Two," "Feature Three" as section titles

### Images and Visual Assets

**DO:**
- Use CSS illustrations, patterns, or abstract shapes you can build in code rather than referencing stock photos
- If using illustration placeholders, describe the SPECIFIC illustration that should go there ("Isometric illustration of a person reviewing charts on a tablet") rather than leaving a gray box
- Use gradients and patterns as intentional brand elements, not decorative filler
- Create visual interest through typography, layout, and color rather than depending on images

**DON'T:**
- Reference generic stock photo concepts ("happy diverse team in modern office")
- Use placeholder image services (placehold.co, unsplash random) in production-ready output — either build the visual in CSS/SVG or leave a clearly labeled slot with specifications
- Place decorative blobs, circles, or floating shapes that don't serve the information hierarchy
- Use icons as the primary visual element for feature sections — they all end up looking the same

---

## The Craft Test

Before finalizing any output, run this checklist:

1. **The Screenshot Test:** If someone posted this as a screenshot on Twitter/X, would it get "love this design" replies? Or would it get "looks like an AI template" replies?

2. **The Logo Swap Test:** If you replaced the logo/brand name with a different company, would the design still feel right? If yes, it's too generic — it should feel like it was made FOR this specific product.

3. **The Fold Test:** Look at just the first viewport. Does it communicate something specific and compelling? Or does it look like every other landing page/dashboard template?

4. **The Detail Test:** Zoom into any single component. Does it have its own internal hierarchy and craft? Or is it a rectangle with evenly-spaced text?

5. **The Personality Test:** Describe the design's personality in 3 words. If you can only say "clean, modern, minimal" — it has no personality. Those words describe the ABSENCE of a design direction, not the presence of one.

6. **The Peer Test:** Would you show this to a designer you respect? If you'd add a caveat ("it's just a quick mockup"), it's not at craft level yet.
