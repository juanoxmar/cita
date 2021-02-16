const { Business } = require('../model');

module.exports = {
  search: (req, res) => {
    const { city, serviceType } = req.body;
    Business.find({ city, serviceType })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  post: (req, res) => {
    const { businessId } = req.body;
    Business.updateOne({ businessId }, req.body, { upsert: true })
      .then(() => {
        res.send('ok');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  get: (req, res) => {
    const { businessId } = req.params;
    Business.findOne({ businessId })
      .then((data) => {
        const {
          name, serviceType, street, city, state, zip, photo,
        } = data;
        res.send({
          name,
          serviceType,
          street,
          city,
          state,
          zip,
          photo,
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
