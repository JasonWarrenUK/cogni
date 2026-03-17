import type { Method } from './types.js';

export const ESTABLISHED_METHODS: Method[] = [
	{
		id: 'tdd',
		name: 'Test-Driven Development',
		brief: 'Write tests before implementation. Red-green-refactor. Tests drive design.',
		evaluators: {
			'design-methodology': {
				0: {
					fit: 'adapt',
					text: "You already verify early, but through types and models — not test cases. TDD's test-first timing aligns with yours, but your structuring is proactive where TDD expects design to emerge from tests.",
				},
				1: {
					fit: 'friction',
					text: "You invest in upfront domain models and verify the finished work. TDD's incremental test-first cycle fragments your natural design process — you want the whole shape before asserting against parts of it.",
				},
				2: {
					fit: 'natural',
					text: "You let design emerge through failing tests, using assertions as discovery tools. This is TDD's intended mode of operation.",
				},
				3: {
					fit: 'friction',
					text: "You build first and extract patterns after. Writing tests before code inverts your entire flow — you need to see something working before you can specify what 'working' means.",
				},
			},
			'verification-motivation': {
				0: {
					fit: 'adapt',
					text: 'You treat tests as specifications from study — aligned with test-first thinking, though your tests formalise understanding rather than driving discovery.',
				},
				1: {
					fit: 'friction',
					text: "You build from deep understanding and verify at the end. TDD's tight feedback loop feels redundant — you trust your comprehension to prevent most defects.",
				},
				2: {
					fit: 'natural',
					text: "You use tests as exploration instruments — writing failing assertions to discover what the system should do. TDD's experimental mode fits you.",
				},
				3: {
					fit: 'friction',
					text: "You verify by running, observing, and fixing. TDD's formality clashes with your REPL-driven, immediate-feedback style.",
				},
			},
			'creative-workflow': {
				0: {
					fit: 'friction',
					text: "This deeper pattern explains why TDD is likely a poor fit: you load problems fully before acting. TDD's tight red-green-refactor loop forces premature commitment — you haven't finished thinking when TDD expects you to start specifying.",
				},
				1: {
					fit: 'friction',
					text: "This deeper pattern explains the friction: you need incubation time before structure emerges. TDD's insistence on writing tests before you've formed a structural vision collides with your creative process at its foundation.",
				},
				2: {
					fit: 'adapt',
					text: "This deeper pattern reveals why TDD is workable but taxing: you solve at the keyboard without needing incubation, but you want structure to emerge organically. TDD's structured ceremonies feel like overhead when you'd rather discover structure through code.",
				},
				3: {
					fit: 'natural',
					text: "This deeper pattern confirms why TDD fits: you act immediately, structure emerges through the work. TDD's tight cycle is the external scaffolding for exactly this creative mode — each failing test is a step in the emergence.",
				},
			},
			'architecture-philosophy': {
				0: {
					fit: 'friction',
					text: "You plan for future change from day one. TDD's emergent design assumption — that architecture will emerge from refactoring failing tests — conflicts with your instinct to establish the architectural skeleton before writing any code. TDD produces local design quality; it doesn't substitute for systemic planning.",
				},
				1: {
					fit: 'adapt',
					text: "You favour clean domain models with minimal implementation. TDD can serve this: the tests express your model's intent, the implementation stays minimal. The tension is that TDD's micro-cycle makes it hard to hold the whole model in mind while writing individual tests.",
				},
				2: {
					fit: 'natural',
					text: "You build flexible systems iteratively through refactoring. TDD's red-green-refactor rhythm is exactly the mechanism for this — the refactor step is where emergent flexibility gets built in. TDD gives you the safety net that makes incremental architectural improvement tractable.",
				},
				3: {
					fit: 'natural',
					text: "You build the simplest thing and abstract later. TDD enforces this discipline structurally — you can only write production code to make a failing test pass, which naturally produces the simplest implementation. YAGNI and TDD share the same underlying philosophy.",
				},
			},
			'delivery-philosophy': {
				0: {
					fit: 'friction',
					text: "You want every piece complete and designed for change before it ships. TDD's incremental, test-at-a-time rhythm produces a continuous stream of small completions — which can feel like perpetual incompleteness to someone who wants each piece fully realised before moving on.",
				},
				1: {
					fit: 'adapt',
					text: "You ship complete, minimal work. TDD's test-at-a-time discipline keeps implementations minimal by design — you can't over-engineer when the next test is waiting. The adapt tension is that TDD's rhythm doesn't naturally create the 'complete and ship' gate you prefer.",
				},
				2: {
					fit: 'natural',
					text: "You ship fast with extensibility hooks. TDD supports this directly: the refactor step is where you add extensibility, and the red-green loop keeps you moving quickly. TDD gives you the quality foundation under a momentum-driven delivery style.",
				},
				3: {
					fit: 'natural',
					text: "You ship the simplest thing fast. TDD's micro-cycle is the fastest path to a verified simple thing — each test is a small, complete delivery. The red-green rhythm aligns with your momentum-first approach.",
				},
			},
			'code-quality': {
				0: {
					fit: 'natural',
					text: "You want elegant code that evolves cleanly. TDD enforces this structurally: you can't skip the refactor step, and tests give you the safety net to improve code fearlessly. The cycle builds elegance in, rather than hoping for it.",
				},
				1: {
					fit: 'natural',
					text: "You balance elegance with pragmatism. TDD's three-phase loop is itself a pragmatic elegance: write the test (spec), make it pass (pragmatic), then refactor (elegant). Each phase is honest about its purpose.",
				},
				2: {
					fit: 'adapt',
					text: "You want clean, working code but resist over-engineering. TDD's refactor step can feel like gold-plating when the pragmatic solution already works. Treat it as a hygiene pass — remove duplication, clarify names — rather than a design session.",
				},
				3: {
					fit: 'adapt',
					text: "You favour shipping over polishing. TDD's mandatory refactor phase will feel like overhead when green tests mean 'done' to you. The discipline is worth it for long-lived code, but TDD's cadence requires internalising quality as part of done.",
				},
			},
		},
		alternatives: [
			{
				name: 'Type-Driven Development',
				desc: 'Let the type system prove correctness at compile time. Types as specifications, not test cases.',
				relevant: ['design-methodology-0', 'design-methodology-1'],
			},
			{
				name: 'REPL-Driven Development',
				desc: "Explore interactively, extract tests from observed behaviour. Rich Hickey's preferred workflow.",
				relevant: ['verification-motivation-3'],
			},
			{
				name: 'Property-Based Testing',
				desc: 'Define invariants rather than examples. Aligns with model-first thinking — test the properties, not the cases.',
				relevant: ['design-methodology-0', 'design-methodology-1', 'verification-motivation-0'],
			},
			{
				name: 'Characterisation Testing',
				desc: 'Write tests after implementation to lock existing behaviour. Useful when discovery comes before specification.',
				relevant: ['design-methodology-3', 'verification-motivation-3'],
			},
			{
				name: 'TCR (test && commit || revert)',
				desc: "Kent Beck's extreme variant — forces even smaller steps than classic TDD. Worth trying if the cycle appeals but the granularity doesn't.",
				relevant: [],
			},
		],
		sources: [
			{
				author: 'DHH',
				work: 'TDD is Dead',
				year: 2014,
				note: "Argued TDD had become a cargo cult that prioritised unit test coverage over software design quality.",
			},
			{
				author: 'Kent Beck, Martin Fowler & DHH',
				work: 'Is TDD Dead? (conversation series)',
				year: 2014,
				note: 'Beck distinguished TDD as one tool among many — appropriate for some contexts, not a universal rule.',
			},
			{
				author: 'Gary Bernhardt',
				work: 'Boundaries (talk)',
				year: 2012,
				note: "Challenged the assumption that all tests should be unit tests. Separated 'core' (functional, fast) from 'boundary' (integration, slow) testing.",
			},
			{
				author: 'Rich Hickey',
				work: 'Simple Made Easy (talk)',
				year: 2011,
				note: 'Argued simplicity is about disentangling concepts, not about process discipline. Implicitly challenges test-first as the path to good design.',
			},
		],
		growthPaths: {
			'design-methodology': [
				{
					quadrant: 1,
					bridge: 'Property-Based Testing',
					rationale: "You build rich domain models upfront — property-based tests let you verify your model's invariants without abandoning the proactive design phase. You write the model first, then express what must always be true about it.",
					steps: [
						"Define 3–5 invariants for a domain model you've already designed.",
						"Write property tests for these invariants using fast-check or similar.",
						"Notice how the invariant-writing process sharpens your model — use this as design feedback.",
					],
				},
				{
					quadrant: 3,
					bridge: 'Characterisation Testing',
					rationale: "You build first and extract patterns after. Characterisation tests let you lock in what you've built before refactoring — TDD's benefits without inverting your natural build-first flow.",
					steps: [
						"After building a working prototype, write tests that capture its actual behaviour.",
						"Refactor with the characterisation tests as your safety net.",
						"Notice which tests become specification — those are the ones TDD would have asked you to write first.",
					],
				},
			],
			'creative-workflow': [
				{
					quadrant: 0,
					bridge: 'Spike + Test',
					rationale: "Your incubation phase produces a clear structural vision. Write a spike (unconstrained prototype) during incubation, then use TDD to rebuild it properly — you get both the exploratory freedom and the test coverage.",
					steps: [
						"Give yourself an explicit 'spike timebox' (e.g. 90 minutes) to explore without tests.",
						"Throw away the spike code. Now you understand the problem.",
						"Rebuild using TDD — your incubation has loaded the context, so the red-green-refactor cycle will feel natural.",
					],
				},
				{
					quadrant: 1,
					bridge: 'Test-After with deliberate review',
					rationale: "Your incubation needs mean you resist test-first timing. Write tests immediately after each logical unit is complete — not at the end of the whole feature, but after each function or module.",
					steps: [
						"Define 'logical units' for your next feature (a function, a module boundary).",
						"Write each unit, then immediately write tests for it before moving to the next.",
						"Treat the test-writing as a second incubation pass — you're confirming what you built.",
					],
				},
			],
		},
		contextModifiers: [
			{
				phase: 'greenfield',
				compassId: 'design-methodology',
				quadrant: 2,
				delta: 0.4,
				note: 'Greenfield: TDD is strongest on greenfield projects where tests drive the API design with no legacy constraints.',
			},
			{
				phase: 'legacy',
				compassId: 'design-methodology',
				quadrant: 2,
				delta: -0.3,
				note: 'Legacy: TDD is harder on legacy code without testable seams — characterisation testing may be more practical.',
			},
			{
				phase: 'research',
				compassId: 'verification-motivation',
				quadrant: 2,
				delta: -0.3,
				note: "Research: Exploratory spikes don't benefit from TDD — test-first implies you know what you're building.",
			},
			{
				teamSize: 'large',
				compassId: 'team-formation',
				quadrant: 1,
				delta: 0.3,
				note: "Large team: TDD's shared test suite becomes a coordination mechanism — tests prevent regressions across many contributors.",
			},
		],
	},
	{
		id: 'scrum',
		name: 'Scrum',
		brief: 'Fixed-length sprints. Ceremonies (standup, retro, planning, review). Incremental delivery at sprint boundaries.',
		evaluators: {
			'process-fit-temporal': {
				0: {
					fit: 'friction',
					text: "You need background processing time on your own schedule. Scrum's expectations for visible daily progress and fixed sprint boundaries cut across your incubation cycles.",
				},
				1: {
					fit: 'friction',
					text: "You need incubation time but already face external regulation pressure. Scrum adds another layer of imposed cadence that directly conflicts with how your cognition processes complex problems.",
				},
				2: {
					fit: 'adapt',
					text: "You solve at the keyboard and self-direct. Scrum's ceremonies are overhead for someone who doesn't need the structure, but the sprint rhythm doesn't actively harm your process.",
				},
				3: {
					fit: 'natural',
					text: "You solve quickly and work well within externally-imposed cycles. Scrum's pick-up-solve-ship-next model suits your tempo.",
				},
			},
			'time-boxing-fit': {
				0: {
					fit: 'adapt',
					text: 'You understand the value of deadlines but want to set them yourself. Scrum provides temporal pressure — but removes your control over when and how it\'s applied.',
				},
				1: {
					fit: 'friction',
					text: "You self-direct without time pressure, following the work wherever it leads. Sprint boundaries are an unwelcome constraint on your natural flow.",
				},
				2: {
					fit: 'natural',
					text: "You need both external structure and time pressure. Scrum's sprint model gives you exactly that.",
				},
				3: {
					fit: 'adapt',
					text: "You need task structure but not time pressure. Scrum gives you structure, but the sprint deadline adds stress that Kanban wouldn't.",
				},
			},
			'management-compatibility': {
				0: {
					fit: 'adapt',
					text: "You already communicate proactively. Scrum's ceremonies are redundant reporting — you'd share this information anyway without the overhead.",
				},
				1: {
					fit: 'friction',
					text: "You self-direct and make yourself available when asked. Scrum's mandatory daily broadcasting disrupts your heads-down workflow.",
				},
				2: {
					fit: 'natural',
					text: "You follow established reporting structures well. Scrum's ceremonies give you a framework for the communication you naturally want to do.",
				},
				3: {
					fit: 'natural',
					text: 'You benefit from regular check-ins and structured accountability. Standups and reviews provide the external rhythm you work well within.',
				},
			},
			'problem-processing': {
				0: {
					fit: 'adapt',
					text: "This deeper pattern explains a nuance in your Scrum fit: you decompose problems analytically and work through them in real time. Scrum's sprint cadence suits your execution style, but the analytical precision you bring to decomposition can clash with the rough estimation culture.",
				},
				1: {
					fit: 'friction',
					text: "This deeper pattern reveals why Scrum is fundamentally misaligned: you need to incubate problems analytically before committing to structure. Sprint planning asks you to decompose and estimate before you've finished thinking — and your incubation reliance is exactly what Scrum's velocity culture was designed to make visible and schedule around.",
				},
				2: {
					fit: 'adapt',
					text: "This deeper pattern shows where Scrum works for you: you process holistically and act immediately. Scrum's ceremonies can feel like interruptions to your flow, but the structure isn't catastrophic — your low incubation needs mean you don't lose work to sprint boundaries.",
				},
				3: {
					fit: 'friction',
					text: "This deeper pattern explains a hidden cost: you process problems holistically and need incubation time for the whole picture to form. Sprint boundaries ask you to commit to delivery before your holistic understanding has crystallised — and the Scrum team's expectation of daily visible progress misses how your cognition actually works.",
				},
			},
		},
		alternatives: [
			{
				name: 'Shape Up',
				desc: "Basecamp's method: 6-week cycles with full autonomy within them. Fixed time, variable scope. No standups, no estimation.",
				relevant: ['process-fit-temporal-0', 'time-boxing-fit-0', 'management-compatibility-0'],
			},
			{
				name: 'Kanban',
				desc: 'Pull-based flow. No sprints, no estimation. Work moves through columns. Limits work in progress.',
				relevant: ['time-boxing-fit-3', 'time-boxing-fit-1'],
			},
			{
				name: 'Hammock-Driven Development',
				desc: "Rich Hickey's model: deliberately load problems into background processing. Incompatible with 'what did you do yesterday' culture.",
				relevant: ['process-fit-temporal-0', 'process-fit-temporal-1'],
			},
			{
				name: "Maker's Schedule",
				desc: "Paul Graham's observation: managers work in 1-hour blocks, makers need half-day minimums. Structure your week around this.",
				relevant: ['process-fit-temporal-0', 'process-fit-temporal-2'],
			},
			{
				name: 'Async-first with written updates',
				desc: 'Replace ceremonies with written async updates. Ship notes, weekly digests, exception-based escalation.',
				relevant: ['management-compatibility-0', 'management-compatibility-1'],
			},
		],
		sources: [
			{
				author: 'Ron Jeffries',
				work: 'Developers Should Abandon Agile',
				year: 2018,
				note: "One of the Agile Manifesto signatories argued that 'Agile' had been co-opted by management and no longer served developers.",
			},
			{
				author: 'Dave Thomas',
				work: 'Agile is Dead (Long Live Agility)',
				year: 2014,
				note: "Another manifesto signatory: the word 'Agile' had become a brand for selling consultancy, not a description of good practice.",
			},
			{
				author: 'Ryan Singer',
				work: 'Shape Up (Basecamp)',
				year: 2019,
				note: 'Proposed fixed-time, variable-scope cycles with no micromanagement during the cycle. A direct counter to sprint-based Scrum.',
			},
			{
				author: 'Allen Holub',
				work: 'Various talks and articles',
				year: 2019,
				note: "Argued that most Scrum implementations are 'Dark Agile' — Waterfall with standups. The ceremonies become the point instead of the work.",
			},
		],
		growthPaths: {
			'process-fit-temporal': [
				{
					quadrant: 0,
					bridge: 'Hammock sprints',
					rationale: "You need incubation time and self-direct. Negotiate with your team to front-load thinking time at the start of each sprint — the 'hammock day' is legitimate sprint work, not slack.",
					steps: [
						"In your next sprint planning, explicitly include a 'discovery day' at the start.",
						"Use this day to load the sprint's problems fully before committing to tasks.",
						"Document what you learn — this becomes the sprint's design record and justifies the time investment.",
					],
				},
				{
					quadrant: 1,
					bridge: 'Dual-mode sprint planning',
					rationale: "You need incubation but face external pressure. Request that sprint planning happen in two sessions: one for problem loading, one (a day later) for commitment. The gap is your incubation window.",
					steps: [
						"Propose splitting planning into two 30-minute sessions with a 24-hour gap.",
						"Use the gap to load the problems into background processing.",
						"Come to the second session with well-formed task breakdowns — demonstrate that the gap pays dividends.",
					],
				},
			],
			'problem-processing': [
				{
					quadrant: 3,
					bridge: 'Pre-planning brief',
					rationale: "You process problems holistically and need incubation time, but Scrum's planning asks for immediate decomposition. Write a brief pre-planning document that gives you the holistic picture before estimation begins.",
					steps: [
						"The day before sprint planning, read through all proposed stories without trying to estimate.",
						"Sketch a holistic view: how do these relate? What's the implicit architecture?",
						"Bring that sketch to planning — you'll estimate from a formed picture, not a cold start.",
					],
				},
			],
		},
		contextModifiers: [
			{
				phase: 'greenfield',
				compassId: 'process-fit-temporal',
				quadrant: 3,
				delta: 0.3,
				note: 'Greenfield + sprint model: low-incubation externally-regulated developers can move quickly with Scrum on a new codebase.',
			},
			{
				phase: 'legacy',
				compassId: 'process-fit-temporal',
				quadrant: 0,
				delta: -0.3,
				note: "Legacy work requires deep investigation before any commitment. Scrum's sprint commitments are harder to honour when the codebase is a minefield.",
			},
			{
				phase: 'research',
				compassId: 'process-fit-temporal',
				quadrant: 0,
				delta: -0.5,
				note: 'Research phases are fundamentally incompatible with sprint commitments — the outcome is unknown by definition.',
			},
			{
				teamSize: 'solo',
				compassId: 'management-compatibility',
				quadrant: 1,
				delta: -0.4,
				note: 'Solo: Scrum ceremonies exist for team coordination. Solo developers gain almost nothing from daily standups and sprint planning rituals.',
			},
			{
				teamSize: 'large',
				compassId: 'management-compatibility',
				quadrant: 3,
				delta: 0.3,
				note: 'Large team: Scrum provides coordination infrastructure that becomes genuinely valuable at scale — standups prevent duplicated work.',
			},
		],
	},
	{
		id: 'user-stories',
		name: 'User Stories',
		brief: '"As a [user], I want [feature], so that [benefit]". Acceptance criteria. Conversation fills gaps.',
		evaluators: {
			'comprehension-clarity': {
				0: {
					fit: 'friction',
					text: "You need both deep understanding AND comprehensive specifications. User stories are deliberately thin — the format's brevity leaves too many gaps for someone who needs both dimensions of clarity.",
				},
				1: {
					fit: 'adapt',
					text: "You'll dig until you find the missing information, compensating for vague requirements. User stories work because you make them work — but the format under-serves your comprehension depth.",
				},
				2: {
					fit: 'adapt',
					text: "You need clear specifications but not deep domain understanding. User stories can work if the acceptance criteria are thorough — but the format's reliance on conversation to fill gaps assumes you'll ask, when you'd rather be told.",
				},
				3: {
					fit: 'natural',
					text: 'Brief direction is enough — you discover the rest through building. User stories give you just enough to start without over-constraining the solution.',
				},
			},
			'ambiguity-response': {
				0: {
					fit: 'friction',
					text: "You need well-defined inputs before you can decompose a problem. User stories' deliberate structural vagueness blocks your analytical process at the start.",
				},
				1: {
					fit: 'natural',
					text: "You find structure in chaos — you'll extract clear requirements from vague stories by imposing analytical order on them.",
				},
				2: {
					fit: 'friction',
					text: 'You need the whole picture to form a gestalt. User stories deliberately fragment requirements into isolated user needs, preventing the holistic view you require.',
				},
				3: {
					fit: 'natural',
					text: 'You work comfortably with partial, fuzzy outlines. User stories give you a rough shape and you fill in the rest intuitively.',
				},
			},
		},
		alternatives: [
			{
				name: 'Jobs to Be Done',
				desc: 'Focus on what the user is trying to accomplish in context, not on feature descriptions. Richer than user stories, more situational.',
				relevant: ['comprehension-clarity-0', 'comprehension-clarity-1'],
			},
			{
				name: 'Event Storming',
				desc: "Alberto Brandolini's method: map domain events collaboratively before writing any requirements. Builds the holistic picture first.",
				relevant: ['ambiguity-response-2', 'comprehension-clarity-0'],
			},
			{
				name: 'Specification by Example',
				desc: "Concrete examples as requirements. Bridges the gap between user stories and executable specs — more substance, less 'conversation fills gaps'.",
				relevant: ['comprehension-clarity-0', 'comprehension-clarity-2'],
			},
			{
				name: 'RFC / ADR-driven requirements',
				desc: 'Write full Request for Comments or Architecture Decision Records. Favours written depth over conversational gap-filling.',
				relevant: ['ambiguity-response-0', 'comprehension-clarity-0'],
			},
			{
				name: 'Domain Storytelling',
				desc: "Collaborative modelling using pictographic language. Shows how people work together in the domain — richer than 'as a user I want'.",
				relevant: ['ambiguity-response-2', 'comprehension-clarity-1'],
			},
		],
		sources: [
			{
				author: 'Dan North',
				work: 'Introducing BDD',
				year: 2006,
				note: "Created BDD partly because user stories and TDD didn't connect well to business language. Stories needed richer structure.",
			},
			{
				author: 'Alberto Brandolini',
				work: 'Introducing EventStorming',
				year: 2013,
				note: 'Proposed mapping domain events before specifying features — requirements emerge from understanding the domain, not from user-centric templates.',
			},
			{
				author: 'Gojko Adzic',
				work: 'Specification by Example',
				year: 2011,
				note: 'Argued that concrete examples are better requirements than templates. Examples are testable, stories are not.',
			},
			{
				author: 'Alan Cooper',
				work: 'About Face / The Inmates Are Running the Asylum',
				year: 1999,
				note: 'Pioneered persona-driven design. Argued that user stories without deep user research are just developer guesses in a template.',
			},
		],
	},
	{
		id: 'yagni',
		name: '"Build simple, abstract later" / YAGNI',
		brief: "Don't build what you don't need yet. Start with the simplest implementation. Extract abstractions only when forced.",
		evaluators: {
			'architecture-philosophy': {
				0: {
					fit: 'friction',
					text: "You plan for future change from day one because you can anticipate it. YAGNI's 'you aren't gonna need it' feels like 'you aren't going to think about it' — and you've been burned by premature simplicity before.",
				},
				1: {
					fit: 'adapt',
					text: 'You agree with simplicity but achieve it through upfront modelling, not through deferred abstraction. Your domain models are simple by design, not simple by default.',
				},
				2: {
					fit: 'adapt',
					text: "You grow flexible systems incrementally — close to YAGNI's spirit, though you're more willing to add abstraction proactively than a strict purist would allow.",
				},
				3: {
					fit: 'natural',
					text: 'You build the simplest thing that works and actively resist premature abstraction. This is YAGNI as intended.',
				},
			},
			'design-methodology': {
				0: {
					fit: 'friction',
					text: "You define structure proactively before implementation. 'Start with the basic thing' contradicts your instinct to get the model right before writing any code.",
				},
				1: {
					fit: 'friction',
					text: 'You invest in upfront domain modelling. Starting simple feels like starting wrong — the model IS the work, and a wrong model costs more to fix than a wrong implementation.',
				},
				2: {
					fit: 'adapt',
					text: "You discover structure through tests, which means you're comfortable starting simple — your tests catch when abstraction becomes necessary.",
				},
				3: {
					fit: 'natural',
					text: 'Build it, see what works, extract patterns. The approach matches your prototype-first instinct.',
				},
			},
			'creative-workflow': {
				0: {
					fit: 'friction',
					text: "This deeper pattern explains why YAGNI creates genuine cognitive friction for you: after incubating a problem, you arrive with a proactive structural vision. YAGNI asks you to ignore that vision and start simple — but the structure you've been developing in the background isn't premature, it's the product of your incubation.",
				},
				1: {
					fit: 'friction',
					text: "This deeper pattern reveals the root of your YAGNI resistance: your creative process involves loading a problem, incubating it, then emerging with structure. YAGNI's directive to defer abstraction conflicts with a process that has already done the abstraction work before any code is written.",
				},
				2: {
					fit: 'natural',
					text: "This deeper pattern confirms why YAGNI suits you: you solve at the keyboard and discover structure as you go. YAGNI's 'build the simplest thing first' maps directly onto your emergent structuring approach — you're not deferring abstraction, you're building exactly what your process naturally produces.",
				},
				3: {
					fit: 'natural',
					text: "This deeper pattern confirms the fit: you act immediately and structure emerges from the work. YAGNI's insistence on minimal upfront abstraction is a natural expression of how you already work — you discover what needs to be abstracted by building, not by planning.",
				},
			},
			'code-quality': {
				0: {
					fit: 'friction',
					text: "You favour flexibility and elegance — your design instinct is to build systems that are both beautiful and adaptable. YAGNI's 'simplest thing first' actively resists both. The deferral of abstraction feels like deferring quality, and the preference for simplicity over flexibility conflicts with your design values.",
				},
				1: {
					fit: 'friction',
					text: "You value extensibility but are pragmatic about polish. YAGNI's simplicity-first rule fits your pragmatism, but the deferral of extensibility conflicts with your instinct to build plugin points early. You'll feel the tension when you need to retrofit extensibility into a deliberately minimal codebase.",
				},
				2: {
					fit: 'adapt',
					text: "You favour simplicity and elegance — the minimalist craftsperson. YAGNI's simplicity directive aligns with your values, but the 'extract only when forced' rule may conflict with your drive for elegant solutions. The right abstraction often feels obvious before the third duplication YAGNI requires.",
				},
				3: {
					fit: 'natural',
					text: "You favour simplicity and pragmatism — ship what works, as little as possible. YAGNI is the methodology that formalises this instinct. The shipper and YAGNI agree: over-engineering is the real enemy.",
				},
			},
		},
		alternatives: [
			{
				name: 'Type-Driven Domain Modelling',
				desc: 'Invest in the model, keep the implementation minimal. Simple code, rich types. The domain model prevents the problems YAGNI defers.',
				relevant: ['architecture-philosophy-1', 'design-methodology-0', 'design-methodology-1'],
			},
			{
				name: 'Evolutionary Architecture',
				desc: 'Plan for change by building fitness functions and monitoring architectural characteristics — structure that adapts rather than structure you predict.',
				relevant: ['architecture-philosophy-0', 'architecture-philosophy-2'],
			},
			{
				name: '"Make the change easy, then make the easy change" (Kent Beck)',
				desc: "Not 'build simple', but 'invest in making future change cheap'. Subtle but important distinction — structure serves future velocity.",
				relevant: ['architecture-philosophy-0', 'architecture-philosophy-1'],
			},
			{
				name: 'Hexagonal Architecture from the start',
				desc: 'Ports and adapters as default structure. The abstraction boundaries exist from day one — you fill in simple implementations now and swap them later.',
				relevant: ['architecture-philosophy-0'],
			},
		],
		sources: [
			{
				author: 'Kent Beck',
				work: 'Various (attributed)',
				year: 2012,
				note: '"Make the change easy (warning: this may be hard), then make the easy change." YAGNI is about the implementation, not the structure.',
			},
			{
				author: 'Rich Hickey',
				work: 'Simple Made Easy (talk)',
				year: 2011,
				note: "Distinguished simple (few concerns) from easy (familiar). A 'simple' start that entangles concerns isn't actually simple — it's just easy.",
			},
			{
				author: 'Sandi Metz',
				work: '99 Bottles of OOP / Various talks',
				year: 2016,
				note: '"Duplication is far cheaper than the wrong abstraction." Supports delaying abstraction, but with the nuance that you need taste to know when.',
			},
			{
				author: 'Martin Fowler',
				work: 'Is Design Dead?',
				year: 2004,
				note: "Explored whether evolutionary design (XP's approach) actually works without upfront architecture. Concluded it requires design skill, not just restraint.",
			},
		],
	},
	{
		id: 'pair-programming',
		name: 'Pair Programming',
		brief: 'Two developers, one workstation. Driver/navigator model. Continuous real-time collaboration and review.',
		evaluators: {
			'team-formation': {
				0: {
					fit: 'adapt',
					text: 'You can pair in shared deep focus — powerful when both people are aligned. But it requires a compatible partner who matches your concentration depth, which is rare.',
				},
				1: {
					fit: 'friction',
					text: 'Pairing interrupts your deep work flow. You prefer to tunnel into problems alone, build something substantial, then sync via PRs and written communication.',
				},
				2: {
					fit: 'natural',
					text: 'You thrive in real-time collaboration with continuous shared context. Pairing energises rather than drains you.',
				},
				3: {
					fit: 'adapt',
					text: "You're efficient and independent. Pairing works occasionally but isn't your preferred mode — you'd rather pick up tasks, complete them, and move on.",
				},
			},
			'process-fit-attentional': {
				0: {
					fit: 'friction',
					text: 'You self-structure deep concentration blocks. Another person introduces a second rhythm into your focus architecture — their context switches become your interruptions.',
				},
				1: {
					fit: 'friction',
					text: 'You need uninterrupted time within whatever structure is imposed. Pairing is a continuous interruption by design — the navigator role assumes you can context-switch freely.',
				},
				2: {
					fit: 'natural',
					text: 'You stay available while self-structuring. Pairing fits comfortably into your responsive workflow without disrupting it.',
				},
				3: {
					fit: 'natural',
					text: 'You thrive in externally-structured, collaborative environments. Pairing is a natural extension of how you already prefer to work.',
				},
			},
			'problem-engagement': {
				0: {
					fit: 'adapt',
					text: "This deeper pattern explains a nuance: you engage with problems analytically and reflectively — studying before acting. Pairing with a compatible scholar-type can be extraordinarily productive, but it requires a partner who respects your deliberate pace. With the wrong partner, pairing degrades into performance rather than thought.",
				},
				1: {
					fit: 'adapt',
					text: "This deeper pattern shows a mixed signal: you're analytical and experimental — you design probes and study results. Pairing can accelerate this process if your partner engages at the same level of rigour, but you need space to complete your experimental thought before speaking. The navigator role can feel like a commentary track over your analysis.",
				},
				2: {
					fit: 'adapt',
					text: "This deeper pattern reveals a particular pairing dynamic: you process holistically and reflectively, absorbing the whole picture before acting. Pairing works when the other person can hold space for your synthesis phase, but pairs who prefer forward momentum will interpret your reflection as stalling.",
				},
				3: {
					fit: 'natural',
					text: "This deeper pattern confirms the fit: you engage with problems by jumping in and grasping through doing. Pairing is a natural extension of this — your partner's presence becomes part of the doing. The improviser's mode is fundamentally collaborative, and pairing gives your instinct-first approach a useful second perspective.",
				},
			},
		},
		alternatives: [
			{
				name: 'Mob / Ensemble Programming',
				desc: 'Whole team, one screen. Rotates driver role. Removes the intensity of 1-on-1 pairing — more breathing room, broader perspectives.',
				relevant: ['team-formation-0'],
			},
			{
				name: 'Design session → solo implementation',
				desc: 'Collaborate synchronously on the approach, then implement independently. Gets alignment without sustained pairing.',
				relevant: ['team-formation-1', 'process-fit-attentional-0'],
			},
			{
				name: 'Async code review with rich context',
				desc: 'Detailed PR descriptions, annotated diffs, recorded walkthroughs. The review benefits of pairing without the real-time coupling.',
				relevant: ['team-formation-1', 'team-formation-3'],
			},
			{
				name: 'Rubber-ducking (human or AI)',
				desc: 'Explain your thinking out loud to surface assumptions. Gets the cognitive benefit of pairing without the scheduling and attention cost.',
				relevant: ['process-fit-attentional-0', 'process-fit-attentional-1'],
			},
		],
		sources: [
			{
				author: 'Woody Zuill',
				work: 'Mob Programming (various talks)',
				year: 2014,
				note: 'Proposed whole-team collaboration as an alternative to pairing. The group dynamic reduces the intensity of 1-on-1 pairing.',
			},
			{
				author: 'Dragan Stepanovic',
				work: 'Async Code Review (various articles)',
				year: 2020,
				note: "Explored how rich async review can achieve pairing's knowledge-sharing benefits without requiring synchronous time.",
			},
			{
				author: 'Martin Fowler',
				work: 'On Pair Programming',
				year: 2020,
				note: "Acknowledged pairing isn't for everyone and works best when participation is voluntary, not mandated.",
			},
		],
		growthPaths: {
			'team-formation': [
				{
					quadrant: 1,
					bridge: 'Design session → solo implementation',
					rationale: "You prefer solo deep work but value shared understanding. A brief collaborative design session gives you alignment before you tunnel — you get pairing's knowledge benefits without sustained real-time coupling.",
					steps: [
						"Before starting a significant feature, schedule a 30-minute design session with a colleague.",
						"Sketch the approach together — whiteboard, shared doc, whatever works.",
						"Implement solo. Reconvene for a brief async review when you have something to show.",
					],
				},
			],
			'process-fit-attentional': [
				{
					quadrant: 0,
					bridge: 'Structured pairing with explicit breaks',
					rationale: "You need deep, uninterrupted focus blocks. Try pairing with explicit 25-minute Pomodoros: work together in the focused block, take individual breaks, reconvene. The structure protects your concentration architecture.",
					steps: [
						"Agree a Pomodoro structure with your pair before starting.",
						"Use the break time to independently process what you just built — this is your mini-incubation.",
						"Start each block by briefly syncing on what the next 25 minutes will produce.",
					],
				},
				{
					quadrant: 1,
					bridge: 'Async pair review',
					rationale: "You need uninterrupted time. Record a short video of your implementation as you work (using Loom or similar), narrating your decisions. Your pair reviews asynchronously and responds in kind — the pairing's knowledge-sharing benefit without the synchronous interruption.",
					steps: [
						"Install Loom or similar screen recording tool.",
						"Record yourself implementing a non-trivial feature, narrating your decisions.",
						"Share with your pair and request a recorded response — this creates an async dialogue.",
					],
				},
			],
		},
	},
	{
		id: 'sprint-estimation',
		name: 'Sprint Estimation / Story Points',
		brief: 'Estimate work in story points before starting. Track velocity. Use estimates for sprint planning and forecasting.',
		evaluators: {
			'time-boxing-fit': {
				0: {
					fit: 'adapt',
					text: "You value temporal pressure but want to set it yourself. Being asked to estimate for someone else's planning process feels like accountability theatre when you'd hold yourself accountable anyway.",
				},
				1: {
					fit: 'friction',
					text: "You self-direct without time pressure. Estimation is a forecasting tool for people who need to know when things will be done — and your answer is 'when it's ready'.",
				},
				2: {
					fit: 'natural',
					text: "You need structure and time pressure. Estimation gives you a framework for committing to delivery timelines, which you work well within.",
				},
				3: {
					fit: 'adapt',
					text: "You need task structure but not time pressure. Estimation adds temporal anxiety that Kanban-style 'pull when ready' avoids.",
				},
			},
			'ambiguity-response': {
				0: {
					fit: 'friction',
					text: "You can't estimate what you can't define. Estimation assumes decomposable work, but your analytical process needs well-specified inputs before decomposition can begin.",
				},
				1: {
					fit: 'adapt',
					text: "You're good at finding hidden structure in vague problems, which makes estimation more tractable for you than most. But the precision implied by story points overstates your actual confidence.",
				},
				2: {
					fit: 'friction',
					text: 'You need the whole picture before you can size any part of it. Estimating individual stories before the gestalt has formed produces meaningless numbers.',
				},
				3: {
					fit: 'natural',
					text: "You grasp rough shapes from incomplete information. 'About this big' is a natural mode of thought for you — story points just formalise it.",
				},
			},
		},
		alternatives: [
			{
				name: '#NoEstimates',
				desc: "Track cycle time instead of predicting duration. Use historical throughput for forecasting. Allen Holub and Woody Zuill's approach.",
				relevant: ['time-boxing-fit-1', 'ambiguity-response-0'],
			},
			{
				name: 'Shape Up: appetite-setting',
				desc: "Instead of 'how long will this take?', ask 'how much time are we willing to spend?' Fixed time, variable scope.",
				relevant: ['time-boxing-fit-0', 'time-boxing-fit-1'],
			},
			{
				name: 'Monte Carlo forecasting',
				desc: "Use historical data to generate probabilistic forecasts. 'There's an 85% chance we'll finish by X.' No per-item estimation needed.",
				relevant: ['ambiguity-response-0', 'ambiguity-response-2'],
			},
			{
				name: 'Thin-slice sizing',
				desc: "Instead of estimating complexity, just make everything small. If a story can't be done in 1-2 days, split it. No points required.",
				relevant: [],
			},
		],
		sources: [
			{
				author: 'Allen Holub',
				work: '#NoEstimates (various talks)',
				year: 2015,
				note: 'Argued that estimation is waste — it consumes time, produces unreliable numbers, and creates false confidence in plans.',
			},
			{
				author: 'Woody Zuill',
				work: '#NoEstimates (various)',
				year: 2015,
				note: 'Practised and advocated for dropping estimation entirely in favour of limiting WIP and tracking actual throughput.',
			},
			{
				author: 'Daniel Vacanti',
				work: 'Actionable Agile Metrics for Predictability',
				year: 2015,
				note: 'Demonstrated that cycle time and throughput data produce better forecasts than story point estimates.',
			},
			{
				author: 'Ryan Singer',
				work: 'Shape Up',
				year: 2019,
				note: "Replaced estimation with 'appetite' — teams don't estimate how long work takes, leadership decides how much time the work deserves.",
			},
		],
	},
	{
		id: 'daily-standups',
		name: 'Daily Standups',
		brief: 'Brief daily team sync. Share what you did, what you\'re doing, what\'s blocking you. Keep the team aligned.',
		evaluators: {
			'management-compatibility': {
				0: {
					fit: 'adapt',
					text: 'You already share progress proactively. Standups are redundant ceremony — you communicate this information without being prompted.',
				},
				1: {
					fit: 'friction',
					text: 'You self-direct and make context available when asked. Being required to broadcast daily disrupts your focus without adding information you wouldn\'t provide on request.',
				},
				2: {
					fit: 'natural',
					text: 'You follow reporting structures well. Standups give you a reliable framework for the regular communication you want to do anyway.',
				},
				3: {
					fit: 'natural',
					text: 'You benefit from regular check-ins. Standups provide structured accountability that helps maintain your momentum and visibility.',
				},
			},
			'communication-pattern': {
				0: {
					fit: 'adapt',
					text: 'You collaborate synchronously and share constantly. Standups are natural for you but may feel too brief — you\'d rather have richer collaborative sessions.',
				},
				1: {
					fit: 'adapt',
					text: "You collaborate with peers in real time but don't instinctively report upward. Standups force stakeholder-facing communication that doesn't match your natural pattern.",
				},
				2: {
					fit: 'friction',
					text: 'You share proactively but asynchronously. A written async standup format captures the same information without forcing you into a synchronous ceremony.',
				},
				3: {
					fit: 'friction',
					text: "You work quietly and surface context on request. Standups force daily visibility you don't naturally provide — which may be useful discipline, but the format fights your instincts.",
				},
			},
		},
		alternatives: [
			{
				name: 'Async standups (written / Slack bot)',
				desc: 'Same information, written asynchronously. Respects deep work schedules and timezone differences.',
				relevant: ['communication-pattern-2', 'management-compatibility-0', 'management-compatibility-1'],
			},
			{
				name: 'Exception-based reporting',
				desc: 'Only surface blockers and changes. If nothing is blocked and you\'re on track, silence is the update.',
				relevant: ['management-compatibility-0', 'management-compatibility-1'],
			},
			{
				name: 'Weekly team sync + written dailies',
				desc: 'Rich weekly discussion, lightweight written updates between. Balances synchronous alignment with async focus time.',
				relevant: ['communication-pattern-2', 'communication-pattern-3'],
			},
			{
				name: 'Working agreements',
				desc: "Replace ceremonies with explicit team contracts about communication expectations. 'I'll post progress in #channel by end of day' rather than 'attend standup at 9am'.",
				relevant: ['management-compatibility-0'],
			},
		],
		sources: [
			{
				author: 'Jason Fried & DHH',
				work: "It Doesn't Have to Be Crazy at Work",
				year: 2018,
				note: "Argued against synchronous status meetings. Written communication respects everyone's time and creates a searchable record.",
			},
			{
				author: 'Cal Newport',
				work: 'Deep Work / A World Without Email',
				year: 2016,
				note: "Documented how scheduled interruptions (including standups) fragment deep work. Every synchronous obligation fractures the maker's day.",
			},
			{
				author: 'Allen Holub',
				work: 'Various talks on Agile dysfunction',
				year: 2020,
				note: 'Argued standups had become status reports to management disguised as team coordination. The original intent was peer-to-peer, not bottom-up.',
			},
		],
	},
	{
		id: 'kanban',
		name: 'Kanban',
		brief: 'Pull-based flow. No sprints. Work moves through columns. Limit work in progress. Optimise throughput.',
		evaluators: {
			'time-boxing-fit': {
				0: {
					fit: 'natural',
					text: 'You self-regulate and want temporal freedom without surrendering structure. Kanban gives you a pull system you control — work moves when you\'re ready, not when a sprint boundary says so.',
				},
				1: {
					fit: 'natural',
					text: 'You self-direct without time pressure and follow the work where it leads. Kanban\'s pull model is the methodology most aligned with how you already operate — no imposed cadence, no estimation theatre.',
				},
				2: {
					fit: 'adapt',
					text: 'You need both external structure and time pressure, which Scrum\'s sprint model provides. Kanban gives you the structure (columns, WIP limits) but removes the deadline pressure that keeps you moving.',
				},
				3: {
					fit: 'natural',
					text: 'You need task structure but not time pressure. Kanban is your natural fit — a clear queue of work to pull from, no sprint anxiety, no velocity targets.',
				},
			},
			'process-fit-temporal': {
				0: {
					fit: 'natural',
					text: 'You need background processing time on your own schedule. Kanban\'s lack of fixed cadence means your incubation cycles are architectural features, not process violations — you pull the next card when you\'re genuinely ready.',
				},
				1: {
					fit: 'adapt',
					text: "You need incubation but face external regulation pressure. Kanban removes sprint boundaries, but if your team still has standups and velocity expectations, the cultural context matters as much as the methodology. Kanban's theory fits you; its implementations vary.",
				},
				2: {
					fit: 'adapt',
					text: 'You solve at the keyboard and self-direct. Kanban suits your tempo, though the lack of sprint structure means accountability relies on WIP limits and throughput metrics rather than time pressure — which works if you trust the data.',
				},
				3: {
					fit: 'adapt',
					text: "You fit sprint models naturally. Kanban works, but without the sprint boundary there's less of the external rhythm you're productive within. WIP limits are a weaker substitute for the deadline pressure that sharpens your focus.",
				},
			},
			'management-compatibility': {
				0: {
					fit: 'natural',
					text: 'You proactively document and communicate. Kanban\'s continuous flow and visualised board make your progress inherently visible without requiring you to broadcast at a standup.',
				},
				1: {
					fit: 'natural',
					text: 'You self-direct and surface context on request. A Kanban board provides the pull-based visibility your manager needs without demanding you push daily status.',
				},
				2: {
					fit: 'adapt',
					text: 'You follow reporting structures well. Kanban works if your organisation has tooling for throughput visibility, but it can feel like you\'re invisible without the ceremonies that normally communicate progress.',
				},
				3: {
					fit: 'adapt',
					text: 'You benefit from structured check-ins. Kanban can accommodate these, but the methodology itself doesn\'t prescribe them — you\'d need to layer them on deliberately.',
				},
			},
			'delivery-philosophy': {
				0: {
					fit: 'adapt',
					text: 'You want every piece complete and designed for change. Kanban\'s continuous delivery model supports thoroughness — there\'s no sprint pressure to cut corners — but it lacks the built-in review gates that ensure completeness.',
				},
				1: {
					fit: 'natural',
					text: 'You ship complete, minimal work. Kanban\'s pull model keeps your queue visible and lets you define \'done\' precisely — no sprint pressure to pad or compress.',
				},
				2: {
					fit: 'adapt',
					text: 'You ship fast with extensibility. Kanban supports fast delivery but the continuous flow can make it harder to step back and assess architectural health across a body of work.',
				},
				3: {
					fit: 'natural',
					text: 'You ship the simplest thing fast. Kanban\'s pull-based flow optimises for throughput over planning — exactly the model that suits your momentum-first approach.',
				},
			},
			'problem-processing': {
				0: {
					fit: 'natural',
					text: "This deeper pattern confirms why Kanban fits: you decompose problems analytically and work through them in real time. Kanban's continuous flow respects your real-time processing — you pull the next item when you've finished thinking, not when a sprint boundary says it's time to estimate.",
				},
				1: {
					fit: 'natural',
					text: "This deeper pattern explains why Kanban fits well: you need to incubate problems analytically before committing to structure. Kanban's pull system means you don't commit to a sprint's worth of decomposition before you've fully understood what you're decomposing.",
				},
				2: {
					fit: 'adapt',
					text: "This deeper pattern shows a mixed signal: you process holistically and act immediately. Kanban's continuous flow suits your immediacy, but the absence of sprint planning means there's less opportunity to see the whole board before pulling the next card — which matters for your holistic style.",
				},
				3: {
					fit: 'adapt',
					text: "This deeper pattern reveals a potential gap: you process holistically and need incubation time. Kanban removes sprint boundaries, which helps — but if your team still has WIP pressure and throughput targets, the holistic incubation you need can still be squeezed. The methodology is right; watch the culture.",
				},
			},
		},
		alternatives: [
			{
				name: 'Scrumban',
				desc: "Hybrid: Kanban's pull system with optional sprint boundaries for planning. Useful when a team wants to transition from Scrum without losing all structure.",
				relevant: ['time-boxing-fit-2', 'time-boxing-fit-3'],
			},
			{
				name: '#NoEstimates with cycle time tracking',
				desc: 'Pure Kanban without even implicit estimation. Track cycle times, use throughput for forecasting. Daniel Vacanti\'s approach.',
				relevant: ['time-boxing-fit-1', 'process-fit-temporal-0'],
			},
			{
				name: 'Personal Kanban',
				desc: 'Apply WIP limits and visualisation to individual work, not team workflows. David Anderson\'s principle applied at the personal scale.',
				relevant: ['management-compatibility-1', 'time-boxing-fit-1'],
			},
		],
		sources: [
			{
				author: 'David Anderson',
				work: 'Kanban: Successful Evolutionary Change for Your Technology Business',
				year: 2010,
				note: "Formalised Kanban for software development. Key insight: limit WIP to expose bottlenecks and let the system self-optimise. Don't change the roles or processes upfront — visualise and improve.",
			},
			{
				author: 'Daniel Vacanti',
				work: 'Actionable Agile Metrics for Predictability',
				year: 2015,
				note: 'Demonstrated that cycle time and throughput data produce better forecasts than story points. Kanban\'s empirical data replaces estimation theatre.',
			},
			{
				author: 'Taiichi Ohno',
				work: 'Toyota Production System',
				year: 1978,
				note: "Kanban's intellectual ancestor. Pull systems in manufacturing: produce what's needed when it's needed, not to a forecast. Software Kanban is a direct translation of this logic.",
			},
		],
	},
	{
		id: 'trunk-based-development',
		name: 'Trunk-Based Development',
		brief: 'Commit to main continuously. Short-lived branches (hours, not days). Feature flags gate incomplete work. No long-lived feature branches.',
		evaluators: {
			'team-formation': {
				0: {
					fit: 'adapt',
					text: "You prefer deep synchronous collaboration. TBD's frequent small commits can actually support deep pairing — you integrate together constantly rather than diverging for days. The challenge is the discipline: short-lived branches require continuous coordination.",
				},
				1: {
					fit: 'friction',
					text: "You tunnel solo into problems before syncing via PRs. TBD removes the long-lived branch that gives you solo runway. Frequent trunk commits feel like being pulled out of deep work to perform integration — you'd rather finish the thought first.",
				},
				2: {
					fit: 'natural',
					text: 'You thrive in real-time collaboration with continuous shared context. TBD is the natural technical expression of your collaborative style — everyone integrating continuously keeps the shared understanding fresh.',
				},
				3: {
					fit: 'natural',
					text: "You're efficient and independent. Small, frequent commits to trunk suit your task-switching style — finish a coherent unit of work, integrate, move on.",
				},
			},
			'architecture-philosophy': {
				0: {
					fit: 'friction',
					text: "You plan for future change from day one. TBD's incremental, flag-gated approach means your long-horizon architectural thinking gets fragmented into small commits. You want to see the whole design before committing any of it to main.",
				},
				1: {
					fit: 'adapt',
					text: 'You favour clean domain models with minimal implementation. TBD can work if your model is clear before you start committing — small commits can express a coherent model incrementally. The risk is committing before the model is settled.',
				},
				2: {
					fit: 'natural',
					text: 'You build flexible systems iteratively through refactoring. TBD is architecturally congruent — you refactor continuously into main rather than building up a branch and merging a large architectural change.',
				},
				3: {
					fit: 'natural',
					text: 'You build the simplest thing and abstract later. TBD enforces exactly this discipline — each commit is a small, complete, deployable increment. No room for premature abstraction on a long-lived branch.',
				},
			},
			'delivery-philosophy': {
				0: {
					fit: 'friction',
					text: "You want every piece complete and designed for change before merging. TBD's continuous integration model is deliberately incompatible with 'complete it on a branch first' — partial work hides behind feature flags rather than staying unmerged.",
				},
				1: {
					fit: 'adapt',
					text: 'You ship complete, minimal work. TBD works if you define \'complete\' at the granularity of a small commit rather than a feature. The discipline is keeping commits coherent rather than large.',
				},
				2: {
					fit: 'natural',
					text: 'You ship fast with extensibility hooks. TBD maximises velocity and continuous integration. Feature flags become the extensibility mechanism — you ship the hook, flag it off, complete the implementation.',
				},
				3: {
					fit: 'natural',
					text: "You ship the simplest thing fast. TBD is the delivery mechanism designed for your philosophy — each commit is the simplest coherent unit, integrated immediately.",
				},
			},
			'communication-pattern': {
				0: {
					fit: 'natural',
					text: 'You collaborate closely and share constantly. TBD makes integration acts of communication — frequent trunk commits keep the shared codebase as a living conversation rather than a series of asynchronous PR events.',
				},
				1: {
					fit: 'adapt',
					text: 'You collaborate with peers but keep stakeholder communication pull-based. TBD is compatible, but the lack of PRs removes a natural communication checkpoint. You\'d need to compensate with explicit integration notes or commit messages.',
				},
				2: {
					fit: 'adapt',
					text: "You work independently but document proactively. TBD's continuous integration model assumes shared real-time awareness. If you're async-first, frequent trunk commits need rich commit messages and async tooling to substitute for the shared context that pairing or open-plan work provides naturally.",
				},
				3: {
					fit: 'friction',
					text: "You work heads-down and respond when asked. TBD requires continuous coordination — you can't tunnel for days and then integrate. The frequent integration rhythm is a communication rhythm, and it's incompatible with extended solo immersion.",
				},
			},
		},
		alternatives: [
			{
				name: 'Ship / Show / Ask',
				desc: 'Three-tier branching: commit directly (trivial), open a PR but merge immediately (FYI), or wait for review (blocking). Reduces PR overhead without abandoning branches entirely.',
				relevant: ['team-formation-1', 'communication-pattern-2'],
			},
			{
				name: 'Short-lived branches (sub-24-hour)',
				desc: "The pragmatic middle ground: branches that last hours, not days. You get solo runway without the integration debt of long-lived feature branches. Dave Farley's recommended approach.",
				relevant: ['team-formation-1', 'architecture-philosophy-0'],
			},
			{
				name: 'Feature toggles as architectural pattern',
				desc: 'Use feature flags not just for TBD but as a permanent architectural tool. Deploy continuously, control rollout separately from release.',
				relevant: ['delivery-philosophy-0', 'delivery-philosophy-1'],
			},
		],
		sources: [
			{
				author: 'Jez Humble & Dave Farley',
				work: 'Continuous Delivery',
				year: 2010,
				note: "Articulated trunk-based development as the foundation for continuous delivery. Long-lived branches are the primary cause of integration pain — eliminating them eliminates the pain.",
			},
			{
				author: 'Dave Farley',
				work: 'Modern Software Engineering',
				year: 2021,
				note: "Argued that TBD combined with comprehensive automated testing is the highest-leverage engineering practice available. The discipline of continuous integration forces better design.",
			},
			{
				author: 'Paul Hammant',
				work: 'trunkbaseddevelopment.com',
				year: 2017,
				note: 'Documented TBD practices comprehensively, including the scaling patterns (branch by abstraction, feature flags) that make it viable for large teams.',
			},
		],
	},
	{
		id: 'shape-up',
		name: 'Shape Up',
		brief: "Basecamp's method: 6-week cycles. Work is shaped upfront, then handed to teams with full autonomy. Fixed time, variable scope. No standups, no estimation.",
		evaluators: {
			'time-boxing-fit': {
				0: {
					fit: 'natural',
					text: "You value temporal pressure but want to control it yourself. Shape Up's 6-week appetite gives you exactly this — the time boundary is set, but what you build within it is yours to determine. No daily visibility, no estimation scrutiny.",
				},
				1: {
					fit: 'natural',
					text: "You self-direct without time pressure and follow the work where it leads. Shape Up's fixed-time, variable-scope model respects your autonomy — the appetite says how much time this problem deserves, not how many story points it takes.",
				},
				2: {
					fit: 'adapt',
					text: "You need both structure and time pressure. Shape Up provides the time boundary but removes the granular sprint planning structure you rely on for weekly direction. The 6-week horizon may be too coarse without intermediate checkpoints.",
				},
				3: {
					fit: 'adapt',
					text: "You need task structure but not time pressure. Shape Up gives you more autonomy than Scrum but requires you to self-organise the scope within the cycle — without Kanban's continuous pull signal, you need to create your own internal structure.",
				},
			},
			'process-fit-temporal': {
				0: {
					fit: 'natural',
					text: "You need background processing time on your own schedule. Shape Up's 6-week cycle with full team autonomy is designed for exactly this — no daily standups, no sprint check-ins. Your incubation cycles are your own.",
				},
				1: {
					fit: 'natural',
					text: "You need incubation but face external regulation pressure. Shape Up is the most explicit counter to this pattern: the shaping phase happens before the cycle so the team can work without interruption. Once the cycle starts, the team is protected.",
				},
				2: {
					fit: 'adapt',
					text: "You solve at the keyboard and self-direct. Shape Up suits your tempo, but the shaping phase (which happens outside the cycle) requires a different cognitive mode — strategic, high-ambiguity work that may feel different from your execution strength.",
				},
				3: {
					fit: 'adapt',
					text: "You fit sprint models naturally. Shape Up's longer cycles and variable scope may feel too loose — you work well within the tighter accountability of sprint boundaries.",
				},
			},
			'ambiguity-response': {
				0: {
					fit: 'friction',
					text: "You need well-defined inputs before you can decompose a problem. Shape Up deliberately ships pitches with intentional gaps — the shaping provides direction, not specification. The implementation decisions left to the team include exactly the kind of structural definition you need before starting.",
				},
				1: {
					fit: 'natural',
					text: "You find structure in chaos — you decompose vague problems systematically. Shape Up gives you a pitch with intentional latitude and trusts you to impose analytical order. This is the sweet spot the method is designed for.",
				},
				2: {
					fit: 'friction',
					text: "You need the whole picture before you can start. Shape Up pitches provide rough direction, not comprehensive specifications. The holistic gestalt you need to form before acting takes longer than Shape Up assumes — you'd want to do your own shaping work before accepting the cycle.",
				},
				3: {
					fit: 'natural',
					text: "You work comfortably with partial, fuzzy outlines. Shape Up pitches are deliberately rough — they describe the problem and some viable approaches, then trust you to fill in the rest. Your tolerance for incomplete shapes is exactly what the method relies on.",
				},
			},
			'architecture-philosophy': {
				0: {
					fit: 'friction',
					text: "You plan for future change from day one. Shape Up's fixed-time, variable-scope model means architectural decisions get made during the cycle under time pressure — not in a deliberate upfront design phase. Your instinct to plan for change conflicts with committing to a 6-week scope.",
				},
				1: {
					fit: 'adapt',
					text: 'You favour clean domain models with minimal implementation. Shape Up is compatible if you use the shaping phase to establish the domain model — the cycle then implements it simply. The challenge is that shaping is often done by non-implementers, so your model may not survive contact with the pitch.',
				},
				2: {
					fit: 'natural',
					text: 'You build flexible systems iteratively through refactoring. Shape Up cycles are long enough to do this properly — 6 weeks lets you refactor into better abstractions mid-cycle rather than forcing a minimal implementation.',
				},
				3: {
					fit: 'natural',
					text: "You build the simplest thing and abstract later. Shape Up's variable-scope model actively supports this — you can deliver the simplest thing that satisfies the pitch within the time box and stop.",
				},
			},
			'management-compatibility': {
				0: {
					fit: 'natural',
					text: "You proactively document and communicate. Shape Up's written pitch process is structurally aligned with how you work — decisions are written down before the cycle, and the team documents what they build. The methodology favours written async communication throughout.",
				},
				1: {
					fit: 'natural',
					text: "You self-direct and make yourself available on request. Shape Up's team autonomy during cycles explicitly protects you from management interruption — the 6-week cycle is the team's time, not management's time.",
				},
				2: {
					fit: 'adapt',
					text: "You follow reporting structures well. Shape Up's minimal ceremony during cycles means fewer formal checkpoints — you'd need to substitute your own check-ins or risk feeling unmoored from management expectations.",
				},
				3: {
					fit: 'adapt',
					text: "You benefit from regular check-ins. Shape Up deliberately removes mid-cycle management touch points. The method assumes team autonomy is motivating — if check-ins give you useful direction, you may miss them.",
				},
			},
			'team-formation': {
				0: {
					fit: 'natural',
					text: "Shape Up's 6-week cycle with full team autonomy is structurally built for deep synchronous collaboration. The cycle is a shared problem — the team digs in together, holds the whole shape, and surfaces decisions in real time. Deep paired focus within a cycle is Shape Up's implicit working mode.",
				},
				1: {
					fit: 'natural',
					text: "Shape Up suits async deep workers very well. The cycle gives you an extended solo runway with a clear problem boundary. The betting table communicates direction; within the cycle, you work at depth without daily interruption. Syncing via the scope map and written updates replaces standups.",
				},
				2: {
					fit: 'adapt',
					text: "You thrive in real-time collaboration. Shape Up gives you 6 weeks of focused shared work, which suits synchronous working — but the lack of prescribed pairing or mob sessions means you'd need to self-organise the collaboration style within the cycle.",
				},
				3: {
					fit: 'adapt',
					text: "You pick up and complete tasks efficiently. Shape Up's 6-week scope requires sustained engagement with a single problem, which is a different cognitive mode from your efficient task-switching style. The cycle length and variable scope may feel too open-ended without Kanban's clear pull signal.",
				},
			},
			'delivery-philosophy': {
				0: {
					fit: 'natural',
					text: "Shape Up's fixed-time, variable-scope model was designed for thorough, quality-conscious developers. You get 6 weeks to do the job properly — no sprint pressure to cut corners. The 'circuit breaker' (cancelling a cycle rather than extending it) actually protects quality: if you can't do it properly in time, it goes back to shaping.",
				},
				1: {
					fit: 'natural',
					text: "You ship complete, minimal work. Shape Up's variable scope lets you define 'done' as the smallest coherent thing that satisfies the pitch — you don't ship more than needed, but what ships is complete. The methodology actively supports thoroughness-within-constraints.",
				},
				2: {
					fit: 'adapt',
					text: "You ship fast with extensibility. Shape Up's 6-week cycle gives you time for extensibility work, but the fixed-time constraint means you can't always see the extensibility through. The variable scope is your escape valve — scope down, not quality down.",
				},
				3: {
					fit: 'adapt',
					text: "You favour momentum and simplicity. Shape Up's 6-week cycles are longer than your preferred increment — you'd ship more frequently if given the choice. Kanban may give you tighter feedback loops while preserving the autonomy Shape Up provides.",
				},
			},
		},
		alternatives: [
			{
				name: 'Dual-track Agile',
				desc: 'Separate discovery and delivery tracks running in parallel. One team shapes the next cycle while another delivers the current one. Bridges Shape Up and Scrum thinking.',
				relevant: ['ambiguity-response-0', 'ambiguity-response-2'],
			},
			{
				name: 'RFC-driven development',
				desc: 'Write a full Request for Comments before starting a cycle. More structure than a Shape Up pitch, less overhead than formal specs. Works for teams who need the whole picture.',
				relevant: ['ambiguity-response-0', 'architecture-philosophy-0'],
			},
			{
				name: 'Kanban with quarterly themes',
				desc: "Shape Up's strategic direction without fixed cycle lengths. Pull work continuously but orient it around a quarterly theme rather than a 6-week pitch.",
				relevant: ['time-boxing-fit-1', 'time-boxing-fit-3'],
			},
		],
		sources: [
			{
				author: 'Ryan Singer',
				work: 'Shape Up (Basecamp)',
				year: 2019,
				note: "Documented Basecamp's methodology explicitly to provide an alternative to Scrum. Key innovations: appetite (not estimation), shaping (not backlog grooming), and the 'circuit breaker' that cancels cycles rather than extending them.",
			},
			{
				author: 'Jason Fried & DHH',
				work: 'It Doesn\'t Have to Be Crazy at Work',
				year: 2018,
				note: "The cultural context behind Shape Up. Basecamp's argument that calm, async, autonomous work produces better outcomes than Agile's velocity-obsessed culture.",
			},
		],
	},
	{
		id: 'documentation-driven-development',
		name: 'Documentation-Driven Development',
		brief: 'Write the documentation before the implementation. The README, API docs, or spec describes the intended interface — then you build what would make that documentation true.',
		evaluators: {
			'comprehension-clarity': {
				0: {
					fit: 'natural',
					text: "You need deep understanding AND clear specifications. DDD gives you both: writing the documentation forces you to develop deep understanding, and the documentation becomes the specification. You're not just writing — you're clarifying your own thinking.",
				},
				1: {
					fit: 'natural',
					text: "You'll dig until you find clarity. DDD externalises that digging — rather than hunting through existing docs or asking questions, you write the document that should exist. Your drive to find clarity becomes productive output.",
				},
				2: {
					fit: 'adapt',
					text: 'You need clear tasks but not deep domain understanding. DDD works if you have enough understanding to write reasonable documentation — but if the domain is genuinely new, writing the docs may surface ambiguities faster than they can be resolved.',
				},
				3: {
					fit: 'friction',
					text: "You discover through building — documentation written before implementation will be wrong, and you know it. Writing docs before you've built anything feels like speculation rather than documentation. You'd rather README-after-first-prototype.",
				},
			},
			'design-methodology': {
				0: {
					fit: 'natural',
					text: "You define structure proactively AND verify early. Writing documentation first is a natural extension of your proactive structuring instinct — the README is your domain model in prose form, and writing it before implementation is your early verification.",
				},
				1: {
					fit: 'natural',
					text: "You invest in upfront domain modelling and verify the finished work. DDD maps directly: the documentation IS the domain model, and you implement to match it. Writing the spec before the code is exactly how your design process already works.",
				},
				2: {
					fit: 'friction',
					text: "You let design emerge through tests — tests are your documentation. DDD inverts this: you write prose documentation before tests, then implement. Your natural flow is tests first, not docs first. The friction is real, though they share the test-before-build principle.",
				},
				3: {
					fit: 'friction',
					text: "You build first and extract patterns after. DDD requires you to describe what you'll build before you've built it — which is exactly the upfront commitment you work to avoid. You'd write the README after the prototype tells you what the README should say.",
				},
			},
			'creative-workflow': {
				0: {
					fit: 'natural',
					text: "This deeper pattern explains why DDD fits: after incubating a problem, you arrive with a proactive structural vision. Writing documentation before code externalises that vision — the document captures what your incubation produced. It's not speculation; it's transcription.",
				},
				1: {
					fit: 'adapt',
					text: "This deeper pattern reveals a partial fit: you need incubation time before structure emerges. DDD works well once the structure has emerged, but writing documentation before incubation completes produces docs that will need significant revision. Use DDD after the hammock, not before it.",
				},
				2: {
					fit: 'adapt',
					text: "This deeper pattern shows where DDD works for you: you solve at the keyboard and structure emerges proactively. Writing docs first imposes structure before you've started solving — which can work if the structure is clear, but can create false constraints if it isn't.",
				},
				3: {
					fit: 'friction',
					text: "This deeper pattern explains the friction: you act immediately and structure emerges through the work. DDD asks you to commit to a structural vision in prose before you've started the work that generates the structure. You'd need to prototype first, then document, then rebuild — which isn't DDD.",
				},
			},
			'communication-pattern': {
				0: {
					fit: 'adapt',
					text: "You collaborate and share constantly. DDD produces written artefacts that support async communication, but your instinct is to talk through the approach rather than write it first. DDD may feel like slowing down to produce documentation when you'd rather just discuss.",
				},
				1: {
					fit: 'adapt',
					text: "You collaborate synchronously but keep stakeholder communication pull-based. DDD's written artefacts provide good pull-based communication — the docs are there when people want them. But the writing process itself may feel isolating if you'd prefer to shape through conversation.",
				},
				2: {
					fit: 'natural',
					text: "You work independently and proactively document. DDD is a natural fit — you already produce written artefacts proactively, and DDD formalises this into a design discipline. Your async-first communication style makes you exactly the person DDD is designed for.",
				},
				3: {
					fit: 'friction',
					text: "You work heads-down and surface context on request. DDD requires proactive upfront documentation before implementation even begins. If writing is not your natural mode of thought, DDD adds a communication overhead that doesn't match how you prefer to work.",
				},
			},
			'delivery-philosophy': {
				0: {
					fit: 'natural',
					text: "DDD is built for thorough, quality-first delivery. Writing the documentation before implementation means thoroughness is front-loaded — you define what complete looks like before you build it. For developers who favour extensibility, the documentation naturally captures the extension points before the code does.",
				},
				1: {
					fit: 'natural',
					text: "You ship complete, minimal work. DDD's documentation-first discipline produces a clear spec of the minimal complete thing — the README defines exactly what's needed, nothing more. Implementation is bounded by the document.",
				},
				2: {
					fit: 'adapt',
					text: "You ship fast with extensibility. DDD's upfront documentation step can feel like a speed bump to a momentum-driven developer. The discipline pays off over multiple cycles, but the first delivery takes longer than your instincts prefer.",
				},
				3: {
					fit: 'friction',
					text: "You ship the simplest thing fast. DDD requires you to stop and write before you build — which is exactly the kind of upfront overhead your momentum-first approach is designed to avoid. The documentation step will feel like a delay to something you'd rather discover by doing.",
				},
			},
			'architecture-philosophy': {
				0: {
					fit: 'natural',
					text: "You plan for future change from day one. DDD aligns: the documentation defines the intended architecture and extension points before implementation begins. You're not guessing at future requirements — you're encoding your architectural foresight in a form that survives the implementation.",
				},
				1: {
					fit: 'natural',
					text: "You favour clean domain models with minimal implementation. DDD is a direct expression of this philosophy — the documentation IS the domain model. Writing the README first forces model clarity before implementation details obscure it.",
				},
				2: {
					fit: 'adapt',
					text: "You build flexible systems iteratively. DDD can work if you treat each iteration's documentation as a lightweight design step rather than a heavyweight spec. The tension is that emergent refactoring produces architecture that wasn't anticipated by the original document.",
				},
				3: {
					fit: 'friction',
					text: "You build the simplest thing and abstract later. DDD asks you to commit to a documented interface before you know what the simplest thing is. Your abstractions emerge from building — documentation-first pre-empts the discovery process that produces your best work.",
				},
			},
		},
		alternatives: [
			{
				name: 'API-First Design',
				desc: 'Define the API contract (OpenAPI, GraphQL schema) before implementation. Narrower than full DDD — just the interface, not the full documentation.',
				relevant: ['design-methodology-0', 'design-methodology-1', 'comprehension-clarity-0'],
			},
			{
				name: 'RFC / ADR-driven development',
				desc: 'Write a Request for Comments or Architecture Decision Record before starting. Captures the reasoning, not just the interface — useful when the why matters as much as the what.',
				relevant: ['comprehension-clarity-0', 'communication-pattern-2'],
			},
			{
				name: 'Readme-driven development (Tom Preston-Werner)',
				desc: "The original articulation: write the README first, then implement what would make it true. Narrower scope than full DDD — just the user-facing documentation.",
				relevant: ['comprehension-clarity-1', 'design-methodology-0'],
			},
			{
				name: 'Type-Driven Development',
				desc: 'Let types be the documentation. A precise type signature is a machine-checkable specification — stronger than prose documentation, equally upfront.',
				relevant: ['design-methodology-0', 'design-methodology-2'],
			},
		],
		sources: [
			{
				author: 'Tom Preston-Werner',
				work: 'Readme Driven Development',
				year: 2010,
				note: "Argued that writing the README first clarifies thinking and produces better software. 'Consider the user you're writing for. Consider the use cases you want to support. Then implement what would make that README true.'",
			},
			{
				author: 'Dan North',
				work: 'Introducing BDD',
				year: 2006,
				note: "BDD can be seen as DDD with a specific format — the Given/When/Then spec is the documentation. North's insight was that behaviour descriptions are more useful than test names, and more useful than prose docs.",
			},
			{
				author: 'Eric Evans',
				work: 'Domain-Driven Design',
				year: 2003,
				note: "The ubiquitous language concept is DDD's implicit documentation model — the code, the docs, and the conversations should all use the same terms. Writing documentation first forces the ubiquitous language to exist before the code.",
			},
		],
	},
	{
		id: 'pr-code-review',
		name: 'PR-Based Code Review',
		brief: 'Work on branches. Submit pull requests. Asynchronous review with written feedback. Merge requires approval.',
		evaluators: {
			'team-formation': {
				0: {
					fit: 'adapt',
					text: "You prefer deep synchronous collaboration. PR review's asynchronous nature can feel disconnected — you'd rather walk through code together, but PRs still work when pairing isn't available.",
				},
				1: {
					fit: 'natural',
					text: 'PRs are your natural workflow. Deep solo work, then async written review. The tunnel-and-sync pattern is exactly how you prefer to collaborate.',
				},
				2: {
					fit: 'adapt',
					text: "You prefer real-time feedback. PRs work but feel slower than you'd like — you'd rather pair through the tricky bits and use PRs for the straightforward changes.",
				},
				3: {
					fit: 'natural',
					text: 'You\'re efficient with async workflows. Submit, review, merge — the lightweight written exchange suits your task-switching style.',
				},
			},
			'communication-pattern': {
				0: {
					fit: 'adapt',
					text: "You share and discuss in real time. PRs as async artefacts feel too slow — you want to talk about the code, not write about it.",
				},
				1: {
					fit: 'adapt',
					text: 'You collaborate with peers synchronously but don\'t instinctively broadcast. PRs work for the peer review, though the formal approval process can feel bureaucratic.',
				},
				2: {
					fit: 'natural',
					text: 'You work independently and share written artefacts proactively. PRs with rich descriptions and annotations are perfectly aligned with how you communicate.',
				},
				3: {
					fit: 'natural',
					text: 'You work heads-down and respond when asked. Reviewing PRs on your own schedule matches your pull-based communication style.',
				},
			},
			'code-quality': {
				0: {
					fit: 'natural',
					text: "You want elegant, well-crafted code. PR review is a quality gate that enforces standards consistently — written feedback creates a shared record of why decisions were made. The async format lets you give thoughtful feedback rather than reactive comments.",
				},
				1: {
					fit: 'natural',
					text: "You balance quality with pragmatism. PR review enforces the quality bar without requiring you to be involved in every decision. You write clear review comments and move on — it fits your efficient, peer-collaborative style.",
				},
				2: {
					fit: 'adapt',
					text: "You prefer shipping over polishing. Detailed review cycles can feel like impediments when the code works. Prefer lightweight reviews with clear merge criteria — 'does it do the thing and not break anything' rather than style discussions.",
				},
				3: {
					fit: 'adapt',
					text: "You favour pragmatic code that ships. Thorough PR review can extend your cycle time in ways that feel disproportionate. Focus review effort on interface design and correctness; skip style debates unless they're automated.",
				},
			},
		},
		alternatives: [
			{
				name: 'Ship / Show / Ask',
				desc: 'Three tiers: ship directly (trivial), show after merging (FYI), or ask before merging (need review). Not everything needs a full PR cycle.',
				relevant: ['communication-pattern-0', 'team-formation-2'],
			},
			{
				name: 'Continuous review via pairing/mobbing',
				desc: 'If you pair or mob, the code is reviewed as it\'s written. No separate review step needed.',
				relevant: ['team-formation-0', 'team-formation-2'],
			},
			{
				name: 'Stacked PRs / short-lived branches',
				desc: 'Small, incremental PRs that build on each other. Reduces review burden and keeps branches short-lived.',
				relevant: [],
			},
			{
				name: 'Trunk-based development with feature flags',
				desc: 'Commit to main continuously, gate features behind flags. Eliminates long-lived branches and merge conflicts.',
				relevant: ['team-formation-2', 'communication-pattern-0'],
			},
		],
		sources: [
			{
				author: 'Rouan Wilsenach',
				work: 'Ship / Show / Ask',
				year: 2021,
				note: 'Proposed a branching strategy where not every change needs the same level of review. Trust developers to classify their own changes.',
			},
			{
				author: 'Google Engineering Practices',
				work: 'Code Review Guidelines',
				year: 2019,
				note: 'Recommended reviewing within a business day and keeping changes small. Acknowledged that review processes can become bottlenecks.',
			},
			{
				author: 'Dave Farley & Jez Humble',
				work: 'Continuous Delivery',
				year: 2010,
				note: 'Advocated trunk-based development where code is integrated continuously, reducing the need for branch-based review.',
			},
		],
	},
];
