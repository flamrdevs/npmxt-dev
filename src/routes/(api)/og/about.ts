import { createNonKeyedMemoCache } from '~/utils/server/response/memo-cache';
import { og } from '~/utils/server/response/og';

const withCache = createNonKeyedMemoCache();

export async function GET() {
	return await withCache(() =>
		og(
			(e) => [
				e('div', {
					style: {
						fontSize: '24px',
						fontWeight: 700,
					},
					children: 'About',
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
