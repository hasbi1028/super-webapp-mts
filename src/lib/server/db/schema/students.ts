import { pgTable, serial, text, integer, date, boolean, timestamp } from 'drizzle-orm/pg-core';

export const students = pgTable('students', {
	id: serial('id').primaryKey(),

	nis: text('nis').notNull().unique(),
	nisn: text('nisn').unique(),
	namaLengkap: text('nama_lengkap').notNull(),

	jenisKelamin: text('jenis_kelamin'), // L/P
	tempatLahir: text('tempat_lahir'),
	tanggalLahir: date('tanggal_lahir'),

	alamat: text('alamat'),
	noHp: text('no_hp'),

	namaAyah: text('nama_ayah'),
	namaIbu: text('nama_ibu'),

	tahunMasuk: integer('tahun_masuk'),
	status: text('status').default('aktif'), // aktif, lulus, pindah, keluar

	createdAt: timestamp('created_at').defaultNow()
});
