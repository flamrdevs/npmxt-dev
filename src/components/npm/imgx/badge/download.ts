import { Download } from 'lucide';

import { svg } from '~/server/response/imgx';

import { h } from '~/imgx';
import { formatNumberCompact } from '~/utils/formatter';

import * as colors from './../styles/colors';

import { LucideIcon } from '../icons/lucide';

export const y = (downloads: number) => {
	const theme = 'dark';

	const neutral = colors.n[theme];

	const text = `${formatNumberCompact(downloads)}/year`;

	const height = 24;
	const width = 24 + (text.length * 8 + 16);

	return svg(
		h.r('div', {
			style: {
				display: 'flex',
				width,
				height,
				backgroundColor: neutral[9],
				color: 'white',
				border: `1px solid ${neutral[10]}`,
				borderRadius: 10,
				overflow: 'hidden',
			},
			children: [
				h.e('div', {
					style: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'absolute',
						top: 0,
						left: 0,
						paddingBottom: 2,
						paddingLeft: 2,
						width: height,
						height: height,
						backgroundColor: neutral[9],
						color: 'white',
					},
					children: LucideIcon({ i: Download, size: 14, color: 'white' }),
				}),
				h.e('div', {
					style: {
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'absolute',
						top: 0,
						left: height,
						paddingRight: 2,
						paddingBottom: 2,
						width: width - height,
						height: height,
						backgroundColor: neutral[7],
						color: 'white',
						fontSize: 12,
						fontWeight: 500,
					},
					children: text,
				}),
			],
		}),
	);
};
