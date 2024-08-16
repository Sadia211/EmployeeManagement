import React from 'react';
import { useContext } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAdmin from '../../pages/Components/hooks/useAdmin';
import useHR from '../../pages/Components/hooks/useHR';
const Navbar = () => {
  const {user,logOut}=useContext(AuthContext);
  
  const handlelogOut = async () => {
    try {
      await logOut();
      navigate('/login'); // Redirect to the login page immediately after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
    const  navoption=<>   

{
user?<>
<button onClick={handlelogOut} className='btn btn-ghost'><Link to="/login">LogOut</Link></button>

</>:<>
<Link to="/login">Login</Link>

</>
}


    </>
    return (
        <div>
            <div className="navbar fixed z-10 bg-black bg-opacity-30 text-white h-12">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        
      </ul>
    </div>
    <img src="https://i.ibb.co/QMj2Q64/Think-Unlimited-removebg-preview.png" className='w-20'/>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">{navoption}</a>
  </div>
</div>
        </div>
    );
};

export default Navbar;