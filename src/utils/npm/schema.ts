import * as v from 'valibot';

import { createParser } from '~/utils/valibot';

const StringSchema = v.string();
const OptionalStringSchema = v.optional(StringSchema);

export type TPackageNameSchema = v.InferOutput<typeof PackageNameSchema>;
export const PackageNameSchema = v.pipe(StringSchema, v.regex(/^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/));
export const parsePackageName = createParser(PackageNameSchema);

const DependenciesSchema = v.optional(v.record(PackageNameSchema, StringSchema));

export type TPackageSchema = v.InferOutput<typeof PackageSchema>;
export const PackageSchema = v.object({
	name: PackageNameSchema,
	version: StringSchema,
	description: OptionalStringSchema,
	license: OptionalStringSchema,
	homepage: OptionalStringSchema,
	author: v.optional(
		v.object({
			name: StringSchema,
		}),
	),
	peerDependencies: DependenciesSchema,
	dependencies: DependenciesSchema,
});
export const parsePackage = createParser(PackageSchema);

export type TPackageDownloadRangeSchema = v.InferOutput<typeof PackageDownloadRangeSchema>;
export const PackageDownloadRangeSchema = v.object({
	package: PackageNameSchema,
	start: StringSchema,
	end: StringSchema,
	downloads: v.array(
		v.object({
			downloads: v.number(),
			day: StringSchema,
		}),
	),
});
export const parsePackageDownloadRange = createParser(PackageDownloadRangeSchema);
