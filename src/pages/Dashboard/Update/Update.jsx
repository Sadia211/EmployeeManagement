import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Update = () => {
    const update=useLoaderData();
    const { id, name, email, designation, salary, status, paymentAmount, paymentDate } = update;
    const handleupdate=async(event)=>{}
    return (
        <>
        <Helmet>
        <title>Login</title>
    </Helmet>
    <div className=' my-20 font-sedan w-full items-center'>
        <div className='w-96'>
         
        </div>
        <div className='font-sedan mx-auto w-1/2'>
           
        
            <div className='w-full'>
                <form onSubmit={handleupdate} className='w-full mx-auto p-10 bg-white rounded-lg '>
                    <p className='text-3xl text-center py-2'>Update</p>
                    <div className='mb-5'>
                        
                    </div>
                    <div className='mb-5'>
                        <label htmlFor='designation' className='block mb-2 text-lg font-medium text-gray-900'>
                           Designation
                        </label>
                        <input
                            type='text'
                            id='designation'
                            name='designation'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            required
                            defaultValue={designation}
                           
                        />
                    </div>
                    <div className='mb-5'>
                        
                    <label htmlFor='salary' className='block mb-2 text-lg font-medium text-gray-900'>
                           Salary
                        </label>
                        <input
                            type='text'
                            id='salary'
                            name='salary'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            required
                            defaultValue={salary}
                           
                        />
                         
                              
                       
                    </div>
                    <button
                        type='submit'
                        className='text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-[#6247AA]'
                    >
                        Update
                    </button>
                   
                </form>
            </div>
            <div className='text-lg text-center py-5'></div>
        </div>
    </div>
</>
    );
};

export default Update;