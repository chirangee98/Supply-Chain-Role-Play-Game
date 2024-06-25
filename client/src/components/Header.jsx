import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = ({username,usertype}) => {
  // const isLoggedIn = username === null;
  // console.log(isLoggedIn);
  useEffect(() => {
    const userId = localStorage.getItem('userid');
  
  }, []);
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white shadow-md">
     
     <h1 className="text-xl font-bold text-gray-800">SCRPG</h1>
     <div className='flex items-center justify-between'>
     <h2 className="text-xl  text-gray-800">
          <span className="">{username}</span>
          <span className="font-bold">{usertype?.length > 0 ? `(${usertype})` : ''}</span> 
     </h2>
     {/* {isLoggedIn && ( // Conditionally render logout button
          <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-500">Logout</button>
        )} */}
          
    </div>
    </div>
  );
};

export default Header;
