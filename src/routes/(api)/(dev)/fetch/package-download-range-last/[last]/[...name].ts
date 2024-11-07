import { json } from '@solidjs/router';

import { fetchPackageLastDownloadRange } from '~/npm/utils';

import { handleNotImplemented } from '~/server/handler/defaults';
import { catchErrorStatusMessage } from '~/server/response/error';

export const GET = __DEV__
	? (event: SolidJS.Start.Server.APIEvent) => catchErrorStatusMessage(async () => json(await fetchPackageLastDownloadRange(event.params['name'], event.params['last'])))
	: handleNotImplemented;
