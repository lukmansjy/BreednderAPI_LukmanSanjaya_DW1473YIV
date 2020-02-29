const express = require('express')
const bodyParer = require('body-parser')
const cors = require('cors')
const multer = require('multer')
require('express-group-routes')

// Middlewares
const { authenticated } = require('./middleware')

// Controller
const AuthController = require('./controller/auth')
const SpeciesController = require('./controller/species')
const PetController = require('./controller/pet')
const UserController = require('./controller/user')
const MatchController = require('./controller/match')
const PaymentController = require('./controller/payment')
const UploadsController = require('./controller/uploads')

//Multer
const multerDiskStore = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'public/uploads/')
    },
    filename: (req, file, callback) =>{
        const originalFile = file.originalname
        const nameArr = originalFile.split('.')
        var extension = ''
        if(nameArr.length > 1){
            extension = nameArr[nameArr.length - 1]
        }
        callback(null, `${file.fieldname}-${Date.now()}.${extension}`)
    }
})

const multerUpload = multer({storage: multerDiskStore})

const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParer.json())
app.use(express.static('public'));

app.group('/api/v1', (router)=>{
    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)
    router.post('/loginToken', authenticated, AuthController.loginToken)

    // Get All Species
    router.get('/species', SpeciesController.getsSpecies)
    // Create Species
    router.post('/species', authenticated, SpeciesController.insertSpecies)

    // Add Pet
    router.post('/pet', authenticated, UploadsController.uploadPet, PetController.insertPet)
    // Get All Pets
    router.get('/pets', authenticated, PetController.getPets)
    // Get All Pets BY User Login
    router.get('/pets/me', authenticated, PetController.getPetsMe)
    // Edit Pet
    router.put('/pet/:id', authenticated, PetController.updatePet)
    // Delete Pet
    router.delete('/pet/:id', authenticated, PetController.deletePet)
    // Get Detail Pet
    router.get('/pet/:id', PetController.getPet)

    // Get Detail User
    router.get('/user/:id', UserController.getUser)
    // Update User
    router.put('/user/:id', authenticated, UserController.updateUser)
    // Delete User
    router.delete('/user/:id', authenticated, UserController.deleteUser)

    // Check Macth Pet
    router.get('/match', authenticated, MatchController.chcekMatchPet)
    // Create Macth Pet
    router.post('/match', authenticated, MatchController.createMatchPet)
    // Update Macth Pet
    router.patch('/match', authenticated, MatchController.updateMatchPet)
    // Get Data Macth Pet
    router.get('/matches', authenticated, MatchController.matchesPet)
    
    // Post data payment
    router.post('/payment', authenticated, UploadsController.uploadPayment, PaymentController.insertPayment)
    // Update data paymane (ADMIN)
    router.put('/payment/:id', authenticated, PaymentController.updatePayment)
    // Cek One Payment
    router.get('/payment/:id', authenticated, PaymentController.cekPayment)
})

app.get('/', (req, res)=>{
    res.send('Selamat Datang')
})

app.post('/upload', multerUpload.single('picture'), (req, res, next) => {
    const picture = req.file
    if(picture){
        res.send(picture)
    }else{
        res.status(400).send({message: 'picture cannot empty'})
    }
})

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({
            error: true,
            message: err.name + ": " + err.message
        });
    } else
        next(err)
});

app.listen(port, ()=> console.log(`Running in port ${port}`))
