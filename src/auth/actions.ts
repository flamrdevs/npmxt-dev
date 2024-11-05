import { action } from '@solidjs/router';

import { StatusError } from '~/utils/error';

import { redirect } from '@solidjs/router';
import { updateSession } from './session';

export const loginAction = action(async (formData: FormData) => {
	const username = String(formData.get('username'));
	const password = String(formData.get('password'));

	if (!(username === __ENV__.DASH_USERNAME)) throw new StatusError('Wrong username', 400);
	if (!(password === __ENV__.DASH_PASSWORD)) throw new StatusError('Wrong password', 400);

	await updateSession({ username });

	throw redirect('/dash');
}, 'login');

export const logoutAction = action(async () => {
	await updateSession({ username: undefined });

	throw redirect('/login');
}, 'logout');
