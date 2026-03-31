#!/bin/bash
# PreToolUse hook: Warn if writing to src/ without design-system/MASTER.md
#
# This hook runs before Edit/Write tool calls. It checks if:
# 1. The target file is inside src/ (UI code)
# 2. design-system/MASTER.md does NOT exist
#
# If both are true, it prints a warning. It does NOT block the action.
# This is a soft enforcement — a reminder to follow the pipeline.

# The tool input is passed via environment or stdin
# For PreToolUse hooks, we check the file path being edited/written

TARGET_FILE="${CLAUDE_TOOL_INPUT_FILE_PATH:-}"

# Only check for src/ files
if [[ "$TARGET_FILE" != *"/src/"* ]] && [[ "$TARGET_FILE" != "src/"* ]]; then
  exit 0
fi

# Check if MASTER.md exists
if [ ! -f "design-system/MASTER.md" ]; then
  echo "WARNING: No design-system/MASTER.md found."
  echo ""
  echo "The ui-ux skill pipeline requires generating the design system FIRST:"
  echo "  python3 .claude/skills/ui-skill/scripts/search.py \"<query>\" --design-system --persist -p \"<ProjectName>\""
  echo ""
  echo "This ensures colors, typography, and tokens come from the knowledge base,"
  echo "not from general knowledge. Proceeding without it risks inconsistent design."
  echo ""
  # Exit 0 = allow (warn only, don't block)
  exit 0
fi

# MASTER.md exists — all good
exit 0
