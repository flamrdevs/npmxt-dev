import { json } from '@solidjs/router';

import { fetchPackageLastDownload } from '~/utils/npm/utils';

import { handleNotImplemented } from '~/utils/server/handler/defaults';
import { catchErrorStatusMessage } from '~/utils/server/response/error';

export const GET = __DEV__
	? (event: SolidJS.Start.Server.APIEvent) => catchErrorStatusMessage(async () => json(await fetchPackageLastDownload(event.params['name'], event.params['last'])))
	: handleNotImplemented;
