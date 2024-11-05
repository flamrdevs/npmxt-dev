import { createStorage } from 'unstorage';

import { isServer } from 'solid-js/web';
import indexedb from 'unstorage/drivers/indexedb';
import memory from 'unstorage/drivers/memory';

export const createDailyCacheStorage = <T>(base: string) => {
	type StorageValue = (
		| {
				/**
				 * is 0 | false
				 */
				i: 0;
				/**
				 * data
				 */
				d: null;
		  }
		| {
				/**
				 * is 1 | true
				 */
				i: 1;
				/**
				 * data
				 */
				d: T;
		  }
	) & {
		// expires
		t: number;
	};

	const storage = createStorage<StorageValue>({
		driver: isServer ? memory() : indexedb({ base }),
	});

	const fn = async (key: string, fx: () => Promise<T>): Promise<T> => {
		const item = await storage.get<StorageValue>(key);

		const now = Date.now();

		if (item?.i) {
			if (now < item.t) {
				if (__DEV__) console.log(`[${base}] ${'cache hit'.padEnd(11)} | ${key}`);
				return item.d;
			}
		}

		try {
			const data = await fx();
			await storage.set<StorageValue>(key, {
				i: 1,
				d: data,
				t: now + 86400000, // + 24 hours
			});
			if (__DEV__) console.log(`[${base}] ${'cache miss'.padEnd(11)} | ${key}`);
			return data;
		} catch (error) {
			await storage.set<StorageValue>(key, {
				i: 0,
				d: null,
				t: now + 10800000, // + 3 hours
			});
			throw error;
		}
	};

	if (!isServer) {
		window.addEventListener('beforeunload', async () => {
			await storage.dispose();
		});
	}

	return fn;
};
