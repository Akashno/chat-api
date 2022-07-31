const User = require("../user/user-model");
const Chat = require("./chat-model");

const createChat = async(socketId,message) => {

    const user = await User.findOne({socket:socketId})
    const newChat = new Chat({
        room:user.room,
        user:user._id,
        message:message
    })
    await newChat.save()
    await newChat.populate('user')
    return newChat
};

const getAllChats = async (room) => {
  //   const oldMessages =await Chat.find({room}).populate('user')
  const oldMessages = await Chat.aggregate([
    { $match: { room: room } },
    { $lookup: {
         from: "users" ,
         localField:"user",
         foreignField:"_id",
         as:"user"
    } },
    {$unwind:"$user"},
    {
        $project:{
            username:"$user.username",
            message:"$message",
            avatar:"$user.avatar",
            createdAt:"$createdAt"
        }
    }
  ]).sort({createdAt:1}).limit(50).sort({createdAt:-1});
  return oldMessages;
};
module.exports = {
  createChat,
  getAllChats
};
