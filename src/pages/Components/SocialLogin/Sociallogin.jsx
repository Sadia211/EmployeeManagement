import React from 'react';
import useAuth from '../../Components/hooks/useAuth'
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
const Sociallogin = () => {
const {googleSignin}=useAuth();
const navigate=useNavigate();
const handlegooglesignin=()=>{
googleSignin()
.then (result=>{
    const userInfo={
        email:result.user?.email,
        name:result.user?.displayName
    }



axiosPublic.post('/users',userInfo)
.then(res=>{
    console.log(res.data);
    navigate('/');
})
})

}


    return (
        <div>
            <button  className ='btn btn-wide'onClick={handlegooglesignin}>
<div className='flex gap-2'><FaGoogle></FaGoogle>Google</div> 


            </button>
        </div>
    );
};

export default Sociallogin;