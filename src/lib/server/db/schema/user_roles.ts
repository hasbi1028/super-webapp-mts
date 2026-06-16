import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { users } from './index';
import { roles } from './index';

export const userRoles = sqliteTable('user_roles', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	userId: integer('user_id')
		.references(() => users.id)
		.notNull(),
	roleId: integer('role_id')
		.references(() => roles.id)
		.notNull()
});
