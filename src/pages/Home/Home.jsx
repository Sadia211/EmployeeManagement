import React, { useState, useEffect } from 'react';

import Sectiontitle from '../Components/Sectiontitle.jsx';
import Services from '../Services/Services.jsx';
import { useLoaderData } from 'react-router-dom';
import Reviews from './Reviews/Reviews.jsx';

import Login from '../Login/Login.jsx'
const Home = () => {
   

    return (
        <div>
           <Login></Login>
            
        </div>
    );
};

export default Home;
