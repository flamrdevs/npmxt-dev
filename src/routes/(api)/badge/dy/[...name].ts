import { json } from '@solidjs/router';

import { fetchPackage, fetchPackageLastDownload } from '~/utils/npm/utils';
import { errorStatusMessageResponse } from '~/utils/server/response/error';
import { createKeyedMemoCache } from '~/utils/server/response/memo-cache';

import * as badge from '~/components/npm/imgx/badge/d';

const withCache = createKeyedMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (new URL(event.request.url).searchParams.has('cache')) return json(Object.keys(withCache.get()));

		const { name } = await fetchPackage(event.params['name']);

		const { downloads } = await fetchPackageLastDownload(name, 'year');

		return await withCache(name, () => badge.y(downloads.reduce((a, { downloads }) => a + downloads, 0)));
	} catch (error) {
		return errorStatusMessageResponse(error);
	}
}
