import { json } from '@solidjs/router';

import { db } from '~/db/db';
import { packageCreationTable } from '~/db/schema';

import { errorStatusMessageResponse } from '~/utils/server/response/error';

export async function GET() {
	try {
		const rows = await db.select().from(packageCreationTable);

		return json(rows.map(({ n, d, t }) => [n, d, t]));
	} catch (error) {
		return errorStatusMessageResponse(error);
	}
}
