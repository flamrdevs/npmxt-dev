import { describe, expect, it } from 'vitest';

describe('classesToArray', () => {
	it('works correctly', () => {
		expect(
			classesToArray({
				class: 'class',
				classList: 'classList',
			}),
		).toEqual(['class', 'classList']);
	});
});
