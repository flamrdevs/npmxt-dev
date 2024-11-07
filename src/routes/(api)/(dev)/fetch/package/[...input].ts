import { json } from '@solidjs/router';

import { fetchPackageAlt } from '~/npm/utils';

import { handleNotImplemented } from '~/server/handler/defaults';
import { catchErrorStatusMessage } from '~/server/response/error';

export const GET = __DEV__ ? (event: SolidJS.Start.Server.APIEvent) => catchErrorStatusMessage(async () => json(await fetchPackageAlt(event.params['input']))) : handleNotImplemented;
