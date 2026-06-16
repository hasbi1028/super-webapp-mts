# E-Rapor Sekolah Dasar (SD) - Kurikulum Merdeka

## Landasan Hukum & Regulasi

### 1. Peraturan Menteri Pendidikan, Kebudayaan, Riset, dan Teknologi
- **Permendikbudristek No. 21 Tahun 2022** tentang Standar Penilaian Pendidikan pada PAUD, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah
- **Permendikbudristek No. 5 Tahun 2022** tentang Standar Kompetensi Lulusan pada PAUD, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah
- **Permendikbudristek No. 7 Tahun 2022** tentang Standar Isi pada PAUD, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah
- **Permendikbudristek No. 16 Tahun 2022** tentang Standar Proses pada PAUD, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah

### 2. Panduan Pembelajaran dan Asesmen (P5)
- Buku Panduan Pembelajaran dan Asesmen Kurikulum Merdeka (Kemendikbudristek, 2022)
- Panduan Pengembangan Projek Penguatan Profil Pelajar Pancasila (P5)

### 3. Capaian Pembelajaran (CP)
- Keputusan Kepala BSKAP Kemendikbudristek tentang Capaian Pembelajaran pada PAUD, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah pada Kurikulum Merdeka

## Karakteristik Penilaian di SD (Kurikulum Merdeka)

### 1. Prinsip Penilaian
- **Holistik**: Menilai seluruh aspek kompetensi (sikap, pengetahuan, keterampilan)
- **Otentik**: Berdasarkan situasi nyata dalam pembelajaran
- **Berkelanjutan**: Dilakukan secara terus-menerus sepanjang proses pembelajaran
- **Formatif & Sumatif**: Kombinasi penilaian untuk pembelajaran dan penilaian hasil pembelajaran

### 2. Komponen Penilaian

#### A. Pendidikan Pancasila & Kewarganegaraan (PPKn)
- Penilaian sikap spiritual dan sosial
- Penilaian pengetahuan
- Penilaian keterampilan

#### B. Bahasa Indonesia
- Menyimak
- Membaca & Memirsa
- Berbicara & Mempresentasikan
- Menulis

#### C. Matematika
- Bilangan
- Aljabar
- Pengukuran
- Geometri
- Analisis Data & Ketidakpastian

#### D. IPA (Ilmu Pengetahuan Alam) - Fase B (Kelas 4-6)
- Pemahaman IPA
- Proses Keterampilan IPA

#### E. IPS (Ilmu Pengetahuan Sosial) - Fase B (Kelas 4-6)
- Pemahaman IPS
- Keterampilan IPS

#### F. Bahasa Inggris - Fase B (Kelas 4-6)
- Menyimak-Berbicara
- Membaca-Menulis

#### G. Seni & Budaya
- Seni Rupa
- Seni Musik
- Seni Tari
- Seni Teater

#### H. Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK)
- Keterampilan gerak
- Pengetahuan gerak
- Sikap sportif

#### I. Projek Penguatan Profil Pelajar Pancasila (P5)
- Tema: Gaya Hidup Berkelanjutan, Kearifan Lokal, Bhinneka Tunggal Ika, dll
- Dimensi: Beriman, Berkebinekaan Global, Bergotong Royong, Mandiri, Bernalar Kritis, Kreatif

### 3. Skala Penilaian

#### Untuk Kelas 1-2 (Fase A)
- **Penilaian Deskriptif**: Tidak menggunakan angka
- Kategori: 
  - Belum Berkembang (BB)
  - Mulai Berkembang (MB)
  - Berkembang Sesuai Harapan (BSH)
  - Berkembang Sangat Baik (BSB)

#### Untuk Kelas 3-6 (Fase B & C)
- **Skala Nilai**: 0-100
- **Predikat**:
  - A (Sangat Baik): 86-100
  - B (Baik): 71-85
  - C (Cukup): 56-70
  - D (Perlu Bimbingan): ≤55

### 4. Struktur Raport

#### Halaman Identitas
- Data sekolah
- Data siswa
- Kelas/Semester
- Tahun Ajaran

#### Halaman Nilai
- Mata Pelajaran Umum
- Muatan Lokal (jika ada)
- Projek P5
- Ekstrakurikuler (Pramuka wajib)
- Catatan Wali Kelas
- Kesimpulan & Saran

#### Halaman Absensi
- Kehadiran siswa per semester

#### Halaman Perkembangan Karakter
- Profil Pelajar Pancasila
- Sikap Spiritual & Sosial

## Fitur Aplikasi E-Rapor

### 1. Manajemen Pengguna
- Admin Sekolah
- Guru Mata Pelajaran
- Wali Kelas
- Guru P5
- Orang Tua (view only)

### 2. Fitur Utama
- Input nilai formatif & sumatif
- Input deskripsi capaian
- Input nilai P5 (projek)
- Input absensi
- Input perkembangan karakter
- Generate raport PDF
- Dashboard analitik
- Export-import data

### 3. Keamanan & Privasi
- Role-based access control (RBAC)
- Enkripsi data sensitif
- Audit trail
- Backup otomatis

## Tech Stack

- **Frontend**: SvelteKit + TypeScript + TailwindCSS
- **Backend**: SvelteKit Server Routes
- **Database**: PostgreSQL + Drizzle ORM
- **Authentication**: JWT + Refresh Token
- **PDF Generation**: Puppeteer / pdfmake
- **State Management**: Svelte Stores
