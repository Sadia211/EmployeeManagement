import React from 'react';
import { useQuery } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import useAxiosPublic from '../../Components/hooks/useAxiosPublic';
import useAxiosSecure from '../../Components/hooks/useAxiosSecure';
import { FaUser,FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2'
import  Navbar from '../../../Shared/Navbar/Navbar.jsx'
const Allusers = () => {
const axiosSecure=useAxiosSecure();


    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allusers');
            return res.data;
        }
    });

const handleMakeAdmin=user=>{
axiosSecure.patch(`/users/admin/${user._id}`)
.then(res=>{
    console.log(res.data)
    if(res.data.modifiedCount>0){
        refetch();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an admin now`,
            showConfirmButton: false,
            timer: 1500
          });
    }
})
}



const handleMakeHR=user=>{
    axiosSecure.patch(`/users/hr/${user._id}`)
    .then(res=>{
        console.log(res.data)
        if(res.data.modifiedCount>0){
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} is  HR now`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
    }


    const handleDeleteUser=user=>{

        Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
                }).then((result) => {
      
                  if (result.isConfirmed) {
                      axiosSecure.delete(`/users/${user._id}`)
                      refetch();
                    Swal.fire({
                      title: "Deleted!",
                      text: "Employee has been deleted.",
                      icon: "success"
                    });
                  }
                });}







    return (
       
            <div className='mx-10 my-10 font-sedan'>
                 <h2 className='text-center mb-2 text-lg'>All Users</h2>
                <div className="relative overflow-x-auto shadow-md mx--auto ">
                    <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black  mx-auto">
                        <thead className="text-xs text-gray-700  bg-amber-800 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                   ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                   Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                   Designation
                                </th>
                             
                                <th scope="col" className="px-6 py-3">
                                    Role(Make HR)
                                </th>
                                
                                <th scope="col" className="px-6 py-3">
                                   Fire
                                </th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.designation}</td>
                                    
                                    <td>
                                    {user.role === 'admin' ? 'Admin' : (user.role === 'hr' ? 'HR' :
                                    <div>
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-orange">
                                            <FaUser></FaUser>
                                        </button>
                                        <button onClick={() => handleMakeHR(user)} className="btn btn-ghost bg-orange">
                                            <FaUser></FaUser>
                                        </button>
                                    </div>)}

                                    </td>


                                    

                                    <td>
                                    <button onClick={()=>handleDeleteUser(user)} className="btn btn-ghost bg-orange">
                                        <FaTrash></FaTrash>
                                    </button>
                                    </td>
                                   
                                
                                    <td></td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
       
    );
};

export default  Allusers;