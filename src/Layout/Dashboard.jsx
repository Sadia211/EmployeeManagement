import React from 'react';
import useAdmin from '../pages/Components/hooks/useAdmin';
import useHR from '../pages/Components/hooks/useHR';
import {Outlet, NavLink } from 'react-router-dom';
import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUtensils, FaVoicemail,FaEnvelope } from 'react-icons/fa';

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isHR]=useHR();
return (
  <div className='flex'>
  {/**dashboard sidebar */}
  <div className ='w-64 min-h-screen bg-gray-100 font-sedan'>
      <ul className='menu'>
          {
              isAdmin?
              <>
              <li><NavLink  to='/dashboard/adminHome'>
              <FaHome></FaHome>
              Admin Home</NavLink></li>

              <li><NavLink  to='/dashboard/additems'>
              <FaUtensils></FaUtensils>
              Add items</NavLink></li>

           

              <li><NavLink  to='/dashboard/allusers'>
              <FaUser>
              </FaUser>
            All Users</NavLink></li>


             
             <div className="divider"></div>


              </>:  isHR?<>
                      <li>
                          <NavLink to="/dashboard/employees">
                              <FaHome></FaHome>
                             All Employees</NavLink>
                      </li>
                      <li>
                          <NavLink to="/dashboard/history">
                              <FaCalendar></FaCalendar>
                              Not History</NavLink>
                      </li>
                    
                  </>:<>
                      <li>
                          <NavLink to="/dashboard/userHome">
                              <FaHome></FaHome>
                              User Home</NavLink>
                      </li>
                      <li>
                          <NavLink to="/dashboard/history">
                              <FaCalendar></FaCalendar>
                              Not History</NavLink>
                      </li>
                    
                  </>
              
          }
           {/* shared nav links */}
           <div className="divider"></div>
          <li>
              <NavLink to="/">
                  <FaHome></FaHome>
                  Home</NavLink>
          </li>
          <li>
              <NavLink to="/order/salad">
                  <FaSearch></FaSearch>
                  Menu</NavLink>
          </li>
          <li>
              <NavLink to="/order/contact">
                  <FaEnvelope></FaEnvelope>
                  Contact</NavLink>
          </li>
      </ul>
  </div>
       

  {/**dashboard content */}
  <div className='flex-1'>
<Outlet></Outlet>
  </div>
  
</div>
);
};

export default Dashboard;
