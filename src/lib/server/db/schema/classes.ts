import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const classes = sqliteTable('classes', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(), // "7A", "8B"
	homerunTeacherId: integer('homerun_teacher_id'), // userId (guru)
	schoolId: integer('school_id'), // Added for e-rapor multi-school support
	academicYearId: integer('academic_year_id'), // Added for e-rapor
	gradeLevelId: integer('grade_level_id'), // Added for e-rapor
	capacity: integer('capacity').default(32),
	createdAt: text('created_at')
});
