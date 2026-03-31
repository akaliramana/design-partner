#!/usr/bin/env python3
"""
Generate design-tokens.css from design-system/MASTER.md.

This creates a CSS file that all HTML templates can import to inherit
the project's brand tokens. Run this whenever MASTER.md changes.

Usage:
    python3 generate-template-pack.py --master design-system/MASTER.md --output templates/design-tokens.css
"""

import argparse
import re
from pathlib import Path


def parse_master_md(master_path: str) -> dict:
    """Extract CSS variables and font imports from MASTER.md."""
    content = Path(master_path).read_text(encoding="utf-8")
    tokens = {}

    # Extract hex colors from markdown tables or inline
    color_patterns = [
        (r"Primary[^\n]*`(#[0-9A-Fa-f]{6})`", "color-primary"),
        (r"Secondary[^\n]*`(#[0-9A-Fa-f]{6})`", "color-secondary"),
        (r"CTA|Accent[^\n]*`(#[0-9A-Fa-f]{6})`", "color-accent"),
        (r"Background[^\n]*`(#[0-9A-Fa-f]{6})`", "color-background"),
        (r"Text[^\n]*`(#[0-9A-Fa-f]{6})`", "color-text"),
        (r"Surface|Card[^\n]*`(#[0-9A-Fa-f]{6})`", "color-surface"),
        (r"Border[^\n]*`(#[0-9A-Fa-f]{6})`", "color-border"),
        (r"Muted[^\n]*`(#[0-9A-Fa-f]{6})`", "color-muted"),
    ]

    for pattern, var_name in color_patterns:
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            tokens[var_name] = match.group(1)

    # Extract CSS variable definitions if present
    css_var_pattern = r"--([a-z-]+):\s*(#[0-9A-Fa-f]{6}|[^;}\n]+)"
    for match in re.finditer(css_var_pattern, content):
        tokens[match.group(1)] = match.group(2).strip()

    # Extract font names
    heading_font = re.search(r"Heading\s*(?:Font)?[:\s]*\**\s*([A-Za-z\s]+)", content)
    body_font = re.search(r"Body\s*(?:Font)?[:\s]*\**\s*([A-Za-z\s]+)", content)
    if heading_font:
        tokens["font-heading"] = heading_font.group(1).strip().rstrip("*")
    if body_font:
        tokens["font-body"] = body_font.group(1).strip().rstrip("*")

    # Extract Google Fonts import URL
    import_match = re.search(r"@import url\(['\"]([^'\"]+)['\"]\)", content)
    if import_match:
        tokens["_google_fonts_url"] = import_match.group(1)

    return tokens


def generate_css(tokens: dict) -> str:
    """Generate CSS file from extracted tokens."""
    lines = ["/* Design Tokens — auto-generated from design-system/MASTER.md */",
             "/* Do not edit manually. Regenerate with: python3 generate-template-pack.py */", ""]

    # Google Fonts import
    if "_google_fonts_url" in tokens:
        lines.append(f"@import url('{tokens['_google_fonts_url']}');")
        lines.append("")

    lines.append(":root {")

    # Write CSS variables
    for key, value in sorted(tokens.items()):
        if key.startswith("_"):
            continue
        if key.startswith("font-"):
            lines.append(f"  --{key}: '{value}', sans-serif;")
        else:
            lines.append(f"  --{key}: {value};")

    lines.append("}")
    lines.append("")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Generate design-tokens.css from MASTER.md")
    parser.add_argument("--master", required=True, help="Path to design-system/MASTER.md")
    parser.add_argument("--output", default="templates/design-tokens.css", help="Output CSS file path")
    args = parser.parse_args()

    if not Path(args.master).exists():
        print(f"Error: {args.master} not found. Run the design system generator first:")
        print(f"  python3 .claude/skills/ui-skill/scripts/search.py \"<query>\" --design-system --persist -p \"<Name>\"")
        return

    tokens = parse_master_md(args.master)
    css = generate_css(tokens)

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(css, encoding="utf-8")

    print(f"Generated {args.output} with {len([k for k in tokens if not k.startswith('_')])} tokens")
    for key, value in sorted(tokens.items()):
        if not key.startswith("_"):
            print(f"  --{key}: {value}")


if __name__ == "__main__":
    main()
