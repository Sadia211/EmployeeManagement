import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import useAdmin from '../pages/Components/hooks/useAdmin';
import useHR from '../pages/Components/hooks/useHR';
import { Outlet } from 'react-router-dom';
import useAuth from '../pages/Components/hooks/useAuth';
import { FaChartBar, FaHome, FaTable, FaUser, FaEnvelope } from 'react-icons/fa';
import Navbar from '../Shared/Navbar/Navbar';
import useAxiosSecure from '../pages/Components/hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isHR] = useHR();
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
                <ScrollLink to='adminHome' smooth={true} duration={500}>
                  <FaHome />
                  Admin Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to='addItems' smooth={true} duration={500}>
                  <FaUtensils />
                  Add items
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to='allUsers' smooth={true} duration={500}>
                  <FaUser />
                  All Users
                </ScrollLink>
              </li>
              <div className="divider"></div>
            </>
          ) : isHR ? (
            <>
              <li>
                <h2 className='text-xl font-bold items-center'>Admin</h2>
                {user?.displayName || user?.name}
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
              <li>
                <ScrollLink to='userHome' smooth={true} duration={500}>
                  <FaHome />
                  User Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink to='history' smooth={true} duration={500}>
                  
                  Not History
                </ScrollLink>
              </li>
            </>
          )}
          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <ScrollLink to='home' smooth={true} duration={500}>
              <FaHome />
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to='menu' smooth={true} duration={500}>
            
              Menu
            </ScrollLink>
          </li>
          <li>
            <ScrollLink to='contact' smooth={true} duration={500}>
              <FaEnvelope />
              Contact
            </ScrollLink>
          </li>
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
