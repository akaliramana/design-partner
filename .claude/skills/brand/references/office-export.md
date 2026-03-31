# Office Format Export

Convert HTML templates to PPTX and DOCX using Python libraries. HTML is the design source of truth; Office formats are practical exports for sharing.

## Dependencies

```bash
pip install python-pptx python-docx Pillow
```

## PPTX Export (Decks)

### How it works

1. Read `design-system/MASTER.md` for brand tokens
2. Read the HTML deck (or individual slide templates)
3. Create PPTX with matching styles using python-pptx
4. Map CSS variables → PPTX theme colors

### Token → PPTX Mapping

| CSS Variable | PPTX Property |
|---|---|
| `--color-primary` | `MSO_THEME_COLOR.ACCENT_1` |
| `--color-background` | Slide background fill |
| `--color-text` | Default text color |
| `--font-heading` | Title placeholder font |
| `--font-body` | Body placeholder font |

### Script: `export-pptx.py`

```bash
python3 .claude/skills/brand/scripts/export-pptx.py \
  --master design-system/MASTER.md \
  --input templates/deck-master.html \
  --output templates/deck-master.pptx
```

**What the script does:**
1. Parses MASTER.md for color hex values and font names
2. Creates a PPTX with a custom slide master (branded colors/fonts)
3. For each slide section in the HTML:
   - Detects layout type (title, content, data, comparison, etc.)
   - Maps to appropriate PPTX slide layout
   - Transfers text content
   - For charts: embeds as image (Chart.js renders to canvas → screenshot)
4. Outputs branded PPTX

### Limitations

- Complex CSS layouts don't translate 1:1 to PPTX
- Chart.js charts export as images (not editable PowerPoint charts)
- Custom fonts must be installed on the viewing machine
- Animations/transitions are simplified

### Recommendation

HTML is always the higher-fidelity format. Use PPTX when:
- Investors expect PowerPoint specifically
- Non-technical team members need to edit the deck
- Presenting on a machine without a browser

## DOCX Export (Documents)

### How it works

1. Read `design-system/MASTER.md` for brand tokens
2. Read the HTML document
3. Create DOCX with matching styles using python-docx
4. Map CSS variables → DOCX style definitions

### Token → DOCX Mapping

| CSS Variable | DOCX Property |
|---|---|
| `--color-primary` | Heading color, link color |
| `--color-text` | Normal paragraph color |
| `--font-heading` | Heading 1-4 font family |
| `--font-body` | Normal style font family |
| Font sizes from MASTER.md | Style font sizes (pt) |

### Script: `export-docx.py`

```bash
python3 .claude/skills/brand/scripts/export-docx.py \
  --master design-system/MASTER.md \
  --input templates/doc-master.html \
  --output templates/doc-master.docx
```

**What the script does:**
1. Parses MASTER.md for tokens
2. Creates DOCX with custom styles:
   - Heading 1-4: branded font + color + size
   - Normal: body font + size + line spacing
   - Table styles: branded borders and header colors
3. Parses HTML document structure
4. Maps HTML elements to DOCX paragraphs/tables/images
5. Adds header (logo + company name) and footer (page number + date)

### Limitations

- Complex HTML layouts simplify to linear document flow
- CSS grid/flexbox layouts don't translate — content linearizes
- Images must be available as files (not base64 in HTML)

## Workflow

### First-time export

```
1. User asks for a deck in PPTX format
2. Skill builds HTML deck first (full design control)
3. Skill runs export-pptx.py to convert
4. User gets both deck-master.html AND deck-master.pptx
```

### Re-export after changes

```
1. User edits the HTML version (or asks skill to edit)
2. Skill re-runs the export script
3. PPTX/DOCX regenerated from updated HTML
```

### User asks for PPTX/DOCX directly

```
1. Skill still builds HTML first (this is the design source of truth)
2. Immediately exports to requested format
3. Delivers both — HTML for quality, Office for sharing
```

## When NOT to export

- If the user only needs a web-viewable presentation → HTML only
- If the content is heavily interactive → HTML only (PPTX can't do interactions)
- If the user will keep editing frequently → work in HTML, export once at the end
