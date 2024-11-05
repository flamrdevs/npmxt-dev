import { ofetch } from 'ofetch';

import * as v from 'valibot';

import { dayjs } from '~/utils/dayjs';
import { createParser } from '~/utils/valibot';

import { fetcherPackageDownloadRange } from './fetcher';
import { type TPackageDownloadRangeSchema, parsePackageDownloadRange, parsePackageName } from './schema';
import { createDailyCacheStorage } from './storage';

export const fetchPackageAllDownload = (() => {
	const withStorage = createDailyCacheStorage<TPackageDownloadRangeSchema>(__DEV__ ? 'npm:package-download-range-all' : 'npm:pkg-dr-a');

	const DATE_FORMAT = 'YYYY-MM-DD';
	const MIN_START_DATE_DAYJS = dayjs('2015-02-01' /* ahead 2015-01-10 */, DATE_FORMAT);
	const MAX_RANGE = 550;

	const fetchPackageCreationDate = (() => {
		const parse = createParser(v.object({ date: v.string() }));
		return async (validName: string) => dayjs(parse(await ofetch(`/api/package-creation/${validName}`)).date);
	})();

	return async (rawName: string): Promise<TPackageDownloadRangeSchema> => {
		const validName = parsePackageName(rawName);

		return withStorage(validName, async () => {
			const lastDay = parsePackageDownloadRange(await fetcherPackageDownloadRange('last-day', validName));

			const createdDayjs = await fetchPackageCreationDate(validName);

			const startDayjs = (createdDayjs.isBefore(MIN_START_DATE_DAYJS) ? MIN_START_DATE_DAYJS : createdDayjs).clone();
			const startDate = startDayjs.format(DATE_FORMAT);

			const endDate = lastDay.end;
			const endDayjs = dayjs(endDate, DATE_FORMAT);

			const endBeforeDayjs = endDayjs.clone().subtract(1, 'day');
			const endBeforeDate = endBeforeDayjs.format(DATE_FORMAT);

			const diffDays = endBeforeDayjs.diff(startDayjs, 'days');

			const result: TPackageDownloadRangeSchema = {
				package: lastDay.package,
				start: startDate,
				end: endDate,
				downloads: [],
			};

			if (diffDays <= MAX_RANGE) {
				result.downloads.push(...parsePackageDownloadRange(await fetcherPackageDownloadRange(`${startDate}:${endBeforeDate}`, validName)).downloads);
				result.downloads.push(...lastDay.downloads);
			} else {
				const map: Record<string /* start */, string /* end */> = {};

				const parts = Math.floor(diffDays / MAX_RANGE);

				let tempStart: dayjs.Dayjs;
				for (let i = 0; i < parts; i++) {
					map[(tempStart = startDayjs.clone().add(i * MAX_RANGE, 'days')).format(DATE_FORMAT)] = tempStart
						.clone()
						.add(MAX_RANGE - 1, 'days')
						.format(DATE_FORMAT);
				}
				map[(tempStart = startDayjs.clone().add(parts * MAX_RANGE, 'days')).format(DATE_FORMAT)] = tempStart.clone().add(endBeforeDayjs.clone().diff(tempStart, 'days'), 'days').format(DATE_FORMAT);

				const bulks = await Promise.all(Object.entries(map).map(([start, end]) => fetcherPackageDownloadRange(`${start}:${end}`, validName)));
				for (const bulk of bulks) result.downloads.push(...parsePackageDownloadRange(bulk).downloads);
				result.downloads.push(...lastDay.downloads);
			}

			return result;
		});
	};
})();
