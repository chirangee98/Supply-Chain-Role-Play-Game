import React from 'react';

const GameTable = ({ games, onEnterGame }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
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
          <tr key={game.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.week}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.initialInventory}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.deliveryLeadTime}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{game.status}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <button
                className={`px-4 py-2 bg-${game.buttonColor} text-white font-medium rounded-md`}
                onClick={() => onEnterGame(game.id)}
              >
                {game.buttonText}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GameTable;
