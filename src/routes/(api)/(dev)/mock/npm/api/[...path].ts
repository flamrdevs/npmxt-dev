import { json } from '@solidjs/router';

import { ofetch } from 'ofetch';
import { BASE_URL_API } from '~/utils/npm/url';

import { handleNotImplemented } from '~/utils/server/handler/defaults';
import { catchErrorStatusMessage } from '~/utils/server/response/error';

export const GET = __DEV__ ? (event: SolidJS.Start.Server.APIEvent) => catchErrorStatusMessage(async () => json(await ofetch(`${BASE_URL_API}/${event.params['path']}`))) : handleNotImplemented;
