import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../Components/hooks/useAxiosSecure';
import Swal from 'sweetalert2'
// CheckoutForm component
const CheckoutForm = ({ email, amount }) => {
  // State variables to manage error messages and client secret for payment
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  // Stripe hooks to access Stripe API functions
  const stripe = useStripe();
  const elements = useElements();

  // Custom Axios hook for making secure HTTP requests
  const axiosSecure = useAxiosSecure();

  // useEffect hook to create a payment intent when the amount is available
  useEffect(() => {
    if (amount) {
      // Remove commas from amount and convert to a number
      const sanitizedAmount = parseInt(amount.replace(/,/g, ''), 10);
      console.log("Sending salary amount:", sanitizedAmount);  // Debugging

      // Send a POST request to create a payment intent with the sanitized amount
      axiosSecure.post('/create-payment-intent', { salary: sanitizedAmount })
        .then(res => setClientSecret(res.data.clientSecret))
        .catch(error => {
          console.error('Error creating payment intent:', error);
          if (error.response && error.response.data) {
            console.error('Backend error message:', error.response.data.error);
          }
        });
    }
  }, [amount, axiosSecure]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent default form submission

    // Check if Stripe, elements, and clientSecret are available
    if (!stripe || !elements || !clientSecret) {
      return;
    }

    // Get card details from CardElement
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Confirm card payment using the client secret and card details
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
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Payment successful',
            showConfirmButton: false,
            timer: 1500,
        });
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
      <button className='btn btn-square mt-5'type="submit" disabled={!stripe || !clientSecret}>
       Pay
      </button>
      <p className='text-red-600'>{error}</p>
    </form>
  );
};

export default CheckoutForm;
