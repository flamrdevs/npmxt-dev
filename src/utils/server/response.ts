export const createNonKeyedCache = () => {
  let v: Response | null = null;
  const fn = async (fx: () => Promise<Response>) => (v ??= await fx()).clone();
  fn.v = v;
  return fn;
};

export const createKeyedCache = () => {
  const v: Record<string, Response> = {};
  const fn = async (key: string, fx: () => Promise<Response>) => (v[key] ??= await fx()).clone();
  fn.v = v;
  return fn;
};
