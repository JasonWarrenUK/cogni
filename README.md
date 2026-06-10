# Cogni — Developer Cognition Profile

A self-assessment tool that maps your cognitive style to the development methodologies you work with every day. Instead of asking "do you like TDD?" it asks *why* TDD might or might not fit — and derives that answer from your cognitive profile.

## What it does

You position yourself on **17 compasses** — two-axis frameworks that capture dimensions of how you think and work. Cogni then computes personalised fit scores for **10+ established development methodologies** (TDD, Scrum, Shape Up, Kanban, and more), explaining the mechanism behind each fit or friction in terms of your specific positions.

The output is a complete Markdown document you can carry into a manager 1:1, a job evaluation, or a team retrospective.

## The compass model

Compasses are organised in three tiers:

| Tier | What it captures | Informs |
|------|-----------------|---------|
| **1** | Process and behavioural dimensions | Directly evaluated against methodologies |
| **2** | Cognitive modifiers | Refine and explain tier-1 positions |
| **3** | Foundational cognitive style | Explains *why* you sit where you do on tiers 1–2 |

Compasses on the same axis constrain each other — the UI crosshatches quadrants that would contradict a position you've already established elsewhere.

## Running locally

```sh
bun install
bun run dev
```

Requires [Bun](https://bun.sh). Node/npm also work — use `npm install` and `npm run dev`.

## Building

```sh
bun run build
bun run preview
```

## Type-checking

```sh
bun run check
```

## Tests

```sh
bun run test:unit
```

Unit tests cover the core logic modules: constraint propagation, method evaluation, profile synthesis, and import/export.

## Profile persistence

Profiles are stored in `localStorage` under the key `cogni-profile`. Export as JSON to back up or transfer; import to restore. The Markdown export is a portable human-readable version of the full profile.

## Version

v0.6 — originated by Jason Warren & Claude, February 2026.
