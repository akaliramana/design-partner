# Template Pack Specification

Master templates for brand collateral. Each template is an HTML file that reads design tokens from `design-system/MASTER.md` via CSS variables.

## Deck Templates (brand/templates/deck/)

8 slide layouts covering the standard pitch deck structure:

| Template | Purpose | Key Elements |
|----------|---------|-------------|
| `title.html` | Opening slide | Product name, tagline, logo, date/event |
| `section-divider.html` | Transition between sections | Section title, optional subtitle, accent bar |
| `content.html` | Standard narrative slide | Headline, body text, optional image/illustration area |
| `data-chart.html` | Data visualization slide | Headline, Chart.js chart area, caption/source |
| `comparison.html` | Side-by-side or feature matrix | Two columns or grid, comparison labels, check/cross indicators |
| `testimonial.html` | Social proof / quote | Large quote, attribution, optional photo/logo |
| `team.html` | Team / people slide | Photo/avatar grid, name + role, optional bio snippet |
| `cta-closing.html` | Final call to action | Headline CTA, contact info, logo, social links |

### Slide HTML Structure

Every slide template follows this structure:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=1920">
  <link rel="stylesheet" href="../../design-tokens.css">
  <style>
    /* Slide-specific styles using var(--token) */
    .slide { width: 1920px; height: 1080px; /* 16:9 */ }
  </style>
</head>
<body>
  <div class="slide">
    <!-- Slide content -->
  </div>
</body>
</html>
```

### Slide Design Rules

- 16:9 aspect ratio (1920×1080px)
- All colors via CSS variables from MASTER.md
- Typography: heading ≥36px, body ≥20px
- Max 6 lines of text per slide
- Chart.js CDN for data slides (not CSS-only charts)
- Consistent padding: 80px horizontal, 60px vertical
- Logo placement: top-left or bottom-left (consistent across all slides)

## Document Templates (brand/templates/document/)

3 document layout files:

| Template | Purpose |
|----------|---------|
| `cover-page.html` | Document cover with title, subtitle, date, author, logo |
| `letterhead.html` | Header + footer template for multi-page docs |
| `styles.html` | Typography and color stylesheet for document content |

### Document Design Rules

- A4 / US Letter page size
- All colors via CSS variables
- Typography: headings 18-24px, body 11-12px
- Line height: 1.5 for body
- Margins: 25mm top/bottom, 20mm sides
- Header: logo + rule line
- Footer: page number + date

## One-Pager Template (brand/templates/one-pager/)

| Template | Purpose |
|----------|---------|
| `layout.html` | Single-page branded layout with hero, sections, CTA |

### One-Pager Design Rules

- Single page (A4 or Letter)
- Hero: product name + one-line value prop
- 3-4 content sections
- Scannable: clear headings, short paragraphs
- CTA + contact at bottom
- Print-friendly (light backgrounds unless brand dictates otherwise)

## Token Integration

Templates reference design tokens via CSS variables. When generating a template:

1. Read `design-system/MASTER.md`
2. Extract CSS variables (colors, fonts, spacing)
3. Generate a `design-tokens.css` file in the templates directory
4. Templates import this file

This means: change MASTER.md → regenerate design-tokens.css → all templates update automatically.

## Template Storage

Generated templates are saved to the project's `templates/` directory:

```
project/
└── templates/
    ├── design-tokens.css        # Generated from MASTER.md
    ├── deck-master.html         # Assembled deck (all slides)
    ├── doc-master.html          # Assembled document
    ├── one-pager.html           # One-pager
    └── slides/                  # Individual slide files (if needed)
```
