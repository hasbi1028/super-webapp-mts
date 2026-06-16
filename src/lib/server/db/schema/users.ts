import { sqliteTable, text, integer, real, numeric } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	fullName: text('full_name').notNull(),
	isActive: integer('is_active', { mode: 'boolean' }).default(true),
	createdAt: text('created_at')
});
