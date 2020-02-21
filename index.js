const express = require('express')
const bodyParer = require('body-parser')
require('express-group-routes')

// Middlewares
const { authenticated } = require('./middleware')

// Controller
const AuthController = require('./controller/auth')
const SpeciesController = require('./controller/species')
const PetController = require('./controller/pet')

const app = express()
const port = 5050
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
    // Get All Pet
    router.get('/pets', authenticated, PetController.getPets)
    router.put('/pet/:id', authenticated, PetController.updatePet)
    router.delete('/pet/:id', authenticated, PetController.deletePet)
} )

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
