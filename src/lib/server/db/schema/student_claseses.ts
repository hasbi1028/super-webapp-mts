import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { students } from './index';
import { classes } from './index';

export const studentClasses = sqliteTable('student_classes', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	studentId: integer('student_id')
		.references(() => students.id)
		.notNull(),
	classId: integer('class_id')
		.references(() => classes.id)
		.notNull(),
	tahunAjaran: text('tahun_ajaran').notNull() // "2024/2025"
});
