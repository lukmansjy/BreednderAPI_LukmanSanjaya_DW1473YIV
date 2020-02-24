const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { secretKey } = require('../config/secretKey')
const Model = require('../models')
const User = Model.user
const Pet = Model.pet

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
                        email: user.email,
                        token: token
                    })
                } else {
                    res.status(401).send({
                        error: true,
                        message: "Wrong Password!"
                    })
                } 
            });
        }else{
            res.status(401).send({
                error: true,
                message: "Wrong Email or Password!"
            })
        }
    })
}

exports.register = (req, res)=>{
    const body = req.body
    User.findOne({where: {email: body.email}}).then( data => {
        if(data == null){
            bcrypt.hash(body.password, 11, function(err, hash) {
                if(!err){
                    const userData = {
                        breeder: body.breeder,
                        email: body.email,
                        password: hash,
                        phone: body.phone,
                        address: body.address
                    }
                    User.create(userData).then( user => {
                        if(user){
                            const token = jwt.sign({userId: user.id}, secretKey)
                            const petData = {
                                name: body.pet.name,
                                gender: body.pet.gender,
                                species_id: body.pet.spesies.id,
                                age_id: body.pet.age.id,
                                user_id: user.id
                            }
                            Pet.create(petData).then( pet =>{
                                if(pet){
                                    res.send({
                                        email: user.email,
                                        token: token
                                    })
                                }else{
                                    res.status(400).send({
                                        error: true,
                                        message: "Data pet not insert"
                                    })
                                }
                            })
                        }else{
                            res.status(400).send({
                                error: true,
                                message: "Data user not insert"
                            })
                        }
                    })
                }else{
                    res.status(400).send({
                        error: true,
                        message: "Bcrypt error"
                    })
                }
            });
        }else{
            res.status(401).send({
                error: true,
                message: "Email sudah terdaftar"
            })
        }
    })
    
    
}