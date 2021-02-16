const { Business, Service } = require('../model');

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
        if (data) {
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
        } else {
          console.log(data);
          const newServiceDoc = new Service({ businessId, services: [] });
          newServiceDoc.save()
            .then(() => {
              res.send('noProfile');
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
