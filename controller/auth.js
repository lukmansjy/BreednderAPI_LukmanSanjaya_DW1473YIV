const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models').user
const { secretKey } = require('../config/secretKey')

exports.login = (req, res)=>{
    const email = req.body.email
    const password = req.body.password
    User.findOne({where: {email}}).then(user => {
        if(user){
            // verify bcrypt password
            bcrypt.compare(password, user.password, function(err, resBcrypt) {
                if(resBcrypt) {
                    const token = jwt.sign({userId: user.id}, secretKey)
                    res.send({
                        "email": user.email,
                        "token": token
                    })
                } else {
                    res.send({
                        error: true,
                        message: "Wrong Password!"
                    })
                } 
            });
        }else{
            res.send({
                error: true,
                message: "Wrong Email or Password!"
            })
        }
    })
}