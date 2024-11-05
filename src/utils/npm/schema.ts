import * as v from 'valibot';

import { createParser } from '~/utils/valibot';

const StringSchema = v.string();
const OptionalStringSchema = v.optional(StringSchema);

const PACKAGE_NAME_REGEXP = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
export type TPackageNameSchema = v.InferOutput<typeof PackageNameSchema>;
export const PackageNameSchema = v.pipe(StringSchema, v.trim(), v.regex(PACKAGE_NAME_REGEXP, `${__DEV__ ? '[valibot] ' : ''} Invalid package name format`));
export const parsePackageName = createParser(PackageNameSchema);

export type TPackageMetadataSchema = v.InferOutput<typeof PackageMetadataSchema>;
export const PackageMetadataSchema = v.object({});
export const parsePackageMetadata = createParser(PackageMetadataSchema);

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

export const PACKAGE_DOWNLOAD_RANGE_LAST_MAP = {
	day: 1,
	week: 7,
	month: 30,
	year: 365,
};
export const PACKAGE_DOWNLOAD_RANGE_LAST_LIST = Object.keys(PACKAGE_DOWNLOAD_RANGE_LAST_MAP) as (keyof typeof PACKAGE_DOWNLOAD_RANGE_LAST_MAP)[];
export type TPackageDownloadRangeLastSchema = v.InferOutput<typeof PackageDownloadRangeLastSchema>;
export const PackageDownloadRangeLastSchema = v.picklist(PACKAGE_DOWNLOAD_RANGE_LAST_LIST);
export const parsePackageDownloadRangeLast = createParser(PackageDownloadRangeLastSchema);

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
