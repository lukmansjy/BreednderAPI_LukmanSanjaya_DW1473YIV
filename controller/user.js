const jwt = require('jsonwebtoken')
const { secretKey } = require('../config/secretKey')

const Model = require('../models')
const Pet = Model.pet
const User = Model.user

// function decode jwt
const verifyJwt = (jwtHeader)=>{
    let jwtData;
    let authorization = jwtHeader.split(' ')[1], decoded;
    try {
        decoded = jwt.verify(authorization, secretKey);
        jwtData = {
            error: false,
            values: decoded
        }
    } catch (e) {
        jwtData = {
            error: true,
            values: null
        }
    }
    return jwtData
}

// Get Detai User
exports.getUser = (req, res) =>{
    const userId = req.params.id
    User.findOne({
        where: {id: userId},
        attributes: ['breeder', 'address', 'phone', 'createdAt', 'updatedAt']
    }).then( data=>{
        if(data){
            res.send(data)
        }else{
            res.status(400).send({
                error: true,
                message: "System error, can't get user detail"
            })
        }
    })
}

exports.updateUser = (req, res) =>{
    const body = req.body
    const jwtData = verifyJwt(req.headers.authorization)
    if(!jwtData.error){
        const userId = jwtData.values.userId
        if(req.params.id == userId){
            User.findOne({where: {id: userId}}).then( data =>{
                if(data){
                    User.update( body, {where: {id: userId}} ).then( status => {
                        if(status){
                            User.findOne({
                                where: {id: userId},
                                attributes: ['breeder', 'address', 'phone', 'createdAt', 'updatedAt']
                                }).then( userNew =>{
                                    res.send(userNew)
                            })
                        }else{
                            res.status(400).send({
                                error: true,
                                message: "System database error, can't get update"
                            })
                        }
                    })
                }else{
                    res.status(401).send({
                        error: true,
                        message: "Update user not authorized"
                    })
                }
            })
        }else{
            res.status(401).send({
                error: true,
                message: "Update user not authorized"
            })
        }
    }else{
        res.status(401).send({
            error: true,
            message: "JWT Not valid"
        })
    }
}


exports.deleteUser = (req, res) =>{
    const jwtData = verifyJwt(req.headers.authorization)
    if(!jwtData.error){
        const userId = jwtData.values.userId
        if(req.params.id == userId){
            User.findOne({where: {id: userId}}).then( user =>{
                if(user){
                    Pet.destroy({where: {user_id: userId}}).then( status => {
                        User.destroy({where: {id: userId}}).then( status => {
                            res.send({
                                id: userId
                            })
                        } )
                    } )
                }else{
                    res.status(401).send({
                        error: true,
                        message: "Delete user not authorized"
                    })
                }
            })
        }else{
            res.status(401).send({
                error: true,
                message: "Delete user not authorized"
            })
        }
    }else{
        res.status(401).send({
            error: true,
            message: "JWT Not valid"
        })
    }
}

