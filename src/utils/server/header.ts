export const cacheControl = (value: string) => ({
	'Netlify-CDN-Cache-Control': value,
	'CDN-Cache-Control': value,
	'Cache-Control': value,
});
