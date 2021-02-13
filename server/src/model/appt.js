const { Schema, model } = require('mongoose');

const schema = new Schema({
  businessId: String,
  customer: {
    name: String,
    phone: String,
  },
  appointment: {
    date: String,
    time: String,
    service: String,
    price: Number,
  },
});

const Appt = model('Appt', schema);

module.exports = Appt;
