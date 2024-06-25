import React, { useState, useEffect } from 'react';
import Banner from './Banner/Banner.jsx';
import Navbar from '../../Shared/Navbar/Navbar.jsx';
import Sectiontitle from '../Components/Sectiontitle.jsx';
import Services from '../Services/Services.jsx';
import { useLoaderData } from 'react-router-dom';
import Reviews from './Reviews/Reviews.jsx';
import Design from './Design/Design.jsx';

const Home = () => {
   const service=useLoaderData();
   const designs =useLoaderData();
   useEffect(()=>{
    fetch('Designs.json')
    .then(res=>res.json())
    .then(data=>{
       

    },[])
 })

    return (
        <div>
            <Navbar />
            <Banner />
            <Sectiontitle heading={"Our Services"} 
            subheading={"From residential spaces to commercial properties, allow us to design and execute your spaces."}
            />
            <div className='flex grid gap-0.5 grid-cols-3 '>
           
            {service.map(services => 
                <Services
                    key={services.name}
                    service={services}
                ></Services>
            )}
              
            </div>
            <Sectiontitle heading={"Design gallery"} 
            subheading={"Get inspired by our conceptual designs."}
            />
            <Design>
            </Design>
            <Reviews></Reviews>
            
        </div>
    );
};

export default Home;
