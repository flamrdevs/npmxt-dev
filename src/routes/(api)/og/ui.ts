import { createNonKeyedCache } from '~/utils/server/response/cache';
import { og } from '~/utils/server/response/og';

const cache = createNonKeyedCache();

export async function GET() {
	return await cache(() =>
		og(
			(e) => [
				e('div', {
					style: {
						fontSize: '24px',
						fontWeight: 700,
					},
					children: 'UI',
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
}
