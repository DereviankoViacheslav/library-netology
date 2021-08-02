const { Schema, model } = require('mongoose');

var UserSchema = new Schema({
  userName: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  email: { type: String, unique: true, require: true }
});

module.exports = model('User', UserSchema);
