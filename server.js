const http = require('http')
const express = require('express')
const config = require('./config')
const formatMessage = require('./utils/messages')
const { userLeave,getRoomUsers,userJoin,getCurrentUser } = require('./modules/user/user-helper')
const cors = require('cors')
const mongoose = require('mongoose')
const Room = require('./modules/room/room-model')
const { getAllChats,createChat } = require('./modules/chat/chat-helper')



const PORT =   process.env.PORT || 3002;

const botName = 'ChatCord Bot'
const botAvatar="https://png.pngtree.com/png-clipart/20220329/ourmid/pngtree-d-rendering-hijab-woman-with-business-outfit-black-suit-and-red-png-image_4518784.png"

const app = express()
app.use(cors())
const server = http.createServer(app)


let corsOptions = { origin: ['https://goofy-vue-chat.netlify.app','http://localhost:8081','*'] }
const io = require('socket.io')(server, {cors:corsOptions });


//Run when client connects

io.on('connection',socket=>{
    //Join Room
    socket.on('userJoin',async ({username,roomId},callback)=>{
       const user =await userJoin(socket.handshake.query.token,username,roomId)
       socket.join(String(user._id))
       socket.join(String(user.room))
      //Welcome current user
       socket.emit('message',formatMessage(botName,'Welcome to chatcord',botAvatar))
       socket.broadcast.to(String(user.room)).emit('message',formatMessage(botName,` ${user.username} has joined the chat`,botAvatar));

       //Send all room users 
       let users = await getRoomUsers(String(user.room))
       if(users){
       io.to(String(user.room)).emit('roomusers',{
            room:user.room,
            users:users
       })
       }

       // send userdetails and old messages
       const messages =await getAllChats(user.room)
       callback({user,messages})
    })

    //Broadcast when a user connects

    //Listen for chat message 
    socket.on('chatMessage',async (message)=>{
        const chat =await createChat(socket.handshake.query.token,message)
        io.to(String(chat.room)).emit('message',formatMessage(chat.user.username,chat.message,chat.user.avatar,chat.createdAt,chat.user.socket))
    })

    socket.on('forceDisconnect',()=>{
        socket.disconnect()
    })
    //Runs when client disconnects
    socket.on('disconnect',async()=>{
        const user =await userLeave(socket.handshake.query.token)
        if(user){
          io.to(String(user.room)).emit('message',formatMessage(botName,` ${user.username} has left the chat`,botAvatar))
          let users = await getRoomUsers(String(user.room))
          io.to(String(user.room)).emit('roomusers',{ room:user.room, users:users })
        }
    })
})



const dbUrl = process.env.dbUrl || config.dbUrl ;
var options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(dbUrl, options, (err) => { if (err) console.log(err); }); //

//

app.get("/rooms",async (req,res)=>{
    const rooms =await  Room.find({})
    res.json({ rooms })

})
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
