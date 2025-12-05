export function setRefreshCookie(event: any, refreshToken: string) {
	event.cookies.set('refresh_token', refreshToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 60 * 60 * 24 * 7
	});
}

export function clearRefreshCookie(event: any) {
	event.cookies.delete('refresh_token', { path: '/' });
}
