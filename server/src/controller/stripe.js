const stripe = require('stripe')('sk_test_51HMJBPGBojkWCNzVLWkzJdIr8GKLA6zSRuGBhrRnzUErc5gHYMJLh3XW6hteZWDPWNEmH2sAjFyiuPfUyoEk5aZg00tZbRIWAh');

module.exports = {
  post: (req, res) => {
    const { amount } = req.body;
    stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    })
      .then((paymentIntent) => {
        res.send({ clientSecret: paymentIntent.client_secret });
      });
  },
};
