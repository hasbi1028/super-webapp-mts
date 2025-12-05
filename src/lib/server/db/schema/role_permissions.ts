import { pgTable, serial, integer } from 'drizzle-orm/pg-core';
import { roles } from './index';
import { permissions } from './index';

export const rolePermissions = pgTable('role_permissions', {
	id: serial('id').primaryKey(),
	roleId: integer('role_id')
		.references(() => roles.id)
		.notNull(),
	permissionId: integer('permission_id')
		.references(() => permissions.id)
		.notNull()
});
