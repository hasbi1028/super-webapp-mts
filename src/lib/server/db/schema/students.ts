import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const students = sqliteTable('students', {
	id: integer('id').primaryKey({ autoIncrement: true }),

	nis: text('nis').notNull().unique(),
	nisn: text('nisn').unique(),
	namaLengkap: text('nama_lengkap').notNull(),

	jenisKelamin: text('jenis_kelamin'), // L/P
	tempatLahir: text('tempat_lahir'),
	tanggalLahir: text('tanggal_lahir'),

	alamat: text('alamat'),
	noHp: text('no_hp'),

	namaAyah: text('nama_ayah'),
	namaIbu: text('nama_ibu'),

	tahunMasuk: integer('tahun_masuk'),
	status: text('status').default('aktif'), // aktif, lulus, pindah, keluar

	createdAt: text('created_at')
});
