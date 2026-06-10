# Draft Content — Review Checklist

All strings marked `// @draft` or `<!-- @draft -->` in this project require a prose review pass before shipping. This file is the worklist.

Run `grep -rn "@draft" src/` to verify the list is complete.

**Total markers at last update: 289**

---

## Files with draft content

### `src/lib/data/methods.ts` — 269 markers

The bulk of the draft content. Covers:

- **user-stories**: `communication-pattern` evaluator (4 lines), growth path rationale/steps (3 paths), context modifier notes (4)
- **sprint-estimation**: `communication-pattern` evaluator (4 lines), growth path rationale/steps (3 paths), context modifier notes (4)
- **yagni**: growth path rationale/steps (5 paths across 3 compasses), context modifier notes (4)
- **daily-standups**: growth path rationale/steps (3 paths), context modifier notes (4)
- **kanban**: growth path rationale/steps (2 paths), context modifier notes (4)
- **trunk-based-development**: growth path rationale/steps (3 paths), context modifier notes (4)
- **shape-up**: growth path rationale/steps (3 paths), context modifier notes (4)
- **documentation-driven-development**: growth path rationale/steps (4 paths), context modifier notes (4)
- **pr-code-review**: context modifier notes (4)
- **domain-driven-design** (new): all evaluator text (16 lines), growth path rationale/steps (5 paths), context modifier notes (4), no alternative descs (those are factual)
- **async-first-work** (new): all evaluator text (16 lines), growth path rationale/steps (7 paths), context modifier notes (4)
- **bdd-spec-by-example** (new): all evaluator text (12 lines), growth path rationale/steps (2 paths), context modifier notes (4)

**Review guidance for methods.ts:**
- Evaluator `text` fields: check that the voice is direct, second-person, and avoids generic advice. The best ones name a specific pattern or alternative.
- Growth path `rationale` fields: should explain *why* the bridge works for this specific cognitive profile, not generic advice.
- Growth path `steps` fields: should be concrete and actionable, not "consider doing X".
- Context modifier `note` fields: one sentence, explains *why* the context changes the fit — not just that it does.

---

### `src/lib/logic/synthesis.ts` — 10 markers

The 8 archetype narrative `body` fields and 2 archetype name strings. These are the pre-authored narratives that replace the formulaic assembled output.

**Review guidance:**
- Each archetype body is 2-3 sentences. Check that it names the *consequences* of the profile pattern (what methodologies fit/don't fit, what working conditions are ideal) rather than just restating the trait.
- The fallback assembled narrative (when no archetype matches) is still template-assembled — not `@draft` — and should remain as-is.

---

### `src/lib/components/Onboarding.svelte` — 6 markers

The collapsible "How this works" explainer: intro paragraph, 4 step descriptions, and the privacy note.

**Review guidance:**
- Tone should be neutral and informational, not salesy.
- Step descriptions should be accurate to the current UI behaviour.

---

### `src/lib/components/ProfileUses.svelte` — 4 markers

The 4 use-case descriptions in the "Use cases for this profile" section.

**Review guidance:**
- Each should be concrete and specific (a real scenario, not a generic claim).
- Avoid exaggerating the tool's value — keep it grounded.

---

## How to do the review pass

1. Run `grep -rn "@draft" src/` to get the full list with line numbers.
2. Open each file and read the prose in context.
3. Edit directly — no need to remove the `// @draft` marker until satisfied.
4. When all prose in a file is approved, remove all `// @draft` markers from that file.
5. Update the count in this file when done.

The review is complete when `grep -rn "@draft" src/` returns no results.
