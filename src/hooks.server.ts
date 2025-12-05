// // import { verifyAccessToken } from '$lib/server/auth/jwt';

// // export const handle = async ({ event, resolve }) => {
// // 	const auth = event.request.headers.get('authorization');
// // 		// console.log('Authorization header found', auth);
// // 		console.log(event.request.headers);

// // 	if (auth?.startsWith('Bearer')) {
// // 		const token = auth.split(' ')[1];
// // 		// console.log('Found Authorization header with token:', token);

// // 		try {
// // 			const decoded = verifyAccessToken(token);
// // 			console.log('Decoded JWT:', decoded);
// // 			event.locals.user = {
// // 				id: decoded.id,
// // 				email: decoded.email,
// // 				roles: decoded.roles || [],
// // 				permissions: decoded.permissions || []
// // 			};
// // 		} catch {
// // 			// event.locals.user = null;
// // 			event.locals.user = null;
// // 		}
// // 	} else {
// // 		console.log('No Authorization header found');
// // 		// event.locals.user = null;
// // 		event.locals.user = null;
// // 	}

// // 	return resolve(event);
// // };

// // src/hooks.server.ts
// import type { Handle } from '@sveltejs/kit';
// import { verifyAccessToken } from '$lib/server/auth/jwt';
// import logger from "$lib/logger";

// export const handle: Handle = async ({ event, resolve }) => {
// 	logger.info(`Incoming request: ${event.request.method} ${event.url.pathname}`);
// 	const authHeader = event.request.headers.get('authorization');
// 	if (authHeader?.startsWith('Bearer ')) {
// 		const token = authHeader.split(' ')[1];
// 		try {
// 			const { payload } = await verifyAccessToken(token);
// 			event.locals.users = {
// 				id: Number(payload.sub),
// 				email: payload.email as string,
// 				role: payload.role as string
// 			};
// 		} catch (err) {
// 			  logger.warn("Invalid access token", err);
// 			event.locals.users = null;
// 		}
// 	} else {
// 		event.locals.users = null;
// 	}

// 	const response = await resolve(event);
// 	logger.info(`Outgoing response: ${response.status} ${event.url.pathname}`);
// 	return response;
// };

// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { verifyAccessToken } from '$lib/server/auth/jwt';
import logger from '$lib/logger';

export const handle: Handle = async ({ event, resolve }) => {
	const start = Date.now();

	// bisa log request masuk
	logger.info(`Request ${event.request.method} ${event.request.url}`);

	// auth check
	const auth = event.request.headers.get('authorization');
	if (auth?.startsWith('Bearer ')) {
		const token = auth.split(' ')[1];
		try {
			const { payload } = await verifyAccessToken(token);
			event.locals.users = {
				id: Number(payload.sub),
				email: payload.email as string,
				role: payload.role as string
			};
		} catch (err) {
			logger.warn('Invalid access token', { error: err });
			event.locals.users = null;
		}
	} else {
		event.locals.users = null;
	}

	const response = await resolve(event);

	const ms = Date.now() - start;
	// log response time
	logger.info(
		`Response ${event.request.method} ${event.request.url} - ${response.status} (${ms}ms)`
	);

	return response;
};
