export const createNonKeyedCache = () => {
	// in memory cache (serverless functions only)
	let v: Response | null = null;
	const fn = async (fx: () => Promise<Response>) => (v ??= await fx()).clone();
	fn.get = () => v as Response | null;
	return fn;
};

export const createKeyedCache = () => {
	// in memory cache (serverless functions only)
	const v: Record<string, Response> = {};
	const fn = async (key: string, fx: () => Promise<Response>) => (v[key] ??= await fx()).clone();
	fn.get = () => v as Record<string, Response>;
	return fn;
};
