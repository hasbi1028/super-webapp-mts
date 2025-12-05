import { verifyRefreshToken, signAccessToken, signRefreshToken } from '$lib/server/auth/jwt';
import { setRefreshCookie } from '$lib/server/auth/tokens';
import { getUserRoles, getUserPermissions } from '$lib/server/auth/rbac';
import { json } from '@sveltejs/kit';
import logger from '$lib/logger';

export async function POST({ cookies }) {
	const refresh = cookies.get('refresh_token');
	if (!refresh) {
		logger.warn('No refresh token provided');
		return json({ message: 'No refresh token provided' }, { status: 401 });
	}

	try {
		const decoded = (await verifyRefreshToken(refresh)) as any;
		logger.info('Decoded refresh token:', decoded);
		const roles = await getUserRoles(decoded.payload.id);
		logger.info('User roles:', roles);

		const permissions = await getUserPermissions(decoded.payload.id);
		logger.info('User permissions:', permissions);

		const newAccess = await signAccessToken({ id: decoded.payload.id, roles, permissions });
		const newRefresh = await signRefreshToken({ id: decoded.payload.id });

		// replace cookie
		setRefreshCookie({ cookies }, newRefresh);

		return json({ accessToken: newAccess });
	} catch (error) {
		logger.error('Error verifying refresh token:', error);
		return json({ message: 'Invalid refresh token' }, { status: 401 });
	}
}
