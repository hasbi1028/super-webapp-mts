import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const permissions = sqliteTable('permissions', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(), // e.g: "student.read", "user.manage"
	description: text('description')
});
