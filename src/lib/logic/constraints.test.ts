import { describe, it, expect } from 'vitest';
import { quadToAxes, getDimPositions, getConstraints } from './constraints.js';
import { COMPASSES } from '$lib/data/compasses.js';
import type { CompassDataMap } from '$lib/data/types.js';

function emptyCompassData(): CompassDataMap {
	const data: CompassDataMap = {};
	for (const c of COMPASSES) {
		data[c.id] = { quadrant: null, intensity: 0, notes: '' };
	}
	return data;
}

describe('quadToAxes', () => {
	it('quadrant 0 → high/high', () => {
		expect(quadToAxes(0)).toEqual({ ax1: 'high', ax2: 'high' });
	});

	it('quadrant 1 → high/low', () => {
		expect(quadToAxes(1)).toEqual({ ax1: 'high', ax2: 'low' });
	});

	it('quadrant 2 → low/high', () => {
		expect(quadToAxes(2)).toEqual({ ax1: 'low', ax2: 'high' });
	});

	it('quadrant 3 → low/low', () => {
		expect(quadToAxes(3)).toEqual({ ax1: 'low', ax2: 'low' });
	});
});

describe('getDimPositions', () => {
	it('returns empty when no compasses positioned', () => {
		const data = emptyCompassData();
		const dims = getDimPositions(data);
		expect(Object.keys(dims)).toHaveLength(0);
	});

	it('records axis positions for positioned compasses', () => {
		const data = emptyCompassData();
		data['design-methodology'] = { quadrant: 0, intensity: 1, notes: '' };

		const dims = getDimPositions(data);
		// design-methodology has ax1: Structuring orientation, ax2: Verification timing
		expect(dims['Structuring orientation']).toBeDefined();
		expect(dims['Verification timing']).toBeDefined();
		expect(dims['Structuring orientation'][0].dir).toBe('high');
		expect(dims['Verification timing'][0].dir).toBe('high');
	});
});

describe('getConstraints', () => {
	it('returns no conflicts when nothing else is positioned', () => {
		const data = emptyCompassData();
		const compass = COMPASSES.find((c) => c.id === 'design-methodology')!;
		const constraints = getConstraints(compass, data);

		expect(constraints.conflicts).toEqual([false, false, false, false]);
		expect(constraints.reasons).toHaveLength(0);
	});

	it('detects conflict on shared axis', () => {
		// design-methodology and architecture-philosophy share 'Structuring orientation'
		// If architecture-philosophy is at quadrant 0 (high/high), structuring = 'high'
		// Then design-methodology quadrants 2 and 3 (low ax1) should be conflicted
		const data = emptyCompassData();
		data['architecture-philosophy'] = { quadrant: 0, intensity: 1, notes: '' };

		const designMethodology = COMPASSES.find((c) => c.id === 'design-methodology')!;
		const constraints = getConstraints(designMethodology, data);

		// ax1 of design-methodology is 'Structuring orientation'
		// architecture-philosophy quadrant 0 = high/high → structuring = high
		// So design-methodology quadrants 2 (low/high) and 3 (low/low) should conflict
		expect(constraints.conflicts[2]).toBe(true);
		expect(constraints.conflicts[3]).toBe(true);
		expect(constraints.reasons.length).toBeGreaterThan(0);
	});

	it('does not flag the same compass as its own constraint', () => {
		const data = emptyCompassData();
		data['design-methodology'] = { quadrant: 0, intensity: 1, notes: '' };

		const compass = COMPASSES.find((c) => c.id === 'design-methodology')!;
		const constraints = getConstraints(compass, data);

		// The compass itself should not cause conflicts with itself
		expect(constraints.conflicts).toEqual([false, false, false, false]);
	});
});
