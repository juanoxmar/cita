const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: String,
  photo: String,
  sub: String,
});

const User = model('User', schema);

module.exports = User;
