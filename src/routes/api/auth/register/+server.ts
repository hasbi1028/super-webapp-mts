import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema/users';
import { hashPassword } from '$lib/server/auth/hash';
import { userRoles } from '$lib/server/db/schema/user_roles';
import { roles } from '$lib/server/db/schema/roles';
import { eq } from 'drizzle-orm';
import { registerSchema } from '$lib/server/auth/validator';
import { map, safeParse } from 'valibot';
import logger from '$lib/logger';

export async function POST({ request, cookies }) {
	try {
		const body = await request.json();
		logger.info('Registration request received', { email: body.email });

		const parsed = safeParse(registerSchema, body);
		if (!parsed.success) {
			logger.warn('Registration validation failed', {
				errors: parsed.issues.map((i) => i.message)
			});
			return json({ errors: parsed.issues }, { status: 400 });
		}
		const { email, password, fullName } = parsed.output;

		// cek apakah email sudah dipakai
		const exist = await db.query.users.findFirst({
			where: eq(users.email, email)
		});

		if (exist) {
			logger.warn('Registration failed: email already exists', { email });
			return json({ error: 'Email sudah terdaftar' }, { status: 409 });
		}

		// hash password
		const hashed = await hashPassword(password);

		// buat user baru
		const [newUser] = await db
			.insert(users)
			.values({
				email,
				password: hashed,
				fullName
			})
			.returning();

		logger.info('New user created', { userId: newUser.id, email });

		// assign role default
		const defaultRole = await db.query.roles.findFirst({
			where: eq(roles.name, 'user')
		});

		if (defaultRole) {
			await db.insert(userRoles).values({
				userId: newUser.id,
				roleId: defaultRole.id
			});
			logger.info('Default role assigned', { userId: newUser.id, roleId: defaultRole.id });
		} else {
			logger.warn('Default role not found for user', { userId: newUser.id });
		}

		return json({
			message: 'Registrasi berhasil'
		});
	} catch (error) {
		logger.error('Registration error', { error: error instanceof Error ? error.message : error });
		return json({ error: 'Registrasi gagal' }, { status: 500 });
	}
}
