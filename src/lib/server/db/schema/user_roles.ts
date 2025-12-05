import { pgTable, serial, integer } from 'drizzle-orm/pg-core';
import { users } from './index';
import { roles } from './index';

export const userRoles = pgTable('user_roles', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.references(() => users.id)
		.notNull(),
	roleId: integer('role_id')
		.references(() => roles.id)
		.notNull()
});
