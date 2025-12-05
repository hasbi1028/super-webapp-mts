import { clearRefreshCookie } from '$lib/server/auth/tokens';
import { json } from '@sveltejs/kit';
import logger from '$lib/logger';

export async function POST({ cookies }) {
	try {
		clearRefreshCookie({ cookies });
		logger.info('User logged out');
		return json({ message: 'Logged out successfully' });
	} catch (err: any) {
		logger.error('Logout error', { error: err });
		return json({ success: false, errors: { form: [err.message] } }, { status: 500 });
	}
}
