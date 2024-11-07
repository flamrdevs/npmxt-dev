import { type ResvgRenderOptions, renderAsync } from '@resvg/resvg-js';

import type { Node } from './types';

import { svg } from './svg';

const resvgRenderOptions: ResvgRenderOptions = {
	fitTo: { mode: 'original' },
	imageRendering: 0,
	shapeRendering: 2,
	dpi: 300,
};

export const png = async (node: Node.Root) => (await renderAsync(await svg(node), resvgRenderOptions)).asPng();
