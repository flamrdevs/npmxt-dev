import type { Node } from '~/imgx';

import { cacheControl } from '../header';

type Options = {
	maxAge?: number;
	headers?: Record<string, string>;
};

const init = (contentType: string, { maxAge = __DEV__ ? 1 : 86400, headers = {} }: Options = {}) => {
	return {
		headers: {
			'Content-Type': contentType,
			...cacheControl(`public, max-age=${maxAge}, s-maxage=${maxAge}`),
			'Cross-Origin-Resource-Policy': 'cross-origin',
			...headers,
		},
	};
};

export const svg = async (node: Node.Root, options?: Options) => new Response(await (await import('~/imgx/svg')).svg(node), init('image/svg+xml', options));

export const png = async (node: Node.Root, options?: Options) => new Response(await (await import('~/imgx/png')).png(node), init('image/png', options));
