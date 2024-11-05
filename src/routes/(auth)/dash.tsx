import { createAsync, query, redirect } from '@solidjs/router';

import * as Meta from '~/components/meta';
import { Button } from '~/components/ui';

import { logoutAction } from '~/auth/actions';
import { getSessionData } from '~/auth/session';

const preload = query(async () => {
	'use server';

	if (__DEV__) console.log('DashPage - preload');
	try {
		const sessionData = await getSessionData();
		if (sessionData) return sessionData;
	} catch (error) {
		if (__DEV__) console.error(error);
	}

	throw redirect('/login');
}, 'dash');

export const route = { preload: () => preload() };

export default function DashPage() {
	const sessionData = createAsync(() => preload());

	return (
		<>
			<Meta.Base title="Dash" description="Dash npmxt" />

			<div class="flex items-center justify-center w-dvw h-dvh bg-cn-1 text-cn-12">
				<div>
					<div>
						{sessionData.latest?.username}
						<form action={logoutAction} method="post">
							<Button type="submit">Log out</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
