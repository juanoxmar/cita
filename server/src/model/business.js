const { Schema, model } = require('mongoose');

const schema = new Schema({
  businessId: String,
  name: String,
  serviceType: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  photo: String,
});

const Business = model('Business', schema);

module.exports = Business;
