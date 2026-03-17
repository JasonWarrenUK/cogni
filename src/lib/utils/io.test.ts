// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { importProfile, VERSION } from './io.js';
import { COMPASSES } from '$lib/data/compasses.js';
import type { CompassDataMap } from '$lib/data/types.js';

function makeEmptyCompassData(): CompassDataMap {
	const data: CompassDataMap = {};
	for (const c of COMPASSES) {
		data[c.id] = { quadrant: null, intensity: 0, notes: '' };
	}
	return data;
}

describe('VERSION', () => {
	it('is a non-empty string', () => {
		expect(typeof VERSION).toBe('string');
		expect(VERSION.length).toBeGreaterThan(0);
	});
});

describe('importProfile', () => {
	it('round-trips compass data correctly', async () => {
		const payload = JSON.stringify({
			version: '0.4',
			compasses: {
				'design-methodology': {
					title: 'Design Methodology',
					tier: 1,
					quadrant: 'Emergent + Early',
					intensity: 'moderate',
					notes: 'emergent thinker',
				},
				'verification-motivation': {
					title: 'Verification Motivation',
					tier: 1,
					quadrant: 'Experimental + Late',
					intensity: 'strong',
					notes: 'REPL first',
				},
			},
			growth: { developing: 'growth', questions: 'q?' },
			references: 'refs',
			structuredReferences: [],
		});

		const file = new File([payload], 'test.json', { type: 'application/json' });

		await new Promise<void>((resolve) => {
			importProfile(
				file,
				(compassData, growth, references, structuredReferences) => {
					expect(compassData['design-methodology']?.quadrant).toBe(2); // Emergent + Early = index 2
					expect(compassData['design-methodology']?.intensity).toBe(1); // moderate = 1
					expect(compassData['design-methodology']?.notes).toBe('emergent thinker');
					expect(compassData['verification-motivation']?.quadrant).toBe(3); // Experimental + Late = index 3
					expect(compassData['verification-motivation']?.intensity).toBe(2); // strong = 2
					expect(growth.developing).toBe('growth');
					expect(references).toBe('refs');
					expect(Array.isArray(structuredReferences)).toBe(true);
					resolve();
				},
				(err) => { throw err; },
			);
		});
	});

	it('calls onError for malformed JSON', async () => {
		const file = new File(['not valid json {{{'], 'bad.json', { type: 'application/json' });
		const onError = vi.fn();

		await new Promise<void>((resolve) => {
			importProfile(
				file,
				() => resolve(),
				(err) => {
					onError(err);
					resolve();
				},
			);
		});

		expect(onError).toHaveBeenCalledOnce();
	});

	it('calls onError for unknown version', async () => {
		const payload = JSON.stringify({
			version: '0.1',
			compasses: {},
			growth: { developing: '', questions: '' },
			references: '',
		});
		const file = new File([payload], 'old.json', { type: 'application/json' });
		const onError = vi.fn();

		await new Promise<void>((resolve) => {
			importProfile(
				file,
				() => resolve(),
				(err) => {
					onError(err);
					resolve();
				},
			);
		});

		expect(onError).toHaveBeenCalledOnce();
		expect((onError.mock.calls[0][0] as Error).message).toContain('Unknown profile version');
	});

	it('accepts current version without error', async () => {
		const payload = JSON.stringify({
			version: VERSION,
			compasses: {},
			growth: { developing: '', questions: '' },
			references: '',
			structuredReferences: [],
		});
		const file = new File([payload], 'current.json', { type: 'application/json' });
		const onError = vi.fn();

		await new Promise<void>((resolve) => {
			importProfile(
				file,
				() => resolve(),
				(err) => {
					onError(err);
					resolve();
				},
			);
		});

		expect(onError).not.toHaveBeenCalled();
	});

	it('skips unknown compass IDs gracefully', async () => {
		const payload = JSON.stringify({
			version: '0.4',
			compasses: {
				'design-methodology': {
					title: 'Design Methodology',
					tier: 1,
					quadrant: 'Emergent + Early',
					intensity: 'moderate',
					notes: '',
				},
				'nonexistent-compass': {
					title: 'Ghost',
					tier: 1,
					quadrant: 'Foo',
					intensity: 'moderate',
					notes: '',
				},
			},
			growth: { developing: '', questions: '' },
			references: '',
		});

		const file = new File([payload], 'test.json', { type: 'application/json' });

		await new Promise<void>((resolve) => {
			importProfile(
				file,
				(compassData) => {
					expect(compassData['design-methodology']).toBeDefined();
					expect(compassData['nonexistent-compass']).toBeUndefined();
					resolve();
				},
				(err) => { throw err; },
			);
		});
	});

	it('imports structured references', async () => {
		const payload = JSON.stringify({
			version: '0.4',
			compasses: {},
			growth: { developing: '', questions: '' },
			references: '',
			structuredReferences: [
				{ author: 'Rich Hickey', work: 'Simple Made Easy', year: 2011, note: 'Test' },
			],
		});
		const file = new File([payload], 'refs.json', { type: 'application/json' });

		await new Promise<void>((resolve) => {
			importProfile(
				file,
				(_, __, ___, structuredReferences) => {
					expect(structuredReferences).toHaveLength(1);
					expect(structuredReferences[0].author).toBe('Rich Hickey');
					resolve();
				},
				(err) => { throw err; },
			);
		});
	});
});
