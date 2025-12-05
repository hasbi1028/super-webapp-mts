import { db } from '$lib/server/db/index';
import { roles, rolePermissions, permissions, userRoles } from '$lib/server/db/schema/index';
import { eq, inArray } from 'drizzle-orm';

// get roles by user_id
export async function getUserRoles(userId: number) {
	const result = await db
		.select({
			role: roles.name
		})
		.from(userRoles)
		.leftJoin(roles, eq(userRoles.roleId, roles.id))
		.where(eq(userRoles.userId, userId));

	return result.map((r) => r.role);
}

// get permissions from roles
export async function getUserPermissions(userId: number) {
	const userRoleIds = await db
		.select({ id: userRoles.roleId })
		.from(userRoles)
		.where(eq(userRoles.userId, userId));

	const roleIds = userRoleIds.map((r) => r.id);
	if (roleIds.length === 0) return [];

	const perms = await db
		.select({ permission: permissions.name })
		.from(rolePermissions)
		.leftJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
		.where(inArray(rolePermissions.roleId, roleIds));

	return perms.map((p) => p.permission);
}
