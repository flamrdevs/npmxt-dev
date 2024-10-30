import { http, HttpResponse } from 'msw';

import dayjs from 'dayjs';

import type { TPackageDownloadRangeSchema, TPackageSchema } from '~/utils/npm/schema';
import { transformPackageParam } from '~/utils/npm/utils';

export default [
	...(() => {
		const MOCK_PACKAGE: Record<string, Omit<TPackageSchema, 'version'> & { tags: Record<string, string>; versions: TPackageSchema['version'][] }> = {
			['@kobalte/core']: {
				name: '@kobalte/core',
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
				name: '@solidjs/meta',
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
				name: '@solidjs/router',
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
				name: '@solidjs/start',
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
			['react']: {
				name: 'react',
				description: 'React is a JavaScript library for building user interfaces.',
				tags: {
					latest: '19.0.0',
				},
				versions: ['17.0.0', '18.0.0', '19.0.0'],
				license: 'MIT',
				homepage: 'https://react.dev',
			},
			['react-dom']: {
				name: 'react-dom',
				description: 'React package for working with the DOM.',
				tags: {
					latest: '19.0.0',
				},
				versions: ['17.0.0', '18.0.0', '19.0.0'],
				license: 'MIT',
				homepage: 'https://react.dev',
			},
			['solid-js']: {
				name: 'solid-js',
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
				name: 'svelte',
				description: 'Cybernetically enhanced web apps',
				tags: {
					latest: '5.0.0',
				},
				versions: ['3.0.0', '4.0.0', '5.0.0'],
				license: 'MIT',
				homepage: 'https://svelte.dev',
			},
			['vue']: {
				name: 'vue',
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
		};

		return [
			http.get<{ 0: string }>('https://registry.npmjs.org/*', ({ params }) => {
				const param = transformPackageParam(params['0']);

				if (param.name in MOCK_PACKAGE) {
					const pkg = MOCK_PACKAGE[param.name];
					let version: string | undefined;
					if (param.version in pkg.tags) version = pkg.tags[param.version];
					else if (pkg.versions.includes(param.version)) version = param.version;

					if (version)
						return HttpResponse.json(
							{
								...pkg,
								version,
							} satisfies TPackageSchema,
							{ status: 200 },
						);
				}

				throw HttpResponse.json({ error: 'not_found' }, { status: 404 });
			}),
		];
	})(),
	...(() => {
		type Last = 'week' | 'month' | 'year';

		const MOCK_PACKAGE_DOWNLOAD_RANGE: Record<string, TPackageDownloadRangeSchema['downloads']> = {
			['@kobalte/core']: [],
			['@solidjs/meta']: [],
			['@solidjs/router']: [],
			['@solidjs/start']: [],
			['react']: [],
			['react-dom']: [],
			['solid-js']: [],
			['svelte']: [],
			['vue']: [],
		};

		const generateDownloads = (() => {
			const length = 365 + 30;

			const start = dayjs()
				.startOf('day')
				.subtract(length + 1, 'days');

			const range = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

			const FORMAT = 'YYYY-MM-DD';

			return () => {
				const result: TPackageDownloadRangeSchema['downloads'] = [];

				for (let index = 0; index < length; index++) {
					const min = (index + 1) * 10;
					const max = min * 5;

					result.push({
						downloads: range(min, max),
						day: dayjs(start.clone().add(index, 'days')).format(FORMAT),
					});
				}

				return result;
			};
		})();

		return [
			http.get<{ last: Last; 0: string }>('https://api.npmjs.org/downloads/range/last-:last/*', ({ params }) => {
				const last = params.last;
				const name = params['0'];

				if (last !== 'week' && last !== 'month' && last !== 'year') throw HttpResponse.json({ error: 'invalid date' }, { status: 400 });

				if (name in MOCK_PACKAGE_DOWNLOAD_RANGE) {
					if (MOCK_PACKAGE_DOWNLOAD_RANGE[name].length === 0) MOCK_PACKAGE_DOWNLOAD_RANGE[name] = generateDownloads();

					const downloads = MOCK_PACKAGE_DOWNLOAD_RANGE[name].slice(-(last === 'week' ? 7 : last === 'month' ? 30 : 365));

					return HttpResponse.json(
						{
							package: name,
							start: downloads.at(0)?.day as string,
							end: downloads.at(-1)?.day as string,
							downloads,
						} satisfies TPackageDownloadRangeSchema,
						{ status: 200 },
					);
				}

				throw HttpResponse.json({ error: `package ${name} not found` }, { status: 404 });
			}),
		];
	})(),
];
