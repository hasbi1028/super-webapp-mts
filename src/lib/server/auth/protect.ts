import { json } from '@sveltejs/kit';

export function protect(event: any, requiredPermissions = []) {
	const user = event.locals.user;

	if (!user) {
		throw json({ error: 'Unauthorized' }, { status: 401 });
	}

	if (requiredPermissions.length > 0) {
		const hasPerm = requiredPermissions.some((p) => user.permissions?.includes(p));
		if (!hasPerm) {
			throw json({ error: 'Forbidden' }, { status: 403 });
		}
	}

	return user;
}
