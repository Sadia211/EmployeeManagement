import React, { useEffect, useState, useRef, useContext } from 'react';
import Navbar from '../../Shared/Navbar/Navbar';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../providers/AuthProvider';
import Sociallogin from '../Components/SocialLogin/Sociallogin';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const captchaRef = useRef(null);
    const { signin } = useContext(AuthContext);

    useEffect(() => {
        loadCaptchaEnginge(6); // the number of captcha characters
    }, []);

    const handlelogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signin(email, password).then(result => {
            const user = result.user;
            console.log(user);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: 'user login successful',
                showConfirmButton: false,
                timer: 1500
              });
        });
    };

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className='font-sedan place-items-center justify-center'>
                <Navbar />
                <div className='my-auto'>
                    <form onSubmit={handlelogin} className='max-w-sm mx-auto pt-20'>
                        <p className='text-amber-900 text-3xl  text-center py-2 font-sedan'>Login</p>
                        <div className='mb-5'>
                            <label htmlFor='email' className='block mb-2 text-lg font-medium text-gray-900'>
                                Your email
                            </label>
                            <input
                                type='email'
                                id='email'
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                placeholder='name@flowbite.com'
                                required
                            />
                        </div>
                        <div className='mb-5'>
                            <label htmlFor='password' className='block mb-2 text-lg font-medium text-gray-900'>
                                Your password
                            </label>
                            <input
                                type='password'
                                id='password'
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                required
                            />
                        </div>
                        <div className='flex items-start mb-5'>
                            <div className='flex items-center h-5'>
                                <input
                                    id='remember'
                                    type='checkbox'
                                    value=''
                                    className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                                    required
                                />
                            </div>
                            <label htmlFor='remember' className='ms-2 text-sm font-medium text-gray-900'>
                                Remember me
                            </label>
                        </div>
                        <div className='mb-5'>
                            <label htmlFor='captcha' className='block mb-2 text-lg font-medium text-gray-900'>
                                Captcha
                            </label>
                            <LoadCanvasTemplate />
                            <input
                                onBlur={handleValidateCaptcha}
                                ref={captchaRef}
                                name='captcha'
                                type='text'
                                placeholder='type the captch given above'
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                required
                            />
                            <div className='py-2'>
                            <button type='button' className='max-h-6 btn ' onClick={handleValidateCaptcha}>
                                Validate
                            </button>
                            </div>
                           
                        </div>
                        <input
                            disabled={disabled}
                            type='submit'
                            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-800 dark:hover:bg-amber-900 dark:focus:ring-blue-800'
                        />
                      
                    </form>
                    <div className='text-lg mx-80 px-28 py-5'><p>New here? <Link to='/signup' className='text-amber-900'>Create an account</Link>
                       <br/>or
                       <p>Login with <Sociallogin></Sociallogin></p>
                       </p>

                    </div>
                    
                    
                </div>
            </div>
        </>
    );
};

export default Login;
