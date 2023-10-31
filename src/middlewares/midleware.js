
const jwt = require("../lib/jwt");
const { SECRET } = require("../constants");

exports.auth = async (req, res, next) => {
    const token = req.cookies['wizardCreature']
    console.log(`\ntoken middleware ${token}`);
    if (!token) {
        res.clearCookie("wizardCreature")
        console.log('\n cookies are cleared from middleware !');
        res.render('home')
        
    }
    res.cookie("wizardCreature", token)
    console.log('\n cookies are set middleware !');
    res.locals.isAuth = true
    await next()
}

exports.authFromZweti = async (req, res, next) => {
    const token = req.cookies["auth"];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, SECRET);
            req.user = decodedToken;
            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;

            next();
        } catch (error) {
            console.log({ error });
            res.clearCookie("auth");
            res.redirect("/users/login");
        }
    } else {
        next();
    }
};

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect("/users/login");
    }

    next();
};
