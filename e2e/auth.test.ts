// tests/auth-cookie.spec.ts
import { test, expect, request, Browser, chromium } from '@playwright/test';

test.describe('Auth flow with refresh-token via cookie', () => {
	let browser: Browser;
	let context: any;
	let apiContext: any = null;
	let accessToken: string;
	let randomEmail: string;

	test.beforeAll(async () => {
		browser = await chromium.launch();
		context = await browser.newContext(); // browser context
		apiContext = context.request; // APIRequestContext tied to browserContext
	});

	test.afterAll(async () => {
		await browser.close();
	});

	test('register user random', async () => {
		randomEmail = `user${Math.floor(Math.random() * 10000)}@example.com`;
		const response = await apiContext.post('http://localhost:5173/api/auth/register', {
			data: {
				email: randomEmail,
				password: 'password123',
				fullName: 'Test User'
			}
		});
		const bodyres = await response.json();
		console.log('Register Response:', bodyres);
		expect(response.ok()).toBeTruthy();
		const body = await response.json();
		expect(body.message).toBe('Registrasi berhasil');
	});

	test('login → mendapat access token & cookie refresh', async () => {
		const response = await apiContext.post('http://localhost:5173/api/auth/login', {
			data: {
				email: randomEmail,
				password: 'password123'
			}
		});
		const bodyres = await response.json();
		console.log('Login Response:', bodyres);
		expect(response.ok()).toBeTruthy();
		const body = await response.json();
		accessToken = body.accessToken;
		expect(typeof accessToken).toBe('string');
		// console.log('Access Token:', accessToken);

		const cookies = await context.cookies();
		const refreshCookie = cookies.find((c: any) => c.name === 'refresh_token');
		expect(refreshCookie).toBeDefined();
		// console.log('Refresh Token Cookie:', refreshCookie);
		// Cookie "refresh_token" harus sudah otomatis diset di context
	});

	test('login salah input → mendapat error 400', async () => {
		const response = await apiContext.post('http://localhost:5173/api/auth/login', {
			data: {
				email: 'not-an-email',
				password: ''
			}
		});
		const bodyres = await response.json();
		console.log('Invalid Login Response:', bodyres);
		expect(response.status()).toBe(400);
		const body = await response.json();
		expect(body.success).toBe(false);
		expect(body.errors).toBeDefined();
		// console.log('Validation Errors:', body.errors);
	});

	test('refresh token via cookie → dapat access token baru', async () => {
		const refreshRes = await apiContext.post('http://localhost:5173/api/auth/refresh');
		expect(refreshRes.ok()).toBeTruthy();
		const refreshBody = await refreshRes.json();
		accessToken = refreshBody.accessToken;
		expect(typeof accessToken).toBe('string');

		// Coba akses protected lagi
		const res2 = await apiContext.get('http://localhost:5173/', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});
		expect(res2.ok()).toBeTruthy();
		if (res2.ok()) {
			const data2 = await res2;
			console.log('status protected data after refresh:', data2.status());
		}
	});

	test('logout → menghapus cookie refresh token', async () => {
		const logoutRes = await apiContext.post('http://localhost:5173/api/auth/logout');
		expect(logoutRes.ok()).toBeTruthy();

		// Cek cookie sudah dihapus
		const cookiesAfterLogout = await context.cookies();
		const refreshCookieAfterLogout = cookiesAfterLogout.find(
			(c: any) => c.name === 'refresh_token'
		);
		expect(refreshCookieAfterLogout).toBeUndefined();
	});
});
