const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const { getAllMessages,userLeave,getRoomUsers,userJoin,getCurrentUser } = require('./utils/users')
const { rooms } = require('./utils/rooms')
const cors = require('cors')




const app = express()
app.use(cors())
const server = http.createServer(app)


const io = require('socket.io')(server, {
    cors: {
        origin: ['https://example.com','http://localhost:8080','ip-address'],
    }
});

//Set static folder
const botName = 'ChatCord Bot'
const botAvatar="https://png.pngtree.com/png-clipart/20220329/ourmid/pngtree-d-rendering-hijab-woman-with-business-outfit-black-suit-and-red-png-image_4518784.png"

//Run when client connects
io.on('connection',socket=>{
    //Join Room
    socket.on('joinRoom',({username,room},callback)=>{
       const user = userJoin(socket.id,username,room)
       socket.join(user.room)
      //Welcome current user
       socket.emit('message',formatMessage(botName,'Welcome to chatcord',botAvatar))
       socket.broadcast.to(user.room).emit('message',formatMessage(botName,` ${user.username} has joined the chat`,botAvatar));
       //Send users
       io.to(user.room).emit('roomusers',{
            room:user.room,
            users:getRoomUsers(user.room)
       })
       const messages = getAllMessages(user.room)
       callback({user,messages})
    })

    //Broadcast when a user connects

    //Listen for chat message 
    socket.on('chatMessage',(msg)=>{
        const user = getCurrentUser(socket.id,msg)
        io.to(user.room).emit('message',formatMessage(user.username,msg,user.avatar))
    })

    //Runs when client disconnects
    socket.on('disconnect',()=>{
        const user = userLeave(socket.id)
        if(user){
           io.to(user.room).emit('message',formatMessage(botName,` ${user.username} has left the chat`,botAvatar))
        }

    })

})



const PORT = 3000 || process.env.PORT;

app.get("/rooms",(req,res)=>{

    res.json({
        rooms
    })

})
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
