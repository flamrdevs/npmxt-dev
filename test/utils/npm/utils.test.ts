import { describe, expect, it } from 'vitest';

import { StatusError } from '~/utils/error';
import { fetchPackage, fetchPackageDownloadRange, fetchPackageFromParam, transformPackageParam } from '~/utils/npm/utils';

describe('transformPackageParam', () => {
	it('Parse package name', () => {
		expect(transformPackageParam('solid-js')).toEqual({
			name: 'solid-js',
			version: 'latest',
		});
	});

	it('Parse package name & version', () => {
		expect(transformPackageParam('solid-js/1.0.0')).toEqual({
			name: 'solid-js',
			version: '1.0.0',
		});

		expect(transformPackageParam('solid-js/next')).toEqual({
			name: 'solid-js',
			version: 'next',
		});
	});

	it('Parse scope package name', () => {
		expect(transformPackageParam('@solidjs/start')).toEqual({
			name: '@solidjs/start',
			version: 'latest',
		});
	});

	it('Parse scope package name & version', () => {
		expect(transformPackageParam('@solidjs/start/1.0.0')).toEqual({
			name: '@solidjs/start',
			version: '1.0.0',
		});

		expect(transformPackageParam('@solidjs/start/next')).toEqual({
			name: '@solidjs/start',
			version: 'next',
		});
	});
});

describe('fetchPackage', () => {
	it.for([
		['solid-js', 'latest'],
		['solid-js', '1.0.0'],
		['solid-js', '2.0.0'],
		['@solidjs/start', 'latest'],
		['@solidjs/start', '1.0.0'],
		['@solidjs/start', '2.0.0'],
	])('found - %s@%s', async ([name, version]) => {
		await expect(fetchPackage(name, version)).resolves.toMatchObject({ name });
		await expect(fetchPackageFromParam(`${name}/${version}`)).resolves.toMatchObject({ name });
	});

	it.for([
		['astro', 'latest'],
		['next', 'latest'],
		['nuxt', 'latest'],
	])('not found - %s@%s', async ([name, version]) => {
		await expect(fetchPackage(name, version)).rejects.toThrow(StatusError);
		await expect(fetchPackageFromParam(`${name}/${version}`)).rejects.toThrow(StatusError);
	});
});

describe('fetchPackageDownloadRange', () => {
	it.for([
		//
		['solid-js', 'week'],
		['solid-js', 'month'],
		['solid-js', 'year'],
		['@solidjs/start', 'week'],
		['@solidjs/start', 'month'],
		['@solidjs/start', 'year'],
	])('found - %s last-%s', async ([name, range]) => {
		await expect(fetchPackageDownloadRange(name, range as any)).resolves.toMatchObject({
			package: name,
			start: expect.any(String),
			end: expect.any(String),
			downloads: expect.any(Array),
		});
	});

	it.for([
		//
		['astro'],
		['next'],
		['nuxt'],
	])('not found - %s last-week', async ([name]) => {
		await expect(fetchPackageDownloadRange(name, 'week')).rejects.toThrow(StatusError);
	});
});
