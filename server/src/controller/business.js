const { Business } = require('../model');

module.exports = {
  get: (req, res) => {
    const { city, serviceType } = req.body;
    Business.find({ city, serviceType })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};