const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages');

const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

console.log(username,room)
const socket = io()


//Join room
socket.emit('joinRoom',{username,room})
//Get rooms and users
socket.on('roomusers',({room,users})=>{
    outPutRoomName(room)
    outPutUsers(room)
})

//Message from server
socket.on('message',message=>{
    outPutMessage(message)
  
    //
    chatMessages.scrollTop = chatMessages.scrollHeight
})

//Message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    //Get message text
    const msg = e.target.elements.msg.value
    //Emit message to server
    socket.emit('chatMessage',msg)
    //Clear input
    e.target.elements.msg.value = ""
    e.target.elements.msg.focus() 
})

function outPutMessage(message){
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `
    <p class="meta">${message.username}<span>
    ${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>
    `
    document.querySelector('.chat-messages').appendChild(div)
    
}