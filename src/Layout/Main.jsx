import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Main = () => {
    const location =useLocation();
    
    return (
        <div className='mx-auto'>
           
            <Outlet></Outlet>
            
        </div>
    );
};

export default Main;