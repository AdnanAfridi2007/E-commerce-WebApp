"use client"
import React, {useState} from "react";
import { useRouter } from 'next/navigation'; // Import useRouter
import { items } from "@/lib/data";
import BottomNav from "@/components/BottomNav";
import { ModeToggle } from "@/components/ThemeButton";

const Page = () => {
  const [filter, setFilter] = useState('popular'); // Set filter state to 'popular' initially
  const router = useRouter(); // Get router instance

  // Filter items based on the selected category
  const filteredItems = filter ? items.filter(item => item.category === filter) : items;

  // Function to handle navigation when an item is clicked
  const handleItemClick = (id) => {
    router.push(`/items/${id}`); // Push to dynamic route based on item id
  };
  const handleCartClick = () =>{
    router.push('/home/cart')
  }

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <img className='w-6 h-6' src="icons/search.svg" alt="Search" />
        <div className="text-center ml-4">
          <div className="text-lg dark:text-white">MAKE HOME</div>
          <div className="text-xl font-bold text-gray-800 dark:text-gray-300">BEAUTIFUL</div>
        </div>
        <div className="flex items-center gap-2">
        <img onClick={handleCartClick} className='w-6 h-6' src="icons/cart.svg" alt="Cart" />
        <ModeToggle/>
      </div>
      </div>

      {/* Second navbar with clickable images for filtering */}
      <div className="flex items-center justify-center gap-4">
        <div>
          <img 
            src="icons/popular.svg" 
            alt="Popular" 
            className="inline-block mr-4 cursor-pointer mb-1"
            onClick={() => setFilter('popular')} // Set filter to 'popular'
          />
          <h5 className="font-semibold text-sm dark:text-white">Popular</h5>
        </div>
        
        <div>
          <img 
            src="icons/chair.svg" 
            alt="Chair" 
            className="inline-block mr-4 cursor-pointer mb-1"
            onClick={() => setFilter('chair')} // Set filter to 'chair'
          />
          <h5 className="text-sm ml-1 dark:text-white">Chair</h5>
        </div>
        
        <div>
          <img 
            src="icons/table.svg" 
            alt="Table" 
            className="inline-block mr-4 cursor-pointer mb-1"
            onClick={() => setFilter('table')} // Set filter to 'table'
          />
          <h5 className="text-sm ml-1 dark:text-white">Table</h5>
        </div>
        
        <div>
          <img 
            src="icons/armChair.svg" 
            alt="Arm Chair" 
            className="inline-block mr-4 cursor-pointer mb-1"
            onClick={() => setFilter('armchair')} // Set filter to 'armchair'
          />
          <h5 className="text-sm ml dark:text-white">Arm Chair</h5>
        </div>
        
        <div>
          <img 
            src="icons/bed.svg" 
            alt="Bed" 
            className="inline-block mr-4 cursor-pointer mb-1"
            onClick={() => setFilter('bed')} // Set filter to 'bed'
          />
          <h5 className="text-sm ml-2 dark:text-white">Bed</h5>
        </div>
      </div>

      {/* Display filtered items */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="flex flex-col cursor-pointer"
            onClick={() => handleItemClick(item.id)} // Navigate to the item's dynamic page
          >
            <img src={item.imgSrc} alt={item.name} className="h-56 rounded-lg" />
            <p className="text-gray-500 ml-3 mt-2 dark:text-white">{item.name}</p>
            <p className="text-gray-900 font-semibold ml-3 dark:text-white">{item.price}</p>
          </div>
        ))}
      </div>
      <BottomNav/>
    </>
  );
};

export default Page;