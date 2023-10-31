const express = require("express")
const path = require("path")
const handConfig = require("../src/config/hendlebarsConfig")
const expressConfig = require("../src/config/expressConfig")
const router = require("./routes")
const { PORT } = require("../src/constants")
const dbConect = require("./database/dbconnect")

const app = express()
expressConfig(app)
handConfig(app) ////


app.use(router)

dbConect()
    .then(() => console.log("successfuly connect from then()"))
    .catch(err => console.log(`error is ${err}`))

app.listen(PORT, () => {
    console.log(`server is runing on port ${PORT}`);
    //

})