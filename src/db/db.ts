import { drizzle } from 'drizzle-orm/libsql/http';

export const db = drizzle({
	connection: {
		url: __ENV__.TURSO_DATABASE_URL,
		authToken: __ENV__.TURSO_AUTH_TOKEN,
	},
});
