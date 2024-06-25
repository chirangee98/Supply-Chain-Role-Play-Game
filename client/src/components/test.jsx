import React, { useState } from 'react';

const Test = () => {
  // Sample game data (replace with your actual data fetching logic)
  const games = [
    {
      id: 1,
      title: 'Game 1',
      week: 12,
      status: 'In Progress',
      buttonText: 'Join Game',
      buttonColor: 'blue-500', // Can be customized based on status (e.g., 'green-500' for 'Won')
    },
    {
      id: 2,
      title: 'Game 2',
      week: 15,
      status: 'Completed (Won)',
      buttonText: 'View Details',
      buttonColor: 'green-500',
    },
  ];

  const [selectedGame, setSelectedGame] = useState(null);

  const handleSelectGame = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <h1 className="text-xl font-bold text-gray-800">User Dashboard</h1>
        <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-500">Logout</button>
      </header>

      <main className="flex flex-grow overflow-y-auto px-4 py-4">
        <aside className="w-64 bg-white shadow-md rounded-md px-4 py-4 mr-4">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Navigation</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500">My Games</a>
            </li>
            <li>
              <a href="#" className="px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500">Create Game</a>
            </li>
            <li>
              <a href="#" className="px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500">Settings</a>
            </li>
          </ul>
          <h2 className="text-lg font-medium text-gray-800 mt-4">Stats</h2>
          <ul className="space-y-2">
            <li>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Games Played</span>
                <span className="text-gray-500 font-bold">25</span>
              </div>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Win Rate</span>
                <span className="text-green-500 font-bold">70%</span>
              </div>
            </li>
          </ul>
        </aside>

        <section className="flex-grow bg-white shadow-md rounded-md px-4 py-4">
          <h2 className="text-lg font-medium text-gray-800 mb-4">My Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {games.map((game) => (
              <div
                key={game.id}
                className="p-4 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
                onClick={() => handleSelectGame(game)}
              >
                <h3 className="text-base font-medium text-gray-800 mb-2">{game.title}</h3>
                <p className="text-gray-700 mb-2">Week: {game.week}</p>
                <p className="text-gray-700 mb-2">Status: {game.status}</p>
                <button className={`px-4 py-2 bg-${game.buttonColor} text-white font-medium rounded-md`}>
                  {game.buttonText}
                </button>
              </div>
            ))}
          </div>

          {selectedGame && (
            <div className="mt-8 p-4 bg-gray-200 rounded-md">
              <h3 className="text-base font-medium text-gray-800 mb-2">{selectedGame.title}</h3>
              <p className="text-gray-700 mb-2">Week: {selectedGame.week}</p>
              <p className="text-gray-700 mb-2">Status: {selectedGame.status}</p>
              {/* Additional details can be added here */}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Test;
