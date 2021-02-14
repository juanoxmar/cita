const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_KEY);

module.exports = {
  post: (req, res) => {
    const { amount } = req.body;
    stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      payment_method_types: ['card'],
    })
      .then((intent) => {
        res.send({ client_secret: intent.client_secret });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};
