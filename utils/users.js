const users = []
const avatars = [
   'https://png.pngtree.com/png-clipart/20220322/ourmid/pngtree-d-render-male-avatar-with-blue-sweater-good-for-profile-picture-png-image_4506784.png' ,
   'https://png.pngtree.com/png-clipart/20220322/ourmid/pngtree-3d-rendering-male-avatar-businessman-with-suit-and-tie-png-image_4506893.png',
   'https://png.pngtree.com/png-clipart/20220329/ourmid/pngtree-d-rendering-dark-skin-male-character-profile-with-mustache-and-beard-png-image_4518861.png',
   'https://png.pngtree.com/png-clipart/20220401/ourmid/pngtree-d-stylish-girl-avatar-with-long-black-hair-ponytail-style-and-png-image_4523691.png',
   'https://png.pngtree.com/png-clipart/20220408/ourmid/pngtree-3d-rendering-beautiful-brown-hair-woman-with-red-ress-png-image_4531996.png',
   'https://png.pngtree.com/png-clipart/20220402/ourmid/pngtree-d-stylish-girl-character-avatar-with-pink-sweater-hat-and-blonde-png-image_4524928.png',
   'https://png.pngtree.com/png-clipart/20220327/ourmid/pngtree-d-rendering-male-character-profile-with-cream-hat-and-orange-polo-png-image_4516514.png',
   'https://png.pngtree.com/png-clipart/20220401/ourmid/pngtree-d-rendering-gentleman-male-avatar-with-black-suit-and-red-butterfly-png-image_4521690.png'

]
const messages=[

]
function userJoin(id,username,room){
    var avatar = avatars[Math.floor(Math.random()*avatars.length)];
    const user = { id,username,room,avatar}
    users.push(user)
    return user

}

//get all messages
function getAllMessages(room){
      const oldMessages = messages.filter(message=>message.room===room)
      return oldMessages
}
//Get current user
function getCurrentUser(id,msg){

    const user  = users.find(user=>user.id === id);
    messages.push({
        room:user.room,
        username:user.username,
        avatar:user.avatar,
        text:msg
    })
    return user
}

function userLeave(id){
    const index = users.findIndex(user=>user.id ===id)
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}
function getRoomUsers(room){
   return users.filter(user=>user.room === room)
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    getAllMessages
}
