const { Schema, model } = require('mongoose');

const schema = new Schema({
  businessId: String,
  name: String,
  city: String,
  state: String,
  serviceType: String,
});

const Business = model('Business', schema);

module.exports = Business;
