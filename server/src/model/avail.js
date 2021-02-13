const { Schema, model } = require('mongoose');

const schema = new Schema({
  businessId: String,
  avail: [{
    date: String,
    time: [{ hour: String }],
  }],
});

const Avail = model('Avail', schema);

module.exports = Avail;
