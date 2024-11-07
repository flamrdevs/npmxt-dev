import { json } from '@solidjs/router';

import { fetchPackage } from '~/npm/utils';
import { errorStatusMessageResponse } from '~/server/response/error';
import { createKeyedMemoCache } from '~/server/response/memo-cache';

import og from '~/components/npm/imgx/og/package';

const withCache = createKeyedMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (new URL(event.request.url).searchParams.has('cache')) return json(Object.keys(withCache.get()));

		const { name, version } = await fetchPackage(event.params['name']);

		return await withCache(name, () => og(name, version));
	} catch (error) {
		return errorStatusMessageResponse(error);
	}
}
