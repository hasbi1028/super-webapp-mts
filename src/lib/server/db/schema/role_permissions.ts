import { sqliteTable, integer } from 'drizzle-orm/sqlite-core';
import { roles } from './index';
import { permissions } from './index';

export const rolePermissions = sqliteTable('role_permissions', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	roleId: integer('role_id')
		.references(() => roles.id)
		.notNull(),
	permissionId: integer('permission_id')
		.references(() => permissions.id)
		.notNull()
});
