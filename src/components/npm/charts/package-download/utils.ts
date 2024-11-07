import { ofetch } from 'ofetch';

import { dayjs } from '~/utils/dayjs';

import { DOWNLOAD_DATE_FORMAT } from '~/npm/const';
import { parsePackageName } from '~/npm/schema';
import { createDailyCacheStorage } from '~/npm/storage';
import { type PackageDownloadsRecord, getPackageAllDownloadsRecord } from '~/npm/utils.get';

export const fetchPackageAllDownloadsRecord = (() => {
	const withStorage = createDailyCacheStorage<PackageDownloadsRecord>(__DEV__ ? 'npm:package-download-range-all' : 'npm:pkg-dr-a');

	const MIN_START_DATE_DAYJS = dayjs('2015-02-01' /* ahead MIN_START_DOWNLOAD_DATE */, DOWNLOAD_DATE_FORMAT);

	return async (rawName: string): Promise<PackageDownloadsRecord> => {
		const validName = parsePackageName(rawName);

		return withStorage(validName, async () => {
			const createdDayjs = dayjs((await ofetch<{ date: string }>(`/api/package-creation/${validName}`)).date).startOf('day');

			const startDayjs = (createdDayjs.isBefore(MIN_START_DATE_DAYJS) ? MIN_START_DATE_DAYJS : createdDayjs).clone();
			const startDate = startDayjs.format(DOWNLOAD_DATE_FORMAT);

			return (await getPackageAllDownloadsRecord(validName, startDate)) as unknown as PackageDownloadsRecord;
		});
	};
})();
