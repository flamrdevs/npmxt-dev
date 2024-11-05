import { json } from '@solidjs/router';

import { eq } from 'drizzle-orm';

import { ofetch } from 'ofetch';

import * as v from 'valibot';

import { db } from '~/db/db';
import { packageCreationTable } from '~/db/schema';

import { PackageNameSchema, parsePackageName } from '~/utils/npm/schema';
import { BASE_URL_REGISTRY } from '~/utils/npm/url';
import { cacheControl } from '~/utils/server/header';
import { errorStatusMessageResponse } from '~/utils/server/response/error';
import { createKeyedMemoCache } from '~/utils/server/response/memo-cache';
import { createParser } from '~/utils/valibot';

const parsePackageMetadata = createParser(
	v.object({
		name: PackageNameSchema,
		time: v.object({
			created: v.string(),
		}),
	}),
);

const withCache = createKeyedMemoCache();

const getPackageCreationDate = async (validName: string): Promise<string> => {
	const now = Date.now();

	const where = eq(packageCreationTable.n, validName);

	const rows = await db.select({ d: packageCreationTable.d, t: packageCreationTable.t }).from(packageCreationTable).where(where).limit(1);

	if (rows.length && now < rows[0].t) {
		if (__DEV__) console.log(`[db:package_creation] ${'cache hit'.padEnd(11)} | ${validName}`);
		return rows[0].d;
	}

	const {
		name,
		time: { created: date },
	} = parsePackageMetadata(await ofetch(`${BASE_URL_REGISTRY}/${validName}`));

	const t = now + 2592000000; // + 30 days

	if (rows.length) {
		await db.update(packageCreationTable).set({ d: date, t }).where(where);
	} else {
		await db.insert(packageCreationTable).values({ n: name, d: date, t });
	}
	if (__DEV__) console.log(`[db:package_creation] ${'cache miss'.padEnd(11)} | ${validName}`);
	return date;
};

export async function GET(event: SolidJS.Start.Server.APIEvent) {
	try {
		if (new URL(event.request.url).searchParams.has('cache')) return json(Object.keys(withCache.get()));

		const validName = parsePackageName(event.params['name']);

		return await withCache(validName, async () => {
			return json(
				{ date: await getPackageCreationDate(validName) },
				{
					headers: {
						...cacheControl('public, durable, max-age=43200, s-maxage=43200' /* 12 hours */),
					},
				},
			);
		});
	} catch (error) {
		return errorStatusMessageResponse(error);
	}
}
