import { json } from '@solidjs/router';

import { fetchPackage, fetchPackageLastDownloadRange } from '~/npm/utils';
import { errorStatusMessageResponse } from '~/server/response/error';
import { createKeyedMemoCache } from '~/server/response/memo-cache';

import * as badge from '~/components/npm/imgx/badge/download';

const withCache = createKeyedMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (new URL(event.request.url).searchParams.has('cache')) return json(Object.keys(withCache.get()));

		const { name } = await fetchPackage(event.params['name']);

		const { downloads } = await fetchPackageLastDownloadRange(name, 'year');

		return await withCache(name, () => badge.y(downloads.reduce((a, { downloads }) => a + downloads, 0)));
	} catch (error) {
		return errorStatusMessageResponse(error);
	}
}
