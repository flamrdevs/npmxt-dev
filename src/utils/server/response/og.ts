import { type CSS, type Children, h } from '~/utils/imgx';

import { png } from './imgx';

export const og = (children: (e: typeof h.e) => Children, style: Partial<CSS.Properties.Root> = {}) =>
	png(
		h.r('div', {
			style: {
				width: 1200,
				height: 680,
				...style,
			},
			children: children(h.e),
		}),
	);
