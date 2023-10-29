const bcrypt = require("bcrypt")
async function getHash(){
const hash = await bcrypt.hash("qwer",1)
console.log(hash);
}
getHash()
