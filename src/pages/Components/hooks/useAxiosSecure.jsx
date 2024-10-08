import React from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
const axiosSecure=axios.create({
    baseURL:'https://cozycorner-server.vercel.app/'

})
 

const useAxiosSecure = () => {
    const navigate=useNavigate();
    const {logout}=useAuth();
    axiosSecure.interceptors.request.use(function(config){
        const token=localStorage.getItem('access-token')
        config.headers.authorization=`Bearer ${token}`
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

axiosSecure.interceptors.response.use(function(response){
    return response;
},
async(error)=>{
    const status=error.response.status;
    if(status===401||status===403){
        await logout();
        navigate('/login')
    }
    return Promise.reject(error)
}


)

    

    return axiosSecure
};

export default useAxiosSecure;