# Breednder API
API backend yang dibuat menggunakan Express Js.

## Branch
* 1.Login_API - Berisi API untuk login
* 2.Register_API - Berisi API untuk register
* 3.Species_API - Berisi API untuk species
* 4.Pet_API - Berisi API untuk Pet
* 5.PetDetail_API - Berisi API untuk get detail pet by id
* 6.User_API - Beiri API untuk user

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

### Species API
[POST] http://localhost:5050/api/v1/species `Add Species`

[GET] http://localhost:5050/api/v1/species `Get All Species`

**Contoh Add Species**

Hedaer:

```
Authorization: Bearer jwt_respon_login

contoh:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE1ODIyMTk5Njd9.w6LKX2koiGsE3WVaE1DOsLczv9IrbzjqSHOwcb3vces

```
Body:

```
{
	"name" : "Sugar Glider"
} 
```

**Contoh Respon JSON Add Species**

```
{
    "id": 5,
    "species": "Sugar Glider"
}
```

**Contoh Get All Species Body JSON POST**

Get All species tidak memerlukan header authorization jwt

**Contoh Respon JSON Get All Species**

```
[
    {
        "id": 1,
        "name": "Cat",
        "createdAt": "2020-01-20T17:50:00.000Z",
        "updatedAt": "2020-01-20T17:50:00.000Z"
    },
    {
        "id": 2,
        "name": "Dog",
        "createdAt": "2020-01-20T17:50:00.000Z",
        "updatedAt": "2020-01-20T17:50:00.000Z"
    },
    {
        "id": 3,
        "name": "Rabbit",
        "createdAt": "2020-01-20T17:50:00.000Z",
        "updatedAt": "2020-01-20T17:50:00.000Z"
    },
    {
        "id": 4,
        "name": "Bird",
        "createdAt": "2020-01-20T17:50:00.000Z",
        "updatedAt": "2020-01-20T17:50:00.000Z"
    },
    {
        "id": 5,
        "name": "Sugar Glider",
        "createdAt": "2020-02-21T04:35:40.000Z",
        "updatedAt": "2020-02-21T04:35:40.000Z"
    }
]
```

### Pet API
[POST] http://localhost:5050/api/v1/pet `Add Pet`

[GET] http://localhost:5050/api/v1/pets `Get All Pets`

[PUT] http://localhost:5050/api/v1/pet/6 `Edit Pet By Id`

[DELETE] http://localhost:5050/api/v1/pet/2 `Delete Pet By Id`

**NOTE**

GET Pet, PUT Pet, dan DELETE Pet memerlukan jwt pada header

Contoh:

```
Authorization: Bearer jwt_respon_login

contoh:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE1ODIyMTk5Njd9.w6LKX2koiGsE3WVaE1DOsLczv9IrbzjqSHOwcb3vces

```


**Contoh Add Pet**

Contoh Body JSON Add Pet:

```
{
   "name" : "Kucing Jaman Now",
   "gender" : "Male",
   "species" : {
      "id" : 1,
      "name" : "Cat"
   },
   "age" : {
   	  "id": 3,
   	  "name": "Adult"
   	},
   "about_pet" : "Kucing tergaul sedunia",
   "photo" : "https://img.com/cat.jpg"
}

```

Respon JSON

```
{
    "id": 4,
    "name": "Kucing Jaman Now",
    "gender": "Male",
    "about_pet": "Kucing tergaul sedunia",
    "photo": "https://img.com/cat.jpg",
    "createdAt": "2020-02-21T14:00:17.000Z",
    "updatedAt": "2020-02-21T14:00:17.000Z",
    "species": {
        "id": 1,
        "name": "Cat"
    },
    "age": {
        "id": 3,
        "name": "Adult"
    },
    "user": {
        "id": 1,
        "breeder": "Lukman Sanjaya",
        "address": "Kec. Selogiri, Kab. Wonogiri, Jawa Tengah",
        "phone": "082226455525"
    }
}
```

**Get All Pets**

GET API http://localhost:5050/api/v1/pets

Respon Body

```
[
    {
        "id": 1,
        "name": "Kucing Bar Bar",
        "gender": "Male",
        "about_pet": "Kucing bar bar yang suka jatuhin barang dimeja",
        "photo": "https://i.imgur.com/2x0oIpb.jpg",
        "createdAt": "2020-01-20T17:50:00.000Z",
        "updatedAt": "2020-01-20T17:50:00.000Z",
        "species": {
            "id": 1,
            "name": "Cat"
        },
        "user": {
            "id": 1,
            "breeder": "Lukman Sanjaya",
            "address": "Kec. Selogiri, Kab. Wonogiri, Jawa Tengah",
            "phone": "082226455525"
        }
    },
    {
        "id": 2,
        "name": "Kucing Oren",
        "gender": "Male",
        "about_pet": "Kucing Bar Bar Tapi Luchu",
        "photo": "https://i.imgur.com/pqggrK0.jpg",
        "createdAt": "2020-01-20T17:50:00.000Z",
        "updatedAt": "2020-01-20T17:50:00.000Z",
        "species": {
            "id": 1,
            "name": "Cat"
        },
        "user": {
            "id": 2,
            "breeder": "Domo User",
            "address": "Cikupa, Kab. Tangerang, Banten",
            "phone": "081234567890"
        }
    },
    {
        "id": 3,
        "name": "Kucing Janda",
        "gender": "Famale",
        "about_pet": "Kucing janda beranak lima, mencari kucing pria yang bertangung jawab",
        "photo": "https://i.imgur.com/9if0pJQ.jpg",
        "createdAt": "2020-01-20T17:50:00.000Z",
        "updatedAt": "2020-01-20T17:50:00.000Z",
        "species": {
            "id": 1,
            "name": "Cat"
        },
        "user": {
            "id": 3,
            "breeder": "Demo Account",
            "address": "Surakarta, Jawa Tengah",
            "phone": "082345678901"
        }
    },
    {
        "id": 4,
        "name": "Kucing Jaman Now",
        "gender": "Male",
        "about_pet": "Kucing tergaul sedunia",
        "photo": "https://img.com/cat.jpg",
        "createdAt": "2020-02-21T14:00:17.000Z",
        "updatedAt": "2020-02-21T14:00:17.000Z",
        "species": {
            "id": 1,
            "name": "Cat"
        },
        "user": {
            "id": 1,
            "breeder": "Lukman Sanjaya",
            "address": "Kec. Selogiri, Kab. Wonogiri, Jawa Tengah",
            "phone": "082226455525"
        }
    }
]
```

**Edit PET**

PUT API http://localhost:5050/api/v1/pet/4 6 adalah id pet yang ingin di edit.

Contoh JSON BODY:

```
{
  "name": "Kucing Jaman Now Dan NOW",
  "gender": "Male",
  "species": {
    "id": 1
  },
  "age": {
  	"id": 2
  },
  "about_pet": "Kucing yang terlalu gaul",
  "photo": "https://img.com/cat-2.jpg"
}
```

Contoh Respon JSON

```
{
    "id": 4,
    "name": "Kucing Jaman Now Dan NOW",
    "gender": "Male",
    "about_pet": "Kucing yang terlalu gaul",
    "photo": "https://img.com/cat-2.jpg",
    "createdAt": "2020-02-21T14:00:17.000Z",
    "updatedAt": "2020-02-21T14:09:51.000Z",
    "species": {
        "id": 1,
        "name": "Cat"
    },
    "age": {
        "id": 2,
        "name": "Teenager"
    },
    "user": {
        "id": 1,
        "breeder": "Lukman Sanjaya",
        "address": "Kec. Selogiri, Kab. Wonogiri, Jawa Tengah",
        "phone": "082226455525"
    }
}
```

**Delete PET**
DELETE API http://localhost:5050/api/v1/pet/4

Respon JSON

```
{
    "id": "4"
}
```

### PET DETAIL API
[GET] http://localhost:5050/api/v1/pet/1 Berisi API untuk get pet by id.

**Respon Body**

```
{
    "id": 1,
    "name": "Kucing Bar Bar",
    "gender": "Male",
    "about_pet": "Kucing bar bar yang suka jatuhin barang dimeja",
    "photo": "https://i.imgur.com/2x0oIpb.jpg",
    "createdAt": "2020-01-20T17:50:00.000Z",
    "updatedAt": "2020-01-20T17:50:00.000Z",
    "species": {
        "id": 1,
        "name": "Cat"
    },
    "age": {
        "id": 3,
        "name": "Adult"
    },
    "user": {
        "id": 1,
        "breeder": "Lukman Sanjaya",
        "address": "Kec. Selogiri, Kab. Wonogiri, Jawa Tengah",
        "phone": "082226455525"
    }
}
```
### USER API ###
[GET] http://localhost:5050/api/v1/user/1 API untuk get detail user

[PUT] http://localhost:5050/api/v1/user/1 API untuk edit data user

[DELETE] http://localhost:5050/api/v1/user/3 API untuk delete user

**NOTE**
Semua API user ini memerlukan jwt pada header

Contoh:

```
Authorization: Bearer jwt_respon_login

contoh:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE1ODIyMTk5Njd9.w6LKX2koiGsE3WVaE1DOsLczv9IrbzjqSHOwcb3vces

```

**Get Detail User**

API GET: http://localhost:5050/api/v1/user/1

Respon JSON body:

```
{
    "breeder": "Lukman Sanjaya",
    "address": "Kec. Selogiri, Kab. Wonogiri, Jawa Tengah",
    "phone": "082226455525",
    "createdAt": "2020-01-20T17:50:00.000Z",
    "updatedAt": "2020-02-21T16:25:30.000Z"
}
```

**Edit User**

API PUT: http://localhost:5050/api/v1/user/1

Body JSON:

```
{
   "breeder" : "Lukman Sjy",
   "address" : "Kab. Wonogiri, Jawa Tengah",
   "phone" : "081234567890"
}
```

Respon JSON:

```
{
    "breeder": "Lukman Sjy",
    "address": "Kab. Wonogiri, Jawa Tengah",
    "phone": "081234567890",
    "createdAt": "2020-01-20T17:50:00.000Z",
    "updatedAt": "2020-02-21T16:30:38.000Z"
}
```

**Delete User**

API DELETE: http://localhost:5050/api/v1/user/5

Respon JSON:

```
{
    "id": 5
}
```
