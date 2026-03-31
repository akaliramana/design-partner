# Multi-Format Branding

Ensures consistent brand identity across all deliverables — app UI, pitch decks, documents, posters, one-pagers, social media.

## Core Principle

Every deliverable reads from `design-system/MASTER.md`. The same tokens that style the app also style the deck, the doc, and the poster. One source of truth, many outputs.

## Token Mapping Across Formats

| Token | App UI (CSS) | Deck (HTML slides) | Document (HTML/DOCX) | Poster (HTML) |
|-------|-------------|-------------------|---------------------|---------------|
| `--color-primary` | Accent color, CTAs | Slide accent, headlines | Heading color, links | Headline color |
| `--color-background` | Page background | Slide background | Page background | Canvas |
| `--color-text` | Body text | Slide body text | Paragraph text | Body text |
| `--color-surface` | Cards, panels | Content boxes | Callout boxes | Section backgrounds |
| `--font-heading` | H1-H4 | Slide titles | Document headings | Poster headline |
| `--font-body` | Body, labels | Slide body | Document paragraphs | Body copy |

## Format-Specific Rules

### Pitch Deck (HTML → optional PPTX)
- Slides are **16:9 aspect ratio** (1920x1080px base)
- Max 6 lines of text per slide
- One idea per slide
- Use Chart.js for data visualization (not CSS-only charts)
- Typography: headline ≥36px, body ≥20px, caption ≥14px (readable from distance)
- Background: use `--color-background` or `--color-surface`, never pure white on projector
- Accent for emphasis, not decoration

### Document (HTML → optional DOCX)
- A4 page size (210mm × 297mm) or US Letter (8.5" × 11")
- Margins: 25mm top/bottom, 20mm left/right
- Typography: heading 18-24px, body 11-12px, caption 9-10px
- Line height: 1.5 for body text
- Header: logo + company name, subtle rule below
- Footer: page number, document title, date
- Max line length: 75 characters

### One-Pager (HTML)
- Single page, often A4 or US Letter
- Dense but scannable — use clear section headers
- Hero area: product name + one-line value prop
- 3-4 content sections max
- Contact/CTA at bottom
- Must print well (avoid dark backgrounds unless brand requires it)

### Poster (HTML)
- Large format: typically 24"×36" or A2
- Headline readable from 3+ meters
- Minimal text — visual impact first
- Clear hierarchy: headline → subhead → body → CTA
- Use brand colors boldly

### Social Media Images (HTML → screenshot)
- Platform-specific sizes (see design/references/social-photos-design.md)
- Safe zones: keep text in central 80%
- Text must be readable at thumbnail size
- Brand colors + logo placement consistent

## On-Demand Generation

**Build only what's asked for.** The user requests a deck → build the deck. Not the deck + one-pager + doc template.

**Template reuse:** When a template is generated, save it to `templates/` for future use. Next time the user asks for a deck, start from the saved template.

**Format choice:** Always ask the user what format they need before building:
- HTML only (maximum design control)
- HTML + PPTX export (for sharing with investors)
- HTML + DOCX export (for formal documents)

## Cross-Format Verification

After building any collateral:
1. **Token check:** Verify colors/fonts match `design-system/MASTER.md`
2. **Visual consistency:** Does it "feel" like the same brand as the app?
3. **Readability:** Text sizes appropriate for the format and viewing distance
4. **Print-readiness:** If print format, check contrast on white/light backgrounds
