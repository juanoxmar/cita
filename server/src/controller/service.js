const { Service } = require('../model');

module.exports = {
  get: (req, res) => {
    const { businessId } = req.params;
    Service.findOne({ businessId })
      .then((data) => {
        res.send(data.services);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
