import React from 'react';
import { buttonVariants } from "@/components/ui/button";
import { Link } from 'lucide-react';


const Page = () => {
  return (
    <div className="relative h-screen w-screen">

      
      
      <img src="boarding.png" alt="Background" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 flex flex-col top-48 left-36 md:left-36 lg:left-36">
        <p className="text-gray-600 text-3xl md:text-4xl lg:text-6xl font-bold">
          MAKE YOUR 
        </p>
        <h1 className="text-gray-800 text-5xl font-bold  top-3 relative">
          HOME BEAUTIFUL
        </h1>

        <p className='text-gray-600 text-xl relative top-10 left-6 w-[60vw]'>The best simple place where you discover most wonderful furnitures and make your home beautiful</p>
        <div className='relative top-24 left-20 text-black'>
          <a href='/signIn' className='text-black-500 text-bold border-2 rounded-md bg-white border-gray-700 p-3 hover:bg-black hover:text-gray-300'>Get Started</a>
          
        </div>
      </div>
    </div>
  );
}

export default Page;