const mongoose = require('mongoose')
const creatureSchema = mongoose.Schema({
    //name,skin,eye,description,image,species
    name: { type: String, required: [true, 'string &#128540 !'] },
    skin: String,
    eye: String,
    description: String,
    image: String,
    species: {
        type: [String, "Need to be string dummy &#128540 !"], minLength: [4, "too short species name ! "]
    }
})

const Creature = mongoose.model('creatures', creatureSchema)


module.exports = Creature