import type { IconNode } from 'lucide';

import { h } from '~/utils/imgx';

export namespace LucideIcon {
	export type Props = {
		/**
		 * @description definition
		 */
		i: IconNode;
		/**
		 * @description size
		 */
		size?: number;
		/**
		 * @description fill color
		 */
		color?: string;
	};
}

export const LucideIcon = ({ i, size = 24, color = 'currentColor' }: LucideIcon.Props) =>
	h.e('svg', {
		role: 'img',
		viewBox: '0 0 24 24',
		width: size,
		height: size,
		fill: 'none',
		stroke: color,
		strokeWidth: 1.5,
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		children: i[2]?.map(([Tag, props]) => h.e(Tag, props)),
	});
