import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as usersSchema from './schema/users';
import * as rolesSchema from './schema/roles';
import * as permissionsSchema from './schema/permissions';
import * as userRolesSchema from './schema/user_roles';
import * as rolePermissionsSchema from './schema/role_permissions';
import * as studentClassesSchema from './schema/student_claseses';
// import other schemas as needed

const schema = {
	...usersSchema,
	...rolesSchema,
	...permissionsSchema,
	...userRolesSchema,
	...rolePermissionsSchema,
	...studentClassesSchema
	// add other schemas here
};

import { env } from '$env/dynamic/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });
