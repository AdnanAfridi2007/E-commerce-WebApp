"use client";
import BottomNav from '@/components/BottomNav';
import { ModeToggle } from '@/components/ThemeButton';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const handleLogoutClick = () => {
        setShowConfirm(true);
    };

    const handleConfirmLogout = () => {
        // Clear session storage, local storage, or any authentication tokens
        localStorage.removeItem('currentUser');
        
        // Redirect to login page
        router.replace('/');
    };

    const handleCancelLogout = () => {
        setShowConfirm(false);
    };

    return (
        <main>
            <div className="flex items-center justify-between mb-2 p-4 sticky backdrop-blur-md top-0 z-50">
                <img className="w-6 h-6" src="icons/search.svg" alt="Search" />
                <div className="text-center ">
                    <div className="text-2xl font-semibold">Profile</div>
                </div>
                <div className="flex items-center gap-2 ">
                    <img className="w-6 h-6 dark:invert cursor-pointer" src="icons/logout.svg" alt="Logout" onClick={handleLogoutClick} />
                    <ModeToggle />
                </div>
            </div>

            <div className='flex items-center justify-center gap-4'>
                <div>
                    <img width={100} src="/profile-img.png" alt="" className='rounded-full' />
                </div>
                <div className=''>
                    <p className='font-semibold text-2xl'>Adnan Afridi</p>
                    <p className='text-gray-500'>adnanafridi2007@gmail.com</p>
                </div>
            </div>

            <div>
                <img src="/icons/profileComponent.svg" alt="" />
            </div>

            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-lg text-center">
                        <p className="mb-4">Do you want to logout?</p>
                        <div className="flex justify-center gap-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleConfirmLogout}>Logout</button>
                            <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleCancelLogout}>No</button>
                        </div>
                    </div>
                </div>
            )}

            <BottomNav />
        </main>
    );
};

export default Page;
