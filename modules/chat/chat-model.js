
const {Schema,Model,ObjectId} = require('../../tools')


let chatSchema = new Schema(
  {
    room:{
      type:ObjectId,
      ref:'Room'
    },
    user: {
      type: ObjectId,
      ref:'User',
    },
    message:{
      type:String
    }
  },
  { timestamps: true }
);

let Chat = Model("Chat", chatSchema);

module.exports = Chat;