import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useAdmin = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure();
    const{data:isAdmin,isPending:isAdminloading}=useQuery({
        queryKey:[user?.email,'isAdmin'],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data)
            return res.data?.admin
        }


    })
    return (
       [isAdmin,isAdminloading]
    );
};

export default useAdmin;