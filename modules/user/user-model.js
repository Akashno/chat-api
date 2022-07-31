
const {Schema,Model,ObjectId} = require('../../tools')


let userSchema = new Schema(
  {
    room:{
      type:ObjectId,
      ref:'Room'
    },
    username: {
      type: String,
    },
    avatar:{
      type:String
    },
    socket:{
      type:String
    },
    isActive:{
      type:Boolean,
      default:true
    }
  },
  { timestamps: true }
);

let User =Model("User", userSchema);

module.exports = User;