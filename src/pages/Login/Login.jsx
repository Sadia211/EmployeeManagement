import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../providers/AuthProvider';
import Sociallogin from '../Components/SocialLogin/Sociallogin';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const { signin } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ email: 'farah@diba.com', password: 'sdfghJ7^$' });
    const navigate = useNavigate();

    const handleRoleChange = (event) => {
        const role = event.target.value;
        
        if (role === 'Admin') {
            setCredentials({ email: 'farah@diba.com', password: 'sdfghJ7^$' });
        } else if (role === 'Employee') {
            setCredentials({ email: 'tania.islam@think.com', password: 'Tania76*' });
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const { email, password } = credentials;

        try {
            const result = await signin(email, password);
            const user = result.user;

            // Example logic based on user role
            if (user && email === 'farah@diba.com'){
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                    
                });
                navigate(`/dashboard/adminhome`);
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                   
                });
                navigate(`/dashboard/userhome/${user.email}`);
            }
        } catch (error) {
            console.error('Login failed:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Login failed. Please check your credentials and try again.',
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className='flex my-12 font-sedan'>
                <div className='w-1/2'>
                    <img className='w-40 justify-center mx-20' src="../assets/home/logo.png" alt="Logo" />
                    <img src="https://i.ibb.co/fHVPKWv/undraw-Hire-re-gn5j.png" alt="Hire illustration" />
                </div>
                <div className='font-sedan mx-auto w-1/2'>
                    <div className='text-2xl text-center py-2 w-3/4'>
                        <p className='text-2xl font-bold'>Welcome to Think Unlimited</p>
                        <p className='text-xl'>New here? <Link to='/signup' className='text-[#A06CD5]'>Sign Up</Link></p>
                    </div>
                    <div className='w-3/4'>
                        <form onSubmit={handleLogin} className='w-full mx-auto p-10 bg-white rounded-lg shadow-lg'>
                            <p className='text-3xl text-center py-2'>Login</p>
                            <div className='mb-5'>
                                <label htmlFor='role' className='block mb-2 text-lg font-medium text-gray-900'>
                                    Login as
                                </label>
                                <select
                                    id='role'
                                    name='role'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                                    required
                                    defaultValue='Admin' // Set default role as Admin
                                    onChange={handleRoleChange}
                                >
                                    <option value='Admin'>Admin</option>
                                    <option value='Employee'>Employee</option>
                                </select>
                            </div>
                            <div className='mb-5'>
                                <label htmlFor='email' className='block mb-2 text-lg font-medium text-gray-900'>
                                    Your email
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                                    required
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                />
                            </div>
                            <div className='mb-5'>
                                <label htmlFor='password' className='block mb-2 text-lg font-medium text-gray-900'>
                                    Your password
                                </label>
                                <div className='relative'>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id='password'
                                        name='password'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                                        required
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    />
                                    <button
                                        type='button'
                                        className='absolute inset-y-0 right-0 px-3 py-1 text-sm text-gray-600'
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-[#6247AA]'
                            >
                                Login
                            </button>
                            <div className='flex flex-col justify-center items-center'>
                                <p className='text-center'>-------------or-------------</p>
                                <p><Sociallogin /></p>
                            </div>
                        </form>
                    </div>
                    <div className='text-lg text-center py-5'></div>
                </div>
            </div>
        </>
    );
};

export default Login;
