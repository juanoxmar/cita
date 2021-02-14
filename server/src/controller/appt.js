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
};
