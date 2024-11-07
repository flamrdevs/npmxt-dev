import { json } from '@solidjs/router';

import { ofetch } from 'ofetch';
import { BASE_URL_API } from '~/npm/url';

import { handleNotImplemented } from '~/server/handler/defaults';
import { catchErrorStatusMessage } from '~/server/response/error';

export const GET = __DEV__ ? (event: SolidJS.Start.Server.APIEvent) => catchErrorStatusMessage(async () => json(await ofetch(`${BASE_URL_API}/${event.params['path']}`))) : handleNotImplemented;
