#!/bin/bash
# UI Skill Installer
# Copies the ui-ux skill into a target project and sets up the build pipeline.
#
# Usage: bash install.sh /path/to/project
# Example: bash install.sh ~/my-app

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILL_SOURCE="$SCRIPT_DIR/.claude/skills"

# --- Validate arguments ---
if [ -z "$1" ]; then
  echo "Usage: bash install.sh /path/to/project"
  echo ""
  echo "This installs the ui-ux skill into a project directory."
  echo "It copies .claude/skills/, creates CLAUDE.md, and sets up .ui-skill/ state files."
  exit 1
fi

TARGET="$(cd "$1" 2>/dev/null && pwd || echo "$1")"

if [ ! -d "$TARGET" ]; then
  echo "Error: Directory '$TARGET' does not exist."
  exit 1
fi

echo "Installing ui-ux skill into: $TARGET"
echo ""

# --- Copy skills ---
echo "1. Copying .claude/skills/..."
mkdir -p "$TARGET/.claude/skills"
cp -r "$SKILL_SOURCE/ui-skill" "$TARGET/.claude/skills/"
cp -r "$SKILL_SOURCE/prototype" "$TARGET/.claude/skills/"
cp -r "$SKILL_SOURCE/ui-styling" "$TARGET/.claude/skills/"
cp -r "$SKILL_SOURCE/design-system" "$TARGET/.claude/skills/"
cp -r "$SKILL_SOURCE/brand" "$TARGET/.claude/skills/"
cp -r "$SKILL_SOURCE/design" "$TARGET/.claude/skills/"
cp -r "$SKILL_SOURCE/slides" "$TARGET/.claude/skills/"
cp -r "$SKILL_SOURCE/banner-design" "$TARGET/.claude/skills/"
echo "   Done — 8 skills installed."

# --- Fix ESLint compatibility ---
echo "2. Fixing lint compatibility..."
# Use the dedicated Node.js patcher — handles all ESLint config formats reliably
if command -v node &> /dev/null; then
  PATCH_SCRIPT="$SCRIPT_DIR/.claude/skills/ui-skill/scripts/patch-eslint.js"
  if [ -f "$PATCH_SCRIPT" ]; then
    PATCH_OUTPUT=$(node "$PATCH_SCRIPT" "$TARGET" 2>&1)
    PATCH_EXIT=$?
    echo "   $PATCH_OUTPUT"
    if [ $PATCH_EXIT -eq 2 ]; then
      echo "   WARNING: ESLint patch failed. You may need to manually add .claude/** to your ESLint ignores."
    fi
  else
    echo "   WARNING: patch-eslint.js not found. Skipping lint fix."
  fi
else
  echo "   WARNING: Node.js not found. Cannot patch ESLint config."
  echo "   Manually add .claude/** to your ESLint ignore configuration."
fi

# --- Create .ui-skill/ state directory ---
echo "3. Creating .ui-skill/ state directory..."
mkdir -p "$TARGET/.ui-skill"

if [ ! -f "$TARGET/.ui-skill/registry.json" ]; then
  cat > "$TARGET/.ui-skill/registry.json" << 'EOF'
{
  "version": "1.0",
  "components": {}
}
EOF
fi

if [ ! -f "$TARGET/.ui-skill/manifest.json" ]; then
  cat > "$TARGET/.ui-skill/manifest.json" << 'EOF'
{
  "version": "1.0",
  "project": { "name": "", "type": "", "stack": "" },
  "pages": {},
  "navigation": { "primary": "sidebar", "items": [] },
  "relationships": {}
}
EOF
fi
echo "   Done — registry.json and manifest.json created."

# --- Create CLAUDE.md ---
echo "4. Creating CLAUDE.md..."
if [ -f "$TARGET/CLAUDE.md" ]; then
  echo "   CLAUDE.md already exists — appending skill section."
  echo "" >> "$TARGET/CLAUDE.md"
  cat "$SCRIPT_DIR/templates/CLAUDE.md.template" >> "$TARGET/CLAUDE.md"
else
  cp "$SCRIPT_DIR/templates/CLAUDE.md.template" "$TARGET/CLAUDE.md"
fi
echo "   Done."

# --- Create design-system directory ---
echo "5. Creating design-system/ directory..."
mkdir -p "$TARGET/design-system"
echo "   Done."

# --- Verify Python ---
echo "6. Checking Python..."
if command -v python3 &> /dev/null; then
  echo "   Python 3 found: $(python3 --version)"
else
  echo "   WARNING: Python 3 not found. The search engine requires Python 3."
  echo "   Install it: brew install python3 (macOS) or sudo apt install python3 (Linux)"
fi

# --- Post-install verification ---
echo "7. Verifying install..."
ISSUES=0

if [ ! -f "$TARGET/.claude/skills/ui-skill/SKILL.md" ]; then
  echo "   ERROR: ui-skill/SKILL.md not found"
  ISSUES=$((ISSUES + 1))
fi

if [ ! -f "$TARGET/.claude/skills/ui-skill/scripts/search.py" ]; then
  echo "   ERROR: search.py not found"
  ISSUES=$((ISSUES + 1))
fi

if [ ! -f "$TARGET/.ui-skill/manifest.json" ]; then
  echo "   ERROR: manifest.json not found"
  ISSUES=$((ISSUES + 1))
fi

if [ "$ISSUES" -eq 0 ]; then
  echo "   All checks passed."
fi

echo ""
echo "========================================="
echo "  ui-ux skill installed successfully!"
echo "========================================="
echo ""
echo "What was created:"
echo "  .claude/skills/    — 8 skill directories"
echo "  .ui-skill/         — State files (registry + manifest)"
echo "  design-system/     — Design system output directory"
echo "  CLAUDE.md          — Build pipeline instructions"
echo "  ESLint config      — .claude/ excluded from linting"
echo ""
echo "Start building by describing what you want to Claude Code."
echo "The skill will guide the process."
