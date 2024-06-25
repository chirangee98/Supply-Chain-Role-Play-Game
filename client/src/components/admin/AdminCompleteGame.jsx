import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCompleteGame = ({ handleAdminActiveGame }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.post('http://localhost:3000/admin/showGames', {
        userid: localStorage.getItem('userid'),
        userType: localStorage.getItem('usertype')
      });
      const completedGames = response.data.filter(game => game.status === 'completed');
      setGames(completedGames);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Completed Games</h2>
      {games.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="overflow-y-auto" style={{ maxHeight: '250px' }}>
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Week</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initial Inventory</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Lead Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {games.map((game, index) => (
                  <tr key={game._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.weeks}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.initialInventory}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.deliveryLeadTime}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="px-4 py-2 bg-red-500 text-white font-medium rounded-md"
                        onClick={() => handleAdminActiveGame(game._id, 'admincompletedgamedashboard')}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No completed games found.</p>
      )}
    </div>
  );
};

export default AdminCompleteGame;
