const { Schema, model } = require('mongoose');

const schema = new Schema({
  businessId: String,
  services: [{
    service: String,
    price: Number,
  }],
});

const Service = model('Services', schema);

module.exports = Service;
