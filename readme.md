# Breednder API
API backend yang dibuat menggunakan Express Js.

## Branch
* 1.Login_API - Berisi API untuk login
* 2.Register_API - Berisi API untuk register

Untuk menjalankan project  ini silakan jalankan:

```
npm install
```

Dan untuk menjalankan server API jalankan perintah (diperlukan library `nodemon`):

```
npm start
```

## Note
Sebelum menjalankan project ini (`npm start`), harus buat table mysql bernama `petsmatch-api` dan jalanakan perintah `npx sequelize db:migrate` untuk migrasi table yang sudah di setting pada folder migrations. Kemudian jalankan `npx sequelize db:seed:all` untuk mengisi data dummy yang sudah disiapkan di dalam folder seeders.

## API Request URL
Untuk melihat request API yang lain silakan pilih branch yang bersangkutan

### Login API
[POST] http://localhost:5050/api/v1/login

**Contoh Login Body JSON POST**

```
{
  "email": "lukman.rocks@live.com",
  "password": "demo"
}
```

**Contoh Respon JSON**

```
{
    "email": "lukman.rocks@live.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU4MjIwMTUwNH0.BiE5SXmHZD70cP5SAscjWezB5DdRW22nRkp7MAuQ6_0"
}
```

### Register API
[POST] http://localhost:5050/api/v1/register

**Contoh Register Body JSON POST**

```
{
   "breeder" : "Lukman X",
   "email" : "lukman.rocks@live.com",
   "password": "mypassword",
   "phone": "081234567890",
   "address": "Kec. Selogiri, Kab. Wonogiri, Jawa Tengah",
   "pet" : {
        "name" : "Kucing Oren Bar Bar",
        "gender" : "Male",
        "spesies" : {
              "id" : 1,
              "name" : "Cat"
          },
       "age" : {
              "id" : 3,
              "name" : "Adult"
         }
   }
} 
```

**Contoh Respon JSON**

```
{
    "email": "lukman.rocks@live.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE1ODIyMTk5Njd9.w6LKX2koiGsE3WVaE1DOsLczv9IrbzjqSHOwcb3vces"
}
```
