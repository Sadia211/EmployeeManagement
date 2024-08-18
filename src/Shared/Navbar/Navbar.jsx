import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate('/login'); // Redirect to the login page immediately after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navOption = (
    <>
      {user ? (
        <button onClick={handleLogOut} className="btn btn-ghost">
          <h2 className='text-black'>LogOut</h2>
        </button>
      ) : (
        <Link to="/login" className="btn btn-ghost">
          Login
        </Link>
      )}
    </>
  );

  return (
    <div>
      <div className="navbar fixed z-10  bg-gray-100 text-white h-12">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            ></ul>
          </div>
          <img
            src="https://i.ibb.co/QMj2Q64/Think-Unlimited-removebg-preview.png"
            className="w-20"
            alt="Logo"
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1"></ul>
        </div>
        <div className="navbar-end">
          {navOption}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
