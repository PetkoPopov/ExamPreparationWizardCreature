const mongoose = require("mongoose")
const { DB_URL } = require("../constants")


async function dbConect(){
    await mongoose.connect(DB_URL)
}
module.exports = dbConect