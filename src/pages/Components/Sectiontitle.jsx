import React from 'react';

const Sectiontitle = ({heading, subheading}) => {
    return (
        <div className='mb-2 mx-auto  my-8 max-w-fit' >
            <p className='text-amber-900 text-3xl  text-center py-2 font-sedan'>{heading} </p>
            <p className='text-amber-950 text-xl text-center border-y-4 py-2 mx-4 font-sedan'>{subheading}</p>

           
        </div>
    );
};

export default Sectiontitle;