import React from 'react';
import useAuth from '../../Components/hooks/useAuth';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Task from './Task';
const UserHome = () => {
  const { user } = useAuth();
  const userhome = useLoaderData();

  // Since the backend returns an array, make sure you access the first item
  const { id, name, email, designation, salary, status, paymentAmount, paymentDate } = userhome;

  return (
    <>
    <Helmet>
      <title>
        UserHome
        </title></Helmet>
    <div className='my-20 font-sedan text-2xl mx-72'>
      <p className='text-center mt-40'>Welcome, {name}!</p>
      <div className='text-[16px] py-2 pt-20 'id='userhome'>
      <p><span className='font-bold'>Full Name :</span> {name}</p>
      <p><span className='font-bold'>Email :</span> {email}</p>
        <p><span className='font-bold'>Designation :</span> {designation}</p>
        <p><span className='font-bold'>Salary :</span> {salary} BDT</p>
        <p><span className='font-bold'>Status :</span>{status}</p>
        <div className=''id='payment'>
          <Task/>
        <h2 className='mt-10 text-center my-2'>Received Payments</h2>
        <table className="w-full text-sm text-left rtl:text-right text-black mx-auto border-y-1">
         
          <thead className="text-sm bg-[#e2e7eb]">
            <tr>
              <th scope="col" className="px-6 py-3">Payment Amount</th>
              <th scope="col" className="px-6 py-3">Payment Date</th>
              </tr>
              </thead>
              <tbody>
              <tr>
              <th scope="col" className="px-6 py-3">{paymentAmount} BDT</th>
              <th scope="col" className="px-6 py-3">{paymentDate}</th>
                </tr></tbody>
              </table>
              </div>
        
        
      </div>
    </div>
    </>
  );
};

 

export default UserHome;
