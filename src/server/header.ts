export const cacheControl = (value: string) => ({
	'Cache-Control': value,
	'CDN-Cache-Control': value,
	'Vercel-CDN-Cache-Control': value,
});
