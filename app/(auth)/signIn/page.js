"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'; // 
import Cookies from 'js-cookie';


const SignIn = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Sign-In function
      // Sign-In function
      const handleSignIn = () => {
        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find a matching user by email and password
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Generate a new UUID
            const userId = uuidv4();

            // Store userId and currentUser in a cookie (instead of localStorage)
            Cookies.set('currentUser', JSON.stringify({ ...user, userId }), { expires: 1, path: '/' });

            // Navigate to the home page
            router.push('/home');
        } else {
            // Alert the user if credentials are incorrect
            alert('Email or password does not match');
        }
    };

    return (
        <>
            <div className='flex justify-center h-48'>
                <span className='w-44 h-[2px] bg-gray-300 relative top-24 right-5'></span>
                <img width={100} src="/icons/sofa.svg" alt="Sofa Icon" />
                <span className='w-44 h-[2px] bg-gray-300 relative top-24 left-5'></span>
            </div>

            <div className='flex flex-col w-[90vw] mb-8'>
                <h1 className='text-4xl text-gray-400 font-semibold mb-4 text-center'>Hello!</h1>
                <h1 className='text-3xl text-gray-700 font-semibold text-center'>WELCOME BACK</h1>
            </div>

            <div className='flex flex-col w-[90vw] bg-slate-50'>
                <div className='flex flex-col mt-8 gap-5'>
                    <div className='flex flex-col mb-4'>
                        <label className='mb-2 text-lg text-gray-700 ml-8' htmlFor='email'>Email</label>
                        <input
                            className='p-2 bg-slate-50 ml-14'
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className='w-64 h-[2px] bg-gray-300 relative justify-center left-12'></span>
                    </div>

                    <div className='flex flex-col mb-4'>
                        <label className='mb-2 text-lg text-gray-700 ml-8' htmlFor='password'>Password</label>
                        <div className='relative'>
                            <input
                                className='p-2 bg-slate-50 pr-10 ml-14'
                                type={passwordVisible ? 'text' : 'password'}
                                id='password'
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className='absolute right-2 top-2 h-6 w-6 text-gray-500 cursor-pointer'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                onClick={togglePasswordVisibility}
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                />
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.823-.676 1.597-1.186 2.3a9.956 9.956 0 01-1.186 1.7C16.268 16.057 12.477 19 8 19c-4.477 0-8.268-2.943-9.542-7 .274-.823.676-1.597 1.186-2.3a9.956 9.956 0 011.186-1.7z'
                                />
                            </svg>
                        </div>
                        <span className='w-64 h-[2px] bg-gray-300 relative justify-center left-12'></span>
                    </div>
                </div>
            </div>

            <h3 className='flex justify-center cursor-pointer mt-8 text-2xl font-semibold'>Forgot Password?</h3>

            <div className='flex justify-center mt-10'>
                <Button className='text-lg flex justify-center w-56 bg-black text-white py-7' variant="outline" onClick={handleSignIn}>Sign In</Button>
            </div>

            <h3 className='flex justify-center cursor-pointer mt-8 text-2xl'>
                <Link href='/signUp'>Sign Up</Link>
            </h3>
        </>
    );
};

export default SignIn;
