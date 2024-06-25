import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Sectiontitle from '../../Components/Sectiontitle';
import { Elements } from '@stripe/react-stripe-js';
import Checkoutform from '../Payment/CheckoutForm';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Components/hooks/useAxiosSecure';
import { useLoaderData } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_Gateway_pk);

const Payment = () => {
    const pay=useLoaderData();
    const {id,name,email}=pay;
   
   

    return (
        <div>
            <Sectiontitle heading="Payment" subheading= "Please pay for" />
         
            <Elements stripe={stripePromise}>
<p>{name}</p>


                <Checkoutform />
            </Elements>
        </div>
    );
};

export default Payment;
