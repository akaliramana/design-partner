# Claude Code Hooks Specification

Loaded during project setup. Defines hooks for design system enforcement and responsive checks.

---

## What Are Claude Code Hooks

Hooks are user-configured shell commands that Claude Code runs automatically at specific points during its operation. They run as child processes on the user's machine with the user's permissions.

## Hook Types

| Type | When it runs | Can block? |
|------|-------------|------------|
| `PreToolUse` | Before a tool (Edit, Write, Bash) is executed | Yes — can deny the action |
| `PostToolUse` | After a tool completes | No — informational only |
| `Notification` | On events (task complete, error) | No |

## Active Hooks

### 1. Design System Gate (PreToolUse)

**Purpose:** Warn when writing UI code without `design-system/MASTER.md` existing. Soft enforcement — warns but doesn't block.

**Defined in:** SKILL.md frontmatter
```yaml
hooks:
  - type: PreToolUse
    matcher: Edit|Write
    hook: bash .claude/skills/ui-skill/hooks/check-design-system.sh
```

**Script:** `.claude/skills/ui-skill/hooks/check-design-system.sh`

**Behavior:**
- Checks if the target file is inside `src/`
- If `design-system/MASTER.md` doesn't exist, prints a warning
- Always exits 0 (warn, never block)

**Warning output:**
```
WARNING: No design-system/MASTER.md found.

The ui-ux skill pipeline requires generating the design system FIRST:
  python3 .claude/skills/ui-skill/scripts/search.py "<query>" --design-system --persist -p "<ProjectName>"
```

## Configuration

Hooks are configured in the skill's SKILL.md frontmatter using the `hooks:` field. They can also be added to `.claude/settings.json` for project-level configuration:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hook": "bash .claude/skills/ui-skill/hooks/check-design-system.sh"
      }
    ]
  }
}
```

### 2. Responsive Warning (PostToolUse)

**Purpose:** After writing a component/page file, check for common responsive issues. Soft enforcement — warns but doesn't block.

**Defined in:** SKILL.md frontmatter
```yaml
hooks:
  - type: PostToolUse
    matcher: Edit|Write
    hook: bash .claude/skills/ui-skill/hooks/check-responsive.sh
```

**Script:** `.claude/skills/ui-skill/hooks/check-responsive.sh`

**What it checks:**
- `grid-cols-*` without `sm:`/`md:`/`lg:` responsive variants
- Fixed pixel widths (`w-[Npx]`) without responsive alternatives
- `flex-row` layouts without mobile stacking (`flex-col` + `sm:flex-row`)

**Only runs on:** `.tsx`/`.jsx` files inside `src/`

## Future Hooks (not yet implemented)

### Prototype Sync Reminder (PostToolUse)
After writing to `src/components/shared/`, remind to update `.ui-skill/registry.json`.

## Disabling Hooks

Remove the `hooks:` section from SKILL.md frontmatter, or delete the hook entries from `.claude/settings.json`.
