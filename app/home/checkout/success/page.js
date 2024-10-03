"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  
  // Assuming the order number is stored in local storage after payment
  const orderNumber = localStorage.getItem('orderNumber') || 'N/A'; // Replace 'N/A' with your default value if needed

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
