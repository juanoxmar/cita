const moment = require('moment');
const { Appt } = require('../model');

module.exports = {
  post: (req, res) => {
    const { businessId, customer, appointment } = req.body;
    const newAppt = new Appt({
      businessId, customer, appointment,
    });
    newAppt.save()
      .then(() => {
        res.send('Sucessfully Booked Appointment');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  get: (req, res) => {
    const { businessId } = req.params;
    Appt.find({ businessId })
      .then((data) => {
        const dateObjects = data.map((appt) => moment(appt.appointment.date));
        res.send(dateObjects);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getDash: (req, res) => {
    const { businessId } = req.params;
    Appt.find({ businessId })
      .then((data) => {
        const dateObjects = data.map((appt) => {
          const { customer, appointment, _id } = appt;
          const scheduleData = {
            businessId,
            customer,
            appointment,
            startDate: moment(appointment.date),
            endDate: moment(appointment.date).add(1, 'hour'),
            title: `${appointment.service} / ${customer.name} / ${customer.phone}`,
            _id,
          };
          return scheduleData;
        });
        res.send(dateObjects);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
