const {Schema,Model} = require('../../tools')

let roomSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

let Room = Model("Room", roomSchema);

module.exports = Room;