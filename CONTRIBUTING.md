# Contributing

Thanks for your interest in improving the ui-ux skill suite.

## How the skill is structured

The skill has 8 modules organized into 3 groups:

- **Core UI/UX** — `ui-skill/` (orchestrator), `ui-styling/`, `design-system/`
- **Prototype** — `prototype/` (multi-page structure, state tracking)
- **Branding** — `brand/`, `design/`, `slides/`, `banner-design/`

`ui-skill/SKILL.md` is the main entry point. It routes to sub-skills and reference files.

## Key principles

1. **Keep SKILL.md lean.** It's the router, not the encyclopedia. If you're adding more than 10 lines, it probably belongs in a reference file under `references/`.

2. **Reference files are on-demand.** They're loaded only when the specific phase needs them. Don't put content in SKILL.md that only applies to one flow.

3. **Artifact gates are real.** Every phase produces something the next phase requires. Don't add steps that can be skipped without consequence.

4. **Test with a fresh app.** Don't just read the skill — install it into a fresh project and run a real prompt.

## How to test changes

```bash
# 1. Create a disposable test app
npx create-next-app@latest /tmp/test-app --typescript --tailwind --eslint --app --src-dir --yes

# 2. Install the skill
bash install.sh /tmp/test-app

# 3. Verify install
cd /tmp/test-app
npm run lint    # should pass (no .claude/ lint errors)
npm run build   # should pass

# 4. Test with a real prompt in Claude Code
# Use prompts from SAMPLE-PROMPTS.md

# 5. Clean up
rm -rf /tmp/test-app
```

## How to add a reference file

1. Create the file in `.claude/skills/ui-skill/references/`
2. Add it to the reference table in `SKILL.md`
3. Add a "Load `references/your-file.md`" instruction at the phase where it's needed
4. Don't duplicate content that's already in another reference

## How to modify the build pipeline

1. Any change to the phase flow must be reflected in:
   - `SKILL.md` (the phase itself)
   - The relevant checklist (Phase N checklist)
   - The completion gate
   - `templates/CLAUDE.md.template`
2. Test the change end-to-end, not just by reading

## How to add stack support

1. Add the stack to `references/stack-paths.md`
2. Add the stack's CSV to `.claude/skills/ui-skill/data/stacks/` (if guidelines exist)
3. Add it to `STACK_CONFIG` in `scripts/core.py`
4. Test with a real project on that stack

## Pull requests

- One concern per PR
- Test with a fresh install
- If you changed SKILL.md, explain which phase/flow was affected
- If you changed a reference file, note which phase loads it
