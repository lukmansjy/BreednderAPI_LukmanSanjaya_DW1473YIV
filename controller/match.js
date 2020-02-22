const jwt = require('jsonwebtoken')
const { secretKey } = require('../config/secretKey')

const Model = require('../models')
const Pet = Model.pet
const User = Model.user
const Species = Model.species
const Age = Model.age
const Match = Model.match


// function get detail like liked 
const getDetailLikeLiked = (dataMatch, callback)=>{
  if(dataMatch){
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
          where: {id: dataMatch.pet.id},
          attributes: ["id", "name", "gender", "about_pet", "photo"]
      }).then( pet =>{
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
          where: {id: dataMatch.pet_liked.id},
          attributes: ["id", "name", "gender", "about_pet", "photo"]
          }).then( petLiked => {
              let data = 
                  {
                      id: dataMatch.id,
                      status : dataMatch.status,
                      pet: {
                        id: pet.id,
                        name: pet.name,
                        gender: pet.gender,
                        spesies: {
                          id: pet.species.id,
                          name: pet.species.name
                        },
                        age: pet.age.name,
                        user: {
                          id: pet.user.id,
                          name: pet.user.breeder,
                          address: pet.user.address,
                          phone: pet.user.phone
                        },
                        about_pet: pet.about_pet,
                        photo: pet.photo,
                      },
                      pet_liked: {
                        id: petLiked.id,
                        name: petLiked.name,
                        gender: petLiked.gender,
                        spesies: {
                          id: petLiked.species.id,
                          name: petLiked.species.name
                        },
                        age: petLiked.age.name,
                        user: {
                          id: petLiked.user.id,
                          name: petLiked.user.breeder,
                          address: petLiked.user.address,
                          phone: petLiked.user.phone
                        },
                        about_pet: petLiked.about_pet,
                        photo: petLiked.photo,
                      },
                      createdAt: dataMatch.createdAt,
                      updatedAt: dataMatch.updatedAt
                  }
                callback(data)
          })
          
      })
  }
}


// Chcek Match Pet
exports.chcekMatchPet = (req, res) =>{
    const query = req.query
    Match.findOne({
        include: [
            {
              model: Pet,
              attributes: ["id"],
              as: "pet"
            },
            {
              model: Pet,
              attributes: ["id"],
              as: "pet_liked"
            }
          ],
          where: {pet_id: query.pet_id, pet_like_id: query.pet_id_liked}
        }).then( dataMatch => {
            if(dataMatch){
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
                    where: {id: dataMatch.pet.id},
                    attributes: ["id", "name", "gender", "about_pet", "photo"]
                }).then( pet =>{
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
                    where: {id: dataMatch.pet_liked.id},
                    attributes: ["id", "name", "gender", "about_pet", "photo"]
                    }).then( petLiked => {
                        res.send(
                            {
                                id: dataMatch.id,
                                status : dataMatch.status,
                                pet: {
                                  id: pet.id,
                                  name: pet.name,
                                  gender: pet.gender,
                                  spesies: {
                                    id: pet.species.id,
                                    name: pet.species.name
                                  },
                                  age: pet.age.name,
                                  user: {
                                    id: pet.user.id,
                                    name: pet.user.breeder,
                                    address: pet.user.address,
                                    phone: pet.user.phone
                                  },
                                  about_pet: pet.about_pet,
                                  photo: pet.photo,
                                },
                                pet_liked: {
                                  id: petLiked.id,
                                  name: petLiked.name,
                                  gender: petLiked.gender,
                                  spesies: {
                                    id: petLiked.species.id,
                                    name: petLiked.species.name
                                  },
                                  age: petLiked.age.name,
                                  user: {
                                    id: petLiked.user.id,
                                    name: petLiked.user.breeder,
                                    address: petLiked.user.address,
                                    phone: petLiked.user.phone
                                  },
                                  about_pet: petLiked.about_pet,
                                  photo: petLiked.photo,
                                },
                                createdAt: dataMatch.createdAt,
                                updatedAt: dataMatch.updatedAt
                            }
                        )
                    })
                    
                })
            }else{
                res.status(204).send({
                    error: true,
                    message: "Not Match"
                })
            }
    })
}


// Create Match Pet
exports.createMatchPet = (req, res) =>{
    const body = req.body
    const dataCreate = {
        status: body.status,
        pet_id: body.pet_id,
        pet_like_id: body.pet_id_liked
    }
    Match.create(dataCreate).then( insertMatch => {

        if(insertMatch){
            Match.findOne({
                include: [
                    {
                      model: Pet,
                      attributes: ["id"],
                      as: "pet"
                    },
                    {
                      model: Pet,
                      attributes: ["id"],
                      as: "pet_liked"
                    }
                  ],
                  where: {pet_id: body.pet_id, pet_like_id: body.pet_id_liked}
                }).then( dataMatch => {
                    if(dataMatch){
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
                            where: {id: dataMatch.pet.id},
                            attributes: ["id", "name", "gender", "about_pet", "photo"]
                        }).then( pet =>{
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
                            where: {id: dataMatch.pet_liked.id},
                            attributes: ["id", "name", "gender", "about_pet", "photo"]
                            }).then( petLiked => {
                                res.send(
                                    {
                                        id: dataMatch.id,
                                        status : dataMatch.status,
                                        pet: {
                                          id: pet.id,
                                          name: pet.name,
                                          gender: pet.gender,
                                          spesies: {
                                            id: pet.species.id,
                                            name: pet.species.name
                                          },
                                          age: pet.age.name,
                                          user: {
                                            id: pet.user.id,
                                            name: pet.user.breeder,
                                            address: pet.user.address,
                                            phone: pet.user.phone
                                          },
                                          about_pet: pet.about_pet,
                                          photo: pet.photo,
                                        },
                                        pet_liked: {
                                          id: petLiked.id,
                                          name: petLiked.name,
                                          gender: petLiked.gender,
                                          spesies: {
                                            id: petLiked.species.id,
                                            name: petLiked.species.name
                                          },
                                          age: petLiked.age.name,
                                          user: {
                                            id: petLiked.user.id,
                                            name: petLiked.user.breeder,
                                            address: petLiked.user.address,
                                            phone: petLiked.user.phone
                                          },
                                          about_pet: petLiked.about_pet,
                                          photo: petLiked.photo,
                                        },
                                        createdAt: dataMatch.createdAt,
                                        updatedAt: dataMatch.updatedAt
                                    }
                                )
                            })
                            
                        })
                    }else{
                        res.status(204).send({
                            error: true,
                            message: "Not Match"
                        })
                    }
            })
        }

    })
}


// Update Match Pet
exports.updateMatchPet = (req, res) =>{
    const body = req.body
    const dataUpdate = {
        status: body.status,
        pet_id: body.pet_id,
        pet_like_id: body.pet_id_liked
    }
    console.log(dataUpdate)
    Match.update( dataUpdate, {where: {pet_id: body.pet_id, pet_like_id: body.pet_id_liked}} ).then( updateMatch => {

        if(updateMatch){
            Match.findOne({
                include: [
                    {
                      model: Pet,
                      attributes: ["id"],
                      as: "pet"
                    },
                    {
                      model: Pet,
                      attributes: ["id"],
                      as: "pet_liked"
                    }
                  ],
                  where: {pet_id: body.pet_id, pet_like_id: body.pet_id_liked}
                }).then( dataMatch => {
                    if(dataMatch){
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
                            where: {id: dataMatch.pet.id},
                            attributes: ["id", "name", "gender", "about_pet", "photo"]
                        }).then( pet =>{
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
                            where: {id: dataMatch.pet_liked.id},
                            attributes: ["id", "name", "gender", "about_pet", "photo"]
                            }).then( petLiked => {
                                res.send(
                                    {
                                        id: dataMatch.id,
                                        status : dataMatch.status,
                                        pet: {
                                          id: pet.id,
                                          name: pet.name,
                                          gender: pet.gender,
                                          spesies: {
                                            id: pet.species.id,
                                            name: pet.species.name
                                          },
                                          age: pet.age.name,
                                          user: {
                                            id: pet.user.id,
                                            name: pet.user.breeder,
                                            address: pet.user.address,
                                            phone: pet.user.phone
                                          },
                                          about_pet: pet.about_pet,
                                          photo: pet.photo,
                                        },
                                        pet_liked: {
                                          id: petLiked.id,
                                          name: petLiked.name,
                                          gender: petLiked.gender,
                                          spesies: {
                                            id: petLiked.species.id,
                                            name: petLiked.species.name
                                          },
                                          age: petLiked.age.name,
                                          user: {
                                            id: petLiked.user.id,
                                            name: petLiked.user.breeder,
                                            address: petLiked.user.address,
                                            phone: petLiked.user.phone
                                          },
                                          about_pet: petLiked.about_pet,
                                          photo: petLiked.photo,
                                        },
                                        createdAt: dataMatch.createdAt,
                                        updatedAt: dataMatch.updatedAt
                                    }
                                )
                            })
                            
                        })
                    }else{
                        res.status(204).send({
                            error: true,
                            message: "Not Match"
                        })
                    }
            })
        }

    })
}


// Get Data matches Pet
exports.matchesPet = (req, res) =>{
    const query = req.query
    Match.findAll({
        include: [
            {
              model: Pet,
              attributes: ["id"],
              as: "pet"
            },
            {
              model: Pet,
              attributes: ["id"],
              as: "pet_liked"
            }
          ],
          where: {pet_id: query.pet_id, status: 1}
        }).then( dataMatch => {
          
          if(dataMatch.length > 1){
            var dataRest = []

            // callback get data ke database
            const callback = (data)=>{
              dataRest = [...dataRest, data]
              if(dataRest.length == dataMatch.length){
                res.send(dataRest)
              }
              
            }
            for (var i = 0; i < dataMatch.length; i++) {
                  getDetailLikeLiked(dataMatch[i], (data)=>callback(data))
            }
          }else{
            res.status(204).send({
                error: true,
                message: "Not Match Data"
            })
          }
          
    })
}
