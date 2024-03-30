# Latihan NodeJs

Ini adalah github untuk latihan nodejs & React M.Irsyad F. Jika terdapat bug bisa membuat issue baru

## Installation

1. Clone

Copas command per-line ini untuk clone latihan-nodejs

```bash
git init

git clone https://github.com/irsyad456/latihan-nodejs.git
```

2. ZIP Download

Pada halaman utama github ini, tekan dropdown "Code" berwarna hijau, lalu pilih opsi "Download ZIP"

## Configuration
### Backend
pastikan anda sudah menginstall [nodejs](https://nodejs.org/) dan (nodemon)[https://nodemon.io/]. (note: projek merujuk pada folder utama projek ini)
- buat database `pengaduan_masyarakat` atau ubah line `pengaduan_masyarakat` di projek/backend/config/database.js dengan database yang tersedia
- uncomment line 28-38 di projek/backend/index.js
- lakukan command ini di projek/backend 
```bash
npm install

// jalani server
nodemon index
```
### Frontend
lakukan command ini di projek/frontend
```bash
npm install

// jalani frontend
npm start
```

## Note Projek
- Web ini masih memiliki banyak fitur belum di implementasi, update akan dilakukan jika memiliki waktu
- Comment line 31-41 di backend/index.js setelah tabel database di buat untuk mempercepat proses server backend
