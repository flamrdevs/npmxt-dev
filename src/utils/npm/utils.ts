import { ofetch } from 'ofetch';

import { StatusError } from '~/utils/error';
import { type TPackageDownloadRangeSchema, type TPackageSchema, parsePackage, parsePackageDownloadRange, parsePackageName } from './schema';

export const transformPackageParam = (param: string) => {
	const splitted = param.split('/');

	let name: string;
	let version = 'latest';

	const length = splitted.length;
	if (length === 0) throw new StatusError('Require package name', 400);

	if (length === 1) {
		name = splitted[0];
	} else if (length === 2) {
		const [s1, s2] = splitted;
		if (s1.startsWith('@')) {
			name = `${s1}/${s2}`;
		} else {
			name = s1;
			version = s2;
		}
	} else if (length === 3) {
		const [s1, s2, s3] = splitted;
		name = `${s1}/${s2}`;
		version = s3;
	} else {
		throw new StatusError('Invalid package name', 400);
	}

	return { name, version };
};

export const fetchPackage = (() => {
	// in memory cache (serverless functions only)
	const cache: Record<string, { ok: 0; data: null } | { ok: 1; data: TPackageSchema }> = {};

	return async (rawName: string, rawVersion: string | undefined = 'latest'): Promise<TPackageSchema> => {
		const validName = parsePackageName(rawName);
		const validVersion = rawVersion;

		const key = `${validName}@${validVersion}`;

		const cached: (typeof cache)[string] | undefined = cache[key];

		if (cached?.ok) {
			if (__DEV__) console.log(`fetchPackage() ${'cache hit'.padEnd(11)} | ${key}`);
			return cached.data;
		}

		try {
			const data = parsePackage(await ofetch(`https://registry.npmjs.org/${validName}/${validVersion}`));
			cache[key] = { ok: 1, data };
			if (__DEV__) console.log(`fetchPackage() ${'cache miss'.padEnd(11)} | ${key}`);
			return data;
		} catch (error) {
			cache[key] = { ok: 0, data: null };
			throw new StatusError(`Package not found : ${key}`, 404);
		}
	};
})();

export const fetchPackageFromParam = (param: string) => {
	const { name, version } = transformPackageParam(param);
	return fetchPackage(name, version);
};

export const fetchPackageDownloadRange = (() => {
	// in memory cache (serverless functions only)
	const cache: Record<string, { ok: 0; data: null } | { ok: 1; data: TPackageDownloadRangeSchema }> = {};

	return async (rawName: string, last: 'week' | 'month' | 'year'): Promise<TPackageDownloadRangeSchema> => {
		const validName = parsePackageName(rawName);

		const key = `${validName}/${last}`;

		const cached: (typeof cache)[string] | undefined = cache[key];

		if (cached?.ok) {
			if (__DEV__) console.log(`fetchPackageDownloadRange() ${'cache hit'.padEnd(11)} | ${key}`);
			return cached.data;
		}

		try {
			const data = parsePackageDownloadRange(await ofetch(`https://api.npmjs.org/downloads/range/last-${last}/${validName}`));
			cache[key] = { ok: 1, data };
			if (__DEV__) console.log(`fetchPackageDownloadRange() ${'cache miss'.padEnd(11)} | ${key}`);
			return data;
		} catch (error) {
			cache[key] = { ok: 0, data: null };
			throw new StatusError(`Package not found : ${key}`, 404);
		}
	};
})();
