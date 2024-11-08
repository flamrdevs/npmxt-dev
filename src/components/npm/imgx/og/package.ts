import { OGImageResponse, height, width } from '~/server/imgx/response/og';

import { neutral_dark as neutral } from '~/imgx/colors';

export default (name: string, version: string) => {
	return OGImageResponse(
		(e) => [
			e('div', {
				style: {
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width,
					height,
					fontSize: 24,
					fontWeight: 700,
					textAlign: 'center',
				},
				children: `${name}@${version}`,
			}),
		],
		{
			style: {
				display: 'flex',
				backgroundColor: neutral[2],
				color: neutral[12],
				border: `1px solid ${neutral[3]}`,
				overflow: 'hidden',
			},
		}
	);
};
