
const { recordUser, login } = require("../services/userService")
const router = require("express").Router()
const bcrypt = require("bcrypt")

router.get("/register", (req, res) => {
    res.render('user/register')
})
router.get('/login', (req, res) => {
    res.render("user/login")
})

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body
    await recordUser({ firstName, lastName, email, password, repeatPassword })
    console.log('user is recorded !');
    res.redirect('login');
})


router.post('/login',
    async (req, res) => {
        const { email, password } = req.body
        const tokenMyUser = await login({ email, password })
        if (tokenMyUser.token) {
            console.log(`Token from controller ${tokenMyUser.token}`);
            
            console.log('cookies are seted !');
            
            res.locals.auth = "auth"
            res.locals.firstName = tokenMyUser.user.firstName
            res.locals.lastName = tokenMyUser.user.lastName
            
            res.cookie('wizardCreature', tokenMyUser.token)
            // console.log(tokenMyUser.user);
            console.log(res.locals.user);

        } else {

            console.log('cookie are cleared from wrong login !');
            res.redirect('/logout')
        }
        res.render("home",{user:tokenMyUser.user})
    })

router.get('/logout', (req, res) => {
    res.clearCookie('wizardCreature')
    console.log('clear cookies from logout !');
    res.redirect('/')

})


module.exports = router