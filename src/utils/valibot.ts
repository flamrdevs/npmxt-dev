import * as v from 'valibot';

export type UnknownBaseSchema = v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>;

export type Parser<T extends UnknownBaseSchema, I = unknown> = {
	(input: I): v.InferOutput<T>;
	safe: (input: I) => v.SafeParseResult<T>;
};

export const createParser = <T extends UnknownBaseSchema>(schema: T) => {
	const fn = ((input: unknown) => v.parse(schema, input)) as Parser<T>;
	fn.safe = (input: unknown) => v.safeParse(schema, input);
	return fn;
};

export const createStrictParserCreator =
	<Fx extends (input: any) => any>(fx: Fx) =>
	<T extends UnknownBaseSchema>(schema: T) => {
		type FxInput = Parameters<Fx>[0];
		const fn = ((input: FxInput) => v.parse(schema, fx(input))) as Parser<T, FxInput>;
		fn.safe = (input: FxInput) => v.safeParse(schema, fx(input));
		return fn;
	};

// export const simpleSafeParseResult = <T extends UnknownBaseSchema>(result: v.SafeParseResult<T>) =>
//   result.success ? ([undefined, result.output] as const) : ([result.issues, undefined] as const);
