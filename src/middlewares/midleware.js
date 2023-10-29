
exports.isToken = (req, res, next) => {
    const token = req["wizardCreature"]
    if (!token) {
        res.redirect('/')
    }
    res.cookie("wizardCreature", token)
    res.locals.isAuth = true
    next()

}