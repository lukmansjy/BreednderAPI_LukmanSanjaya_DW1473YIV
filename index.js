const express = require('express')
const bodyParer = require('body-parser')
require('express-group-routes')

// Middlewares
const { authenticated } = require('./middleware')

// Controller
const AuthController = require('./controller/auth')
const SpeciesController = require('./controller/species')

const app = express()
const port = 5050
app.use(bodyParer.json())

app.group('/api/v1', (router)=>{
    router.post('/login', AuthController.login)
    router.post('/register', AuthController.register)
    router.get('/species', SpeciesController.getsSpecies)
    router.post('/species', authenticated, SpeciesController.insertSpecies)
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