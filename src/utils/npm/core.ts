import * as v from 'valibot';

import { createParser } from './../valibot';

export type PackageNameSchema = v.InferOutput<typeof PackageNameSchema>;
export const PackageNameSchema = v.pipe(v.string(), v.regex(/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/));

export type PackageNameObjectSchema = v.InferOutput<typeof PackageNameObjectSchema>;
export const PackageNameObjectSchema = v.object({ name: PackageNameSchema });

export const parsePackageName = createParser(PackageNameSchema);

export const parsePackageNameObject = createParser(PackageNameObjectSchema);
