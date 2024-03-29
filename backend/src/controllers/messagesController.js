const Message = require('../models/messageModel');


module.exports = {
    index: (req, res) => {
        _getMessages(req, res)
    },
    store: (req, res) => {
        
        Message.create(req.con, req.body, (error) => {
            
            if (error) {
                res.status(500).send({ response: "Ha ocurrido un error creando el mensaje" })
            } else {
                
                _getMessages(req, res)
            }

        })
    }, destroy: (req, res) => {
        const { id } = req.params
        Message.destroy(req.con, id, (error) => {
            if (error) {
                res.status(500).send({ response: "Ha ocurrido un error eliminado el mensaje" })
            } else {
                _getMessages(req, res)
            }

        })
    },
}
function _getMessages(req, res) {
    Message.get(req.con, (error, rows) => {
        if (error) {
            res.status(500).send({ response: "Ha ocurrido un error listando los mensajes" })
        } else {
            const { io } = req;
            io.emit('message', rows)
            res.status(200).send({ response: rows })
        }
    })
}