import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	fullName: text('full_name').notNull(),
	isActive: boolean('is_active').default(true),
	createdAt: timestamp('created_at').defaultNow()
});
