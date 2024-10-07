"use client";
import React, { useState, useEffect } from 'react';
import { items } from "@/lib/data";
import { useRouter } from 'next/navigation';

const ItemPage = ({ params }) => {
  const { id } = params;
  const router = useRouter();

  // Hooks are placed at the top level, outside of conditionals
  const [count, setCount] = useState(1);
  const [currentUser, setCurrentUser] = useState(null); // State for currentUser
  const [isLoading, setIsLoading] = useState(true);

  const item = items.find(item => item.id === id);

  // Fetch the currentUser from localStorage
  useEffect(() => {
    const user = localStorage.getItem('currentUser'); // Assuming the user ID or info is stored here
    setCurrentUser(user); // Set currentUser state
    setIsLoading(false);
  }, []);

  const backButton = () => {
    router.push('/home');
  };

  // Handle adding to favorites with currentUser
  const handleAddToFavorites = () => {
    if (!currentUser) {
      alert("Please log in to add favorites.");
      return;
    }

    const favoritesKey = `favorites_${currentUser}`; // Dynamic key based on currentUser
    const existingFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    const isItemAlreadyFavorite = existingFavorites.some(favItem => favItem.id === item.id);

    if (!isItemAlreadyFavorite) {
      const updatedFavorites = [...existingFavorites, item];
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
      alert("Item added to favorites!");
    } else {
      alert("This item is already in your favorites!");
    }
  };

  // Handle adding to cart with currentUser
  const handleAddToCart = () => {
    if (!currentUser) {
      alert("Please log in to add to cart.");
      return;
    }

    const cartKey = `cart_${currentUser}`; // Dynamic key based on currentUser
    const existingCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const cartItemIndex = existingCart.findIndex(cartItem => cartItem.id === item.id);

    if (cartItemIndex > -1) {
      existingCart[cartItemIndex].quantity = count;
    } else {
      existingCart.push({ ...item, quantity: count });
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart));
    alert("Item added to cart!");
  };

  if (!item) {
    return <div>Item not found</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <img onClick={backButton} src="/icons/back.svg" alt="Back" className="absolute top-4 left-0 z-10 cursor-pointer" />
      <img src="/icons/colors.svg" alt="Colors" className="absolute top-32 right-[68vw] z-10" />
      <div>
        <img src={item.imgSrc} alt={item.name} className="absolute top-0 right-0 w-[85vw] h-[50vh] object-cover rounded-2xl" />
      </div>
      <div className="mx-4">
        <h1 className="text-2xl font-semibold mt-[53vh] ml-4">{item.name}</h1>
        <div className="flex items-center justify-between mx-4">
          <p className="text-gray-600 mt-2 font-bold text-2xl">{item.price}</p>
          <div className="flex items-center mt-4">
            <button 
              className="bg-slate-100 text-black px-2 rounded-l text-3xl" 
              onClick={() => setCount(prevCount => prevCount + 1)}
            >
              +
            </button>
            <span className="mx-4 text-xl">{count}</span>
            <button 
              className="bg-slate-100 text-black px-2 rounded-r text-3xl" 
              onClick={() => setCount(prevCount => prevCount > 1 ? prevCount - 1 : 1)}
            >
              -
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-3 ml-3">
          <span className="text-yellow-500 text-3xl">★</span>
          <span className='text-xl mt-1 font-semibold'>4.5</span>
          <span className="text-gray-500 mt-1 pl-6">(50 reviews)</span>
        </div>

        <p className="mt-4 ml-4 text-gray-500">{item.description}</p>
      </div>

      <div className='ml-8 flex'>
        <img 
          src="/icons/favourite1.svg" 
          alt="Favorite" 
          onClick={handleAddToFavorites}
          className="cursor-pointer"
        />
        <img 
          className='mt-5 cursor-pointer' 
          src="/icons/addToCart.svg" 
          alt="Add to Cart" 
          onClick={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default ItemPage;
