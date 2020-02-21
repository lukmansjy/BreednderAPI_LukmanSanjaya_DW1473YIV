const Species = require('../models').species

// Insert One Species
exports.insertSpecies = (req, res) =>{
    Species.create(req.body).then(species => {
        if(species){
            res.send({
                id: species.id,
                species: species.name
            })
        }else{
            res.status(400).send({
                error: true,
                message: "Error insert data species"
            })
        }
    })
}

// Get All Species
exports.getsSpecies = (req, res) =>{
    Species.findAll().then(species => {
        if(species){
            res.send(species)
        }else{
            res.status(400).send({
                error: true,
                message: "Not get data species"
            })
        }
    })
}