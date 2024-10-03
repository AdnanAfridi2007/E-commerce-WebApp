"use client";

import BottomNav from '@/components/BottomNav';
import React, { useEffect, useState } from 'react';

const NotificationPage = () => {
    const [paidItems, setPaidItems] = useState([]);
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        // Retrieve the current user ID from local storage
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            // Retrieve paid items from local storage
            const items = JSON.parse(localStorage.getItem(`paidOrders_${currentUser}`)) || [];
            setPaidItems(items);
            
            // Generate a random order number
            const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
            setOrderNumber(randomOrderNumber);
        } else {
            console.error("No current user found in local storage");
        }
    }, []);

    return (
        <>
            <div className="notification-container">
                <div className='my-5'>
                    <img src="/icons/notification1.svg" alt="" />
                </div>
                {paidItems.length > 0 ? (
                    <ul>
                        {paidItems.map((item, index) => (
                            <li key={index}>
                                <div className='flex mb-2 bg-[#fafafa] py-2 gap-2 px-2'>
                                    <img src={item.imgSrc} alt={item.name} width={80} height={50}  className='rounded-md'/>
                                    <div>
                                        <p className='text-sm font-bold mb-1'>Your order number: {orderNumber} has been confirmed.</p>
                                        <p className='text-xs leading-5 text-gray-500'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis obcaecati hic et ullam quidem.</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No paid items found.</p>
                )}
            </div>
            <div className='w-[100vw] bg-gray-50 p-4 mb-14'>
                <img width={370} src="/icons/discover.svg" alt="" />
            </div>
            <BottomNav />
        </>
    );
};

export default NotificationPage;
