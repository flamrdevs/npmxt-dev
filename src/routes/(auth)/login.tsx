import { createAsync, query, redirect } from '@solidjs/router';

import * as Meta from '~/components/meta';
import { Button, TextField } from '~/components/ui';

import { loginAction } from '~/auth/actions';
import { getSessionData } from '~/auth/session';

const preload = query(async () => {
	'use server';

	if (__DEV__) console.log('LoginPage - preload');
	try {
		const sessionData = await getSessionData();
		if (!sessionData) return null;
	} catch (error) {
		if (__DEV__) console.error(error);
	}

	throw redirect('/dash');
}, 'page:login');

export const route = { preload: () => preload() };

export default function LoginPage() {
	createAsync(() => preload());

	return (
		<>
			<Meta.Base title="Login" description="Login npmxt" />

			<div class="flex items-center justify-center w-dvw h-dvh bg-cn-1 text-cn-12">
				<form action={loginAction} method="post">
					<div class="flex flex-col items-scratch justify-center gap-4 bg-cn-2 px-6 lg:px-8 py-7 lg:py-10 border border-cn-6 rounded-3xl w-full">
						<div class="space-y-2">
							<h2 class="font-bold text-4xl text-center text-cn-12">Login</h2>
							<p class="font-medium text-xl text-center text-cn-11">dash</p>
						</div>

						<TextField name="username" type="text" label="Username" class="w-full" />
						<TextField name="password" type="password" label="Password" class="w-full" />
						<Button type="submit" class="mt-1 lg:mt-4">
							Login
						</Button>
					</div>
				</form>
			</div>
		</>
	);
}
