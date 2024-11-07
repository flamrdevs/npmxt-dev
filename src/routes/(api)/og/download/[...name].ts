import { json } from '@solidjs/router';

import { fetchPackage, fetchPackageLastDownloadRange } from '~/npm/utils';
import { errorStatusMessageResponse } from '~/server/response/error';
import { createKeyedMemoCache } from '~/server/response/memo-cache';

import og from '~/components/npm/imgx/og/download';

const withCache = createKeyedMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (new URL(event.request.url).searchParams.has('cache')) return json(Object.keys(withCache.get()));

		const { name } = await fetchPackage(event.params['name']);

		const { downloads } = await fetchPackageLastDownloadRange(name, 'year');

		return await withCache(name, () => og(name, downloads));
	} catch (error) {
		return errorStatusMessageResponse(error);
	}
}
