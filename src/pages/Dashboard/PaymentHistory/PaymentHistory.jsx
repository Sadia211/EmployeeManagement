import React from 'react';
import useAuth from '../../Components/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Components/hooks/useAxiosSecure';
import { useLoaderData } from 'react-router-dom';

const PaymentHistory = () => {
  const { user } = useAuth(); // Get the authenticated user
  const axiosSecure = useAxiosSecure(); // Custom hook to use secure Axios instance
   const paymenthistory=useLoaderData();
  const { id, name, email, designation, salary, status, paymentAmount, paymentDate } = paymenthistory;


  return (
    <div>
      <h2>Payment History</h2>
      {paymentAmount}
       
    </div>
  );
};

export default PaymentHistory;
