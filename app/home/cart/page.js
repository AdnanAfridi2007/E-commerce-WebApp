"use client";
import { ModeToggle } from '@/components/ThemeButton';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [promoCode, setPromoCode] = useState(''); // State for promo code
  const [discountApplied, setDiscountApplied] = useState(false); // To track if discount has been applied
  const [currentUser, setCurrentUser] = useState(null); // State to hold current user

  useEffect(() => {
    // Only run this on the client side
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    // Check if currentUser exists before parsing
    if (currentUser) {
      const items = JSON.parse(localStorage.getItem(`cart_${currentUser}`)) || [];
      setCartItems(items); // Set cart items in state
    } else {
      console.error("No current user found in localStorage");
      // Handle the case when there is no current user
    }
  }, [currentUser]);

  // Recalculate total whenever cartItems change
  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const backButton = () => {
    router.push('/home');
  }

  const incrementQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
    localStorage.setItem(`cart_${currentUser}`, JSON.stringify(newCartItems)); // Update with currentUser
  };

  const decrementQuantity = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 1) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
      localStorage.setItem(`cart_${currentUser}`, JSON.stringify(newCartItems)); // Update with currentUser
    }
  };

  const removeItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    localStorage.setItem(`cart_${currentUser}`, JSON.stringify(newCartItems)); // Update with currentUser
  };

  // Function to calculate the total price of items in the cart
  const calculateTotal = () => {
    const totalAmount = cartItems.reduce((acc, item) => {
      // Ensure item.price is a string before calling replace
      const itemPriceString = typeof item.price === 'string' ? item.price : String(item.price);

      // Now you can safely call replace
      const itemPrice = parseFloat(itemPriceString.replace('$', '').trim()) || 0;

      return acc + itemPrice * item.quantity;
    }, 0);

    setTotal(totalAmount);
  };


  // Function to apply discount
  const applyDiscount = () => {
    if (promoCode.toLowerCase() === 'adnan' && !discountApplied) {
      const discountedTotal = total * 0.95; // Apply 5% discount
      setTotal(discountedTotal);
      setDiscountApplied(true); // Mark the discount as applied to prevent multiple applications
      alert('Promo code applied: 5% discount');
    } else if (promoCode.toLowerCase() !== 'adnan') {
      alert('Invalid promo code');
    }
  };

  // Function to navigate to checkout
  const goToCheckout = () => {
    router.push('/home/checkout');
  };

  return (
    <>
      <div className="flex items-center justify-between mb-2 p-4 sticky backdrop-blur-sm top-0 z-50">
        <div>
          <img onClick={backButton} src="/icons/cBack.svg" alt="" className="absolute " />
        </div>
        <div className="text-center mt-5">
          <div className="text-2xl font-semibold">Cart</div>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <ModeToggle />
        </div>
      </div>

      <section className="p-4 mb-56">
        {cartItems.length > 0 ? (
          <ul className=''>
            {cartItems.map((item, index) => (
              <React.Fragment key={index}>
                <li className='flex relative mb-3 mt-2'>
                  <div><img width={80} height={50} className='rounded-lg' src={item.imgSrc} alt="" /></div>
                  <div className='mx-5'>
                    <div>{item.name}</div> {/* Display item name */}
                    <div className='mt-2 font-semibold'>
                      {typeof item.price === 'string' && item.price.includes('$') && item.price.includes('.00') ?
                        item.price :
                        `$${item.price}.00`}
                    </div>


                    <div className='mt-4 font-semibold px-2 flex'>
                      <button className='px-3' onClick={() => decrementQuantity(index)}>
                        <img src="/icons/decrement.svg" alt="" />
                      </button>
                      <div className='text-xl'>
                        {item.quantity < 10 ? `0${item.quantity}` : item.quantity}
                      </div>
                      <button className='px-3' onClick={() => incrementQuantity(index)}>
                        <img src="/icons/increment.svg" alt="" />
                      </button>
                    </div> {/* Display item quantity with increment and decrement buttons */}
                  </div>
                  <div className='absolute right-1'>
                    <img src="/icons/remove.svg" alt="" onClick={() => removeItem(index)} />
                  </div>
                </li>
                <div className='mt-4'><img src="/icons/rectangle.svg" alt="" /></div>
              </React.Fragment>
            ))}
          </ul>
        ) : (
          <p>No items in the cart.</p>
        )}
      </section>

      <div className='w-[80vw] mx-auto fixed bottom-1 bg-white/30 backdrop-blur-sm  shadow-lg px-6 z-10 rounded-lg left-10'>
        <div className="relative z-10">
          {/* Promo Code Section */}
          <div className="flex justify-between items-center mt-5">
            <input
              type="text"
              placeholder="Enter your promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 p-2 shadow-sm border rounded-md mr-2"
            />
            <img src="/icons/enter.svg" alt="" onClick={applyDiscount} />
          </div>

          {/* Total Section */}
          <div className="flex justify-between px-4 items-center mt-5 text-lg font-bold">
            <span>Total:</span>
            <span className="">${total.toFixed(2)}</span> {/* Display total with 2 decimal places */}
          </div>

          <img onClick={goToCheckout} src="/icons/checkout.svg" alt="" />
        </div>
      </div>
    </>
  );
};

export default Page;
