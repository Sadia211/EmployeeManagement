import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Components/hooks/useAxiosSecure';

const Update = () => {
    const update = useLoaderData();
    const axiosSecure=useAxiosSecure();
    const { name, designation, salary, status, email } = update; // Extract `email` from `update`

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const res = await axiosSecure.get('/users');
          return res.data;
        }
    });

    const handleUpdate = event => {
        event.preventDefault();

        const form = event.target;
        const designation = form.designation.value;
        const salary = form.salary.value;
        const updatedProduct = {
            designation, 
            salary
        };

        axiosSecure.put(`/users/${email}`, updatedProduct)
        .then(response => {
            Swal.fire({
                title: 'Success!',
                text: 'Information updated successfully',
                icon: 'success',
                confirmButtonText: 'Cool',
            });
        })
        .catch(error => {
            console.error('Error updating product:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update product. Please check the console for more details.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        });
    }    

    return (
        <>
            <Helmet>
                <title>Update</title> {/* Changed the title from 'Login' to 'Update' */}
            </Helmet>
            <div className='my-20 font-sedan w-full items-center'>
                <div className='w-96'>
                </div>
                <div className='font-sedan mx-auto w-1/2'>
                    <div className='w-full'>
                        <form onSubmit={handleUpdate} className='w-full mx-auto p-10 bg-white rounded-lg'>
                            <p className='text-3xl text-center py-2'>Update</p>
                            <div className='mb-5'></div>
                            <div className='mb-5'>
                                <label htmlFor='designation' className='block mb-2 text-lg font-medium text-gray-900'>
                                    Designation
                                </label>
                                <input
                                    type='text'
                                    id='designation'
                                    name='designation'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
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
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
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
