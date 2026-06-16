import { sqliteTable, text, integer, real, numeric } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { students } from './students';

// ============================================
// MASTER DATA - SEKOLAH & TAHUN AJARAN
// ============================================

export const schools = sqliteTable('schools', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  npsn: text('npsn').notNull().unique(),
  name: text('name').notNull(),
  address: text('address'),
  phone: text('phone'),
  email: text('email'),
  logo: text('logo'), // URL/path ke logo sekolah
  createdAt: text('created_at'),
  updatedAt: text('updated_at')
});

export const academicYears = sqliteTable('academic_years', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  year: text('year').notNull(), // Format: "2024/2025"
  startDate: text('start_date'),
  endDate: text('end_date'),
  isActive: integer('is_active', { mode: 'boolean' }).default(false).notNull(),
  createdAt: text('created_at')
});

export const semesters = sqliteTable('semesters', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  academicYearId: integer('academic_year_id').references(() => academicYears.id).notNull(),
  name: text('name').notNull(), // "Ganjil" atau "Genap"
  code: text('code').notNull(), // "1" atau "2"
  startDate: text('start_date'),
  endDate: text('end_date'),
  isActive: integer('is_active', { mode: 'boolean' }).default(false).notNull(),
  createdAt: text('created_at')
});

// ============================================
// KELAS & PEMBELAJARAN
// ============================================

export const gradeLevels = sqliteTable('grade_levels', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  level: integer('level').notNull(), // 1-6 untuk SD
  phase: text('phase').notNull(), // "A" (1-2), "B" (3-4), "C" (5-6)
  name: text('name').notNull() // "Kelas 1", "Kelas 2", dst.
});

export const classes = sqliteTable('classes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  schoolId: integer('school_id').references(() => schools.id).notNull(),
  academicYearId: integer('academic_year_id').references(() => academicYears.id).notNull(),
  gradeLevelId: integer('grade_level_id').references(() => gradeLevels.id).notNull(),
  name: text('name').notNull(), // "1A", "2B", dst.
  teacherId: integer('teacher_id'), // Wali kelas
  capacity: integer('capacity').default(32),
  createdAt: text('created_at')
});

// ============================================
// MATA PELAJARAN & STRUKTUR KURIKULUM
// ============================================

export const subjects = sqliteTable('subjects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  category: text('category').notNull(), // "Umum", "Muatan Lokal", "P5", "Ekstrakurikuler"
  group: text('group'), // Kelompok mata pelajaran
  isReligion: integer('is_religion', { mode: 'boolean' }).default(false), // Mata pelajaran agama
  order: integer('order').default(0) // Urutan tampilan di raport
});

export const subjectAllocations = sqliteTable('subject_allocations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  classId: integer('class_id').references(() => classes.id).notNull(),
  subjectId: integer('subject_id').references(() => subjects.id).notNull(),
  teacherId: integer('teacher_id').notNull(), // Guru pengampu
  semesterId: integer('semester_id').references(() => semesters.id).notNull(),
  jpPerWeek: integer('jp_per_week').default(0), // Jam pelajaran per minggu
  createdAt: text('created_at')
});

// ============================================
// PENILAIAN - KOMPETENSI & CAPAIAN
// ============================================

export const competencyStandards = sqliteTable('competency_standards', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  subjectId: integer('subject_id').references(() => subjects.id).notNull(),
  gradeLevelId: integer('grade_level_id').references(() => gradeLevels.id).notNull(),
  code: text('code').notNull(), // Kode CP dari Kemendikbud
  description: text('description').notNull(), // Deskripsi Capaian Pembelajaran
  element: text('element'), // Elemen CP (misal: "Menyimak", "Membaca")
  phase: text('phase').notNull(), // Fase A, B, C
  createdAt: text('created_at')
});

export const assessments = sqliteTable('assessments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  subjectAllocationId: integer('subject_allocation_id').references(() => subjectAllocations.id).notNull(),
  name: text('name').notNull(), // Nama penilaian (misal: "UH Tema 1", "UTS")
  type: text('type').notNull(), // "Formatif", "Sumatif", "Tengah Semester", "Akhir Semester"
  method: text('method'), // "Tes Tertulis", "Observasi", "Portofolio", "Unjuk Kerja"
  maxScore: real('max_score').default(100).notNull(),
  weight: real('weight').default(1), // Bobot nilai
  dueDate: text('due_date'),
  description: text('description'),
  createdAt: text('created_at')
});

export const studentScores = sqliteTable('student_scores', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  assessmentId: integer('assessment_id').references(() => assessments.id).notNull(),
  studentId: integer('student_id').references(() => students.id).notNull(),
  score: real('score').notNull(),
  notes: text('notes'), // Catatan guru untuk penilaian ini
  submittedAt: text('submitted_at'),
  gradedAt: text('graded_at'),
  gradedBy: integer('graded_by'), // ID guru yang menilai
  createdAt: text('created_at'),
  updatedAt: text('updated_at')
});

// ============================================
// DESKRIPSI CAPAIAN - KHUSUS KURIKULUM MERDEKA
// ============================================

export const achievementDescriptions = sqliteTable('achievement_descriptions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  studentId: integer('student_id').references(() => students.id).notNull(),
  subjectAllocationId: integer('subject_allocation_id').references(() => subjectAllocations.id).notNull(),
  semesterId: integer('semester_id').references(() => semesters.id).notNull(),
  finalScore: real('final_score').notNull(),
  predicate: text('predicate'), // "A", "B", "C", "D" atau "BSB", "BSH", "MB", "BB"
  description: text('description').notNull(), // Deskripsi naratif capaian siswa
  createdBy: integer('created_by').notNull(), // Guru yang membuat deskripsi
  createdAt: text('created_at'),
  updatedAt: text('updated_at')
});

// ============================================
// PROJEK PENGUATAN PROFIL PELAJAR PANCASILA (P5)
// ============================================

export const p5Themes = sqliteTable('p5_themes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  description: text('description')
});

export const p5Dimensions = sqliteTable('p5_dimensions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  description: text('description')
});

export const p5Elements = sqliteTable('p5_elements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  dimensionId: integer('dimension_id').references(() => p5Dimensions.id).notNull(),
  code: text('code').notNull(),
  name: text('name').notNull(),
  phase: text('phase').notNull() // Fase pencapaian
});

export const p5Projects = sqliteTable('p5_projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  schoolId: integer('school_id').references(() => schools.id).notNull(),
  themeId: integer('theme_id').references(() => p5Themes.id).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  semesterId: integer('semester_id').references(() => semesters.id).notNull(),
  startDate: text('start_date'),
  endDate: text('end_date'),
  createdAt: text('created_at')
});

export const p5StudentAssessments = sqliteTable('p5_student_assessments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  projectId: integer('project_id').references(() => p5Projects.id).notNull(),
  studentId: integer('student_id').references(() => students.id).notNull(),
  dimensionId: integer('dimension_id').references(() => p5Dimensions.id).notNull(),
  score: text('score').notNull(), // "BB", "MB", "BSH", "BSB"
  evidence: text('evidence'), // Bukti/deskripsi capaian
  assessedBy: integer('assessed_by').notNull(),
  assessedAt: text('assessed_at'),
  createdAt: text('created_at')
});

// ============================================
// ABSENSI SISWA
// ============================================

export const attendances = sqliteTable('attendances', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  studentId: integer('student_id').references(() => students.id).notNull(),
  classId: integer('class_id').references(() => classes.id).notNull(),
  date: text('date').notNull(),
  status: text('status').notNull(), // "Hadir", "Sakit", "Izin", "Alpha"
  notes: text('notes'),
  recordedBy: integer('recorded_by').notNull(),
  createdAt: text('created_at')
});

// ============================================
// EKSTRAKURIKULER
// ============================================

export const extracurriculars = sqliteTable('extracurriculars', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  schoolId: integer('school_id').references(() => schools.id).notNull(),
  name: text('name').notNull(),
  type: text('type').notNull(), // "Wajib" (Pramuka), "Pilihan"
  description: text('description'),
  instructorId: integer('instructor_id'),
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
  createdAt: text('created_at')
});

export const studentExtracurriculars = sqliteTable('student_extracurriculars', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  studentId: integer('student_id').references(() => students.id).notNull(),
  extracurricularId: integer('extracurricular_id').references(() => extracurriculars.id).notNull(),
  semesterId: integer('semester_id').references(() => semesters.id).notNull(),
  score: text('score'), // Predikat: "A", "B", "C", "D"
  description: text('description'), // Deskripsi capaian
  createdAt: text('created_at')
});

// ============================================
// CATATAN WALI KELAS & SIKAP
// ============================================

export const homeroomNotes = sqliteTable('homeroom_notes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  studentId: integer('student_id').references(() => students.id).notNull(),
  semesterId: integer('semester_id').references(() => semesters.id).notNull(),
  attendanceSummary: text('attendance_summary'), // Ringkasan kehadiran
  behaviorNotes: text('behavior_notes'), // Catatan sikap dan perilaku
  achievementNotes: text('achievement_notes'), // Prestasi yang dicapai
  suggestionNotes: text('suggestion_notes'), // Saran untuk orang tua/wali
  waliClassTeacherId: integer('wali_class_teacher_id').notNull(),
  createdAt: text('created_at'),
  updatedAt: text('updated_at')
});

// Sikap Spiritual dan Sosial (untuk Kurikulum Merdeka)
export const studentAttitudes = sqliteTable('student_attitudes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  studentId: integer('student_id').references(() => students.id).notNull(),
  semesterId: integer('semester_id').references(() => semesters.id).notNull(),
  spiritualAspect: text('spiritual_aspect'), // Deskripsi sikap spiritual
  socialAspect: text('social_aspect'), // Deskripsi sikap sosial
  createdBy: integer('created_by').notNull(),
  createdAt: text('created_at'),
  updatedAt: text('updated_at')
});

// ============================================
// TEMPLATE RAPORT & KONFIGURASI
// ============================================

export const reportCardTemplates = sqliteTable('report_card_templates', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  schoolId: integer('school_id').references(() => schools.id).notNull(),
  name: text('name').notNull(),
  version: text('version').notNull(),
  templateData: text('template_data').notNull(), // JSON configuration untuk layout raport
  isActive: integer('is_active', { mode: 'boolean' }).default(false).notNull(),
  createdAt: text('created_at')
});

// ============================================
// RELATIONS (Drizzle ORM Relations)
// ============================================

export const schoolsRelations = relations(schools, ({ many }) => ({
  classes: many(classes),
  academicYears: many(academicYears),
  p5Projects: many(p5Projects),
  extracurriculars: many(extracurriculars)
}));

export const academicYearsRelations = relations(academicYears, ({ many }) => ({
  semesters: many(semesters),
  classes: many(classes)
}));

export const semestersRelations = relations(semesters, ({ one, many }) => ({
  academicYear: one(academicYears, {
    fields: [semesters.academicYearId],
    references: [academicYears.id]
  }),
  subjectAllocations: many(subjectAllocations),
  p5Projects: many(p5Projects),
  studentExtracurriculars: many(studentExtracurriculars),
  homeroomNotes: many(homeroomNotes),
  studentAttitudes: many(studentAttitudes)
}));

export const gradeLevelsRelations = relations(gradeLevels, ({ many }) => ({
  classes: many(classes),
  competencyStandards: many(competencyStandards)
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  school: one(schools, {
    fields: [classes.schoolId],
    references: [schools.id]
  }),
  academicYear: one(academicYears, {
    fields: [classes.academicYearId],
    references: [academicYears.id]
  }),
  gradeLevel: one(gradeLevels, {
    fields: [classes.gradeLevelId],
    references: [gradeLevels.id]
  }),
  subjectAllocations: many(subjectAllocations),
  attendances: many(attendances)
}));

export const subjectsRelations = relations(subjects, ({ many }) => ({
  subjectAllocations: many(subjectAllocations),
  competencyStandards: many(competencyStandards)
}));

export const subjectAllocationsRelations = relations(subjectAllocations, ({ one, many }) => ({
  class: one(classes, {
    fields: [subjectAllocations.classId],
    references: [classes.id]
  }),
  subject: one(subjects, {
    fields: [subjectAllocations.subjectId],
    references: [subjects.id]
  }),
  semester: one(semesters, {
    fields: [subjectAllocations.semesterId],
    references: [semesters.id]
  }),
  assessments: many(assessments),
  achievementDescriptions: many(achievementDescriptions)
}));

export const competencyStandardsRelations = relations(competencyStandards, ({ one }) => ({
  subject: one(subjects, {
    fields: [competencyStandards.subjectId],
    references: [subjects.id]
  }),
  gradeLevel: one(gradeLevels, {
    fields: [competencyStandards.gradeLevelId],
    references: [gradeLevels.id]
  })
}));

export const assessmentsRelations = relations(assessments, ({ one, many }) => ({
  subjectAllocation: one(subjectAllocations, {
    fields: [assessments.subjectAllocationId],
    references: [subjectAllocations.id]
  }),
  studentScores: many(studentScores)
}));

export const studentScoresRelations = relations(studentScores, ({ one }) => ({
  assessment: one(assessments, {
    fields: [studentScores.assessmentId],
    references: [assessments.id]
  }),
  student: one(students, {
    fields: [studentScores.studentId],
    references: [students.id]
  })
}));

export const achievementDescriptionsRelations = relations(achievementDescriptions, ({ one }) => ({
  student: one(students, {
    fields: [achievementDescriptions.studentId],
    references: [students.id]
  }),
  subjectAllocation: one(subjectAllocations, {
    fields: [achievementDescriptions.subjectAllocationId],
    references: [subjectAllocations.id]
  }),
  semester: one(semesters, {
    fields: [achievementDescriptions.semesterId],
    references: [semesters.id]
  })
}));

export const p5ThemesRelations = relations(p5Themes, ({ many }) => ({
  p5Projects: many(p5Projects)
}));

export const p5DimensionsRelations = relations(p5Dimensions, ({ many }) => ({
  p5Elements: many(p5Elements),
  p5StudentAssessments: many(p5StudentAssessments)
}));

export const p5ElementsRelations = relations(p5Elements, ({ one }) => ({
  dimension: one(p5Dimensions, {
    fields: [p5Elements.dimensionId],
    references: [p5Dimensions.id]
  })
}));

export const p5ProjectsRelations = relations(p5Projects, ({ one, many }) => ({
  school: one(schools, {
    fields: [p5Projects.schoolId],
    references: [schools.id]
  }),
  theme: one(p5Themes, {
    fields: [p5Projects.themeId],
    references: [p5Themes.id]
  }),
  semester: one(semesters, {
    fields: [p5Projects.semesterId],
    references: [semesters.id]
  }),
  p5StudentAssessments: many(p5StudentAssessments)
}));

export const p5StudentAssessmentsRelations = relations(p5StudentAssessments, ({ one }) => ({
  project: one(p5Projects, {
    fields: [p5StudentAssessments.projectId],
    references: [p5Projects.id]
  }),
  student: one(students, {
    fields: [p5StudentAssessments.studentId],
    references: [students.id]
  }),
  dimension: one(p5Dimensions, {
    fields: [p5StudentAssessments.dimensionId],
    references: [p5Dimensions.id]
  })
}));

export const attendancesRelations = relations(attendances, ({ one }) => ({
  student: one(students, {
    fields: [attendances.studentId],
    references: [students.id]
  }),
  class: one(classes, {
    fields: [attendances.classId],
    references: [classes.id]
  })
}));

export const extracurricularsRelations = relations(extracurriculars, ({ one, many }) => ({
  school: one(schools, {
    fields: [extracurriculars.schoolId],
    references: [schools.id]
  }),
  studentExtracurriculars: many(studentExtracurriculars)
}));

export const studentExtracurricularsRelations = relations(studentExtracurriculars, ({ one }) => ({
  student: one(students, {
    fields: [studentExtracurriculars.studentId],
    references: [students.id]
  }),
  extracurricular: one(extracurriculars, {
    fields: [studentExtracurriculars.extracurricularId],
    references: [extracurriculars.id]
  }),
  semester: one(semesters, {
    fields: [studentExtracurriculars.semesterId],
    references: [semesters.id]
  })
}));

export const homeroomNotesRelations = relations(homeroomNotes, ({ one }) => ({
  student: one(students, {
    fields: [homeroomNotes.studentId],
    references: [students.id]
  }),
  semester: one(semesters, {
    fields: [homeroomNotes.semesterId],
    references: [semesters.id]
  })
}));

export const studentAttitudesRelations = relations(studentAttitudes, ({ one }) => ({
  student: one(students, {
    fields: [studentAttitudes.studentId],
    references: [students.id]
  }),
  semester: one(semesters, {
    fields: [studentAttitudes.semesterId],
    references: [semesters.id]
  })
}));

export const reportCardTemplatesRelations = relations(reportCardTemplates, ({ one }) => ({
  school: one(schools, {
    fields: [reportCardTemplates.schoolId],
    references: [schools.id]
  })
}));
