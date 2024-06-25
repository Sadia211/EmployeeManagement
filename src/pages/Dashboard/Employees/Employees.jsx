import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Components/hooks/useAxiosSecure';
import { FaUser, FaTrash } from 'react-icons/fa';
import { CiMoneyBill } from "react-icons/ci";
import { MdOutlineVerified } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Swal from 'sweetalert2';
import { Link,useLocation } from 'react-router-dom';

const Employees = () => {
    
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleVerify = user => {
        axiosSecure.patch(`/users/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is verified now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    }

    return (
        <div className='mx-10 my-10 font-sedan'>
            <h2 className='text-center mb-2 text-lg'>All Employees</h2>
            <div className="relative overflow-x-auto shadow-md mx--auto">
                <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black mx-auto">
                    <thead className="text-xs text-gray-700 bg-amber-800 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Bank Account no</th>
                            <th scope="col" className="px-6 py-3">Verification status</th>
                            <th scope="col" className="px-6 py-3">Pay</th>
                            <th scope="col" className="px-6 py-3">Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.bank_account_number}</td>
                                <td>
                                    {user.status === 'verified' ? 
                                        <button onClick={() => handleVerify(user)} className="btn btn-ghost">
                                            <MdOutlineVerified />
                                        </button> :
                                        <button onClick={() => handleVerify(user)} className="btn btn-ghost">
                                            <IoIosCloseCircleOutline />
                                        </button>
                                    }
                                </td>
                                <td>
                                {console.log(user)}
                               
                                <Link 
     to={`/dashboard/payment/${user.email}`}
       
>  <button className="btn btn-ghost">  <CiMoneyBill />
   </button>




                                       
                                    </Link>
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

export default Employees;
