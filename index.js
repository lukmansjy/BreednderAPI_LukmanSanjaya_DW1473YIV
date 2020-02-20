const express = require('express')
const bodyParer = require('body-parser')
require('express-group-routes')

// Controller
const AuthController = require('./controller/auth')

const app = express()
const port = 5050
app.use(bodyParer.json())

app.group('/api/v1', (router)=>{
    router.post('/login', AuthController.login)
} )


app.listen(port, ()=> console.log(`Running in port ${port}`))