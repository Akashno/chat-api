const { ObjectId } = require("../../tools");
const Chat = require("../chat/chat-model");
const Room = require("../room/room-model");
const User = require("./user-model");

const users = [];
const avatars = [
  "https://png.pngtree.com/png-clipart/20220322/ourmid/pngtree-d-render-male-avatar-with-blue-sweater-good-for-profile-picture-png-image_4506784.png",
  "https://png.pngtree.com/png-clipart/20220322/ourmid/pngtree-3d-rendering-male-avatar-businessman-with-suit-and-tie-png-image_4506893.png",
  "https://png.pngtree.com/png-clipart/20220329/ourmid/pngtree-d-rendering-dark-skin-male-character-profile-with-mustache-and-beard-png-image_4518861.png",
  "https://png.pngtree.com/png-clipart/20220401/ourmid/pngtree-d-stylish-girl-avatar-with-long-black-hair-ponytail-style-and-png-image_4523691.png",
  "https://png.pngtree.com/png-clipart/20220408/ourmid/pngtree-3d-rendering-beautiful-brown-hair-woman-with-red-ress-png-image_4531996.png",
  "https://png.pngtree.com/png-clipart/20220402/ourmid/pngtree-d-stylish-girl-character-avatar-with-pink-sweater-hat-and-blonde-png-image_4524928.png",
  "https://png.pngtree.com/png-clipart/20220327/ourmid/pngtree-d-rendering-male-character-profile-with-cream-hat-and-orange-polo-png-image_4516514.png",
  "https://png.pngtree.com/png-clipart/20220401/ourmid/pngtree-d-rendering-gentleman-male-avatar-with-black-suit-and-red-butterfly-png-image_4521690.png",
];
const messages = [];
const userJoin = async (socketId, username, roomId) => {
  const avatar = avatars[Math.floor(Math.random() * avatars.length)];
  const existingUser = await User.findOne({ socket: socketId });
  if (existingUser) {
    existingUser.username = username
    existingUser.isActive = true;
    existingUser.room = roomId
    await existingUser.save()
    return existingUser;
  }
  const newUser = new User({
    avatar,
    room: roomId,
    socket: socketId,
    username,
    isActive:true
  });
  await newUser.save();
  return newUser;
};
const userLeave = async (socketId) => {
  const existingUser = await User.findOne({ socket: socketId });
  if (!existingUser) return;
  existingUser.isActive = false;
  await existingUser.save();
  return existingUser;
};

const getCurrentUser = async (socketId) => {
  const currentUser = await User.findOne({ socket: socketId });
  return currentUser;
};

const getRoomUsers = async (room) => {
  const usersInRoom = await User.find({ room: room   });
  return usersInRoom;
};

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
};
