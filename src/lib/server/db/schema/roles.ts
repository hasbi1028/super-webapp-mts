import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(), // admin, guru, siswa, tu, wali_kelas
	description: text('description')
});
