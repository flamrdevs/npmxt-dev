import { fetchPackageFromParam } from '~/utils/npm/utils';

import { errorStatusMessageResponse } from '~/utils/server/response/error';
import { jsonNotImplemented } from '~/utils/server/response/message';

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	if (__DEV__) {
		try {
			return json(await fetchPackageFromParam(event.params['param']));
		} catch (error) {
			return errorStatusMessageResponse(error);
		}
	}

	return jsonNotImplemented();
}
