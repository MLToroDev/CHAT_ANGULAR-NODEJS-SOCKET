const express = require('express')
const MessageController = require('../controllers/messagesController');
const { userAuthenticade } = require('../middleware/auth');

const app = express.Router()

app.get('/messages', userAuthenticade, MessageController.index)
app.post('/messages/create', userAuthenticade, MessageController.store)
app.delete('/messages/:id', userAuthenticade, MessageController.destroy)
module.exports = app;