import { http, HttpResponse, delay } from 'msw';

import type { TPackageSchema } from '~/npm/schema';
import { BASE_URL_REGISTRY as NPM_BASE_URL_REGISTRY } from '~/npm/url';
import { splitPackageNameAndVersion } from '~/npm/utils';

type MockPackageMetadataValue = { time: { created: string } };

export const MOCK_PACKAGE_METADATA: Record<string, MockPackageMetadataValue> = {
	['@klass/core']: /*     */ { time: { created: '2022-12-05T02:37:24.005Z' } },
	['@kobalte/core']: /*   */ { time: { created: '2023-01-04T20:42:38.052Z' } },
	['@solidjs/meta']: /*   */ { time: { created: '2022-07-25T09:42:29.029Z' } },
	['@solidjs/router']: /* */ { time: { created: '2022-07-27T09:39:02.620Z' } },
	['@solidjs/start']: /*  */ { time: { created: '2023-11-15T18:27:01.709Z' } },
	['npmxt']: /*           */ { time: { created: '2024-11-03T07:14:51.355Z' } },
	['react']: /*           */ { time: { created: '2011-10-26T17:46:21.942Z' } },
	['react-dom']: /*       */ { time: { created: '2014-05-06T18:59:36.160Z' } },
	['solid-js']: /*        */ { time: { created: '2018-04-25T04:09:31.206Z' } },
	['svelte']: /*          */ { time: { created: '2016-11-17T22:58:41.644Z' } },
	['vue']: /*             */ { time: { created: '2013-12-07T06:09:46.299Z' } },
	['looooooooo-oooooooo-oooooooooooooooong']: { time: { created: '2011-01-01T01:01:01.001Z' } },
	['@looooooooo/oooooooooooooooooooooooong']: { time: { created: '2011-01-01T01:01:01.001Z' } },
};

type MockPackageValue = Omit<TPackageSchema, 'name' | 'version'> & { tags: Record<string, string>; versions: TPackageSchema['version'][] };

const MOCK_PACKAGE: Record<string, MockPackageValue> = {
	['@klass/core']: {
		description: 'Class variant utility',
		tags: {
			latest: '3.0.0',
			next: '4.0.0-next.0',
		},
		versions: ['1.0.0', '2.0.0', '3.0.0', '4.0.0-next.0'],
		license: 'MIT',
		author: {
			name: 'flamrdevs',
		},
	},
	['@kobalte/core']: {
		description: 'Unstyled components and primitives for building accessible web apps and design systems with SolidJS.',
		tags: {
			latest: '1.0.0',
		},
		versions: ['0.1.0', '1.0.0'],
		license: 'MIT',
		author: {
			name: 'jer3m01',
		},
	},
	['@solidjs/meta']: {
		description: 'Write meta tags to the document head',
		tags: {
			latest: '2.0.0',
		},
		versions: ['1.0.0', '2.0.0'],
		license: 'MIT',
		author: {
			name: 'Ryan Carniato',
		},
	},
	['@solidjs/router']: {
		description: 'Universal router for SolidJS',
		tags: {
			latest: '2.0.0',
		},
		versions: ['1.0.0', '2.0.0'],
		license: 'MIT',
		author: {
			name: 'Ryan Carniato',
		},
		homepage: 'https://github.com/solidjs/solid-router#readme',
	},
	['@solidjs/start']: {
		tags: {
			latest: '2.0.0',
		},
		versions: ['1.0.0', '2.0.0'],
		license: 'MIT',
		author: {
			name: 'Ryan Carniato',
		},
		homepage: 'https://start.solidjs.com',
	},
	['npmxt']: {
		description: 'npmxt',
		tags: {
			latest: '0.0.0',
		},
		versions: ['0.0.0'],
	},
	['react']: {
		description: 'React is a JavaScript library for building user interfaces.',
		tags: {
			latest: '18.0.0',
			canary: '19.0.0-canary.0',
		},
		versions: ['17.0.0', '18.0.0', '19.0.0-canary.0'],
		license: 'MIT',
		homepage: 'https://react.dev',
	},
	['react-dom']: {
		description: 'React package for working with the DOM.',
		tags: {
			latest: '18.0.0',
			canary: '19.0.0-canary.0',
		},
		versions: ['17.0.0', '18.0.0', '19.0.0-canary.0'],
		license: 'MIT',
		homepage: 'https://react.dev',
	},
	['solid-js']: {
		description: 'A declarative JavaScript library for building user interfaces.',
		tags: {
			latest: '2.0.0',
		},
		versions: ['1.0.0', '1.1.0', '1.2.0', '1.3.0', '1.4.0', '1.5.0', '1.6.0', '1.7.0', '1.8.0', '2.0.0'],
		license: 'MIT',
		author: {
			name: 'Ryan Carniato',
		},
		homepage: 'https://solidjs.com',
	},
	['svelte']: {
		description: 'Cybernetically enhanced web apps',
		tags: {
			latest: '5.0.0',
		},
		versions: ['3.0.0', '4.0.0', '5.0.0'],
		license: 'MIT',
		homepage: 'https://svelte.dev',
	},
	['vue']: {
		description: 'The progressive JavaScript framework for building modern web UI.',
		tags: {
			latest: '3.0.0',
		},
		versions: ['2.0.0', '3.0.0'],
		license: 'MIT',
		author: {
			name: 'Evan You',
		},
		homepage: 'https://github.com/vuejs/core/tree/main/packages/vue#readme',
	},
	['looooooooo-oooooooo-oooooooooooooooong']: {
		description: 'maybe looooooooo-oooooooo-oooooooooooooooong description',
		tags: {
			latest: '100.100.100',
		},
		versions: ['100.100.100'],
		license: 'LICENSE',
		author: {
			name: 'Loooo Oooo Ong Developer',
		},
		homepage: 'https://loooooooooooooooooooooooooooooong.dev/pathname/path/path/path/path/path/path/path/path/path/path/path/path/path',
	},
	['@looooooooo/oooooooooooooooooooooooong']: {
		description: 'maybe @looooooooo/oooooooooooooooooooooooong description and description and description and description and description and description',
		tags: {
			latest: '10000.10000.10000',
		},
		versions: ['10000.10000.10000'],
		license: 'LOOOOOOOOONG LICENSE',
		author: {
			name: 'Loooo Oooo Ong Developer',
		},
		homepage: 'https://loooooooooooooooooooooooooooooong.dev/pathname/path/path/path/path/path/path/path/path/path/path/path/path/path/path/path/path/path/path/path',
	},
};

export default [
	http.get<{ 0: string }>(`${NPM_BASE_URL_REGISTRY}/*`, async ({ params }) => {
		if (__MSW_DELAY__) await delay(1000);

		const [tName, tVersion] = splitPackageNameAndVersion(params['0']);

		if (tVersion) {
			if (tName in MOCK_PACKAGE) {
				const pkg = MOCK_PACKAGE[tName];
				let version: string | undefined;
				if (tVersion in pkg.tags) version = pkg.tags[tVersion];
				else if (pkg.versions.includes(tVersion)) version = tVersion;

				if (version) return HttpResponse.json({ name: tName, version, ...pkg } satisfies TPackageSchema, { status: 200 });
			}
		} else {
			if (tName in MOCK_PACKAGE_METADATA) {
				const pkg = MOCK_PACKAGE_METADATA[tName];

				return HttpResponse.json({ name: tName, ...pkg } satisfies { name: string } & MockPackageMetadataValue, { status: 200 });
			}
		}

		throw HttpResponse.json({ error: 'not_found' }, { status: 404 });
	}),
];
