export interface PracticeStack {
	id: string;
	name: string;
	tagline: string;
	methods: string[];
	/** Minimum overall fit score (avg of constituent method scores) to show this stack */
	minScore: number;
	desc: string;
}

/**
 * Curated method combinations representing coherent working approaches.
 * Each stack is scored by aggregating its constituent method evaluations.
 */
export const PRACTICE_STACKS: PracticeStack[] = [
	{
		id: 'deep-worker',
		name: 'The Deep Worker Stack',
		tagline: 'Kanban + async review + RFC-driven',
		methods: ['kanban', 'pr-code-review', 'user-stories'],
		minScore: 0,
		desc: "Pull-based flow, written communication, and documentation-first requirements. For developers who need uninterrupted focus time and prefer async coordination to ceremony. No standups, no sprints — just clear work and thorough written communication.",
	},
	{
		id: 'xp-core',
		name: 'The XP Core Stack',
		tagline: 'TDD + pair programming + short cycles',
		methods: ['tdd', 'pair-programming', 'scrum'],
		minScore: 0,
		desc: "Test-driven development, continuous pairing, and regular delivery. The classic Extreme Programming combination, still the most validated approach for high-quality, team-oriented delivery. Requires a specific cognitive profile to sustain.",
	},
	{
		id: 'autonomous-craftsperson',
		name: 'The Autonomous Craftsperson Stack',
		tagline: 'Shape Up + TDD + async review',
		methods: ['shape-up', 'tdd', 'pr-code-review'],
		minScore: 0,
		desc: "6-week cycles with full autonomy, test-driven implementation, and async code review. For high-incubation, internally-regulated developers who want full ownership of their work and delivery quality.",
	},
	{
		id: 'flow-maximiser',
		name: 'The Flow Maximiser Stack',
		tagline: 'Trunk-based + DDD + Kanban',
		methods: ['trunk-based-development', 'documentation-driven-development', 'kanban'],
		minScore: 0,
		desc: "Continuous integration, documentation-first design, and pull-based delivery. For developers who want maximum feedback velocity with minimal coordination overhead. The document defines the API, the trunk carries the work, the board shows the flow.",
	},
	{
		id: 'structured-navigator',
		name: 'The Structured Navigator Stack',
		tagline: 'Scrum + estimation + standups',
		methods: ['scrum', 'sprint-estimation', 'daily-standups'],
		minScore: 0,
		desc: "Sprint cadence, estimation, and daily coordination. The standard Agile implementation. Works exceptionally well for specific cognitive profiles: externally-regulated developers who need visible structure and regular accountability.",
	},
	{
		id: 'minimal-overhead',
		name: 'The Minimal Overhead Stack',
		tagline: 'YAGNI + Kanban + async review',
		methods: ['yagni', 'kanban', 'pr-code-review'],
		minScore: 0,
		desc: "Simplest implementation, pull-based flow, and async review. Maximum shipping velocity with minimum ceremony. For pragmatic developers who want to build and ship without planning overhead.",
	},
	{
		id: 'structured-incubator',
		name: 'The Structured Incubator Stack',
		tagline: 'DDD + Shape Up + Kanban',
		methods: ['documentation-driven-development', 'shape-up', 'kanban'],
		minScore: 0,
		desc: "Documentation-first design, 6-week autonomous cycles, and pull-based delivery. For proactive, holistic thinkers who need to write their way to clarity before building. The document shapes the work; Shape Up gives the cycle; Kanban keeps flow visible without sprint pressure.",
	},
];
