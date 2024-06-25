import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActiveGame = ({ handleGame }) => {
  const [games, setGames] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/showGames', {
        userid: localStorage.getItem('userid'),
        userType: localStorage.getItem('usertype')
      });
      // Filter games to include only active games
      const activeGames = response.data.filter(game => game.status === 'active');
      setGames(activeGames);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleSelectGame = (gameId) => {
    const game = games.find(g => g._id === gameId);
    setSelectedGame(game);
  };

  return (
    <div>
      {games ? (
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-4">My Active Games</h2>
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
                    <tr key={game._id} onClick={() => handleSelectGame(game._id)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.weeks}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.initialInventory}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.deliveryLeadTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className={`px-4 py-2 bg-green-500 text-white font-medium rounded-md`}
                          onClick={() => handleGame(game._id, 'usergamedashboard')}
                        >
                          Join Game
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedGame && (
            <div className="mt-8 p-4 bg-gray-200 rounded-md">
              <h3 className="text-base font-medium text-gray-800 mb-2">{selectedGame.title}</h3>
              <p className="text-gray-700 mb-2">Week: {selectedGame.weeks}</p>
              <p className="text-gray-700 mb-2">Initial Inventory: {selectedGame.initialInventory}</p>
              <p className="text-gray-700 mb-2">Delivery Lead Time: {selectedGame.deliveryLeadTime}</p>
              <p className="text-gray-700 mb-2">Holding Cost: {selectedGame.holdingCost}</p>
              <p className="text-gray-700 mb-2">Backorder Cost: {selectedGame.backorderCost}</p>
              <p className="text-gray-700 mb-2">Status: {selectedGame.status}</p>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ActiveGame;
