const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("../lib/jwt")
const { SECRET } = require("../constants")
exports.recordUser = (data) => User.create(data)
exports.login = async (data) => {
    // console.log(data);return 
    const myUser = await User.findOne({ email: data.email })
    // console.log(`${data.password}`);
    // return
    if (!myUser) {
        throw new Error("no such user !")
    } else if (myUser && data.password == myUser.password) {
        // const isValid = bcrypt.compare(myUser.password, password)
        const payload = { _id: myUser.id, emial: myUser.email }
        const token = await jwt.sing(payload, SECRET, { expiresIn: '3d' })
        console.log(`token is ${token}`);
        return { token: token, user: myUser }
    } else {
        throw new Error('Password does not match !')
    }
}