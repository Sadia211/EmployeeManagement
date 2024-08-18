import React from 'react';
import useAuth from '../../Components/hooks/useAuth';
import useAxiosPublic from '../../Components/hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Components/hooks/useAxiosSecure';
import { useLoaderData } from 'react-router-dom';
const UserHome = () => {
  const { user } = useAuth(); // Assuming this provides the authenticated user's info
  const userhome = useLoaderData(); // Data fetched from loader
  const { id, name, email,designation, salary, status } = userhome;

  return (
      <div className='my-20  font-sedan text-2xl mx-72'>
          <p className='text-center mt-40'>Welcome, {name}!</p>
         <div className='text-xl py-2'>
          <p>Designation: {designation}</p>
          <p>Salary: {salary}</p>
          <p>Status: {status}</p>
         </div>
      </div>
  );
};


export default UserHome;
