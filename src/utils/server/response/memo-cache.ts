export const createNonKeyedMemoCache = () => {
	// in memory cache (serverless functions only)
	let v: Response | null = null;
	const fn = async (fx: () => Promise<Response>) => {
		try {
			return (v ??= await fx()).clone();
		} catch (error) {
			v = null;
			return await fx();
		}
	};
	fn.get = () => v as Response | null;
	return fn;
};

export const createKeyedMemoCache = () => {
	// in memory cache (serverless functions only)
	const v: Record<string, Response | undefined> = {};
	const fn = async (key: string, fx: () => Promise<Response>) => {
		try {
			return (v[key] ??= await fx()).clone();
		} catch (error) {
			v[key] = undefined;
			return await fx();
		}
	};
	fn.get = () => v as Record<string, Response>;
	return fn;
};
