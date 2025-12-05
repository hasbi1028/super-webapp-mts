import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db/';
import { verifyPassword } from '$lib/server/auth/hash';
import { signAccessToken, signRefreshToken } from '$lib/server/auth/jwt';
import { setRefreshCookie } from '$lib/server/auth/tokens.js';
import { LoginSchema } from '$lib/server/auth/validator';
import { safeParse } from 'valibot';
import logger from '$lib/logger';

export async function POST({ request, cookies }) {
	let body;
	try {
		body = await request.json();
		const parsed = safeParse(LoginSchema, body);
		if (!parsed.success) {
			logger.warn('Login attempt with invalid schema', { body });
			return json(
				{ success: false, errors: parsed.issues.map((issue) => issue.message) },
				{ status: 400 }
			);
		}
		const { email, password } = parsed.output;
		logger.info('Login attempt', { email });
		const user = await db.query.users.findFirst({
			where: (u, { eq }) => eq(u.email, email)
		});

		if (!user) {
			logger.warn('Login attempt failed: User not found', { email });
			return json({ error: 'User not found' }, { status: 404 });
		}

		const ok = await verifyPassword(user.password, password);
		if (!ok) {
			logger.warn('Login attempt failed: Invalid credentials', { email });
			return json({ error: 'Invalid credentials' }, { status: 401 });
		}

		// access token (1 jam)
		const accessToken = await signAccessToken({
			id: user.id,
			email: user.email
		});

		// refresh token (7 hari)
		const refreshToken = await signRefreshToken({
			id: user.id
		});

		setRefreshCookie({ cookies }, refreshToken);
		logger.info('User logged in successfully', { email });

		return json({ accessToken });
	} catch (err: any) {
		logger.error('Login error', { error: err, email: body?.email });
		return json({ success: false, errors: { form: [err.message] } }, { status: 400 });
	}
}
