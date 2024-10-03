"use client";
import BottomNav from "@/components/BottomNav";
import { ModeToggle } from "@/components/ThemeButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch the user ID from localStorage
    const storedUserId = localStorage.getItem('currentUser');
    setUserId(storedUserId);

    if (storedUserId) {
      // Fetch favourites from localStorage using userId
      const storedFavourites = JSON.parse(localStorage.getItem(`favorites_${storedUserId}`)) || [];
      setFavourites(storedFavourites);
    }
  }, []);

  const handleCartClick = () => {
    router.push('/home/cart');
  };

  const addAllToCart = () => {
    const storedUserId = localStorage.getItem('currentUser');
    // Map favourites to ensure price is a number
    const cartItems = favourites.map(item => ({
        ...item,
        price: parseFloat(item.price.replace('$', '').trim()) || 0, // Ensure price is a number
        quantity: 1 // Initialize quantity to 1 or however you need it
    }));
    localStorage.setItem(`cart_${storedUserId}`, JSON.stringify(cartItems));
    alert("All items added to cart!");
};


  const removeFromFavourites = (id) => {
    // Filter out the item to be removed
    const updatedFavourites = favourites.filter(item => item.id !== id);
    // Update state and localStorage
    setFavourites(updatedFavourites);
    if (userId) {
      localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavourites));
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2 p-4 sticky backdrop-blur-md top-0 z-50">
        <img className="w-6 h-6" src="icons/search.svg" alt="Search" />
        <div className="text-center ml-4">
          <div className="text-2xl font-semibold">Favourite</div>
        </div>
        <div className="flex items-center gap-2">
          <img onClick={handleCartClick} className="w-6 h-6" src="icons/cart.svg" alt="Cart" />
          <ModeToggle />
        </div>
      </div>
      {favourites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {favourites.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border-b flex items-center justify-between gap-4 mb-2 pb-2"
            >
              <img
                src={item.imgSrc}
                alt={item.name}
                width={80}
                className="rounded-lg h-24"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-sm mt-1">{item.name}</h2>
                <p className="font-semibold mt-1 text-lg">{item.price}</p>
              </div>
              <div className="relative flex flex-col gap-5">
                <img
                  width={30}
                  src="icons/remove.svg"
                  alt="Remove"
                  onClick={() => removeFromFavourites(item.id)}
                />
                <img
                  width={30}
                  className="mt-auto"
                  src="icons/fCart.svg"
                  alt="Add to Cart"
                  // Add additional functionality here for adding to cart if needed
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg">No favorite items yet.</p>
      )}

      <div className="fixed left-0 bottom-10">
        <Image
          src={"/icons/addAllToCart.svg"}
          alt="Add to cart"
          width={500}
          height={300}
          onClick={addAllToCart}
        />
      </div>

      <BottomNav />
    </div>
  );
};

export default FavouritesPage;
