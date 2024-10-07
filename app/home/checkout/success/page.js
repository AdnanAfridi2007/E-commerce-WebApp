"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState('N/A');

  // Use useEffect to ensure localStorage is only accessed on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedOrderNumber = localStorage.getItem('orderNumber');
      setOrderNumber(storedOrderNumber || 'N/A');
    }
  }, []);

  const handleTrackOrderClick = () => {
    router.push('/notification');
  };

  const handleHomeClick = () => {
    router.push('/home');
  };

  return (
    <div className='flex flex-col items-center mt-24 w-[100vw] h-[100vh]'>
      <div className='mb-14'>
        <img src="/icons/success.svg" alt="panicio" />
      </div>
      <img 
        src="/icons/trackOrder.svg" 
        alt="Track Order" 
        onClick={handleTrackOrderClick} 
        className="cursor-pointer"
      />
      <img 
        src="/icons/backToHome.svg" 
        alt="Back to Home" 
        onClick={handleHomeClick} 
        className="cursor-pointer"
      />
    </div>
  );
};

export default Page;
