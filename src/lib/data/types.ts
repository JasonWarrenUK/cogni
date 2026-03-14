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
}

export interface EvalResult {
	compassId: string;
	compass: Compass;
	fit: 'natural' | 'adapt' | 'friction';
	text: string;
	quadrant: number;
}

export interface MethodEvaluation {
	overall: FitLevel;
	evals: EvalResult[];
	positioned: number;
	total: number;
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
}

export interface FitMeta {
	label: string;
	color: string;
	bg: string;
	border: string;
}
