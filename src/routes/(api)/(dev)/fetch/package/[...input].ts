import { json } from '@solidjs/router';

import { fetchPackageAlt } from '~/utils/npm/utils';

import { handleNotImplemented } from '~/utils/server/handler/defaults';
import { catchErrorStatusMessage } from '~/utils/server/response/error';

export const GET = __DEV__ ? (event: SolidJS.Start.Server.APIEvent) => catchErrorStatusMessage(async () => json(await fetchPackageAlt(event.params['input']))) : handleNotImplemented;
