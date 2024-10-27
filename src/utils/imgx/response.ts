import type { Node } from './types';

type Options = { maxAge?: number };

const init = (contentType: string, options?: Options) => ({
	headers: {
		'content-type': contentType,
		'cache-control': `public, max-age=${options?.maxAge ?? (import.meta.env.DEV ? 1 : 86400)}`,
	},
});

export const svg = async (node: Node.Root, options?: Options) => {
	return new Response(await (await import('./core/svg')).svg(node), init('image/svg+xml', options));
};

export const png = async (node: Node.Root, options?: Options) => {
	return new Response(await (await import('./core/png')).png(node), init('image/png', options));
};
