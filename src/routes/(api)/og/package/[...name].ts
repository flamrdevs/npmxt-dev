import { fetchPackage } from '~/utils/npm/utils';
import { createKeyedCache } from '~/utils/server/response/cache';
import { errorStatusMessageResponse } from '~/utils/server/response/error';
import { og } from '~/utils/server/response/og';

const cache = createKeyedCache();

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		const url = new URL(event.request.url);

		if (url.searchParams.has('cache')) return json(Object.keys(cache.get()));

		const { name, version } = await fetchPackage(event.params['name']);

		return await cache(name, () =>
			og(
				(e) => [
					e('div', {
						style: {
							fontSize: '24px',
							fontWeight: 700,
						},
						children: `${name}@${version}`,
					}),
				],
				{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'black',
					color: 'white',
					border: '1px solid black',
				},
			),
		);
	} catch (error) {
		return errorStatusMessageResponse(error);
	}
}