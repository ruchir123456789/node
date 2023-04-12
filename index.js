const http=require('http');
const express = require("express");

const app =express();
  

const server =http.createServer(app);
const port = process.env.PORT || 8000;


server.listen(port,()=>{
    console.log("server started at "+port)
})
app.use(express.static(__dirname+'/'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
      
})

// socket

const io =require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('user joined')
    socket.on('message', (msg) => {
        console.log(msg)
        socket.broadcast.emit('message',msg)
        // users[socket.id] = name;
        // socket.broadcast.emit('user-joined', name)
    })

})
// const io = require('socket.io')(8000)


// const users = {}


// io.on('connection', socket => {
//     socket.on('new-user-joined', name => {
//         console.log(name)
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name)
//     })

//     socket.on('send', message => {
//         socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
//     })





// }

// )
