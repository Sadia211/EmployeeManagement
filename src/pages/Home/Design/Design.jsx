import React from 'react';
import  { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import img9 from '../../../../public/assets/home/img9.png'
import img10 from '../../../../public/assets/home/img10.png'
import img11 from '../../../../public/assets/home/img11.jpg'
import img12 from '../../../../public/assets/home/img12.jpg'
const Design = () => {
   
  return (
    <div className='mx-16 my-5 max-h-44'>
    <>
      <Swiper
           slidesPerView={4}
           spaceBetween={30}
           centeredSlides={true}
           pagination={{
             clickable: true,
           }}
           modules={[Pagination]}
           className="mySwiper"



      >
        <SwiperSlide>
          <img   className='' src={img9} />
        </SwiperSlide>
        <SwiperSlide>
          <img  className='' src={img10} />
        </SwiperSlide>
        <SwiperSlide>
          <img  className='max-h-96' src={img11} />
        </SwiperSlide>
        <SwiperSlide>
          <img  className='max-h-96' src={img12} />
        </SwiperSlide>
      </Swiper>
    </>
    </div>
  );
}

      

export default Design;