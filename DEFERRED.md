# Deferred Work — Tier 5

Items that were identified during the analysis pass but explicitly set aside for design reasons. Not lost — recorded here so they can be properly scoped when the time comes.

---

## 1. Team aggregate view

**The idea:** Import N profiles, show an overlap/divergence map across the team — which axes cluster, where the team is heterogeneous, what the aggregate methodology fit looks like.

**Why deferred:** This is the highest-value feature for engineering managers but requires a fundamentally different interaction model (multi-profile input, aggregation logic, a new visualisation layer). It also raises design questions about how profiles should be normalised across users before comparison.

**Open design questions:**
- How are profiles imported? URL sharing? File upload? Live collaboration?
- What does "team fit" for a methodology mean — mean score, lowest-common-denominator, or both?
- How do you visualise axis divergence without overwhelming the reader?
- Does this require a backend, or is it purely client-side (import multiple JSON files)?

---

## 2. Profile changelog

**The idea:** Versioned snapshots of position changes over time — save a named snapshot on demand, diff snapshots, visualise how positions have shifted.

**Why deferred:** Requires a data model change (the current store is a single flat object) and UI for managing multiple snapshots. The footer motto ("A profile that never changes probably isn't being honest") implies this is philosophically central — it deserves proper thought, not a bolted-on feature.

**Open design questions:**
- How are snapshots stored? localStorage can only hold so much.
- What's the UX for triggering a snapshot? Explicit "save snapshot" button, or automatic on significant change?
- What's the visualisation? Side-by-side comparison? A diff view? A timeline?
- Should snapshots have user-authored notes ("after joining company X")?

---

## 3. Calibration prompts

**The idea:** For compasses parked at intensity 0 (the centre — "I'm not sure"), surface situational questions that help the user introspect more precisely.

**Why deferred:** Requires authoring high-quality calibration questions for each compass, which is a significant content task. The questions also risk being leading (pushing users toward a position) rather than clarifying. Needs careful design.

**Open design questions:**
- What distinguishes a good calibration question from a bad one for this context?
- Should questions be shown proactively, or only when the user explicitly asks for help?
- Do they replace the compass description, supplement it, or appear separately?
- How many questions are needed per compass? At what point does the quiz become fatiguing?

---

## 4. Shareable profile via URL hash

**The idea:** Base64-compress the current profile state into the URL hash, making profiles shareable without a backend.

**Why deferred:** The URL hash approach is a precursor to team comparison (item 1 above) — it doesn't make sense to implement sharing without knowing how sharing will be used in the team context. URL sharing alone (without team comparison) is low-value.

**Open design questions:**
- What's the URL length limit in practice for a full profile? (17 compasses × 3 fields = reasonable.)
- Should the URL be a full read-only view or an editable copy?
- How does this interact with the changelog feature?
- Does sharing imply consent to compare? Does compare require sharing?

---

## 5. AI-assisted development as a method

**The idea:** Add AI-assisted development (LLM pair programming, agentic coding, spec-to-code, review-assist) as a methodology category alongside TDD, Scrum, etc.

**Why deferred:** Explicitly flagged by the user: "far too broad as a category — given that all other methods mentioned are non-AI-assisted development, this needs to be thought out more properly."

**Open design questions:**
- Is this one method or several? Candidates: (a) LLM as pair programmer, (b) agentic coding (fully autonomous), (c) spec-to-code (write requirements, generate implementation), (d) AI code review. These have different compass profiles.
- Which compasses are most relevant? `communication-pattern`, `verification-motivation`, `comprehension-clarity`, `design-methodology`, `architecture-philosophy` are all plausible.
- How does intensity interact? A developer who uses AI heavily for generation but reviews everything carefully has a different profile than one who accepts suggestions wholesale.
- Is this tool-specific (Claude Code, GitHub Copilot, Cursor) or practice-level? The tool changes faster than the practice — probably model at the practice level.
- Does it change the meaning of other compasses? Someone with `verification-motivation` at low intensity has a different risk profile when AI is generating their code.
