const User = require('../models/userModel');
const { getFilePath, unlinkFile } = require('../utils/auth');
const bcryptjs = require('bcryptjs');
const { createAccessToken, createRefreshToken } = require('../utils/jwt');

module.exports = {
    index: (req, res) => {
        User.get(req.con, (error, rows) => {
            if (error) {
                res.status(500).send({ response: "Ha ocurrido un error listando los usuarios" })
            } else { res.status(200).send({ response: rows }) }
        })
    },
    store: (req, res) => {
        console.log(req.body)
        req.body.img = ''
        if (req.files.img) {
            req.body.img = getFilePath(req.files.img)
        }
        console.log(req.body.img)
        User.create(req.con, req.body, (error, row) => {
            if (error) {
                if(req.body.img)unlinkFile(req.body.img)
                res.status(500).send({ response: "Ha ocurrido un error creando los usuarios" })
            } else { res.status(200).send({ response: row }) }

        })
    }, login: (req, res) => {
        
        const { email, password } = req.body
      
        User.getByEmail(req.con, email, (error, row) => {
            if (error) {
                res.status(500).send({ response: "Ha ocurrido un error obteniedno el ususario" })
            } else {
                console.log("toy aqui")
                const userData = row[0]
                if (!userData) return res.status(500).send({ response: "El usuario no existe" })
                bcryptjs.compare(password, userData.password, (error, check) => {
                    if (error) {
                        return res.status(500).send({ response: "error del servidor" })
                    }
                    if (!check) {
                        return res.status(400).send({ response: "Datos incorrectos" })
                    }
                    if (!userData.active) {
                        return res.status(401).send({
                            response: "Usuario inactivo"
                        });
                    }
                    delete userData.password
                    res.status(200).send({
                        response: {
                            token: createAccessToken(userData),
                            refresh: createRefreshToken(userData)
                        }
                    });
                });
            }
        })
    }
}