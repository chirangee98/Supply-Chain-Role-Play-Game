import axios from "axios";
import React from "react";

const AdminGameDashboard = ({ handleClick, gameid }) => {
  const [game, setGame] = React.useState(null);

  React.useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/admin/gameDetails/${gameid}`);
        setGame(res.data);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGameDetails();
  }, [gameid]);

  return (
    <div >
      {game && (
        <div className="p-4 bg-gray-100 max-h-screen ">
          <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
            <div className="flex justify-between">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleClick('index')}
              >
                Back
              </button>
              <div>
                <h2 className="text-2xl font-semibold">Admin</h2>
              </div>
              <div className="flex space-x-4">
                <div className="text-center">
                  <p className="text-sm">Order Lead Time</p>
                  <p className="text-lg font-semibold">1</p>
                </div>
                <div className="text-center">
                  <p className="text-sm">Delivery Lead Time</p>
                  <p className="text-lg font-semibold">{game.deliveryLeadTime}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm">Total No. of Weeks</p>
                  <p className="text-lg font-semibold">{game.weeks}</p>
                </div>
              </div>
            </div>
          </div>

          {game.weeksData.map((week, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md mb-4 ">
              <h3 className="text-lg font-medium">Week {index + 1}</h3>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {week.gameDetails.map((detail, i) => (
                  <div key={i} className="bg-gray-200 p-2 rounded-md">
                    <h3 className="text-md font-medium">{detail.user.userType}</h3>
                    <p className="text-blue-500">Demand: {detail.demand}</p>
                    <p className="text-blue-500">BackOrder: {detail.backOrder}</p>
                    <p className="text-blue-500">Inventory: {detail.inventory}</p>
                    <p className="text-blue-500">Received Inventory: {detail.receivedInventory}</p>
                    <p className="text-blue-500">Shipped Demand: {detail.shippedDemand}</p>
                    <p className="text-blue-500">BackOrder Next Week: {detail.backOrderNextWeek}</p>
                    <p className="text-blue-500">Order Placed: {detail.orderPlaced}</p>
                    <p className={`text-${detail.isOrdered ? 'green' : 'red'}-500`}>Order Status: {detail.isOrdered ? 'Placed' : 'Pending'}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGameDashboard;
