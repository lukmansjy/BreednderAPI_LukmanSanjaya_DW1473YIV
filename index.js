const express = require('express')
const bodyParer = require('body-parser')
const cors = require('cors')
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

const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParer.json())

app.group('/api/v1', (router)=>{
    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)

    // Get All Species
    router.get('/species', SpeciesController.getsSpecies)
    // Create Species
    router.post('/species', authenticated, SpeciesController.insertSpecies)

    // Add Pet
    router.post('/pet', authenticated, PetController.insertPet)
    // Get All Pets
    router.get('/pets', authenticated, PetController.getPets)
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
    router.post('/payment', authenticated, PaymentController.insertPayment)
    // Update data paymane (ADMIN)
    router.put('/payment/:id', authenticated, PaymentController.updatePayment)
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
