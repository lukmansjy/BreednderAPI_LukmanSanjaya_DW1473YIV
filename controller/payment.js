const Model = require('../models')
const Payment = Model.payment
const User = Model.user
const jwt = require('jsonwebtoken')
const multer = require('multer')

const {secretKey} = require('../config/secretKey')
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

//Multer
const multerDiskStore = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'public/uploads/payment')
    },
    filename: (req, file, callback) =>{
        const originalFile = file.originalname
        const nameArr = originalFile.split('.')
        var extension = ''
        if(nameArr.length > 1){
            extension = nameArr[nameArr.length - 1]
        }
        callback(null, `${file.fieldname}-${Date.now()}.${extension}`)
    }
})

const multerUpload = multer({storage: multerDiskStore})


// Insert Payment
exports.insertPayment = (req, res) =>{
    console.log(req.file)
    if(req.file){
        const dataFile = `${baseUrl}${req.file.destination.replace(/public\//g, '')}${req.file.filename}`
        const jwtData = verifyJwt(req.headers.authorization)
        if(!jwtData.error){
            const dataInsert = {
                no_rek: req.body.no_rek,
                proof_of_transfer: dataFile,
                status: req.body.status,
                user_id: jwtData.values.userId
            }
            Payment.create(dataInsert).then(dataPeyment => {
                if(dataPeyment){
                    Payment.findOne({
                        include: [
                        {
                            model: User,
                            attributes: ["id", "breeder", "address", "phone", 'createdAt', 'updatedAt'],
                            as: "user"
                        }
                        ],
                        where: {id: dataPeyment.id},
                        attributes: ['no_rek', 'proof_of_transfer', 'status']
                    }).then(data => res.send(data))
                }else{
                    res.status(400).send({
                        error: true,
                        message: "Error Insert Data"
                    })
                }
            })
        }else{
            res.status(401).send({
                error: true,
                message: "Error Not Authorized"
            })
        }

    }else{
        res.status(401).send({
            error: true,
            message: "Error Not Authorized, Picture Required!"
        })
    }
    
}

// Update Paymanet
exports.updatePayment = (req, res)=>{
    const idPayment = req.params.id
    const jwtData = verifyJwt(req.headers.authorization)
    if(!jwtData.error){
        User.findOne({where: {id: jwtData.values.userId, admin: true}}).then( data =>{
            if(data){
                Payment.update(req.body, {where: {id: idPayment}}).then( updated => {
                    if(updated){
                        Payment.findOne({
                            include: [
                              {
                                model: User,
                                attributes: ["id", "breeder", "address", "phone"],
                                as: "user"
                              }
                            ],
                            where: {id: idPayment},
                            attributes: ['id', 'no_rek', 'proof_of_transfer', 'status']
                        }).then( respon => res.send(respon))
                    }
                })
            }else{
                res.status(401).send({
                    error: true,
                    message: "Your Not Admin"
                })
            }
        })
    }else{
        res.status(401).send({
            error: true,
            message: "Error Not Authorized"
        })
    }
    
    
}

// Cek Payment By ID
exports.cekPayment = (req, res)=>{
    const idPayment = req.params.id
    Payment.findOne({
        include: [
          {
            model: User,
            attributes: ["id", "breeder", "address", "phone"],
            as: "user"
          }
        ],
        where: {id: idPayment},
        attributes: ['id', 'no_rek', 'proof_of_transfer', 'status']
    }).then( respon => res.send(respon))
}