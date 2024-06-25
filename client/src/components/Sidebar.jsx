import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Sidebar = ({name,userType, userid,handleClick}) => {

    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState('startgame');


    useEffect(() => {
      // const storedId = localStorage.getItem('itemId');
      // setItemId(storedId ? JSON.parse(storedId) : null); // Parse stored ID
    }, []); // Run useEffect only on mount
  
    // const handleClick = (buttonName) => {
    //   setActiveButton(buttonName);
    // };

    const handleLogout = () => {
      // Perform any logout logic here (e.g., clearing session, local storage, etc.)
      // Then navigate to the login page
      localStorage.removeItem('userId');
      navigate('/');
    };
    
  return (
    <aside className="w-64 bg-white shadow-md rounded-md px-4 py-4 mr-4 flex flex-col justify-between">
      {/* Navigation */}
     
        <ul className='space-y-2'>
         {userType==="admin"? 
            <>
              {/* <li   className={`${activeButton === 'startgame' ? 'active' : ''} px-4 py-2 hover:bg-gray-800 cursor-pointer`} onClick={() => handleClick('startgame')}>Start Game</li> */}
              <li   className={`${activeButton === 'index' ? 'active' : ''} px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500`} onClick={() => handleClick('index')}>Start Game Form</li>
              <li   className={`${activeButton === 'adminactivegame' ? 'active' : ''}px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500`} onClick={() => handleClick('adminactivegame')}>Active Games</li>
              <li   className={`${activeButton === 'admincompletegame' ? 'active' : ''}px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500`} onClick={() => handleClick('admincompletegame')}>Completed Games</li>
              
            </>: userType==="SuperAdmin" ? <>
              <li   className={`${activeButton === 'userlist' ? 'active' : ''} px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500`} onClick={() => handleClick('userlist')}>User List</li>
            <li   className={`${activeButton === 'viewgame' ? 'active' : ''} px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500`} onClick={() => handleClick('viewgame')}>Active Games</li>
            <li   className={`${activeButton === 'regadmin' ? 'active' : ''} px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500`} onClick={() => handleClick('regadmin')}>Ragister Admin</li>
            
            </>:
            <>
            {/* <li   className={`${activeButton === 'placeorder' ? 'active' : ''} px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500`} onClick={() => handleClick('placeorder')}>Place Orders</li> */}
            {/* <li   className={`${activeButton === 'receiveorder' ? 'active' : ''} px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500`} onClick={() => handleClick('receiveorder')}>received orders</li> */}
            <li   className={`${activeButton === 'index' ? 'active' : ''} px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500`} onClick={() => handleClick('index')}>Active Games</li>
            <li   className={`${activeButton === 'completedgames' ? 'active' : ''} px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500`} onClick={() => handleClick('completedgames')}>Completed Games</li>

            </>
         } 
         {/* {userType==="admin"? "" : <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Received Orders</li>}  */}
         {/* {userType==="admin"? <Link to="/approve" ><li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Approve access</li></Link> :"" }  */}

          
        </ul>
      
      {/* Logout */}
      <div onClick={handleLogout} className="pt-8 text-center .absolute bottom-0">
        <button className="w-1/2 font-medium bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">Logout</button>
      </div>
    </aside>
  );
};

export default Sidebar;
