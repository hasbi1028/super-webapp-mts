// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Locals } from '$lib/types/locals';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			users: {
				id: number;
				email: string;
				role: string;
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
