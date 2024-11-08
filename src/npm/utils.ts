import { StatusError } from '~/utils/error';

import {
	type TPackageDownloadsPointSchema,
	type TPackageDownloadsRangeSchema,
	type TPackageSchema,
	parsePackage,
	parsePackageDownloadsLast,
	parsePackageDownloadsPoint,
	parsePackageDownloadsRange,
	parsePackageName,
} from './schema';

import { fetcherPackage, fetcherPackageDownloadsPoint, fetcherPackageDownloadsRange } from './fetcher';

import { createCacheStorage } from './storage';

export const splitPackageNameAndVersion = (() => {
	const scoped = (str: string) => str.startsWith('@');
	return (input: string) => {
		const splitted = input.split('/');

		let name: string;
		let version: string | undefined;

		const length = splitted.length;
		if (length === 0) throw new StatusError(`${__DEV__ ? '[splitPackageNameAndVersion] ' : ''}Require package name`, 400);

		if (length === 1) {
			name = splitted[0];
		} else if (length === 2) {
			const [s1, s2] = splitted;
			if (scoped(s1)) {
				name = `${s1}/${s2}`;
			} else {
				name = s1;
				version = s2;
			}
		} else if (length === 3 && scoped(splitted[0])) {
			const [s1, s2, s3] = splitted;
			name = `${s1}/${s2}`;
			version = s3;
		} else {
			throw new StatusError(`${__DEV__ ? '[splitPackageNameAndVersion] ' : ''}Invalid format package name & version`, 400);
		}

		return [name, version] as const;
	};
})();

export const fetchPackage = (() => {
	const withStorage = createCacheStorage<TPackageSchema>(__DEV__ ? 'npm:package' : 'npm:pkg');

	return async (rawName: string, rawVersion: string | undefined = 'latest'): Promise<TPackageSchema> => {
		const validName = parsePackageName(rawName);
		const validVersion = rawVersion;
		return await withStorage(`${validName}@${validVersion}`, async () => {
			try {
				return parsePackage(await fetcherPackage(validName, validVersion));
			} catch (error) {
				throw new StatusError('Package not found', 404);
			}
		});
	};
})();

export const fetchPackageAlt = (input: string): Promise<TPackageSchema> => fetchPackage(...splitPackageNameAndVersion(input));

export const fetchPackageLastDownloadsPoint = (() => {
	const withStorage = createCacheStorage<TPackageDownloadsPointSchema>(__DEV__ ? 'npm:package-downloads-point-last' : 'npm:pkg-dp-l');

	return async (rawName: string, rawLast: string): Promise<TPackageDownloadsPointSchema> => {
		const validName = parsePackageName(rawName);
		const validLast = parsePackageDownloadsLast(rawLast);
		return await withStorage(`${validName}/${validLast}`, async () => {
			try {
				return parsePackageDownloadsPoint(await fetcherPackageDownloadsPoint(`last-${validLast}`, validName));
			} catch (error) {
				throw new StatusError('Package not found', 404);
			}
		});
	};
})();

export const fetchPackageLastDownloadsRange = (() => {
	const withStorage = createCacheStorage<TPackageDownloadsRangeSchema>(__DEV__ ? 'npm:package-downloads-range-last' : 'npm:pkg-dr-l');

	return async (rawName: string, rawLast: string): Promise<TPackageDownloadsRangeSchema> => {
		const validName = parsePackageName(rawName);
		const validLast = parsePackageDownloadsLast(rawLast);
		return await withStorage(`${validName}/${validLast}`, async () => {
			try {
				return parsePackageDownloadsRange(await fetcherPackageDownloadsRange(`last-${validLast}`, validName));
			} catch (error) {
				throw new StatusError('Package not found', 404);
			}
		});
	};
})();
