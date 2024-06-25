import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAdmin from '../../pages/Components/hooks/useAdmin';
import useHR from '../../pages/Components/hooks/useHR';
const Navbar = () => {
  const {user,logOut}=useContext(AuthContext);
  const [isAdmin]=useAdmin();
  const [isHR]=useHR();
  const handlelogOut=()=>{
    logOut()
    .then(()=>{})
    .catch(error=>console.log(error))
  }
    const  navoption=<>
    <li><Link to='/'>Home</Link></li>
    
    

{
user?<>
<button onClick={handlelogOut} className='btn btn-ghost'>Logout</button>
</>:<>
<li><Link to="/login">Login</Link></li>
</>
}
{
user &&isAdmin &&<li><Link to="/dashboard/adminhome">Dashboard</Link></li>
}
{
user &&isHR &&<li><Link to="/dashboard/hrhome">Dashboard</Link></li>
}
{
user &&!isAdmin &&!isHR &&<li><Link to="/dashboard/userhome">Dashboard</Link></li>
}

    </>
    return (
        <div>
            <div className="navbar fixed z-10 bg-black bg-opacity-30 text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {navoption}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
     {navoption}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
        </div>
    );
};

export default Navbar;