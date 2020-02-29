const jwt = require('jsonwebtoken')
const { secretKey } = require('../config/secretKey')

const Model = require('../models')
const Pet = Model.pet
const User = Model.user
const Species = Model.species
const Age = Model.age

const {baseUrl} = require('../config/configuration')

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

// Add pet
exports.insertPet = (req, res) =>{
    const body = req.body
    if(req.file){
        const dataFile = `${baseUrl}${req.file.destination.replace(/public\//g, '')}${req.file.filename}`
        const jwtData = verifyJwt(req.headers.authorization)
        if(!jwtData.error){
            // const dataPet = {
            //     name: body.name,
            //     gender: body.gender,
            //     species_id: body.species.id,
            //     age_id: body.age.id,
            //     user_id: jwtData.values.userId,
            //     about_pet: body.about_pet,
            //     photo: body.photo
            // }
            const dataPet = {
                name: body.name,
                gender: body.gender,
                species_id: body.species_id,
                age_id: body.age_id,
                user_id: jwtData.values.userId,
                about_pet: body.about_pet,
                photo: dataFile
            }
            Pet.create(dataPet).then( pet => {
                if(pet){
                    Pet.findOne({
                        include: [
                          {
                            model: Species,
                            attributes: ["id", "name"],
                            as: "species"
                          },
                          {
                            model: Age,
                            attributes: ["id", "name"],
                            as: "age"
                          },
                          {
                            model: User,
                            attributes: ["id", "breeder", "address", "phone"],
                            as: "user"
                          }
                        ],
                        where: {id: pet.id},
                        attributes: ['id', 'name', 'gender', 'about_pet', 'photo', 'createdAt', 'updatedAt']
                    }).then( data=>{
                        if(data){
                            res.send(data)
                        }else{
                            res.status(400).send({
                                error: true,
                                message: "Pet success create, errror data pet details"
                            })
                        }
                    })
                }else{
                    res.status(400).send({
                        error: true,
                        message: "Error insert data pet"
                    })
                }
            })
        }else{
            res.status(401).send({
                error: true,
                message: "JWT Not valid"
            })
        }

    }else{
        res.status(401).send({
            error: true,
            message: "Error Not Authorized, Picture Required!"
        })
    }
}

// Get All Pets
exports.getPets = (req, res) =>{
    Pet.findAll({
        attributes: ["id", "name", "gender", "about_pet", "photo", "createdAt", "updatedAt"],
        include: [
            {
              model: Species,
              attributes: ["id", "name"],
              as: "species"
            },
            {
                model: User,
                attributes: ["id", "breeder", "address", "phone"],
                as: "user"
            }
        ]
    }).then( pets => {
        if(pets){
            res.send( pets )
        }else{
            res.status(400).send({
                error: true,
                message: "Error get data pets"
            })
        }
        
    })
}

// Update Pet
exports.updatePet = (req, res) =>{
    const idPet = req.params.id
    const jwtData = verifyJwt(req.headers.authorization)
    if(!jwtData.error){
        const userId = jwtData.values.userId
        Pet.findOne({where: {id: idPet, user_id: userId}}).then( data =>{
            if(data){
                const body = req.body
                const updateData = {
                    name: body.name,
                    gender: body.gender,
                    species_id: body.species.id,
                    age_id: body.age.id,
                    about_pet: body.about_pet,
                    photo: body.photo
                }
                Pet.update( updateData, {where: {id: req.params.id}} ).then( status => {
                    if(status){
                        Pet.findOne({
                            include: [
                              {
                                model: Species,
                                attributes: ["id", "name"],
                                as: "species"
                              },
                              {
                                model: Age,
                                attributes: ["id", "name"],
                                as: "age"
                              },
                              {
                                model: User,
                                attributes: ["id", "breeder", "address", "phone"],
                                as: "user"
                              }
                            ],
                            where: {id: idPet},
                            attributes: ['id', 'name', 'gender', 'about_pet', 'photo', 'createdAt', 'updatedAt']
                        }).then( data=>{
                            if(data){
                                res.send(data)
                            }else{
                                res.status(400).send({
                                    error: true,
                                    message: "Pet success update, errror get data pet details"
                                })
                            }
                        })
                    }else{
                        res.status(400).send({
                            error: true,
                            message: "Error insert data pet"
                        })
                    }
                })
            }else{
                res.status(401).send({
                    error: true,
                    message: "Update not authorized"
                })
            }
        })
    }else{
        res.status(401).send({
            error: true,
            message: "JWT Not valid"
        })
    }
}

// Delete Pet
exports.deletePet = (req, res) =>{
    const idPet = req.params.id
    const jwtData = verifyJwt(req.headers.authorization)
    if(!jwtData.error){
        const userId = jwtData.values.userId
        Pet.findOne({where: {id: idPet, user_id: userId}}).then( data =>{
            if(data){
                Pet.destroy({where: {id: idPet}}).then( status => {
                    res.send({
                        id: idPet
                    })
                } )
            }else{
                res.status(401).send({
                    error: true,
                    message: "Delete not authorized"
                })
            }
        })
    }else{
        res.status(401).send({
            error: true,
            message: "JWT Not valid"
        })
    }
}

// Get Detail Pet
exports.getPet = (req, res) =>{
    const idPet = req.params.id
    Pet.findOne({
        include: [
          {
            model: Species,
            attributes: ["id", "name"],
            as: "species"
          },
          {
            model: Age,
            attributes: ["id", "name"],
            as: "age"
          },
          {
            model: User,
            attributes: ["id", "breeder", "address", "phone"],
            as: "user"
          }
        ],
        where: {id: idPet},
        attributes: ['id', 'name', 'gender', 'about_pet', 'photo', 'createdAt', 'updatedAt']
    }).then( data=>{
        if(data){
            res.send(data)
        }else{
            res.status(400).send({
                error: true,
                message: "Pet success update, errror get data pet details"
            })
        }
    })
}

exports.getPetsMe = (req, res) =>{
        const jwtData = verifyJwt(req.headers.authorization)
        console.log('TOKEN USEID',req.user.userId)
        if(!jwtData.error){

            const userId = jwtData.values.userId
            Pet.findAll({
                where: {user_id: userId},
                attributes: ["id", "name", "gender", "about_pet", "photo", "createdAt", "updatedAt"],
                include: [
                    {
                      model: Species,
                      attributes: ["id", "name"],
                      as: "species"
                    },
                    {
                        model: User,
                        attributes: ["id", "breeder", "address", "phone", "email"],
                        as: "user"
                    },
                    {
                        model: Age,
                        attributes: ["id", "name"],
                        as: "age"
                    }
                ]
            }).then( pets => {
                if(pets){
                    res.send( pets )
                }else{
                    res.status(400).send({
                        error: true,
                        message: "Error get data pets"
                    })
                }
                
            })

        }
    
}