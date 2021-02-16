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
  post: (req, res) => {
    const {
      service, price, description, businessId,
    } = req.body;
    Service.updateOne({ businessId }, {
      $push: {
        services: {
          service, price, description,
        },
      },
    })
      .then(() => {
        res.send('ok');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
