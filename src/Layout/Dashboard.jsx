import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import useAdmin from '../pages/Components/hooks/useAdmin';
import useHR from '../pages/Components/hooks/useHR';
import { Outlet } from 'react-router-dom';
import useAuth from '../pages/Components/hooks/useAuth';
import { FaChartBar, FaHome, FaTable, FaUser, FaEnvelope, FaCreditCard, FaTasks } from 'react-icons/fa';
import Navbar from '../Shared/Navbar/Navbar';
import useAxiosSecure from '../pages/Components/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const { user } = useAuth();
  
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  return (
    <div className='flex'>
      <Navbar />
      {/**dashboard sidebar */}
      <div className='w-56 min-h-screen bg-gray-100 font-sedan fixed z-10 '>
        <ul className='menu my-24'>
          {isAdmin ? (
            <>
            
              <li>
                <h2 className='text-xl font-bold mx-10'>Admin</h2>
{user.name}
              </li>
              <li>
               <Link to='hrhome'>
               <FaHome/>
               Admin Home</Link>
                
                
              </li>
              <li>
                <ScrollLink to='averageSalaryChart' smooth={true} duration={500}>
                  <FaChartBar />
                  Average Salary Chart
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to='totalEmployees' smooth={true} duration={500}>
                  <FaUser />
                  Total Employees
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to='allEmployees' smooth={true} duration={500}>
                  <FaTable />
                  All Employees
                </ScrollLink>
              </li>
            </>
          ) : (
            <>
            <div className='mt-10 mx-5'>
            <li>
                <ScrollLink to='userhome' smooth={true} duration={500}>
                  <FaHome />
                  User Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to='payment' smooth={true} duration={500}>
                  <FaTasks/>
              Task
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to='payment' smooth={true} duration={500}>
                  <FaCreditCard/>
                Paments
                </ScrollLink>
              </li>
            </div>
             
            </>
          )}
          
        
        </ul>
      </div>

      {/**dashboard content */}
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
