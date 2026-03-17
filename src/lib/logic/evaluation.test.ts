import { describe, it, expect } from 'vitest';
import { evaluateMethod, scoreAlternative, isAlternativeRelevant } from './evaluation.js';
import type { Method, CompassDataMap } from '$lib/data/types.js';

const emptyCompassData: CompassDataMap = {};

const noPositionsData: CompassDataMap = {
	'design-methodology': { quadrant: null, intensity: 0, notes: '' },
	'verification-motivation': { quadrant: null, intensity: 0, notes: '' },
};

function makeMethod(evaluators: Method['evaluators']): Method {
	return {
		id: 'test-method',
		name: 'Test Method',
		brief: 'Test brief',
		evaluators,
		alternatives: [],
		sources: [],
	};
}

describe('evaluateMethod', () => {
	it('returns awaiting when no compasses positioned', () => {
		const method = makeMethod({
			'design-methodology': {
				0: { fit: 'natural', text: 'Natural' },
			},
		});

		const result = evaluateMethod(method, noPositionsData);
		expect(result.overall).toBe('awaiting');
		expect(result.positioned).toBe(0);
		expect(result.evals).toHaveLength(0);
	});

	it('returns awaiting when compassData is empty', () => {
		const method = makeMethod({
			'design-methodology': {
				0: { fit: 'natural', text: 'Natural' },
			},
		});

		const result = evaluateMethod(method, emptyCompassData);
		expect(result.overall).toBe('awaiting');
	});

	it('returns natural when weighted score exceeds 0.3', () => {
		const data: CompassDataMap = {
			'design-methodology': { quadrant: 0, intensity: 1, notes: '' },
			'verification-motivation': { quadrant: 0, intensity: 1, notes: '' },
		};
		const method = makeMethod({
			'design-methodology': {
				0: { fit: 'natural', text: 'Natural' },
			},
			'verification-motivation': {
				0: { fit: 'natural', text: 'Natural' },
			},
		});

		const result = evaluateMethod(method, data);
		expect(result.overall).toBe('natural');
		expect(result.score).toBeGreaterThan(0.3);
	});

	it('returns friction when weighted score is below -0.3', () => {
		const data: CompassDataMap = {
			'design-methodology': { quadrant: 0, intensity: 1, notes: '' },
			'verification-motivation': { quadrant: 0, intensity: 1, notes: '' },
		};
		const method = makeMethod({
			'design-methodology': {
				0: { fit: 'friction', text: 'Friction' },
			},
			'verification-motivation': {
				0: { fit: 'friction', text: 'Friction' },
			},
		});

		const result = evaluateMethod(method, data);
		expect(result.overall).toBe('friction');
		expect(result.score).toBeLessThan(-0.3);
	});

	it('returns adapt for mixed natural and friction at equal weights', () => {
		const data: CompassDataMap = {
			'design-methodology': { quadrant: 0, intensity: 1, notes: '' },
			'verification-motivation': { quadrant: 0, intensity: 1, notes: '' },
		};
		const method = makeMethod({
			'design-methodology': {
				0: { fit: 'natural', text: 'Natural' },
			},
			'verification-motivation': {
				0: { fit: 'friction', text: 'Friction' },
			},
		});

		const result = evaluateMethod(method, data);
		expect(result.overall).toBe('adapt');
		expect(result.score).toBeCloseTo(0, 1);
	});

	it('includes intensity weight in EvalResult', () => {
		const data: CompassDataMap = {
			'design-methodology': { quadrant: 0, intensity: 2, notes: '' },
		};
		const method = makeMethod({
			'design-methodology': {
				0: { fit: 'natural', text: 'Natural' },
			},
		});

		const result = evaluateMethod(method, data);
		expect(result.evals[0].weight).toBe(1.5);
	});

	it('intensity 0 produces weight 0.5', () => {
		const data: CompassDataMap = {
			'design-methodology': { quadrant: 0, intensity: 0, notes: '' },
		};
		const method = makeMethod({
			'design-methodology': {
				0: { fit: 'natural', text: 'Natural' },
			},
		});

		const result = evaluateMethod(method, data);
		expect(result.evals[0].weight).toBe(0.5);
	});

	it('exposes score in result', () => {
		const data: CompassDataMap = {
			'design-methodology': { quadrant: 0, intensity: 1, notes: '' },
		};
		const method = makeMethod({
			'design-methodology': {
				0: { fit: 'natural', text: 'Natural' },
			},
		});

		const result = evaluateMethod(method, data);
		expect(typeof result.score).toBe('number');
	});
});

describe('scoreAlternative', () => {
	it('returns score 0.5 when relevant is empty', () => {
		const { score, totalRefs } = scoreAlternative([], emptyCompassData);
		expect(score).toBe(0.5);
		expect(totalRefs).toBe(0);
	});

	it('returns score 1 when all relevant refs match', () => {
		const data: CompassDataMap = {
			'design-methodology': { quadrant: 0, intensity: 1, notes: '' },
		};
		const { score, matchCount } = scoreAlternative(['design-methodology-0'], data);
		expect(score).toBe(1);
		expect(matchCount).toBe(1);
	});

	it('returns score 0 when no refs match', () => {
		const data: CompassDataMap = {
			'design-methodology': { quadrant: 2, intensity: 1, notes: '' },
		};
		const { score } = scoreAlternative(['design-methodology-0'], data);
		expect(score).toBe(0);
	});

	it('returns partial score for partial matches', () => {
		const data: CompassDataMap = {
			'design-methodology': { quadrant: 0, intensity: 1, notes: '' },
			'verification-motivation': { quadrant: 2, intensity: 1, notes: '' },
		};
		const { score } = scoreAlternative(
			['design-methodology-0', 'verification-motivation-0'],
			data,
		);
		expect(score).toBe(0.5);
	});
});

describe('isAlternativeRelevant (deprecated)', () => {
	it('returns true when relevant is empty', () => {
		expect(isAlternativeRelevant([], emptyCompassData)).toBe(true);
	});

	it('returns true when user matches any reference', () => {
		const data: CompassDataMap = {
			'design-methodology': { quadrant: 0, intensity: 1, notes: '' },
		};
		expect(isAlternativeRelevant(['design-methodology-0'], data)).toBe(true);
	});

	it('returns false when user matches none', () => {
		const data: CompassDataMap = {
			'design-methodology': { quadrant: 2, intensity: 1, notes: '' },
		};
		expect(isAlternativeRelevant(['design-methodology-0'], data)).toBe(false);
	});
});
