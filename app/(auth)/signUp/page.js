"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from 'uuid'; // UUID library
import Link from 'next/link';

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      alert('This email is already registered.');
      return;
    }

    // Generate a unique userId using uuidv4
    const userId = uuidv4();

    // Push the user data including the userId to localStorage
    users.push({ ...formData, userId, confirmPassword: undefined }); // Exclude confirmPassword
    localStorage.setItem('users', JSON.stringify(users));

    // Optionally, store the current user info separately
    localStorage.setItem('currentUser', JSON.stringify({ name, email, userId }));

    // Redirect to home page after successful sign-up
    router.push('/home');
  };

  return (
    <>
      <div className='flex justify-center h-36'>
        <span className='w-44 h-[2px] bg-gray-300 relative top-20 right-5'></span>
        <img width={100} src="/icons/sofa.svg" alt="Sofa Icon" />
        <span className='w-44 h-[2px] bg-gray-300 relative top-20 left-5'></span>
      </div>

      <div className='flex flex-col w-[90vw] mb-8'>
        <h1 className='text-4xl text-gray-700 font-semibold mb-4 text-center'>WELCOME!</h1>
      </div>

      <div className='flex flex-col w-[90vw] bg-slate-50'>
        <div className='flex flex-col mt-8 gap-5'>
          <div className='flex flex-col mb-4'>
            <label className='mb-2 text-lg text-gray-700 ml-8' htmlFor='name'>Name</label>
            <input
              className='p-2 bg-slate-50 ml-14'
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            <span className='w-64 h-[2px] bg-gray-300 relative justify-center left-12'></span>
          </div>

          <div className='flex flex-col mb-4'>
            <label className='mb-2 text-lg text-gray-700 ml-8' htmlFor='email'>Email</label>
            <input
              className='p-2 bg-slate-50 ml-14'
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
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

          <div className='flex flex-col mb-4'>
            <label className='mb-2 text-lg text-gray-700 ml-8' htmlFor='confirmPassword'>Confirm Password</label>
            <div className='relative'>
              <input
                className='p-2 bg-slate-50 pr-10 ml-14'
                type={passwordVisible ? 'text' : 'password'}
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
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

      <div className='flex justify-center mt-10'>
        <Button className='text-lg flex justify-center w-56 bg-black text-white py-7' variant="outline" onClick={handleSubmit}>Sign Up</Button>
      </div>

      <h3 className='flex justify-center cursor-pointer mt-8 text-2xl'>
        <Link href='/signIn'>Sign In</Link>
      </h3>
    </>
  );
};

export default SignUp;
