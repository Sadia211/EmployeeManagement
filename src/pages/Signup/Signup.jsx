

import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import Navbar from '../../Shared/Navbar/Navbar';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../Components/hooks/useAxiosPublic';
import Swal from 'sweetalert2'


const Signup = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser } = useContext(AuthContext);
    const navigate = useNavigate();
  const[showPassword,setShowPassword]=useState(false);
    const onSubmit = async (data) => {
      console.log(data);
  
      try {
        await createUser(data.email, data.password);
        const userInfo = {
          role: data.role,
          name: data.name,
          email: data.email,
          password:data.password,
          designation: data.designation,
          salary:data.salary,
          bank_account_number: data.bank_account_number
        };
        const res = await axiosPublic.post('/users', userInfo);
        if (res.data.insertedId) {
          console.log('user added');
          reset();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User created successfully.',
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    };


    return (
        <>
        <Helmet>
            <title>Sign Up</title>
        </Helmet>
        <div className='font-sedan'>
            <Navbar />
            <div className='my-auto'>
                <form onSubmit={ handleSubmit(onSubmit)}className='max-w-sm mx-auto py-20'>
                    <p className='text-amber-900 text-3xl  text-center py-2 font-sedan'>Sign Up</p>
                    <div className='mb-5'>

                    <label  htmlFor='name' className='block mb-2 text-lg font-medium text-gray-900'>Select your role</label>

      <select defaultValue="default"
        {...register("role", { required: true })} 
      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'>
      <option disabled value="default">Role</option>
        <option value="Admin">Admin</option>
        <option value="HR">HR</option>
        <option value="Employee">Employee</option>
      </select>
                        <label htmlFor='name' className='block mb-2 text-lg font-medium text-gray-900'>
                            Name
                        </label>
                        <input
                         {...register("name", { required: true })} 

                            type='text'
                            id='name'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='name'
                            /> {errors.name && <span className="text-red-600">Name is required</span>}
                        
                    </div>
                    
                    <div className='mb-5'>
                        <label htmlFor='email' className='block mb-2 text-lg font-medium text-gray-900'>
                            Email
                        </label>
                        <input
                        {...register("email", { required: true })}
                            type='email'
                            id='email'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='email'
                            required
                        />{errors.email && <span className="text-red-600">Email is required</span>}
                    </div>
                    <div className='mb-5 relative'>
    <label htmlFor='password' className='block mb-2 text-lg font-medium text-gray-900'>
        Password
    </label>
    <div className='relative'>
        <input
            type={showPassword ? 'text' : 'password'}
            id='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-12  dark:border-gray-600'
            {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
            })}
            placeholder="password"
        />
        <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
        >
            {showPassword ? 'Hide' : 'Show'}
        </button>
    </div>
    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
</div>

                    <div className='mb-5'>
                        <label htmlFor='designation' className='block mb-2 text-lg font-medium text-gray-900'>
                            Designation
                        </label>
                        <input
                        {...register("designation")}
                            type='text'
                            id='designation'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='designation'
                            required
                        />{errors.designation && <span className="text-red-600">Designation</span>}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor='designation' className='block mb-2 text-lg font-medium text-gray-900'>
                        Salary
                        </label>
                        <input
                        {...register("salary")}
                            type='text'
                            id='designation'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='designation'
                            required
                        />{errors.salary && <span className="text-red-600">Salary</span>}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor='designation' className='block mb-2 text-lg font-medium text-gray-900'>
                            Bank Account no
                        </label>
                        <input
                        {...register("bank_account_number")}
                            type='text'
                            id='bank_account_number'
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder='bank_account_number'
                            required
                        />{errors.bank_account_number && <span className="text-red-600">Bank Account no</span>}
                    </div>
                                 
                                     <input
                         type='submit'
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-800 dark:hover:bg-amber-900 dark:focus:ring-blue-800'
                    />
                    <div><p>Already have an account?<Link to='/login'><span className='text-amber-900'>Login</span></Link></p></div>
                </form>
            </div>
        </div>
    </>
);
};

export default Signup;