import { parsePackageName } from '~/utils/npm/schema';
import { fetchPackageDownloadRange } from '~/utils/npm/utils';

import { errorStatusMessageResponse } from '~/utils/server/response/error';
import { jsonBadRequest, jsonNotImplemented } from '~/utils/server/response/message';

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	if (__DEV__) {
		try {
			const last = event.params['last'];
			const name = event.params['name'];

			if (last !== 'week' && last !== 'month' && last !== 'year') return jsonBadRequest();

			return json(await fetchPackageDownloadRange(parsePackageName(name), last));
		} catch (error) {
			return errorStatusMessageResponse(error);
		}
	}

	return jsonNotImplemented();
}
