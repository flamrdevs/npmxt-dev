import { cacheControl } from '../header';

export type Options = {
	maxAge?: number;
	headers?: Record<string, string>;
};

export const createResponseInit = (contentType: string, { maxAge = __DEV__ ? 1 : 86400, headers = {} }: Options = {}) => {
	return {
		headers: {
			'Content-Type': contentType,
			...cacheControl(`public, durable, max-age=${maxAge}, s-maxage=${maxAge}`),
			'Cross-Origin-Resource-Policy': 'cross-origin',
			...headers,
		},
	};
};
