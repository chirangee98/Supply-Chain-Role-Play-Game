import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state for feedback
  const usertype = localStorage.getItem('usertype');

  useEffect(() => {
    
    // console.log('call in useeffeact')
    fetchGames();
  }, []); // Empty dependency array ensures the effect runs only once

  const fetchGames = async () => {
    setIsLoading(true);
    try {
        // console.log(localStorage.getItem('userid'));
      const response = await axios.post('http://localhost:3000/admin/fetchGames',{
          userid:localStorage.getItem('userid'),
          userType:localStorage.getItem('usertype')
      }); // Replace with your API endpoint
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 py-6 w-[95%] m-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Game Management</h2>
      {isLoading ? (
        <div className="text-center mb-4">Loading games...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                {usertype=="SuperAdmin"?(
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin Name</th>
                ):""}
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instance</th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {games.map((game, index) => (
                <tr key={game._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  {usertype=="SuperAdmin"?(
                    <td className="px-6 py-4 whitespace-nowrap">{game.adminId.name}</td>
                  ):""}
                  <td className="px-6 py-4 whitespace-nowrap">{game.instance}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{game.week}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-2 overflow-hidden bg-gray-200"></div> {/* Spacer for scroll */}
        </div>
      )}
    </div>
  );
};

export default UserManagement;
