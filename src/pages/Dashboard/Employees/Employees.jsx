import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Components/hooks/useAxiosSecure';
import { FaCreditCard,FaMinusCircle, FaPen } from 'react-icons/fa';
import CheckoutForm from '../Payment/CheckoutForm';
import Swal from 'sweetalert2';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineVerified } from "react-icons/md";
import { Link } from 'react-router-dom';
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_Gateway_pk);

const Employees = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const handleVerify = (user) => {
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
  };
  const handleDeleteUser=(user)=>{

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
    <div className='mx-10 my-10 font-sedan' id='allEmployees'>
      <h2 className='text-center my-5 text-3xl'>All Employees</h2>
      <div className="relative overflow-x-auto shadow-md mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black mx-auto">
          <thead className="text-sm bg-[#e2e7eb]">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-8 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Designation</th>
              <th scope="col" className="px-6 py-3">Bank Account No</th>
              <th scope="col" className="px-2 py-3">Verification Status</th>
              <th scope="col" className="px-2 py-3">Pay</th>
              <th scope="col" className="px-6 py-3">Salary</th>
              <th scope="col" className="px-6 py-3">Update</th>
              <th scope="col" className="px-6 py-3">Fire</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th className='pl-5'>{index + 1}</th>
                <td>{user.name}</td>
                <td className='px-2'>{user.email}</td>
                <td className='px-2'>{user.designation}</td>
                <td>{user.bank_account_number}</td>
                <td className='px-2'>
                  {user.status === 'verified' ? 
                    <button onClick={() => handleVerify(user)} className="btn btn-ghost">
                      <MdOutlineVerified className='text-xl bg-green-400 rounded-full '/>
                      
                    </button> :
                    <button onClick={() => handleVerify(user)} className="btn btn-ghost">
                      <IoIosCloseCircleOutline className='text-xl' />
                    </button>
                  }
                </td>
                <td className='-px-2'>
                  <button className="btn btn-ghost" onClick={() => document.getElementById(`modal_${index}`).showModal()}>
                    <FaCreditCard className='text-lg text-center' />
                  </button>
                  <dialog id={`modal_${index}`} className="modal">
                    <div className="modal-box mx-2 my-2">
                      <h3 className="text-lg my-2 ">Pay
                        <br/>
                        Amount: {user.salary} BDT
                      </h3>

                      <div>
                        <Elements stripe={stripePromise}>
                          <CheckoutForm email={user.email} amount={user.salary} />
                        </Elements>
                      </div>
                      
                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
                <td className='pl-2'>{user.salary} BDT</td>
               
                <td className='px-8'>
                <Link to={`/dashboard/update/${user.email}`}><FaPen/>
                </Link></td>
              
                <td className='px-3'>
                <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost">
                    <FaMinusCircle />
                    </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
