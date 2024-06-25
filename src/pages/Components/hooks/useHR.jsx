import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useHR = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure();
    const{data:isHR,isPending:isHRloading}=useQuery({
        queryKey:[user?.email,'isHR'],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/hr/${user.email}`);
            console.log(res.data)
            return res.data?.hr
        }


    })
    return (
       [isHR,isHRloading]
    );
};

export default useHR;