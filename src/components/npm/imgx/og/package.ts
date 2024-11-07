import { height, og, width } from '~/server/response/og';

import * as colors from './../styles/colors';

export default (name: string, version: string) => {
	const theme = 'dark';

	const neutral = colors.n[theme];

	return og(
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
			display: 'flex',
			backgroundColor: neutral[1],
			color: neutral[12],
			border: `1px solid ${neutral[3]}`,
			overflow: 'hidden',
		},
	);
};
