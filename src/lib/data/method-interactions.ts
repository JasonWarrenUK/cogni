import type { MethodInteraction } from './types.js';

/**
 * Pairwise method interactions.
 * Surfaced when both methods in the pair are evaluated (not 'awaiting').
 * Condition (optional) narrows to specific compass+quadrant positions.
 */
export const METHOD_INTERACTIONS: MethodInteraction[] = [
	// TDD + Scrum
	{
		methods: ['tdd', 'scrum'],
		type: 'tension',
		condition: 'process-fit-temporal-0',
		text: "TDD's tight red-green-refactor loop and Scrum's sprint ceremonies compound the same friction for high-incubation developers. Both methodologies assume you're ready to specify and commit immediately. Running them together doubles the pressure to act before you've finished thinking.",
	},
	{
		methods: ['tdd', 'scrum'],
		type: 'synergy',
		condition: 'process-fit-temporal-3',
		text: "For low-incubation developers who work well within external structure, TDD and Scrum reinforce each other naturally. TDD provides micro-level discipline (each task has a clear done state), while Scrum provides macro-level rhythm. The methods speak the same language.",
	},
	// PR Review + Pair Programming
	{
		methods: ['pr-code-review', 'pair-programming'],
		type: 'redundancy',
		condition: 'team-formation-1',
		text: "For deep-immersion, asynchronous workers, PR review is already sufficient for knowledge-sharing. Adding mandatory pairing doesn't compound the benefit — it compounds the interruption. The two methods overlap significantly in purpose; pick one based on your collaborative preference.",
	},
	{
		methods: ['pr-code-review', 'pair-programming'],
		type: 'synergy',
		condition: 'team-formation-0',
		text: "Deep synchronous collaborators can use pairing for the hard problems and PRs for the routine ones. The methods complement each other when pairing is selective: high-stakes decisions get real-time collaboration; clear implementation gets async review.",
	},
	// Scrum + Sprint Estimation
	{
		methods: ['scrum', 'sprint-estimation'],
		type: 'tension',
		condition: 'ambiguity-response-0',
		text: "Scrum's planning demands and sprint estimation's point-assignment ritual both require decomposing problems you haven't fully understood yet. For analytical thinkers who need well-defined inputs before they can estimate, running these together creates a double ceremony of meaningless numbers.",
	},
	{
		methods: ['scrum', 'sprint-estimation'],
		type: 'synergy',
		condition: 'ambiguity-response-3',
		text: "For developers comfortable working with partial information, Scrum and story point estimation work smoothly together. The rough-sizing approach ('about this big') fits naturally into sprint planning without requiring complete specification.",
	},
	// TDD + Pair Programming
	{
		methods: ['tdd', 'pair-programming'],
		type: 'synergy',
		condition: 'team-formation-2',
		text: "Pair programming combined with TDD is its intended environment — Kent Beck and Ward Cunningham developed TDD in the context of XP's pairing culture. For synchronous collaborators, the navigator role during red-green-refactor creates immediate feedback on both the test and the design.",
	},
	{
		methods: ['tdd', 'pair-programming'],
		type: 'tension',
		condition: 'process-fit-attentional-1',
		text: "Both TDD's tight loop and pairing's continuous interruption model assume you can context-switch freely. For developers who need uninterrupted concentration, combining them creates sustained cognitive friction — each failing test triggers a navigator intervention, compounding the interruption pattern.",
	},
	// Kanban + Scrum
	{
		methods: ['kanban', 'scrum'],
		type: 'tension',
		text: "Kanban and Scrum rest on incompatible assumptions: Kanban optimises for flow continuity, Scrum optimises for sprint boundaries. Blending them (Scrumban) can work but usually involves one methodology colonising the other. Be deliberate about which principles you're keeping.",
	},
	// Shape Up + Scrum
	{
		methods: ['shape-up', 'scrum'],
		type: 'tension',
		text: "Shape Up and Scrum represent fundamentally different theories of how software should be built. Shape Up gives teams full autonomy for 6-week cycles; Scrum imposes daily visibility and sprint commitments. They share almost no practices and have opposing management philosophies.",
	},
	// Shape Up + Kanban
	{
		methods: ['shape-up', 'kanban'],
		type: 'synergy',
		text: "Shape Up and Kanban share key principles: no estimation, pull-based work assignment, focus on flow over fixed deadlines. Shape Up can be seen as Kanban with a fixed cycle length and formal shaping phase. Teams that like Kanban's philosophy but want more strategic direction often move towards Shape Up.",
	},
	// TDD + Documentation-Driven Development
	{
		methods: ['tdd', 'documentation-driven-development'],
		type: 'tension',
		condition: 'design-methodology-2',
		text: "Both methods claim to be 'write first, implement second' — but they mean different things by 'first'. TDD writes tests first; DDD writes documentation first. For emergent-structure developers, combining them forces two upfront specification steps before any implementation can begin, doubling the constraint on your natural flow.",
	},
	{
		methods: ['tdd', 'documentation-driven-development'],
		type: 'synergy',
		condition: 'design-methodology-0',
		text: "For proactive-structure developers, TDD and DDD reinforce each other. The documentation defines the interface; the tests define the behaviour. Together they create a complete specification: the README describes what the API does, the tests describe how it should behave. Implementation fills the gap.",
	},
	// Scrum + Sprint Estimation (holistic, low ambiguity tolerance)
	{
		methods: ['scrum', 'sprint-estimation'],
		type: 'tension',
		condition: 'ambiguity-response-2',
		text: "You think holistically and need clear problem boundaries. Scrum's sprint planning and story point estimation both demand breaking an incompletely-understood problem into discrete, time-bounded pieces. For holistic thinkers with low ambiguity tolerance, this combination forces you to commit to a decomposition before you've seen the whole shape — a recipe for misaligned sprints.",
	},
	// TDD + Documentation-Driven Development (proactive + late = design-methodology-1)
	{
		methods: ['tdd', 'documentation-driven-development'],
		type: 'tension',
		condition: 'design-methodology-1',
		text: "You design proactively but commit late — you sketch the shape before writing anything. DDD fits this naturally (write the README first), but TDD's 'write the test first' discipline pulls against your late-commitment style. The two methods both claim 'spec first', but TDD forces you to lock in behaviour before you're ready, while DDD lets you stay in description mode longer.",
	},
	// YAGNI + Documentation-Driven Development
	{
		methods: ['yagni', 'documentation-driven-development'],
		type: 'tension',
		text: "YAGNI and DDD rest on opposite impulses: YAGNI defers every abstraction until it's needed; DDD writes the full documentation before any implementation begins. DDD's upfront narrative requires specifying behaviour you may not yet need. Running both forces a contradiction — the documentation implies scope that YAGNI would eliminate.",
	},
	// Shape Up + PR Code Review
	{
		methods: ['shape-up', 'pr-code-review'],
		type: 'synergy',
		condition: 'process-fit-attentional-1',
		text: "Shape Up's 6-week cycle autonomy and PR review's asynchronous written feedback both suit deep, internally-driven workers. Within a cycle, teams can use PRs as lightweight integration points without ceremony — no standups, no estimations, just written review of completed work. The combination preserves Shape Up's flow while keeping the quality gate.",
	},
	// PR Review + Trunk-Based Development
	{
		methods: ['pr-code-review', 'trunk-based-development'],
		type: 'tension',
		text: "PR-based review and trunk-based development have opposing assumptions about branch lifetime. PRs assume branches live long enough to warrant a formal review cycle. TBD assumes branches are so short-lived that a formal PR process would slow integration to a crawl. You can combine them (very short PRs), but the friction is real.",
	},
	// Daily Standups + Shape Up
	{
		methods: ['daily-standups', 'shape-up'],
		type: 'tension',
		text: "Shape Up explicitly removes daily standups from the development cycle. The methodology's cycle autonomy principle is incompatible with daily status broadcasting — if you're running Shape Up, standups signal that the methodology isn't fully adopted. Running both usually means management hasn't let go of Scrum's reporting culture.",
	},
	// Pair Programming + Daily Standups
	{
		methods: ['pair-programming', 'daily-standups'],
		type: 'redundancy',
		condition: 'team-formation-2',
		text: "For synchronous collaborators who pair regularly, standups are largely redundant — the pair has already shared context continuously throughout the day. Standups may still have value for cross-pair coordination, but the per-individual status update is already handled by the pairing relationship.",
	},
];
