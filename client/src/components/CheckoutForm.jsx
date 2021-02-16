import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import axios from '../axios';

export default function CheckoutForm({ handleConfirm, amount }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axios.post('/create-payment-intent', { amount })
      .then((res) => {
        setClientSecret(res.data.client_secret);
      });
  }, []);

  const formStyle = {
    width: '100%',
    alignSelf: 'center',
    borderRadius: '7px',
  };

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      handleConfirm();
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} style={formStyle}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <Button
        className="mt-4"
        type="submit"
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <div id="button-text">
          {processing ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              {' Processing...'}
            </>
          ) : (
            'Submit Payment'
          )}
        </div>
      </Button>
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}

CheckoutForm.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  amount: PropTypes.number,
};

CheckoutForm.defaultProps = {
  amount: null,
};
