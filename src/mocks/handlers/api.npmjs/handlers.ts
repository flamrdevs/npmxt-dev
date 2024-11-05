import { http, HttpResponse, delay } from 'msw';

import { dayjs } from '~/utils/dayjs';

import { PACKAGE_DOWNLOAD_RANGE_LAST_LIST, PACKAGE_DOWNLOAD_RANGE_LAST_MAP, type TPackageDownloadRangeSchema, parsePackageDownloadRangeLast } from '~/utils/npm/schema';
import { BASE_URL_API as NPM_BASE_URL_API } from '~/utils/npm/url';

import { MOCK_PACKAGE_METADATA } from '../registry.npmjs/handlers';

const MOCK_PACKAGE_DOWNLOAD_RANGE: Record<string, TPackageDownloadRangeSchema['downloads']> = {
	['@klass/core']: [],
	['@kobalte/core']: [],
	['@solidjs/meta']: [],
	['@solidjs/router']: [],
	['@solidjs/start']: [],
	['npmxt']: [],
	['react']: [],
	['react-dom']: [],
	['solid-js']: [],
	['svelte']: [],
	['vue']: [],
};

const DATE_FORMAT = 'YYYY-MM-DD';

const MIN_START_DATE_DAYJS = dayjs('2015-01-01' /* behind 2015-01-10 */, DATE_FORMAT);

const generateDownloads = (() => {
	const now = dayjs().startOf('day');

	const range = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

	return (name: string) => {
		if (name in MOCK_PACKAGE_METADATA) {
			const result: TPackageDownloadRangeSchema['downloads'] = [];

			let startDayjs = dayjs(MOCK_PACKAGE_METADATA[name].time.created).startOf('day');

			if (startDayjs.isBefore(MIN_START_DATE_DAYJS)) startDayjs = MIN_START_DATE_DAYJS.clone();

			const diffDays = now.diff(startDayjs, 'days');

			for (let index = 0; index < diffDays; index++) {
				const min = (index + 1) * 10;
				const max = min * 5;

				result.push({
					downloads: range(min, max),
					day: startDayjs.clone().add(index, 'days').format(DATE_FORMAT),
				});
			}

			return result;
		}

		throw new Error('msw - mocks npm packages not synchronized');
	};
})();

const getDownloadsRecord = (name: string) => {
	if (MOCK_PACKAGE_DOWNLOAD_RANGE[name].length === 0) MOCK_PACKAGE_DOWNLOAD_RANGE[name] = generateDownloads(name);
	const allDownloads = MOCK_PACKAGE_DOWNLOAD_RANGE[name];
	const record: {
		[key in 'start' | 'end']: string;
	} & {
		[key: string]: number;
	} = {
		start: allDownloads.at(0)?.day as string,
		end: allDownloads.at(-1)?.day as string,
	} as any;
	let day: string;
	let downloads: number;
	for ({ day, downloads } of allDownloads) record[day] = downloads;
	return record;
};

const isLastPeriod = (() => {
	const list = PACKAGE_DOWNLOAD_RANGE_LAST_LIST.map((last) => `last-${last}`);
	return (value: string) => list.includes(value);
})();

export default [
	http.get<{ period: string; 0: string }>(`${NPM_BASE_URL_API}/downloads/range/:period/*`, async ({ params }) => {
		await delay(1000);

		const period = params['period'];
		const name = params['0'];

		if (isLastPeriod(period)) {
			const last = parsePackageDownloadRangeLast(period.slice(5));
			const lastLength = PACKAGE_DOWNLOAD_RANGE_LAST_MAP[last];

			if (name in MOCK_PACKAGE_DOWNLOAD_RANGE) {
				const allDownloadsRecord = getDownloadsRecord(name);

				const endDate = allDownloadsRecord.end;
				const startDayjs = dayjs(endDate).subtract(lastLength - 1, 'days');

				let tempDay: string;
				const lastYearDownloads: TPackageDownloadRangeSchema['downloads'] = Array.from({ length: lastLength }).map((_, index) => {
					tempDay = startDayjs.clone().add(index, 'days').format(DATE_FORMAT);
					return { downloads: allDownloadsRecord[tempDay] ?? 0, day: tempDay };
				});

				return HttpResponse.json(
					{
						start: lastYearDownloads.at(0)?.day as string,
						end: lastYearDownloads.at(-1)?.day as string,
						package: name,
						downloads: lastYearDownloads,
					} satisfies TPackageDownloadRangeSchema,
					{ status: 200 },
				);
			}

			throw HttpResponse.json({ error: `package ${name} not found` }, { status: 404 });
		}

		const periodSplitted = period.split(':');

		if (periodSplitted.length !== 2) throw HttpResponse.json({ error: 'not implemented' }, { status: 501 });

		const [startPeriod, endPeriod] = periodSplitted;

		let startDayjs = dayjs(startPeriod);
		let endDayjs = dayjs(endPeriod);

		if (startDayjs.isValid() && endDayjs.isValid()) {
			const now = dayjs().startOf('day');

			if (name in MOCK_PACKAGE_DOWNLOAD_RANGE) {
				if (startDayjs.isBefore(MIN_START_DATE_DAYJS)) startDayjs = MIN_START_DATE_DAYJS.clone();
				if (endDayjs.isAfter(now)) endDayjs = now.clone();

				const diffDays = endDayjs.diff(startDayjs, 'days') + 1;

				const allDownloadsRecord = getDownloadsRecord(name);

				let tempDay: string;
				const periodDownloads: TPackageDownloadRangeSchema['downloads'] = Array.from({ length: diffDays }).map((_, index) => {
					tempDay = startDayjs.clone().add(index, 'days').format(DATE_FORMAT);
					return { downloads: allDownloadsRecord[tempDay] ?? 0, day: tempDay };
				});

				return HttpResponse.json(
					{
						start: periodDownloads.at(0)?.day as string,
						end: periodDownloads.at(-1)?.day as string,
						package: name,
						downloads: periodDownloads,
					} satisfies TPackageDownloadRangeSchema,
					{ status: 200 },
				);
			}

			throw HttpResponse.json({ error: `package ${name} not found` }, { status: 404 });
		}

		throw HttpResponse.json({ error: 'invalid date' }, { status: 400 });
	}),
];
