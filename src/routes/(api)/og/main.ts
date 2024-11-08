import { OGImageResponse } from '~/server/imgx/response/og';
import { createNonKeyedMemoCache } from '~/server/memo-cache';

import * as colors from '~/imgx/colors';

const withCache = createNonKeyedMemoCache();

export async function GET() {
	return await withCache(() => {
		const theme = 'dark';

		const neutral = colors.n[theme];

		return OGImageResponse(
			(e) => [
				e('div', {
					style: {
						fontSize: 24,
						fontWeight: 700,
					},
					children: 'Main',
				}),
			],
			{
				style: {
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: neutral[2],
					color: neutral[12],
					border: `1px solid ${neutral[6]}`,
				},
				maxAge: 864000, // 10 days
			}
		);
	});
}
