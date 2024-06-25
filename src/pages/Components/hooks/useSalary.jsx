import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxioSecure from '../hooks/useAxiosSecure';
import useAuth from './useAuth';
const useSalary = () => {
    const axiosSecure=useAxioSecure();
    const {user}=useAuth();
    const {refetch,data: cart=[]}=useQuery({
        queryKey:['salary',user?.email],
        queryFn: async()=>{
const res=await axiosSecure.get(`/salary?email=${user.email}`)
return res.data;
        }
    })
    return[salary,refetch]
};

export default useSalary;