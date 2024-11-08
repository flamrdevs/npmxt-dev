import { json } from '@solidjs/router';

import { fetchPackageLastDownloadsRange } from '~/npm/utils';
import { jsonErrorStatusMessageResponse } from '~/server/error';
import { createKeyedMemoCache } from '~/server/memo-cache';

import * as chart from '~/components/npm/imgx/chart/downloads';

const withCache = createKeyedMemoCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (new URL(event.request.url).searchParams.has('cache')) return json(Object.keys(withCache.get()));

		const { package: name, downloads } = await fetchPackageLastDownloadsRange(event.params['name'], 'year');

		return await withCache(name, () => chart.y(downloads));
	} catch (error) {
		return jsonErrorStatusMessageResponse(error);
	}
}
