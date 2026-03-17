export interface Axis {
	label: string;
	low: string;
	high: string;
}

export interface Quadrant {
	label: string;
	desc: string;
}

export interface Compass {
	id: string;
	title: string;
	tier: 1 | 2 | 3;
	accent: string;
	subtitle: string;
	ax1: Axis;
	ax2: Axis;
	quads: [Quadrant, Quadrant, Quadrant, Quadrant];
	informs: string | null;
	methodologyPhases: string[];
}

export interface CompassData {
	quadrant: number | null;
	intensity: 0 | 1 | 2;
	notes: string;
}

export type CompassDataMap = Record<string, CompassData>;

export type FitLevel = 'natural' | 'adapt' | 'friction' | 'awaiting';

export interface MethodEvaluator {
	[quadrantIndex: number]: {
		fit: 'natural' | 'adapt' | 'friction';
		text: string;
	};
}

export interface Alternative {
	name: string;
	desc: string;
	relevant: string[];
}

export interface GrowthPath {
	/** Quadrant index that triggers this path */
	quadrant: number;
	/** A bridging practice to try first */
	bridge: string;
	/** Why this bridge works for their cognitive style */
	rationale: string;
	/** 2-3 concrete actions */
	steps: string[];
}

export interface MethodGrowthPaths {
	/** Compass ID → growth paths keyed by friction quadrant */
	[compassId: string]: GrowthPath[];
}

export interface Source {
	author: string;
	work: string;
	year: number;
	note: string;
}

export interface Method {
	id: string;
	name: string;
	brief: string;
	evaluators: Record<string, MethodEvaluator>;
	alternatives: Alternative[];
	sources: Source[];
	growthPaths?: MethodGrowthPaths;
	contextModifiers?: ContextModifier[];
}

export interface EvalResult {
	compassId: string;
	compass: Compass;
	fit: 'natural' | 'adapt' | 'friction';
	text: string;
	quadrant: number;
	weight: number;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface MethodEvaluation {
	overall: FitLevel;
	evals: EvalResult[];
	positioned: number;
	total: number;
	score: number;
	confidence: ConfidenceLevel;
}

export interface ScoredAlternative {
	name: string;
	desc: string;
	relevant: string[];
	score: number;
	matchCount: number;
	totalRefs: number;
}

export interface ConstraintReason {
	dim: string;
	est: string;
	from: string;
	accent: string;
}

export interface Constraints {
	conflicts: [boolean, boolean, boolean, boolean];
	reasons: ConstraintReason[];
}

export interface UserReference {
	author: string;
	work: string;
	year?: number;
	note: string;
}

export interface ProfileExport {
	exportedAt: string;
	version: string;
	compasses: Record<string, {
		title: string;
		tier: number;
		quadrant: string;
		intensity: string;
		notes: string;
	}>;
	growth: { developing: string; questions: string };
	references: string;
	structuredReferences?: UserReference[];
}

export interface FitMeta {
	label: string;
	color: string;
	bg: string;
	border: string;
}

export type InteractionType = 'synergy' | 'tension' | 'redundancy';

export interface MethodInteraction {
	methods: [string, string];
	type: InteractionType;
	/** Optional condition: only show when this compass+quadrant is active */
	condition?: string; // format: "compassId-quadrant"
	text: string;
}

export type ProjectPhase = 'greenfield' | 'legacy' | 'research' | 'maintenance';
export type TeamSize = 'solo' | 'small' | 'large';

export interface ProjectContext {
	phase: ProjectPhase | null;
	teamSize: TeamSize | null;
}

/** A modifier shifts fit score for a specific compass+quadrant given a context. */
export interface ContextModifier {
	phase?: ProjectPhase;
	teamSize?: TeamSize;
	/** Compass ID + quadrant that this modifier applies to */
	compassId: string;
	quadrant: number;
	/** Score delta: positive = more natural, negative = more friction */
	delta: number;
	/** Short explanation shown in UI */
	note: string;
}

export interface ResolvedInteraction {
	type: InteractionType;
	text: string;
	methodNames: [string, string];
}
