import { OGImageResponse } from '~/server/imgx/response/og';
import { createNonKeyedMemoCache } from '~/server/memo-cache';

import { neutral_dark as neutral } from '~/imgx/colors';

const withCache = createNonKeyedMemoCache();

export function GET() {
	return withCache(() =>
		OGImageResponse(
			(e) => [
				e('div', {
					style: {
						fontSize: 36,
						fontWeight: 700,
					},
					children: 'About',
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
		)
	);
}
