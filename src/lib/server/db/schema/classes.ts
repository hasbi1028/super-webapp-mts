import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const classes = pgTable('classes', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(), // "7A", "8B"
	homerunTeacherId: integer('homerun_teacher_id') // userId (guru)
});
