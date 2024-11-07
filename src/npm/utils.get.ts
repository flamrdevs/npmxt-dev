import { json } from '@solidjs/router';
import { GET } from '@solidjs/start';

import { cacheControl } from '~/server/header';

import { dayjs } from '~/utils/dayjs';

import { DOWNLOAD_DATE_FORMAT, MAX_DOWNLOAD_RANGE_DAYS } from './const';
import { fetcherPackageDownloadRange } from './fetcher';
import { PACKAGE_DOWNLOAD_LAST_MAP, parsePackageDownloadRange } from './schema';
import { fetchPackageLastDownloadRange } from './utils';

export type PackageDownloadsRecord = {
	name: string;
	start: string;
	end: string;
	record: Record<string, number>;
};

export const getPackageAllDownloadsRecord = GET(async (validName: string, validsStartDate: string) => {
	'use server';

	if (__DEV__) console.log('USE SERVER | getPackageAllDownloadsRecord');

	const startDayjs = dayjs(validsStartDate, DOWNLOAD_DATE_FORMAT);

	const lastYear = await fetchPackageLastDownloadRange(validName, 'year');

	const endDate = lastYear.end;
	const endDayjs = dayjs(endDate, DOWNLOAD_DATE_FORMAT);

	const rangeDays = endDayjs.diff(startDayjs, 'days') + 1;

	const record: Record<string, number> = {};

	let index: number;
	let tempDay: string;
	let tempDownloads: number;

	if (rangeDays /* is > 365 */ > PACKAGE_DOWNLOAD_LAST_MAP.year) {
		const map: Record<string /* start */, string /* end */> = {};
		const parts = Math.floor((rangeDays - PACKAGE_DOWNLOAD_LAST_MAP.year) / MAX_DOWNLOAD_RANGE_DAYS);

		let tempStart: dayjs.Dayjs;
		for (let i = 0; i < parts; i++) {
			map[(tempStart = startDayjs.clone().add(i * MAX_DOWNLOAD_RANGE_DAYS, 'days')).format(DOWNLOAD_DATE_FORMAT)] = tempStart
				.clone()
				.add(MAX_DOWNLOAD_RANGE_DAYS - 1, 'days')
				.format(DOWNLOAD_DATE_FORMAT);
		}
		map[(tempStart = startDayjs.clone().add(parts * MAX_DOWNLOAD_RANGE_DAYS, 'days')).format(DOWNLOAD_DATE_FORMAT)] = tempStart
			.clone()
			.add(dayjs(lastYear.start).subtract(1, 'days').diff(tempStart, 'days'), 'days')
			.format(DOWNLOAD_DATE_FORMAT);

		const bulks = await Promise.all(Object.entries(map).map(([start, end]) => fetcherPackageDownloadRange(`${start}:${end}`, validName)));
		for (const bulk of bulks) {
			const { downloads } = parsePackageDownloadRange(bulk);
			for ({ day: tempDay, downloads: tempDownloads } of downloads) record[tempDay] = tempDownloads;
		}
		for (index = 0; index < PACKAGE_DOWNLOAD_LAST_MAP.year; index++) {
			({ day: tempDay, downloads: tempDownloads } = lastYear.downloads[index]);
			record[tempDay] = tempDownloads;
		}
	} else {
		for (index = PACKAGE_DOWNLOAD_LAST_MAP.year - rangeDays; index < PACKAGE_DOWNLOAD_LAST_MAP.year; index++) {
			({ day: tempDay, downloads: tempDownloads } = lastYear.downloads[index]);
			record[tempDay] = tempDownloads;
		}
	}

	return json(
		{
			name: validName,
			start: validsStartDate,
			end: endDate,
			record,
		} satisfies PackageDownloadsRecord,
		{
			headers: {
				...cacheControl('public, max-age=43200, s-maxage=43200' /* 12 hours */),
			},
		},
	);
});
