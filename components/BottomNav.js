import React from 'react';

const BottomNav = () => {
  return (
    <>
      <div className="fixed bottom-1 left-0 w-full z-50"> 
        <div className="flex justify-around gap-2 bg-slate-50 dark:bg-slate-500 h-16 items-center shadow-lg">
          <a href="/home">
            <img src="/icons/home.svg" alt="Home" />
          </a>
          <a href="/favourite">
            <img src="/icons/favourite.svg" alt="Favourite" />
          </a>
          <a href="/notification">
            <img src="/icons/notification.svg" alt="Notification" />
          </a>
          <a href="/profile">
            <img src="/icons/profile.svg" alt="Profile" />
          </a>
        </div>
      </div>
    </>
  );
}

export default BottomNav;
