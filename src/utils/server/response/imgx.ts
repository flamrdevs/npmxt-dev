import type { Node } from '~/utils/imgx';

type Options = { maxAge?: number };

const init = (contentType: string, options?: Options) => {
	const maxAge = options?.maxAge ?? (__DEV__ ? 1 : 86400);

	const cache = `public, durable, max-age=${maxAge}, s-maxage=${maxAge}`;
	return {
		headers: {
			'Content-Type': contentType,
			'Netlify-CDN-Cache-Control': cache,
			'CDN-Cache-Control': cache,
			'Cache-Control': cache,
		},
	};
};

export const svg = async (node: Node.Root, options?: Options) => new Response(await (await import('~/utils/imgx/svg')).svg(node), init('image/svg+xml', options));

export const png = async (node: Node.Root, options?: Options) => new Response(await (await import('~/utils/imgx/png')).png(node), init('image/png', options));
