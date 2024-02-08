const { decodeToken } = require("../utils/jwt");

function userAuthenticade(req, res, next) {

    const { authorization } = req.headers;
    if (!authorization) return res.status(500).send({ reponse: "el token es requerido" })
    const token = authorization.replace('Bearer ', '');
    const userData = decodeToken(token)
    try {
        const { exp } = userData
        const currentTime = new Date().getTime()
        if (exp < currentTime) return res.status(400).send({ reponse: "El token ha expirado" })
        next()
    } catch (error) {
        res.status(400).send({ reponse: "El token no es valido" })
    }


}

module.exports = { userAuthenticade }