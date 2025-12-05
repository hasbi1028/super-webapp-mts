import { pgTable, serial, integer, text } from 'drizzle-orm/pg-core';
import { students } from './index';
import { classes } from './index';

export const studentClasses = pgTable('student_classes', {
	id: serial('id').primaryKey(),
	studentId: integer('student_id')
		.references(() => students.id)
		.notNull(),
	classId: integer('class_id')
		.references(() => classes.id)
		.notNull(),
	tahunAjaran: text('tahun_ajaran').notNull() // "2024/2025"
});
