import React, { Component } from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../../public/assets/home/img1.png'
import img2 from '../../../../public/assets/home/img2.png'
import img3 from '../../../../public/assets/home/img3.png'
const Banner = () => {
    return (
        <div>
          

          <Carousel>
                <div>
                    <img src={img1} />
                    
                </div>
                <div>
                    <img src={img2} />
                  
                </div>
                <div>
                    <img src={img3} />
                  
                </div>
               
            </Carousel>

        </div>
    );
};

export default Banner;