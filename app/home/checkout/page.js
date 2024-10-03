"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '@/components/ThemeButton';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PiY602LUEWy8ypN0B7sio0Va9seeNxaXTIQxlzZuFKxmZVNG9zRNagoLPrn3exOZJMAADvsBiDHooaUaMIRAHBj00EMOIYj0e');

const Page = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [cartItems, setCartItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const deliveryFee = 5.00;

  useEffect(() => {
    // Retrieve the current user ID from local storage
    const currentUser = localStorage.getItem('currentUser'); // Assumes 'currentUser' is the key
    if (currentUser) {
      const items = JSON.parse(localStorage.getItem(`cart_${currentUser}`)) || [];
      setCartItems(items);
  
      const total = items.reduce((acc, item) => {
        // Check if item.price is a string or a number
        const itemPrice = typeof item.price === 'string'
          ? parseFloat(item.price.replace('$', '').trim()) || 0
          : parseFloat(item.price) || 0; // If it's a number, just parse it directly
  
        return acc + itemPrice * item.quantity;
      }, 0);
  
      setTotalValue(total);
    } else {
      console.error("No current user found in local storage");
    }
  }, []);
  

  const backButton = () => {
    router.push('/home/cart');
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
  
    const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalValue + deliveryFee }),
    });
  
    const { clientSecret } = await response.json();
  
    if (!stripe || !elements) {
        return;
    }
  
    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
                name: 'Adnan Afridi',
            },
        },
    });
  
    if (result.error) {
        console.log(result.error.message);
        setIsProcessing(false);
    } else {
        if (result.paymentIntent.status === 'succeeded') {
            console.log('Payment successful!');
            setIsProcessing(false);
  
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser) {
                // Retrieve current cart items
                const items = JSON.parse(localStorage.getItem(`cart_${currentUser}`)) || [];
                
                // Save paid items to a separate key
                const paidOrders = JSON.parse(localStorage.getItem(`paidOrders_${currentUser}`)) || [];
                localStorage.setItem(`paidOrders_${currentUser}`, JSON.stringify([...paidOrders, ...items]));

                // Clear the cart
                localStorage.setItem(`cart_${currentUser}`, JSON.stringify([]));
            } else {
                console.error("No current user found in local storage");
            }
  
            // Redirect to the success page
            router.push('/home/checkout/success');
        }
    }
};

  

  return (
    <main className='bg-[#fafafa] mb-5 pb-5 min-h-[100vh]'>
      <div className="flex items-center justify-between mb-2 pb-4 px-2 relative">
        <div>
        <button onClick={backButton} className="absolute">
          <img src="/icons/cBack.svg" alt="Back to cart" />
        </button>
        </div>
        <div className="text-center mt-5">
          <div className="text-2xl font-semibold">Check out</div>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <ModeToggle />
        </div>
      </div>

      <div>
        <div className='flex justify-between w-[90vw] mx-auto'>
          <p className='font-normal text-xl text-gray-400'>Shipping Address</p>
          <img src="/icons/edit.svg" alt="Edit Shipping Address" />
        </div>
        <div className='w-[90vw] mx-auto rounded-xl my-3 bg-white'>
          <div className='py-3 font-normal text-2xl p-3'>
            <h3>Adnan Afridi</h3>
          </div>
          <hr className='bg-slate-100 h-[3px]' />
          <div className='text-lg px-3 py-3 text-slate-500'>
            <p>pajjagi road paqeer kaley, Pekhawar</p>
          </div>
        </div>
      </div>

      <div className='mt-6'>
        <img width={500} src="/icons/payment.svg" alt="Payment Icon" />
      </div>

      <div className='relative'>
        <img width={500} height={600} src="/icons/delivery.svg" alt="Delivery Icon" className="relative -mt-7" />
      </div>

      {/* Order Summary Section */}
      <div className='w-[90vw] mx-auto bg-white px-7 py-3 -mt-4'>
        <div className="flex justify-between text-xl">
          <span className='text-gray-500 text-xl'>Order:</span>
          <span className='font-semibold text-xl'>${totalValue.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-xl mt-4">
          <span className='text-gray-500 text-xl'>Delivery:</span>
          <span className='font-semibold text-xl'>${deliveryFee.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-xl mt-4">
          <span className='text-gray-500 text-xl'>Total:</span>
          <span className='font-semibold text-xl'>${(totalValue + deliveryFee).toFixed(2)}</span>
        </div>

        {error && <div className="text-red-500">{error}</div>}
      </div>

      {/* Add the CardElement here */}
      <div className="w-[90vw] mx-auto bg-white p-4 mt-4 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Payment Information</h2>
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <div className='mt-3  w-[90vw] mx-auto'>
        <img src="/icons/submit.svg" alt="Submit Payment" onClick={handlePayment} />
      </div>

      {isProcessing && <div>Loading...</div>}
    </main>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <Page />
  </Elements>
);

export default CheckoutPage;
