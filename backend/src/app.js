const express = require('express');
const cors = require('cors');

const dbConnection = require('./config/db')

const { API_VERSION, API_NAME } = process.env

const app = express()

const http = require('http');

const httpServer = http.createServer(app)


const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:4200',
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    }

})
app.use(cors())
const userRoutes = require('./router/userRoute')
const messageRoutes = require('./router/messageRoute')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('src/upload'))
app.use((req, res, next) => {
    req.io = io;
    req.con = dbConnection;
    next();
})

const basePath = `/${API_NAME}/${API_VERSION}`

app.use(basePath,userRoutes)
app.use(basePath,messageRoutes)
io.on('connect',(socket)=>{
    socket.on('disconnect',()=>{
        console.log('an user has disconnected');
    }),
    socket.on('typing',(data)=>{
        io.emit('listening',data);
    })

})

module.exports = httpServer;