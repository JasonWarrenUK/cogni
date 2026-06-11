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
			'communication-pattern': {
				0: {
					fit: 'adapt',
					text: "You collaborate closely and share constantly. User stories rely on conversation to fill in what the template leaves out — which suits your style, but you may find the format itself too thin and prefer richer written specs instead.", // @draft
				},
				1: {
					fit: 'adapt',
					text: "You work closely with peers but don't instinctively broadcast. User stories assume you'll chase down the missing context through conversation — which works for peer discussions but feels awkward when the gaps need stakeholder input.", // @draft
				},
				2: {
					fit: 'friction',
					text: "You work independently and prefer written artefacts. User stories are designed to be supplemented by conversation, not documentation — their deliberate thinness runs against your async-first, written-clarity instincts.", // @draft
				},
				3: {
					fit: 'adapt',
					text: "You work heads-down and surface context on request. User stories' conversational gap-filling model requires you to initiate those conversations — which you may not do naturally. Ensure there's a pull mechanism (e.g. a pre-sprint refinement session) so the gaps get filled before you start.", // @draft
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
		growthPaths: {
			'comprehension-clarity': [
				{
					quadrant: 0,
					bridge: 'Specification by Example',
					rationale: "You need both depth and precision — user stories' conversational gaps are a genuine problem for you. Specification by Example bridges this: concrete examples are richer than 'as a user I want', and they're testable.", // @draft
					steps: [
						"For your next story, write 3 concrete examples of the desired behaviour before writing the template.", // @draft
						"Check each example: does it resolve a gap the story template would have left open?", // @draft
						"Share the examples with whoever wrote the story — they'll quickly confirm or correct, which is the conversation user stories assume you'd have anyway.", // @draft
					],
				},
			],
			'ambiguity-response': [
				{
					quadrant: 0,
					bridge: 'RFC-driven refinement',
					rationale: "You can't decompose what you haven't defined. Write a short RFC before estimating any story: state the inputs, the outputs, and the unknowns. This transforms a user story into something your analytical process can work with.", // @draft
					steps: [
						"Before accepting a story into a sprint, write a 1-page RFC: what data comes in, what goes out, what questions remain.", // @draft
						"Use the unknowns list as your acceptance criteria checklist — every unknown must be resolved before you start.", // @draft
						"Share the RFC with the team; it becomes the real story, and the As-a-User template becomes the one-line summary.", // @draft
					],
				},
				{
					quadrant: 2,
					bridge: 'Event Storming lite',
					rationale: "You need the whole picture before you can work with the parts. A rapid Event Storming session (even just 30 minutes with sticky notes) builds the domain map user stories assume you already have.", // @draft
					steps: [
						"Before sprint planning, run a 30-minute domain event mapping session with the product owner.", // @draft
						"Map what happens *before* and *after* each story — the context that the As-a-User template strips out.", // @draft
						"Use the event map as your personal reference during implementation — it supplies the holistic picture the stories don't.", // @draft
					],
				},
			],
		},
		contextModifiers: [
			{
				phase: 'greenfield',
				compassId: 'ambiguity-response',
				quadrant: 3,
				delta: 0.3,
				note: 'Greenfield: user stories work well when the domain is genuinely new and the team is discovering requirements through building.', // @draft
			},
			{
				phase: 'legacy',
				compassId: 'comprehension-clarity',
				quadrant: 0,
				delta: -0.3,
				note: 'Legacy: user stories on existing systems leave dangerous gaps — existing behaviour is assumed, not specified. Deep-comprehension developers need more context than the template provides.', // @draft
			},
			{
				teamSize: 'solo',
				compassId: 'communication-pattern',
				quadrant: 2,
				delta: -0.2,
				note: "Solo: user stories' conversational gap-filling model has no one to converse with. Their value depends entirely on the quality of the acceptance criteria.", // @draft
			},
			{
				teamSize: 'large',
				compassId: 'ambiguity-response',
				quadrant: 1,
				delta: 0.2,
				note: 'Large team: user stories become a shared vocabulary that keeps diverse contributors aligned without requiring full-spec documents.', // @draft
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
		growthPaths: {
			'architecture-philosophy': [
				{
					quadrant: 0,
					bridge: 'Hexagonal Architecture skeleton',
					rationale: "You plan for future change from day one — YAGNI feels like leaving the scaffolding out. Try this: build the hexagonal skeleton (ports and adapters) upfront as a permanent structure, then YAGNI the implementations. You get the abstraction boundaries without over-engineering the logic.", // @draft
					steps: [
						"Identify the external dependencies in your next feature (database, API, UI).", // @draft
						"Define ports (interfaces) for each — this is the one abstraction you allow yourself upfront.", // @draft
						"Implement the simplest adapter for each port. The business logic stays YAGNI; the structure is explicit from the start.", // @draft
					],
				},
			],
			'design-methodology': [
				{
					quadrant: 0,
					bridge: 'Type-Driven YAGNI',
					rationale: "You define structure proactively — YAGNI asks you to hold back. The synthesis: invest in the type model upfront (this is your model-first instinct), but YAGNI the implementation. Rich types replace premature abstraction without abandoning upfront clarity.", // @draft
					steps: [
						"Design your domain types fully before writing any implementation code.", // @draft
						"Once the types are settled, write the simplest implementation that satisfies them.", // @draft
						"When you feel the urge to add an abstraction layer, ask: does the type model require it? If not, defer.", // @draft
					],
				},
				{
					quadrant: 1,
					bridge: 'Domain model first, YAGNI thereafter',
					rationale: "You invest in upfront domain modelling. Make that the one permitted upfront investment: write the domain model fully, then YAGNI everything downstream of it. The model is not premature abstraction — it's the specification that makes YAGNI safe.", // @draft
					steps: [
						"Write your domain model as a pure set of types and interfaces before any implementation.", // @draft
						"Implement only what the current feature requires — no infrastructure hooks, no generalisation.", // @draft
						"When a second feature forces a generalisation, extract it then. Your domain model will show you what to extract.", // @draft
					],
				},
			],
			'creative-workflow': [
				{
					quadrant: 0,
					bridge: 'Post-incubation commit',
					rationale: "After incubating a problem you arrive with a structural vision that YAGNI would have you ignore. Instead: write that vision down as a design note, then implement the YAGNI-minimal version. The design note is your intention record — you can build toward it later without building it now.", // @draft
					steps: [
						"After your incubation phase, write a 10-line design note capturing the structure you arrived at.", // @draft
						"Implement only what the current story requires, referencing the design note as a north star.", // @draft
						"Revisit the design note when the second or third related story arrives — that's when YAGNI allows you to build toward it.", // @draft
					],
				},
				{
					quadrant: 1,
					bridge: 'Spike then simplify',
					rationale: "You need incubation and prefer emergent structure — which actually aligns with YAGNI. The friction is that your incubation produces structural visions you want to act on immediately. Run a spike to externalise the vision, then implement the simplest version. The spike counts as your incubation output.", // @draft
					steps: [
						"Allow yourself an unconstrained spike to explore the structural space.", // @draft
						"From the spike, identify the single simplest thing that satisfies the current requirement.", // @draft
						"Throw away the spike. Implement the simplified version. Trust that the spike has pre-loaded the next abstraction if it's needed.", // @draft
					],
				},
			],
		},
		contextModifiers: [
			{
				phase: 'greenfield',
				compassId: 'architecture-philosophy',
				quadrant: 3,
				delta: 0.4,
				note: 'Greenfield: YAGNI is strongest early — no legacy constraints mean the simplest thing genuinely is the best starting point.', // @draft
			},
			{
				phase: 'legacy',
				compassId: 'architecture-philosophy',
				quadrant: 0,
				delta: 0.3,
				note: 'Legacy: even proactive architects benefit from YAGNI discipline when touching a legacy system — adding abstraction to an existing codebase requires understanding it first.', // @draft
			},
			{
				phase: 'research',
				compassId: 'design-methodology',
				quadrant: 2,
				delta: 0.3,
				note: "Research: YAGNI's 'simplest thing first' is exactly right for exploratory spikes — don't build infrastructure for code you'll likely throw away.", // @draft
			},
			{
				teamSize: 'large',
				compassId: 'architecture-philosophy',
				quadrant: 0,
				delta: -0.3,
				note: 'Large team: YAGNI is harder to apply across many contributors — without upfront structure, different developers build different abstractions for the same problem.', // @draft
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
			'communication-pattern': {
				0: {
					fit: 'adapt',
					text: "You collaborate closely and share constantly. Estimation sessions are a natural opportunity for shared sense-making — but the point-assignment ritual may feel like it reduces a rich conversation to a number.", // @draft
				},
				1: {
					fit: 'adapt',
					text: "You collaborate with peers synchronously but don't instinctively broadcast. Estimation works for you in small groups but the formality of planning poker can feel like ceremony compared to a quick whiteboard conversation.", // @draft
				},
				2: {
					fit: 'friction',
					text: "You work independently and document proactively. Estimation sessions are synchronous ceremonies — and their output (a number) is rarely the written artefact you'd use to communicate progress. You'd rather track actual cycle time and share it in writing.", // @draft
				},
				3: {
					fit: 'friction',
					text: "You work heads-down and surface context on request. Estimation sessions require you to publicly commit to numbers in real time before you've fully understood the work — which runs against both your communication style and your processing mode.", // @draft
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
		growthPaths: {
			'time-boxing-fit': [
				{
					quadrant: 1,
					bridge: 'Appetite-setting',
					rationale: "You self-direct and don't want external time pressure — estimation is a forecasting tool for people who need to know when things will be done. Shape Up's appetite model gives you a deadline without requiring you to predict it: leadership decides how much time the work deserves; you deliver what's possible in that window.", // @draft
					steps: [
						"Propose replacing 'how long will this take?' with 'how much time should this get?' in your next planning session.", // @draft
						"Set an appetite (2 days, 1 week, 3 weeks) and work to fit the most valuable scope within it.", // @draft
						"Report progress as 'scope completed within appetite' rather than 'velocity achieved'. Same information, different frame.", // @draft
					],
				},
			],
			'ambiguity-response': [
				{
					quadrant: 0,
					bridge: 'Pre-estimation RFC',
					rationale: "You can't estimate what you haven't defined. Write a one-page RFC before each planning session: inputs, outputs, edge cases. This transforms ambiguous stories into estimable units — your analytical process needs this structure before it can size anything.", // @draft
					steps: [
						"The day before planning, read each candidate story and write 3-5 questions that must be answered before you can estimate it.", // @draft
						"Share the questions with the product owner and resolve them before the planning session.", // @draft
						"Estimate only stories that have answered your questions. For the rest, record a 'needs definition' spike instead of a point count.", // @draft
					],
				},
				{
					quadrant: 2,
					bridge: 'Holistic pre-read',
					rationale: "You need the whole picture before you can size the parts. Read the entire sprint candidate list 24 hours before planning and form a gestalt view of what the sprint is actually trying to accomplish. Then estimate from that whole picture rather than story by story.", // @draft
					steps: [
						"Get the sprint candidate list the day before planning and read it in one sitting.", // @draft
						"Write a one-paragraph summary of what this sprint is trying to do — the underlying goal behind the stories.", // @draft
						"Estimate relative to each other ('this is twice the size of that') rather than against an absolute scale.", // @draft
					],
				},
			],
		},
		contextModifiers: [
			{
				phase: 'research',
				compassId: 'ambiguity-response',
				quadrant: 0,
				delta: -0.4,
				note: 'Research: estimating exploratory work is fundamentally dishonest — the outcome is unknown by definition. Use timeboxes (spikes) rather than point estimates.', // @draft
			},
			{
				phase: 'legacy',
				compassId: 'ambiguity-response',
				quadrant: 0,
				delta: -0.3,
				note: 'Legacy: estimation is harder on legacy systems — hidden complexity and surprise dependencies routinely invalidate point estimates.', // @draft
			},
			{
				teamSize: 'solo',
				compassId: 'time-boxing-fit',
				quadrant: 1,
				delta: -0.4,
				note: 'Solo: estimation is a coordination tool. Solo developers have no one to coordinate with — the process produces overhead with no benefit.', // @draft
			},
			{
				teamSize: 'large',
				compassId: 'ambiguity-response',
				quadrant: 3,
				delta: 0.3,
				note: 'Large team: rough shared estimates prevent wildly different individual assumptions about scope — the conversation matters more than the number.', // @draft
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
		growthPaths: {
			'management-compatibility': [
				{
					quadrant: 1,
					bridge: 'Async standup format',
					rationale: "You self-direct and surface context on request — standups force you into a broadcast mode that doesn't match how you work. The async standup (written, asynchronous, pull-based) delivers the same coordination value without the synchronous interruption.", // @draft
					steps: [
						"Propose replacing the daily standup with a written async update (Slack, Linear, Notion — wherever the team already gathers).", // @draft
						"Post your update at a consistent time that fits your own schedule, not at 9:30am because a calendar event says so.", // @draft
						"Structure it as: yesterday's output, today's intention, any blockers. Three lines. Scannable at will.", // @draft
					],
				},
			],
			'communication-pattern': [
				{
					quadrant: 2,
					bridge: 'Written async standup',
					rationale: "You work independently and proactively document — you're already producing the information standups try to surface, just not in a synchronous format. Channel that into a written daily update and the standup becomes redundant.", // @draft
					steps: [
						"For two weeks, post a written update at the time you'd have joined the standup.", // @draft
						"After two weeks, propose to the team: 'I've been doing async updates — can we see if the standup is still needed?' Let the data speak.", // @draft
						"If the team still wants a standup, use your written updates as your talking points. You're already prepared.", // @draft
					],
				},
				{
					quadrant: 3,
					bridge: 'Exception-based reporting',
					rationale: "You work heads-down and surface context on request. Rather than forced daily broadcasting, negotiate exception-based reporting: you communicate when something changes, blocks, or ships. Silence is the update when you're on track.", // @draft
					steps: [
						"Define with your team what 'exception' means: blockers, delays, scope changes, completed work.", // @draft
						"Post when one of those things happens. Miss the standup when nothing has.", // @draft
						"After a sprint, show the team your exception log — it'll contain everything the standup would have surfaced, just without the ceremony.", // @draft
					],
				},
			],
		},
		contextModifiers: [
			{
				teamSize: 'solo',
				compassId: 'management-compatibility',
				quadrant: 1,
				delta: -0.5,
				note: 'Solo: standups are a team coordination tool with zero solo value. Drop them entirely.', // @draft
			},
			{
				teamSize: 'large',
				compassId: 'management-compatibility',
				quadrant: 3,
				delta: 0.3,
				note: 'Large team: standups become genuinely useful at scale as a collision-detection mechanism — preventing duplicated work across many contributors.', // @draft
			},
			{
				phase: 'research',
				compassId: 'communication-pattern',
				quadrant: 2,
				delta: -0.3,
				note: "Research: standups are poorly suited to exploration phases — 'what did you do yesterday?' is a reasonable question for delivery work, not for thinking.", // @draft
			},
			{
				phase: 'legacy',
				compassId: 'management-compatibility',
				quadrant: 2,
				delta: 0.2,
				note: 'Legacy: standups help coordinate surprise complexity on legacy systems — blockers surface daily rather than silently derailing the sprint.', // @draft
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
		growthPaths: {
			'time-boxing-fit': [
				{
					quadrant: 2,
					bridge: 'WIP limits as deadline pressure',
					rationale: "You need external structure and time pressure — Kanban removes both. The substitute is a strict WIP limit of 1: you're not allowed to pull a new card until the current one is done. This creates the same urgency as a sprint deadline, just at the task level instead of the week level.", // @draft
					steps: [
						"Set your personal WIP limit to 1. No in-progress items alongside blocked items — blocked means blocked.", // @draft
						"When you feel the urge to start something new while something is blocked, write a blocker note instead and actually resolve it.", // @draft
						"Track your cycle time per card for two weeks. The data will show you whether the WIP limit is creating the throughput pressure you need.", // @draft
					],
				},
			],
			'management-compatibility': [
				{
					quadrant: 3,
					bridge: 'Throughput-based visibility',
					rationale: "You benefit from structured check-ins — Kanban's pull model can feel invisible without ceremonies. Replace the standup with a weekly throughput review: count cards completed, cycle time trends, and upcoming work. This gives you the structured accountability of a check-in without the sprint ceremony.", // @draft
					steps: [
						"Every Friday, count cards completed this week and their average cycle time.", // @draft
						"Post the numbers to your team channel with a two-sentence summary of what you worked on.", // @draft
						"Over 4 weeks, the data will reveal your natural throughput — which becomes your 'capacity' for planning conversations.", // @draft
					],
				},
			],
		},
		contextModifiers: [
			{
				phase: 'greenfield',
				compassId: 'time-boxing-fit',
				quadrant: 1,
				delta: 0.3,
				note: 'Greenfield: Kanban is well-suited to greenfield work where scope is undefined and pull-based discovery is more honest than sprint commitments.', // @draft
			},
			{
				phase: 'maintenance',
				compassId: 'time-boxing-fit',
				quadrant: 0,
				delta: 0.2,
				note: 'Maintenance: Kanban fits maintenance work well — interrupt-driven, variable scope, no predictable sprint shape.', // @draft
			},
			{
				teamSize: 'solo',
				compassId: 'time-boxing-fit',
				quadrant: 1,
				delta: 0.3,
				note: 'Solo: Kanban is the ideal solo workflow — personal WIP limits, self-directed pull, no coordination overhead.', // @draft
			},
			{
				teamSize: 'large',
				compassId: 'time-boxing-fit',
				quadrant: 2,
				delta: -0.2,
				note: 'Large team: Kanban at scale requires mature tooling and discipline — without sprint ceremonies, shared visibility depends on everyone maintaining their board honestly.', // @draft
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
		growthPaths: {
			'team-formation': [
				{
					quadrant: 1,
					bridge: 'Ship / Show / Ask',
					rationale: "You need solo runway before syncing. TBD's continuous integration expectation removes that runway. The Ship/Show/Ask pattern is the pragmatic middle ground: commit direct when trivial, open an instant-merge PR when you want visibility, ask for review when you need input. You keep the branch discipline without losing solo depth.", // @draft
					steps: [
						"Classify your next 10 commits as Ship (trivial), Show (FYI), or Ask (review needed).", // @draft
						"For Ship and Show commits, integrate within the hour — don't let branches accumulate overnight.", // @draft
						"Notice which commits you instinctively want to protect with a long-lived branch — those are the ones to address with feature flags instead.", // @draft
					],
				},
			],
			'architecture-philosophy': [
				{
					quadrant: 0,
					bridge: 'Branch by abstraction',
					rationale: "You want to see the whole design before committing any of it. TBD's answer is branch by abstraction: create the abstraction layer in one commit, then migrate behind it incrementally. You get the upfront architectural skeleton without a long-lived branch.", // @draft
					steps: [
						"Identify the next large architectural change you're planning — the one you'd normally put on a feature branch.", // @draft
						"Create the abstraction layer (interface, adapter, seam) in a single trunk commit with both old and new code behind it.", // @draft
						"Migrate call sites behind the abstraction incrementally. Delete the old path when all sites are migrated. The architecture landed upfront; the migration was incremental.", // @draft
					],
				},
			],
			'delivery-philosophy': [
				{
					quadrant: 0,
					bridge: 'Feature flags as completeness gates',
					rationale: "You want every piece complete before it ships — TBD's partial-work-in-trunk model is the opposite. Feature flags resolve this: you can merge complete, well-tested code to trunk while keeping it invisible to users. The flag is your completeness gate; trunk just carries the work.", // @draft
					steps: [
						"Add a simple feature flag system (env var, config key, or a flag service).", // @draft
						"Any incomplete feature goes behind a flag — code lands in trunk, flag stays off.", // @draft
						"The feature ships when *you* decide it's complete and flip the flag. Trunk gets the continuous integration discipline; you keep your completeness standard.", // @draft
					],
				},
			],
		},
		contextModifiers: [
			{
				teamSize: 'solo',
				compassId: 'team-formation',
				quadrant: 1,
				delta: 0.3,
				note: 'Solo: TBD is well-suited to solo work — no merge conflicts, no coordination overhead, just a single always-current branch.', // @draft
			},
			{
				teamSize: 'large',
				compassId: 'communication-pattern',
				quadrant: 0,
				delta: 0.3,
				note: 'Large team: TBD scales well for teams with strong testing culture and pairing — continuous integration prevents the merge hell that long-lived branches produce at scale.', // @draft
			},
			{
				phase: 'research',
				compassId: 'delivery-philosophy',
				quadrant: 0,
				delta: -0.3,
				note: 'Research: TBD is awkward for exploratory work where the outcome is uncertain — you may need to throw away a trunk commit, which is disruptive. Use short-lived spike branches instead.', // @draft
			},
			{
				phase: 'legacy',
				compassId: 'architecture-philosophy',
				quadrant: 0,
				delta: -0.3,
				note: 'Legacy: TBD on legacy code without testable seams is high-risk — frequent trunk commits with no test coverage means breakage lands in main immediately.', // @draft
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
		growthPaths: {
			'ambiguity-response': [
				{
					quadrant: 0,
					bridge: 'RFC before the cycle',
					rationale: "Shape Up pitches are deliberately rough — they provide direction, not specification. That ambiguity blocks your analytical process. Write a short RFC at the start of each cycle to resolve the structural gaps the pitch left open. This is your shaping-for-yourself step, not a process violation.", // @draft
					steps: [
						"When a cycle starts, spend the first half-day writing a one-page RFC: what exactly will be built, what's out of scope, what decisions were made.", // @draft
						"Share the RFC with whoever shaped the pitch — this conversation often surfaces important constraints the pitch assumed but didn't state.", // @draft
						"Use the RFC as your implementation guide for the cycle. Update it when decisions change.", // @draft
					],
				},
				{
					quadrant: 2,
					bridge: 'Pre-cycle domain mapping',
					rationale: "You need the whole picture before you can start. A Shape Up pitch describes a problem and a rough approach — not the complete territory. Spend the first day of a cycle mapping the domain: what touches what, what already exists, what's genuinely new.", // @draft
					steps: [
						"On day 1 of the cycle, draw the system map: existing code, new code, and the seams between them.", // @draft
						"Identify the holistic picture the pitch assumed — the background context that shapes what 'done' means.", // @draft
						"Only start building once the full picture has formed. This is not procrastination; it's the prerequisite for your best work.", // @draft
					],
				},
			],
			'architecture-philosophy': [
				{
					quadrant: 0,
					bridge: 'Architectural pre-commitment',
					rationale: "You plan for future change from day one — Shape Up's fixed-time model means architectural decisions get made under deadline pressure. Front-load the architectural thinking: on day 1, write your architectural decisions as ADRs and get alignment. Spend the rest of the cycle executing a plan you're confident in.", // @draft
					steps: [
						"Write 2-3 Architecture Decision Records at the start of the cycle for the decisions that will be hardest to change later.", // @draft
						"Share them with your team and get explicit agreement. This replaces the implicit architectural assumptions that usually live only in your head.", // @draft
						"Implement the cycle within the architectural frame you've established. Scope down if necessary — the architecture is the non-negotiable part.", // @draft
					],
				},
			],
		},
		contextModifiers: [
			{
				phase: 'greenfield',
				compassId: 'process-fit-temporal',
				quadrant: 0,
				delta: 0.3,
				note: 'Greenfield: Shape Up is strongest on greenfield work where the team has genuine autonomy and no legacy constraints to navigate.', // @draft
			},
			{
				phase: 'legacy',
				compassId: 'ambiguity-response',
				quadrant: 0,
				delta: -0.3,
				note: 'Legacy: Shape Up pitches assume the team can execute autonomously; on legacy code, hidden complexity often invalidates the pitch\'s scope assumptions mid-cycle.', // @draft
			},
			{
				teamSize: 'solo',
				compassId: 'management-compatibility',
				quadrant: 0,
				delta: 0.3,
				note: 'Solo: Shape Up\'s autonomous cycle model is excellent for solo developers — you set your own appetite, shape your own pitches, and report on completion rather than velocity.', // @draft
			},
			{
				teamSize: 'small',
				compassId: 'team-formation',
				quadrant: 1,
				delta: 0.3,
				note: 'Small team (2-5): Shape Up\'s cycle model was designed for this team size — small enough to share context informally, large enough to divide the cycle\'s work.', // @draft
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
		growthPaths: {
			'comprehension-clarity': [
				{
					quadrant: 3,
					bridge: 'README after first prototype',
					rationale: "You discover through building — writing documentation before you've built anything feels like speculation. Use a two-phase DDD: build a throwaway prototype first (your discovery mode), then write the documentation, then rebuild properly. The doc describes what you've learned, not what you're guessing.", // @draft
					steps: [
						"Build an unconstrained prototype to understand the problem space. Give yourself a fixed timebox (2-4 hours).", // @draft
						"Throw away the prototype code. Write the README/docs that describe what you *would* build now that you understand the domain.", // @draft
						"Build the real thing against the documentation you just wrote. You've done DDD; you just did it in the right order for your style.", // @draft
					],
				},
			],
			'design-methodology': [
				{
					quadrant: 2,
					bridge: 'Test-as-documentation',
					rationale: "You let design emerge through tests — DDD asks you to write prose documentation first, which inverts your natural flow. The synthesis: treat your test suite as your documentation. Write failing tests that describe the intended interface before implementing. Tests are executable documentation; this is DDD in a language you already speak.", // @draft
					steps: [
						"Before writing any implementation, write test cases that describe the API from the consumer's perspective.", // @draft
						"Run the tests (they'll fail). The failing test output IS your living documentation.", // @draft
						"Implement against the tests. When they pass, the documentation is verified.", // @draft
					],
				},
				{
					quadrant: 3,
					bridge: 'README-after-spike',
					rationale: "You build first and extract patterns after — documentation before implementation is the wrong order for you. Write the README immediately after a working prototype, before you refactor. This locks in what you've learned before refactoring obscures it.", // @draft
					steps: [
						"After your prototype works, stop coding and write the README first.", // @draft
						"The README describes: what it does, how to use it, why the key decisions were made.", // @draft
						"Use the README to guide refactoring — if the code doesn't match what the README says, fix the code.", // @draft
					],
				},
			],
			'creative-workflow': [
				{
					quadrant: 3,
					bridge: 'Post-incubation doc',
					rationale: "You act immediately and structure emerges through the work — DDD's pre-implementation document is premature. Instead, write the doc during your incubation phase as a way to externalise what's forming. The doc is your thinking tool, not your specification.", // @draft
					steps: [
						"When a problem is queued in your head, open a blank document and write what you know so far: the shape of the problem, the rough approach.", // @draft
						"Don't treat it as a specification — treat it as a thinking dump. Incomplete sentences are fine.", // @draft
						"When you start building, the doc evolves into a real specification. By the time you're halfway through, it's accurate. Publish it then.", // @draft
					],
				},
			],
		},
		contextModifiers: [
			{
				phase: 'greenfield',
				compassId: 'design-methodology',
				quadrant: 0,
				delta: 0.3,
				note: 'Greenfield: DDD is strongest when starting fresh — writing the README first shapes a new API before implementation choices constrain it.', // @draft
			},
			{
				phase: 'legacy',
				compassId: 'comprehension-clarity',
				quadrant: 3,
				delta: -0.3,
				note: 'Legacy: writing documentation before understanding a legacy system produces fiction. Read the code first; document what you found; then document what you intend to build.', // @draft
			},
			{
				teamSize: 'solo',
				compassId: 'communication-pattern',
				quadrant: 2,
				delta: 0.3,
				note: 'Solo: DDD is excellent for solo async workers — the documentation serves as both a thinking tool and a communication artefact that can be reviewed asynchronously.', // @draft
			},
			{
				phase: 'research',
				compassId: 'design-methodology',
				quadrant: 3,
				delta: 0.2,
				note: 'Research: in exploratory phases, writing a document before you start is actually useful — it forces you to articulate what you\'re trying to discover before you start discovering it.', // @draft
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
		contextModifiers: [
			{
				phase: 'greenfield',
				compassId: 'team-formation',
				quadrant: 0,
				delta: 0.2,
				note: 'Greenfield: even strong collaborators benefit from early async PRs on a new codebase — the written record becomes architectural documentation that survives the project.', // @draft
			},
			{
				phase: 'legacy',
				compassId: 'code-quality',
				quadrant: 2,
				delta: -0.2,
				note: 'Legacy: in a legacy codebase, fast-shipping pragmatists find PR review especially frustrating — every change touches fragile code that requires defensive explanation. Consider smaller PRs with explicit "this is a safe refactor" labels.', // @draft
			},
			{
				teamSize: 'solo',
				compassId: 'communication-pattern',
				quadrant: 0,
				delta: 0.3,
				note: 'Solo: without team members, PR review has no audience. This context modifier reduces the fit signal for real-time communicators working alone — Ship/Show/Ask collapses to just "ship".', // @draft
			},
			{
				teamSize: 'large',
				compassId: 'team-formation',
				quadrant: 2,
				delta: 0.2,
				note: 'Large team: even developers who prefer pairing find async PR review more practical at scale — you cannot pair with everyone. PRs provide the scaling mechanism that direct collaboration cannot.', // @draft
			},
		],
	},
	{
		id: 'domain-driven-design',
		name: 'Domain-Driven Design',
		brief: 'Structure code around business domains. Shared language between devs and stakeholders. Model complexity explicitly.',
		evaluators: {
			'design-methodology': {
				// @draft evaluator text below
				0: {
					fit: 'friction',
					text: "You design from first principles, deriving structure as you go. DDD's insistence on upfront domain modelling can feel like premature abstraction — you'd rather let the structure emerge from working code. Start with Event Storming as a discovery tool, not a specification step.", // @draft
				},
				1: {
					fit: 'natural',
					text: "You start with contracts and interfaces, then implement. DDD is a direct fit — its bounded contexts and aggregate roots are exactly the kind of explicit structure you're drawn to. The shared language between your code and the domain model reduces translation overhead.", // @draft
				},
				2: {
					fit: 'friction',
					text: "You prototype your way to understanding, then restructure. DDD's modelling-first approach conflicts with your exploratory style — the domain model you'd build before implementation will differ substantially from the one you'd build after. Use DDD vocabulary after the fact, as a lens for refactoring.", // @draft
				},
				3: {
					fit: 'adapt',
					text: "You layer structure over working code incrementally. DDD can work with your style if you treat it as ongoing refactoring toward the ubiquitous language, rather than as an upfront design exercise. Each sprint, introduce one bounded context boundary more explicitly.", // @draft
				},
			},
			'architecture-philosophy': {
				0: {
					fit: 'friction',
					text: "You build for the specific problem at hand, resisting generic abstractions. DDD encourages defining domains, contexts, and aggregates that may feel over-engineered for a focused problem scope. Useful if the business domain is genuinely complex; overkill if the domain is thin.", // @draft
				},
				1: {
					fit: 'natural',
					text: "You build systems designed to evolve. DDD's bounded contexts give you explicit seams for future extraction or replacement — you're building the architecture, not just the feature. The anti-corruption layer pattern fits your instinct to protect your core model from external concerns.", // @draft
				},
				2: {
					fit: 'natural',
					text: "You decompose into pluggable components. DDD's hexagonal architecture alignment (ports and adapters) lets you keep the domain model pure while swapping infrastructure — database, API, UI — around it. This matches your component-first thinking.", // @draft
				},
				3: {
					fit: 'adapt',
					text: "You iterate architecture alongside the system. DDD's domain model can coexist with this style if you adopt bounded contexts as the evolution unit — each context is complete and coherent, and you split or refine as the domain understanding improves.", // @draft
				},
			},
			'comprehension-clarity': {
				0: {
					fit: 'friction',
					text: "You read code holistically and intuit the system shape. DDD's explicit domain vocabulary adds a translation layer between code and business intent that can feel heavy — your mental model is spatial, not linguistic. The benefit comes in team settings where others need the shared language.", // @draft
				},
				1: {
					fit: 'natural',
					text: "You trace execution paths and map data flow explicitly. DDD's ubiquitous language means the code names directly reflect what the business calls things — no mental translation between 'user' and 'account holder' or 'order' and 'purchase'. Your analytical reading style benefits from this directness.", // @draft
				},
				2: {
					fit: 'adapt',
					text: "You read widely before reading deeply. DDD's bounded contexts are actually well-suited to your scanning style — each context is a coherent unit you can read and understand before diving into another. The domain vocabulary helps you orient quickly.", // @draft
				},
				3: {
					fit: 'adapt',
					text: "You work by pattern recognition across the codebase. DDD's consistent structural patterns (aggregates, repositories, domain events) give you familiar shapes to recognise across contexts — once you've learned the pattern once, you read all contexts the same way.", // @draft
				},
			},
			'ambiguity-response': {
				0: {
					fit: 'friction',
					text: "You impose structure to tame ambiguity immediately. DDD is a powerful ambiguity-resolution tool, but it requires collaborative modelling with domain experts — if you're modelling alone in ambiguous space, you risk building the wrong domain model confidently. Pair Event Storming with actual stakeholder input.", // @draft
				},
				1: {
					fit: 'natural',
					text: "You gather information before committing to a structure. DDD's modelling process is exactly this — Event Storming, domain interviews, and iterative refinement before implementation. The structured discovery approach matches your information-first instinct.", // @draft
				},
				2: {
					fit: 'friction',
					text: "You prototype to explore ambiguity. DDD is philosophically opposed to this — it defers implementation until the domain model is understood. Consider using throwaway prototypes as a discovery tool, then doing a full DDD modelling pass before the real implementation.", // @draft
				},
				3: {
					fit: 'adapt',
					text: "You stay flexible and respond to emerging clarity. DDD's iterative model refinement suits this — the domain model is expected to change as understanding deepens. Treat early domain models as hypotheses, not specifications.", // @draft
				},
			},
		},
		alternatives: [
			{
				name: 'Event Storming',
				desc: 'Collaborative workshop technique for discovering domain events, bounded contexts, and aggregates before writing code.',
				relevant: ['ambiguity-response-1', 'design-methodology-1'],
			},
			{
				name: 'Hexagonal Architecture (Ports and Adapters)',
				desc: 'Keep the domain model pure; infrastructure (DB, API, UI) plugs in via ports. DDD complement that works without the full modelling overhead.',
				relevant: ['architecture-philosophy-2', 'design-methodology-1'],
			},
			{
				name: 'Clean Architecture',
				desc: "Robert Martin's concentric-ring model: domain entities at centre, use cases, interface adapters, frameworks at the edges. Similar goals to DDD without the domain-language emphasis.",
				relevant: ['architecture-philosophy-1', 'architecture-philosophy-2'],
			},
			{
				name: 'Strategic DDD only',
				desc: 'Use only the strategic patterns (bounded contexts, context maps, ubiquitous language) without the tactical patterns (aggregates, repositories, value objects). Lower overhead.',
				relevant: ['design-methodology-3', 'architecture-philosophy-3'],
			},
		],
		sources: [
			{
				author: 'Eric Evans',
				work: 'Domain-Driven Design: Tackling Complexity in the Heart of Software',
				year: 2003,
				note: 'The foundational text. Introduced bounded contexts, aggregates, repositories, domain events, and the ubiquitous language. Dense but definitive.',
			},
			{
				author: 'Vaughn Vernon',
				work: 'Implementing Domain-Driven Design',
				year: 2013,
				note: 'Practical complement to Evans — shows how to actually implement DDD patterns in modern languages. More accessible.',
			},
			{
				author: 'Alberto Brandolini',
				work: 'Introducing Event Storming',
				year: 2017,
				note: 'Defined the Event Storming workshop format as a DDD discovery technique. Changed how teams approach domain modelling collaboratively.',
			},
		],
		growthPaths: {
			'design-methodology': [
				{
					quadrant: 0,
					bridge: 'Event Storming as exploration, not specification', // @draft
					rationale: "Your emergent design style generates working code before you understand the domain fully. Use Event Storming as a post-prototype reflection tool: once you have a prototype, run a solo Event Storm to name what you've built in domain terms. This converts your exploratory artefact into a shared vocabulary without forcing upfront modelling.", // @draft
					steps: [
						"Build a prototype until you understand the core interactions — this is your usual process.", // @draft
						"Stop. Open a whiteboard and write down every 'thing that happened' in past-tense orange sticky notes (domain events): OrderPlaced, PaymentFailed, InvoiceGenerated.", // @draft
						"Group events into bounded contexts — clusters of events that belong together. These become your module boundaries.", // @draft
						"Name the concepts. The names you choose now become the names in your code: replace generic terms ('data', 'record', 'item') with domain terms.", // @draft
					],
				},
				{
					quadrant: 2,
					bridge: 'Retrospective DDD', // @draft
					rationale: "You prototype to learn. DDD's modelling-first approach conflicts with your exploratory workflow, but the vocabulary is still valuable after the fact. Treat DDD as a refactoring lens: once your prototype reaches a stable shape, use bounded context mapping to name what emerged and clean up the seams.", // @draft
					steps: [
						"After your prototype stabilises, draw a rough context map: which parts of the system are self-contained? What do they expose to each other?", // @draft
						"Name each context with a noun that a business stakeholder would recognise.", // @draft
						"Refactor module boundaries to match the context map — move code until the structure matches the names.", // @draft
					],
				},
			],
			'architecture-philosophy': [
				{
					quadrant: 0,
					bridge: 'Strategic patterns only', // @draft
					rationale: "You build for the specific problem and resist generic abstractions. Full DDD is over-engineered for most of your use cases, but the strategic patterns (bounded contexts, ubiquitous language) cost almost nothing and pay off significantly in team communication. Adopt the vocabulary without the structural overhead.", // @draft
					steps: [
						"For your next project, spend 30 minutes naming the bounded contexts before writing any code. Draw a rough diagram.", // @draft
						"Use the domain vocabulary in all identifiers — resist the urge to use generic names like 'service', 'manager', 'handler'.", // @draft
						"Don't implement the tactical patterns (aggregates, repositories, domain events) unless complexity genuinely demands it.", // @draft
					],
				},
			],
			'ambiguity-response': [
				{
					quadrant: 0,
					bridge: 'Collaborative domain modelling', // @draft
					rationale: "You impose structure immediately when facing ambiguity — which means you risk building the wrong model confidently. DDD's discovery process requires involving domain experts before modelling, not after. The Event Storming workshop format is designed specifically for this: it forces you to listen before structuring.", // @draft
					steps: [
						"Before your next design session, schedule an Event Storming session with a stakeholder or user — even 45 minutes.", // @draft
						"Your role in the session is to facilitate, not to design. Write down what they say; resist the urge to suggest structure.", // @draft
						"After the session, build the model from what emerged — not from what you'd have designed alone.", // @draft
					],
				},
				{
					quadrant: 2,
					bridge: 'Throwaway prototype → domain model', // @draft
					rationale: "Your prototyping instinct is compatible with DDD if you treat prototypes as domain discovery tools, not the real implementation. The friction comes when you ship the prototype rather than rebuilding from the domain model it revealed.", // @draft
					steps: [
						"Prototype as usual — explicitly mark the codebase as throwaway (a README comment, a branch name like 'spike/').", // @draft
						"After the prototype demonstrates the core interaction, extract: what domain events occurred? What aggregates changed state? What invariants did you discover?", // @draft
						"Start the real implementation from the domain model, not from the prototype's code. The prototype's job is done.", // @draft
					],
				},
			],
		},
		contextModifiers: [
			{
				phase: 'greenfield',
				compassId: 'design-methodology',
				quadrant: 1,
				delta: 0.3,
				note: 'Greenfield: DDD delivers most value at the start of a project when domain boundaries are still fluid — modelling now prevents expensive restructuring later.', // @draft
			},
			{
				phase: 'legacy',
				compassId: 'architecture-philosophy',
				quadrant: 0,
				delta: -0.3,
				note: 'Legacy: applying DDD to existing systems requires fitting a new model over existing code, often without the ability to rename or restructure freely. The strategic patterns still help; the tactical patterns are hard to retrofit.', // @draft
			},
			{
				phase: 'research',
				compassId: 'ambiguity-response',
				quadrant: 1,
				delta: 0.2,
				note: 'Research: in exploratory phases, the DDD discovery process (Event Storming, domain interviews) is well-matched — you are intentionally learning the domain before building.', // @draft
			},
			{
				teamSize: 'large',
				compassId: 'comprehension-clarity',
				quadrant: 0,
				delta: 0.3,
				note: 'Large team: DDD\'s ubiquitous language pays off most with larger teams — the shared vocabulary reduces cross-team miscommunication that scales badly with headcount.', // @draft
			},
		],
	},
	{
		id: 'async-first-work',
		name: 'Async-First Work',
		brief: 'Default to written communication. Avoid synchronous interruptions. Protect deep-work time. Decisions recorded in writing.',
		evaluators: {
			'communication-pattern': {
				// @draft evaluator text below
				0: {
					fit: 'friction',
					text: "You share work in progress and think out loud with others. Async-first work requires a fundamental shift: your natural real-time collaboration must become deliberate written communication, with an explicit choice to make it async. The cognitive overhead of structuring thoughts for async consumption is real — start with a team agreement on when sync is still acceptable.", // @draft
				},
				1: {
					fit: 'adapt',
					text: "You collaborate synchronously with peers but don't broadcast widely. Async-first asks you to extend that selectivity — fewer real-time interactions, more documented decisions. The transition is manageable: replace informal syncs with brief written updates that serve the same function.", // @draft
				},
				2: {
					fit: 'natural',
					text: "You work heads-down and share written artefacts proactively. Async-first is your native operating mode — you already create the documentation and decision records that async teams run on. Optimise for discoverability: ensure your written outputs are findable, not just thorough.", // @draft
				},
				3: {
					fit: 'natural',
					text: "You work independently and respond when asked. Async-first formalises what you already do naturally. The discipline is: make your availability legible — if you're unreachable for hours, a status update prevents teammates from being blocked waiting for you.", // @draft
				},
			},
			'management-compatibility': {
				0: {
					fit: 'friction',
					text: "You thrive with structure, regular check-ins, and external accountability. Async-first removes the synchronous touchpoints that anchor your progress tracking. If your manager or team uses async defaults, negotiate explicit async rituals: a written EOD update, a weekly status note, a shared task board that communicates progress without requiring a meeting.", // @draft
				},
				1: {
					fit: 'adapt',
					text: "You value some structure but can self-direct within a sprint cadence. Async-first works with your style if the sprint structure (planning, retrospective) stays synchronous — treat those as the necessary sync boundaries and go async for everything in between.", // @draft
				},
				2: {
					fit: 'natural',
					text: "You self-direct and prefer minimal oversight. Async-first is a natural fit — you already manage your own work without requiring synchronous coordination. The practice formalises the autonomy you prefer.", // @draft
				},
				3: {
					fit: 'natural',
					text: "You set your own direction and work at your own pace. Async-first supports your autonomy completely. The main discipline is communicating your direction clearly enough that others don't block on you — a weekly written update is usually sufficient.", // @draft
				},
			},
			'process-fit-attentional': {
				0: {
					fit: 'natural',
					text: "You work in sustained, uninterrupted blocks. Async-first is designed for you — it systematically removes the interruptions (pings, standups, ad-hoc syncs) that break your flow state. The trade-off is slower feedback loops: optimise by batching your async responses into scheduled windows.", // @draft
				},
				1: {
					fit: 'natural',
					text: "You focus intensely and need clear start/end signals. Async-first preserves your focused work sessions by making interruptions opt-in. Schedule your async-response windows (e.g., 9–9:30am, 3–3:30pm) so your focused blocks are structurally protected.", // @draft
				},
				2: {
					fit: 'friction',
					text: "You work best with external rhythm and regular re-engagement. Async-first removes the external structure that helps you sustain momentum — standups, check-ins, and real-time collaboration provide the rhythm you need. If async is required, create synthetic structure: a personal standup written to a document, scheduled 90-minute focus blocks, explicit task transitions.", // @draft
				},
				3: {
					fit: 'adapt',
					text: "You work in bursts with natural context switches. Async-first is compatible with your style, but the benefit is reduced — you're already comfortable with interruptions, so the productivity gain from eliminating them is smaller. The value is in the written communication trail, not in protecting focus time.", // @draft
				},
			},
			'team-formation': {
				0: {
					fit: 'friction',
					text: "You thrive in highly collaborative environments with constant team contact. Async-first can feel isolating — the team is always there but never present. If async is required, create deliberate connection points: a team-wide async social channel, regular optional video coffee, explicit norms for when sync is always allowed.", // @draft
				},
				1: {
					fit: 'adapt',
					text: "You prefer deep collaboration but can sustain solo work for stretches. Async-first works if you protect a few sync touchpoints: a weekly team call, a shared decision log that surfaces discussions you'd otherwise have ad hoc. Treat async as your default, sync as your exception.", // @draft
				},
				2: {
					fit: 'adapt',
					text: "You collaborate in real time when needed and work solo when possible. Async-first formalises the solo portions of your workflow. The main adjustment is moving your 'quick Slack call to unblock' to a written question with async answer — which sometimes works fine and occasionally costs a half-day of waiting.", // @draft
				},
				3: {
					fit: 'natural',
					text: "You work independently and connect only when necessary. Async-first is the operational model you already prefer. The formal practice of async-first gives you the team agreement you need to justify not attending every meeting — the norm makes your working style legitimate, not just tolerated.", // @draft
				},
			},
		},
		alternatives: [
			{
				name: 'Hybrid async (core hours)',
				desc: 'Designate 2–3 hours of shared synchronous time per day; everything else is async by default. Balances collaboration and focus.',
				relevant: ['communication-pattern-1', 'team-formation-1'],
			},
			{
				name: 'Deep work scheduling (Cal Newport)',
				desc: 'Individual practice: block 4-hour deep-work sessions in your calendar, disable notifications, batch communications into shallow-work windows.',
				relevant: ['process-fit-attentional-0', 'process-fit-attentional-1'],
			},
			{
				name: 'Working agreements',
				desc: "Explicit team norms: response time expectations, when it's acceptable to interrupt, what belongs in which channel. Async-first made legible.",
				relevant: ['communication-pattern-3', 'management-compatibility-2'],
			},
			{
				name: 'GitLab async handbook approach',
				desc: "Document everything. Decisions in issues, not Slack. Meetings have written agendas and notes. GitLab's handbook is the canonical example.",
				relevant: ['communication-pattern-2', 'communication-pattern-3'],
			},
		],
		sources: [
			{
				author: 'Jason Fried & David Heinemeier Hansson',
				work: 'Remote: Office Not Required',
				year: 2013,
				note: 'Made the case that real-time collaboration is often overrated and that async communication produces better decisions with less interruption.',
			},
			{
				author: 'Cal Newport',
				work: 'Deep Work: Rules for Focused Success in a Distracted World',
				year: 2016,
				note: 'Established the cognitive science case for protecting uninterrupted focus time. Async-first is partly a team-level implementation of Newport\'s individual practice.',
			},
			{
				author: 'Gitlab',
				work: 'The GitLab Handbook',
				year: 2022,
				note: "The most thorough public implementation of async-first work at scale. Every policy, norm, and decision process is documented. Proves the model works for a 2000-person company.",
			},
		],
		growthPaths: {
			'communication-pattern': [
				{
					quadrant: 0,
					bridge: 'Written-first for one meeting type', // @draft
					rationale: "Your natural mode is real-time discussion, and async-first asks you to change that wholesale — which is too much at once. Instead, pick one recurring meeting (a weekly status sync, a decision review) and replace it with a written async format for one month. This builds the writing muscle and the team's trust in async before you expand the practice.", // @draft
					steps: [
						"Identify the recurring meeting that produces the least value — often a status update that could be a document.", // @draft
						"Write a template for the async replacement: progress since last time, blockers, decisions needed, next steps. Send it 24 hours before the meeting slot.", // @draft
						"Cancel the meeting for one sprint. Collect the decisions and actions via written responses instead.", // @draft
						"Review: did anything important fail to surface? Adjust the template, then expand to another meeting type.", // @draft
					],
				},
			],
			'process-fit-attentional': [
				{
					quadrant: 2,
					bridge: 'Synthetic async structure', // @draft
					rationale: "You need external rhythm to sustain momentum — async-first removes the standups and check-ins that provide that rhythm. The solution isn't to resist async, it's to create the structure yourself rather than relying on others to provide it.", // @draft
					steps: [
						"Write a personal standup every morning to a private document: what you did yesterday, what you're doing today, one blocker. Do it even when no one reads it.", // @draft
						"Set a timer for your focus blocks — 90 minutes on, 15 minutes off. The timer is your external rhythm when teammates aren't.", // @draft
						"At the end of each day, write a brief status note to the team channel. It signals completion and gives you a natural stopping point.", // @draft
					],
				},
			],
			'team-formation': [
				{
					quadrant: 0,
					bridge: 'Async social infrastructure', // @draft
					rationale: "Async-first feels isolating when you're highly collaborative by nature. The solution isn't to resist the practice — it's to add deliberate social infrastructure alongside it. Remote-first teams that thrive maintain connection through structured async social channels, not just work channels.", // @draft
					steps: [
						"Create a team async social channel with explicit permission to be non-work: wins, links, jokes, weekend plans.", // @draft
						"Schedule one optional weekly video call with no agenda — a virtual coffee. Attendance is voluntary, presence is the value.", // @draft
						"For big decisions, add a synchronous review at the end of the async thread: 'We'll discuss this in 30 minutes on Thursday if anyone wants to.' The option reduces the sense that async = no discussion.", // @draft
					],
				},
				{
					quadrant: 1,
					bridge: 'Protected sync boundaries', // @draft
					rationale: "You can sustain async work but prefer the texture of deep collaboration. Async-first works when you negotiate explicit sync exceptions rather than trying to go fully async. The working agreement defines when sync is always allowed, which prevents the feeling that async is a constraint rather than a default.", // @draft
					steps: [
						"Agree with your team: sync is always acceptable for (a) blocked/urgent issues, (b) complex technical decisions, (c) onboarding new members.", // @draft
						"For everything else, write first — 'can we discuss X' becomes a written framing of X that often resolves itself.", // @draft
						"Keep a weekly 30-minute optional sync for anything that didn't resolve in writing.", // @draft
					],
				},
			],
			'management-compatibility': [
				{
					quadrant: 0,
					bridge: 'Async accountability rituals', // @draft
					rationale: "You work best with structure and check-ins. Async-first doesn't remove the need for accountability — it moves it from meetings to written rituals. The key insight is that written rituals can provide the same anchoring function as synchronous ones, with less interruption overhead.", // @draft
					steps: [
						"Replace your daily standup with a daily written update: what you finished, what you're doing today, any blockers. Send it at the same time every day.", // @draft
						"For weekly reviews, write a brief status note on Fridays: progress against goals, decisions made, next week's priorities.", // @draft
						"Ask your manager or team lead to send written acknowledgement of your updates — even a brief 'looks good' closes the accountability loop.", // @draft
					],
				},
			],
		},
		contextModifiers: [
			{
				phase: 'greenfield',
				compassId: 'communication-pattern',
				quadrant: 2,
				delta: 0.2,
				note: 'Greenfield: early projects benefit from async-first norms established from the start — documentation habits formed now persist throughout the project lifecycle.', // @draft
			},
			{
				phase: 'research',
				compassId: 'process-fit-attentional',
				quadrant: 0,
				delta: 0.3,
				note: 'Research phase: deep, uninterrupted exploration is most valuable in research mode — async-first amplifies the benefit for focus-oriented workers by removing external interruption entirely.', // @draft
			},
			{
				teamSize: 'solo',
				compassId: 'team-formation',
				quadrant: 0,
				delta: 0.3,
				note: 'Solo: async-first is the only option for solo workers. The practice of writing decisions and updates still applies — the audience is your future self.', // @draft
			},
			{
				teamSize: 'large',
				compassId: 'communication-pattern',
				quadrant: 0,
				delta: 0.3,
				note: 'Large team: async-first becomes more valuable as team size grows — synchronous communication doesn\'t scale, and the real-time communicator who is natural in a small team finds increasing friction in large ones.', // @draft
			},
		],
	},
	{
		id: 'bdd-spec-by-example',
		name: 'BDD / Specification by Example',
		brief: 'Write tests as scenarios in plain language. Collaborate with stakeholders on examples. Tests are living documentation.',
		evaluators: {
			'comprehension-clarity': {
				// @draft evaluator text below
				0: {
					fit: 'natural',
					text: "You read holistically and scan for the overall shape before diving in. BDD's plain-language scenarios give you exactly that — a human-readable map of the system's behaviour before you read the implementation. A Gherkin feature file is the kind of high-level overview your comprehension style reaches for first.", // @draft
				},
				1: {
					fit: 'adapt',
					text: "You trace execution paths step by step. BDD's Given/When/Then structure maps directly to setup/action/assertion — the same mental model you use when reading tests analytically. The plain language is a bonus; the rigour is what fits. Consider using BDD at the acceptance level while keeping unit tests in your preferred format.", // @draft
				},
				2: {
					fit: 'natural',
					text: "You read widely before reading deeply. BDD's feature files give you the wide view — a catalogue of what the system is supposed to do — before you descend into implementation. This matches your natural reading order perfectly.", // @draft
				},
				3: {
					fit: 'adapt',
					text: "You pattern-match across the codebase. BDD's consistent scenario structure is a pattern you quickly learn to read — after the first ten scenarios, you scan them as efficiently as code. The value is in the stakeholder collaboration; the format is secondary.", // @draft
				},
			},
			'design-methodology': {
				0: {
					fit: 'adapt',
					text: "You design by emergence. BDD requires specifying behaviour before implementation, which conflicts with your exploratory instinct. Use BDD at the acceptance level only — let the implementation emerge, but specify the observable outcome first via an acceptance scenario.", // @draft
				},
				1: {
					fit: 'natural',
					text: "You design from contracts and interfaces. BDD scenarios are the ultimate contract — they describe exactly what the system must do, from the user's perspective, before a line of implementation exists. Your interface-first instinct translates directly into scenario-first development.", // @draft
				},
				2: {
					fit: 'adapt',
					text: "You prototype to explore. BDD is uncomfortable before you understand the domain, but once you do, specifying examples is natural. Use the prototype to explore; then write BDD scenarios before the real implementation. The scenarios prevent you from shipping the prototype.", // @draft
				},
				3: {
					fit: 'friction',
					text: "You incrementally evolve working code. BDD's upfront specification of examples can feel like premature commitment — you'd rather discover what the system should do by building it. Consider writing scenarios retrospectively (approval testing approach) to capture what emerged, then evolve them forward.", // @draft
				},
			},
			'verification-motivation': {
				0: {
					fit: 'friction',
					text: "You test to verify correctness after implementation. BDD inverts this: the test is written first and serves as a specification, not a verification. The friction is real — writing a test you know will fail before you've built anything goes against your instinct to test what exists. Try: write the scenario immediately after defining the requirement, before designing the solution. The scenario tells you what 'done' looks like.", // @draft
				},
				1: {
					fit: 'natural',
					text: "You test to express design intent. BDD is the fullest expression of this — the scenario is the design, and the implementation exists to make it pass. Given/When/Then is your design language with an executable backbone.", // @draft
				},
				2: {
					fit: 'natural',
					text: "You test to prevent regression. BDD's scenarios become the living regression suite — they document what the system does and fail when behaviour changes unexpectedly. This gives you a comprehensive safety net that's also readable by non-technical stakeholders.", // @draft
				},
				3: {
					fit: 'adapt',
					text: "You test when confidence is needed. BDD's upfront investment in scenario writing is hard to justify for low-risk areas, but the return on critical paths is high — stakeholder-readable tests that serve as living documentation of the most important behaviours. Apply BDD selectively to the paths that matter most.", // @draft
				},
			},
		},
		alternatives: [
			{
				name: 'ATDD (Acceptance Test-Driven Development)',
				desc: 'Write acceptance tests first without necessarily using Gherkin. Similar collaboration intent, more flexible format.',
				relevant: ['verification-motivation-1', 'design-methodology-1'],
			},
			{
				name: 'Example mapping (BDD discovery)',
				desc: 'Structured workshop: define rules, examples, and questions before writing any code or tests. The discovery technique without the Gherkin overhead.',
				relevant: ['comprehension-clarity-0', 'comprehension-clarity-2'],
			},
			{
				name: 'Property-based testing',
				desc: "Instead of specific examples, define properties that should always hold. The framework generates hundreds of examples. Complementary to BDD for algorithmic code.",
				relevant: ['verification-motivation-1', 'design-methodology-1'],
			},
			{
				name: 'Living documentation without Gherkin',
				desc: 'Approval testing or snapshot testing with descriptive test names. The documentation benefit of BDD without the Given/When/Then structure.',
				relevant: ['comprehension-clarity-3', 'design-methodology-3'],
			},
		],
		sources: [
			{
				author: 'Dan North',
				work: 'Introducing BDD',
				year: 2006,
				note: "Coined the term BDD and described the original insight: replacing 'test' with 'should' changes how developers think about what they're building. The origin of Given/When/Then.",
			},
			{
				author: 'Gojko Adzic',
				work: 'Specification by Example',
				year: 2011,
				note: 'Documented how high-performing agile teams use concrete examples to bridge the gap between business requirements and software implementation. Comprehensive case studies.',
			},
			{
				author: 'Liz Keogh',
				work: 'BDD is not about testing',
				year: 2013,
				note: 'Clarified that BDD is a collaboration and communication technique — the executable tests are a side-effect of shared understanding, not the goal in themselves.',
			},
		],
		growthPaths: {
			'verification-motivation': [
				{
					quadrant: 0,
					bridge: 'Scenario as definition of done', // @draft
					rationale: "You test after building to verify correctness. The BDD inversion — test before building — feels backwards, but framing it differently helps: the scenario isn't a test, it's a definition of done. You're not testing something that doesn't exist yet; you're specifying what 'done' means before you start. This is compatible with your verification mindset if you treat the scenario as a requirement artefact, not a test artefact.", // @draft
					steps: [
						"For your next feature, before writing any code, write one plain-language scenario: 'Given [starting state], When [action], Then [expected outcome].' Make it concrete — use real values, not generics.", // @draft
						"Resist the urge to make it a test yet. It's a requirement. Share it with a stakeholder and ask: 'Is this what you mean?' Revise until they agree.", // @draft
						"Now implement until that scenario passes. When it does, you're done — not when you think the code is correct, but when the scenario passes.", // @draft
					],
				},
			],
			'design-methodology': [
				{
					quadrant: 3,
					bridge: 'Retrospective scenarios as guards', // @draft
					rationale: "You evolve working code incrementally, discovering what the system should do by building it. BDD's upfront scenario writing conflicts with this, but the scenarios are still useful after the fact: write them retrospectively to lock in the behaviour you've discovered. Once written, they prevent regression and serve as documentation for the next person.", // @draft
					steps: [
						"After a feature is complete and working, write the BDD scenarios for what it does — in plain language, from the user's perspective.", // @draft
						"Wire the scenarios to automated tests (Cucumber, Playwright describe blocks, or similar).", // @draft
						"Use the retrospective scenarios as the regression suite going forward — they're now your safety net for future changes.", // @draft
					],
				},
			],
		},
		contextModifiers: [
			{
				phase: 'greenfield',
				compassId: 'design-methodology',
				quadrant: 1,
				delta: 0.3,
				note: 'Greenfield: BDD is most powerful at the start of a project when scenarios can drive architecture rather than document it. Scenario-first development on a blank canvas.', // @draft
			},
			{
				phase: 'legacy',
				compassId: 'verification-motivation',
				quadrant: 2,
				delta: 0.2,
				note: 'Legacy: in a legacy codebase, BDD scenarios written retrospectively provide the regression safety net that missing tests should have provided. Approval-testing existing behaviour is a legitimate starting point.', // @draft
			},
			{
				teamSize: 'solo',
				compassId: 'comprehension-clarity',
				quadrant: 0,
				delta: -0.2,
				note: 'Solo: BDD\'s stakeholder-collaboration benefit disappears when working alone. The format is still useful for self-documentation, but the overhead is higher relative to the benefit.', // @draft
			},
			{
				teamSize: 'large',
				compassId: 'comprehension-clarity',
				quadrant: 0,
				delta: 0.3,
				note: 'Large team: BDD pays off most with multiple stakeholders — business analysts, product managers, and developers reading the same scenarios removes the ambiguity that grows with team size.', // @draft
			},
		],
	},
];
