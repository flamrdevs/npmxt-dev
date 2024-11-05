import { defineConfig } from 'drizzle-kit';

import __ENV__ from './__ENV__';

export default defineConfig({
	out: './drizzle',
	schema: './src/db/schema.ts',
	dialect: 'turso',
	dbCredentials: {
		url: __ENV__.TURSO_DATABASE_URL,
		authToken: __ENV__.TURSO_AUTH_TOKEN,
	},
});
