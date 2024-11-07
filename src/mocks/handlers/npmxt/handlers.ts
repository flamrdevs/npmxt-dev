import { http, HttpResponse, delay } from 'msw';

import { MOCK_PACKAGE_METADATA } from '../registry.npmjs/handlers';

export default [
	http.get<{ 0: string }>('/api/package-creation/*', async ({ params }) => {
		if (__MSW_DELAY__) await delay(1000);

		const name = params['0'];

		if (name in MOCK_PACKAGE_METADATA) {
			return HttpResponse.json({ date: MOCK_PACKAGE_METADATA[name].time.created } satisfies { date: string }, { status: 200 });
		}

		throw HttpResponse.json({ error: 'not_found' }, { status: 404 });
	}),
];
