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
