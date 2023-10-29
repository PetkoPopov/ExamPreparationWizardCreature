const mongoose = require("mongoose")


const mongoSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: {
        type: String,
        unique: [true, 'such email already exists,from schema ! ']
    },
    password: {
        type: String,
        required: true,
        minLength: [4, "too short from schema !"],
        maxLength: [10, "Too long from schema !"]
    }

})
mongoSchema.virtual("repeatPassword").set(function (value) {
    if (value !== this.password) {
        throw new Error('Password does not match')
    }
})

// mongoSchema.pre("save",async function(){
// const hash =await bcrypt.hash(this.password,10)
// this.password=hash
// })

const User = mongoose.model("user", mongoSchema)

module.exports = User