import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../Components/hooks/useAxiosSecure';

const CheckoutForm = ({ email, amount }) => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (amount) {
      axiosSecure.post('/create-payment-intent', { salary: amount })
        .then(res => setClientSecret(res.data.clientSecret))
        .catch(error => console.error('Error creating payment intent:', error));
    }
  }, [amount, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: email,
        },
      },
    });

    if (error) {
      console.log('[error]', error);
      setError(error.message);
    } else {
      console.log('[PaymentIntent]', paymentIntent);
      setError('');

      // Save payment information to the database
      const paymentData = {
        email: email,
        amount: amount,
        paymentIntentId: paymentIntent.id,
        date: new Date().toISOString(),
      };

      axiosSecure.post('/payment', paymentData)
        .then(res => {
          console.log('Payment saved:', res.data);
          // You can add additional success actions here
        })
        .catch(err => console.error('Error saving payment:', err));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className='text-red-600'>{error}</p>
    </form>
  );
};

export default CheckoutForm;
