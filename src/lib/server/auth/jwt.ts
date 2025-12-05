// src/lib/auth/jwt.ts
import { importPKCS8, importSPKI, SignJWT, jwtVerify, type JWTPayload } from 'jose';
import fs from 'fs';

const ACCESS_PRIVATE_KEY = fs.readFileSync('keys/access_private.pem', 'utf-8');
const ACCESS_PUBLIC_KEY = fs.readFileSync('keys/access_public.pem', 'utf-8');
const REFRESH_PRIVATE_KEY = fs.readFileSync('keys/refresh_private.pem', 'utf-8');
const REFRESH_PUBLIC_KEY = fs.readFileSync('keys/refresh_public.pem', 'utf-8');

export async function signAccessToken(payload: JWTPayload) {
	const privateKey = await importPKCS8(ACCESS_PRIVATE_KEY, 'RS256');
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'RS256' })
		.setExpirationTime('15m')
		.sign(privateKey);
}

export async function signRefreshToken(payload: JWTPayload) {
	const privateKey = await importPKCS8(REFRESH_PRIVATE_KEY, 'RS256');
	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'RS256' })
		.setExpirationTime('7d')
		.sign(privateKey);
}

export async function verifyAccessToken(token: string) {
	const publicKey = await importSPKI(ACCESS_PUBLIC_KEY, 'RS256');
	return jwtVerify(token, publicKey);
}

export async function verifyRefreshToken(token: string) {
	const publicKey = await importSPKI(REFRESH_PUBLIC_KEY, 'RS256');
	return jwtVerify(token, publicKey);
}
