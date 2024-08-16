import React from 'react';
import useAdmin from '../pages/Components/hooks/useAdmin';
import useHR from '../pages/Components/hooks/useHR';
import { Outlet, NavLink } from 'react-router-dom';
import useAuth from '../pages/Components/hooks/useAuth';
import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUtensils, FaVoicemail, FaEnvelope } from 'react-icons/fa';
import Navbar from '../Shared/Navbar/Navbar';
import useAxiosPublic from '../pages/Components/hooks/useAxiosPublic';
const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isHR] = useHR();
  const { user } = useAuth();
  const{users}=useAxiosPublic();
  // Log the user object to check its properties
  console.log(user);

  return (
    <div className='flex'>
      <Navbar />
      {/**dashboard sidebar */}
      <div className='w-64 min-h-screen bg-gray-100 font-sedan'>
        <ul className='menu my-24'>
          {isAdmin ? (
            <>
              <li><NavLink to='/dashboard/adminhome'>
                <FaHome />
                Admin Home
              </NavLink></li>

              <li><NavLink to='/dashboard/additems'>
                <FaUtensils />
                Add items
              </NavLink></li>

              <li><NavLink to='/dashboard/allusers'>
                <FaUser />
                All Users
              </NavLink></li>

              <div className="divider"></div>
            </>
          ) : isHR ? (
            <>
              <li>
                {user?.displayName ? user.displayName : "Welcome back"}
                {users}
              </li>
              <li>
                <NavLink to="/dashboard/employees">
                  <FaHome />
                  All Employees
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history">
                  <FaCalendar />
                  Not History
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/history">
                  <FaCalendar />
                  Not History
                </NavLink>
              </li>
            </>
          )}
          {/* shared nav links */}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaSearch />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact">
              <FaEnvelope />
              Contact
            </NavLink>
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
