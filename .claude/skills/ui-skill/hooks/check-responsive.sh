#!/bin/bash
# PostToolUse hook: Warn if a component/page file lacks responsive Tailwind classes.
#
# Checks for common layout patterns that need responsive variants:
# - grid-cols-* without sm:/md:/lg: variants
# - w-[fixed] or min-w-[fixed] without responsive alternatives
# - flex-row without responsive stacking
# - hidden/block without responsive toggle
#
# This is a soft warning — prints advice but never blocks.

TARGET_FILE="${CLAUDE_TOOL_INPUT_FILE_PATH:-}"

# Only check .tsx/.jsx files in src/
if [[ "$TARGET_FILE" != *.tsx ]] && [[ "$TARGET_FILE" != *.jsx ]]; then
  exit 0
fi
if [[ "$TARGET_FILE" != *"/src/"* ]] && [[ "$TARGET_FILE" != "src/"* ]]; then
  exit 0
fi

# Skip if file doesn't exist (was deleted)
if [ ! -f "$TARGET_FILE" ]; then
  exit 0
fi

WARNINGS=""

# Check: grid-cols without responsive variants
if grep -q "grid-cols-[2-9]" "$TARGET_FILE" 2>/dev/null; then
  if ! grep -q "sm:grid-cols\|md:grid-cols\|lg:grid-cols" "$TARGET_FILE" 2>/dev/null; then
    WARNINGS="$WARNINGS\n  - grid-cols-* found without responsive variants (sm:/md:/lg:grid-cols-*)"
  fi
fi

# Check: fixed width (w-[...px]) without responsive
if grep -qE "w-\[[0-9]+px\]|min-w-\[[0-9]+px\]" "$TARGET_FILE" 2>/dev/null; then
  if ! grep -qE "sm:w-|md:w-|lg:w-|sm:min-w|md:min-w|lg:min-w|sm:hidden|md:hidden|lg:hidden" "$TARGET_FILE" 2>/dev/null; then
    WARNINGS="$WARNINGS\n  - Fixed pixel width (w-[Npx]) without responsive alternative"
  fi
fi

# Check: flex with flex-row but no responsive stacking
if grep -q "flex-row" "$TARGET_FILE" 2>/dev/null; then
  if ! grep -qE "flex-col.*sm:flex-row\|flex-col.*md:flex-row\|flex-col.*lg:flex-row\|sm:flex-row\|md:flex-row\|lg:flex-row" "$TARGET_FILE" 2>/dev/null; then
    # Only warn if this looks like a layout container (has gap or justify)
    if grep -qE "gap-|justify-|items-" "$TARGET_FILE" 2>/dev/null; then
      WARNINGS="$WARNINGS\n  - flex-row layout without mobile stacking (consider flex-col + sm:flex-row)"
    fi
  fi
fi

if [ -n "$WARNINGS" ]; then
  echo "RESPONSIVE CHECK: Potential issues in $(basename "$TARGET_FILE"):"
  echo -e "$WARNINGS"
  echo ""
  echo "  Tip: Every layout class should have mobile (sm:), tablet (md:), and desktop (lg:) variants."
fi

exit 0
