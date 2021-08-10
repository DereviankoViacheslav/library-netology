const { Schema, model } = require('mongoose');

var ChatRoomSchema = new Schema({
  roomName: { type: String, unique: true, require: true },
  messages: [
    {
      userName: { type: String, require: true },
      text: { type: String, require: true },
      msgType: { type: String, require: true }
    }
  ]
});

module.exports = model('chatroom', ChatRoomSchema);
