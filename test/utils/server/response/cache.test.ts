import { describe, expect, it } from 'vitest';

import { createKeyedCache, createNonKeyedCache } from '~/utils/server/response/cache';

describe('createNonKeyedCache', () => {
	it('works correctly', async () => {
		const cache = createNonKeyedCache();

		expect(cache.get()).toBeNull();

		const response = new Response('response', { status: 200 });
		await cache(() => Promise.resolve(response));

		expect(cache.get()).toEqual(response);
	});
});

describe('createKeyedCache', () => {
	it('works correctly', async () => {
		const cache = createKeyedCache();

		expect(cache.get()).toBeTypeOf('object');

		const response1 = new Response('response1', { status: 200 });
		await cache('key-1', () => Promise.resolve(response1));

		const value1 = cache.get();
		expect(Object.keys(value1).length).toEqual(1);
		expect(value1['key-1']).toEqual(response1);

		const response2 = new Response('response2', { status: 200 });
		await cache('key-2', () => Promise.resolve(response2));

		const value2 = cache.get();
		expect(Object.keys(value2).length).toEqual(2);
		expect(value2['key-2']).toEqual(response2);
	});
});
