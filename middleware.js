const expressJwt = require('express-jwt')
const {secretKey} = require('./config/secretKey')

exports.authenticated = expressJwt({secret: secretKey})

