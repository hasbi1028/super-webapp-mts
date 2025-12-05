import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { students } from './index';

export const studentDocuments = pgTable('student_documents', {
	id: serial('id').primaryKey(),
	studentId: integer('student_id')
		.references(() => students.id)
		.notNull(),

	title: text('title').notNull(), // "Ijazah", "Rapor Semester 1", ...
	filePath: text('file_path').notNull(), // /uploads/students/123/rapor1.pdf
	fileType: text('file_type').default('pdf'),

	uploadedAt: timestamp('uploaded_at').defaultNow(),
	uploadedBy: integer('uploaded_by') // user_id
});
