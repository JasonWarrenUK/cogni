import type { FitLevel, FitMeta } from './types.js';

export const FIT_META: Record<FitLevel, FitMeta> = {
	natural: {
		label: 'Natural fit',
		color: '#4ade80',
		bg: '#4ade8012',
		border: '#4ade8030',
	},
	adapt: {
		label: 'Adapt to fit',
		color: '#fbbf24',
		bg: '#fbbf2412',
		border: '#fbbf2430',
	},
	friction: {
		label: 'Friction',
		color: '#f87171',
		bg: '#f8717112',
		border: '#f8717130',
	},
	awaiting: {
		label: 'Awaiting compasses',
		color: '#777',
		bg: 'rgba(255,255,255,0.02)',
		border: 'rgba(255,255,255,0.06)',
	},
};
