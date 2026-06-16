import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { students } from './index';

export const studentDocuments = sqliteTable('student_documents', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	studentId: integer('student_id')
		.references(() => students.id)
		.notNull(),

	title: text('title').notNull(), // "Ijazah", "Rapor Semester 1", ...
	filePath: text('file_path').notNull(), // /uploads/students/123/rapor1.pdf
	fileType: text('file_type').default('pdf'),

	uploadedAt: text('uploaded_at'),
	uploadedBy: integer('uploaded_by') // user_id
});
