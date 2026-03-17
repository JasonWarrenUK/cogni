import { describe, it, expect } from 'vitest';
import { synthesiseProfile } from './synthesis.js';
import type { CompassDataMap } from '$lib/data/types.js';

const TOTAL_COMPASSES = 17;

function compassData(positions: Record<string, number>): CompassDataMap {
	const data: CompassDataMap = {};
	for (const [id, quadrant] of Object.entries(positions)) {
		data[id] = { quadrant, intensity: 1, notes: '' };
	}
	return data;
}

describe('synthesiseProfile', () => {
	it('returns empty when fewer than 3 compasses positioned', () => {
		const data = compassData({
			'design-methodology': 0,
			'verification-motivation': 1,
		});
		const result = synthesiseProfile(data, TOTAL_COMPASSES);
		expect(result).toHaveLength(0);
	});

	it('detects clustering when 3+ compasses agree on a dimension', () => {
		// design-methodology q0: ax1=high, ax2=high  (Structuring orientation=high)
		// architecture-philosophy q0: ax1=high, ax2=high (Structuring orientation=high)
		// creative-workflow q2: ax1=low, ax2=high (Structuring orientation=high via ax2)
		// All three share Structuring orientation=high via different compasses
		const data = compassData({
			'design-methodology': 0,    // ax1=Structuring orientation HIGH
			'architecture-philosophy': 0, // ax1=Structuring orientation HIGH
			'yagni': 0,
		});
		// Need at least 5 positioned for narrative; add more for clustering test
		const data5 = compassData({
			'design-methodology': 0,    // ax1=Structuring orientation HIGH
			'architecture-philosophy': 0, // ax1=Structuring orientation HIGH
			'creative-workflow': 2,     // ax1=Incubation reliance LOW, ax2=Structuring orientation HIGH
			'process-fit-temporal': 0,
			'time-boxing-fit': 0,
		});
		const result = synthesiseProfile(data5, TOTAL_COMPASSES);
		const clustering = result.filter((i) => i.type === 'clustering');
		expect(clustering.length).toBeGreaterThan(0);
	});

	it('detects tension when compasses disagree on a shared dimension', () => {
		// design-methodology q0: ax1=Structuring orientation HIGH
		// architecture-philosophy q2: ax1=Structuring orientation LOW
		// Both share Structuring orientation but disagree
		const data = compassData({
			'design-methodology': 0,     // Structuring orientation=HIGH
			'architecture-philosophy': 2, // Structuring orientation=LOW
			'process-fit-temporal': 0,
		});
		const result = synthesiseProfile(data, TOTAL_COMPASSES);
		const tensions = result.filter((i) => i.type === 'tension');
		expect(tensions.length).toBeGreaterThan(0);
		expect(tensions[0].dims).toContain('Structuring orientation');
	});

	it('generates narrative when 5+ compasses positioned', () => {
		const data = compassData({
			'design-methodology': 0,
			'verification-motivation': 0,
			'process-fit-temporal': 0,
			'process-fit-attentional': 0,
			'time-boxing-fit': 0,
		});
		const result = synthesiseProfile(data, TOTAL_COMPASSES);
		const narratives = result.filter((i) => i.type === 'narrative');
		expect(narratives.length).toBe(1);
		expect(narratives[0].title).toBe('Profile shape');
	});

	it('does not generate narrative when fewer than 5 compasses positioned', () => {
		const data = compassData({
			'design-methodology': 0,
			'verification-motivation': 1,
			'process-fit-temporal': 2,
		});
		const result = synthesiseProfile(data, TOTAL_COMPASSES);
		const narratives = result.filter((i) => i.type === 'narrative');
		expect(narratives.length).toBe(0);
	});
});
