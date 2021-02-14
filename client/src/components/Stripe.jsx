import React from 'react';
import PropTypes from 'prop-types';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const promise = loadStripe(
  'pk_test_51HMJBPGBojkWCNzVziQP5U6WyYqElehq5FoUWBk40FAHz1H6HEvT3H0ugNcMz2w5nk7Ots7XpGdaoFnQtTjJQOvD00tZoSfndF',
  { apiVersion: '2020-08-27' },
);

export default function Stripe({ handleConfirm, amount }) {
  return (
    <div className="App">
      <Elements stripe={promise}>
        <CheckoutForm handleConfirm={handleConfirm} amount={amount} />
      </Elements>
    </div>
  );
}

Stripe.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  amount: PropTypes.number,
};

Stripe.defaultProps = {
  amount: null,
};
