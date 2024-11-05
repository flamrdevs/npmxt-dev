import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const packageCreationTable = sqliteTable('package_creation_table', {
	// name
	n: text().primaryKey(),
	// date
	d: text().notNull(),
	// expires
	t: int().notNull(),
});
