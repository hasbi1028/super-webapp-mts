import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema/',
	dialect: 'sqlite',
	dbCredentials: { url: './data/sqlite.db' },
	verbose: true,
	strict: true
});
