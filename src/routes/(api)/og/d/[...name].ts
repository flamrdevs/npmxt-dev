import { json } from '@solidjs/router';
import type { APIEvent } from '@solidjs/start/server';

import { createKeyedCache } from '~/utils/server/response';

import { parsePackageNameAPIEventParams } from '~/utils/npm/server';
import { og } from '~/utils/og';

const cache = createKeyedCache();

export async function GET(event: APIEvent) {
	try {
		const { name } = parsePackageNameAPIEventParams(event);

		if (name === 'cache') return Object.keys(cache.v);

		return await cache(name, () =>
			og(
				(e) => [
					e('div', {
						style: {
							fontSize: '24px',
							fontWeight: 'bold',
						},
						children: `Download[${name}]Page`,
					}),
				],
				{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'black',
					color: 'white',
					border: '1px solid black',
				},
			),
		);
	} catch (error) {
		return json({ error }, { status: 500 });
	}
}
