import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserGameDashboard = ({ gameid, handleClick }) => {
  const usertype = localStorage.getItem("usertype");
  const userId = localStorage.getItem("userid");
  const [game, setGame] = React.useState(null);
  const [allOrdersComplete, setAllOrdersComplete] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/auth/gameDetails/${gameid}`
        );
        let weekNumber = 0;
        const gameData = res.data;
        const weekData = gameData.weeksData.find((week, ind) => {
          return week.gameDetails.find((game) => {
            if (game.user._id === userId && !game.isOrdered) {
              weekNumber = ind;
              return game;
            }
            return null;
          });
        });

        const allUserInventory = weekData.gameDetails.map((game) => {
          return {
            userType: game.user.userType,
            inventory: game.inventory,
          };
        });

        const currGameDetails = weekData.gameDetails.find((game) => {
          if (game.user._id === userId) {
            return game;
          }
        });

        let shipmentToBeReceived = 0;
        gameData.weeksData.forEach((week, ind) => {
          if (weekNumber - gameData.deliveryLeadTime === ind) {
            week.gameDetails.forEach((game) => {
              if (game.user._id === userId) {
                shipmentToBeReceived = game.orderPlaced;
              }
            });
          }
        });

        let currentInventory = null;
        let totalDemandShipped = 0;
        let nextWeekBackorder = 0;

        allUserInventory.forEach((user) => {
          if (user.userType === usertype) {
            currentInventory = user.inventory;

            const totalDemand = currGameDetails.demand + currGameDetails.backOrder;
            if (currentInventory + currGameDetails.receivedInventory >= totalDemand) {
              totalDemandShipped = totalDemand;
              nextWeekBackorder = 0;
            } else {
              totalDemandShipped = currentInventory + currGameDetails.receivedInventory;
              nextWeekBackorder = totalDemand - totalDemandShipped;
            }

            currentInventory =
              user.inventory >
              currGameDetails.demand + currGameDetails.backOrder
                ? user.inventory -
                  currGameDetails.demand -
                  currGameDetails.backOrder
                : 0;

            currGameDetails.backOrderNextWeek =
              user.inventory <= currGameDetails.demand + currGameDetails.backOrder
                ? currGameDetails.demand + currGameDetails.backOrder - user.inventory
                : 0;
          }
        });

        const allOrdersComplete = gameData.weeksData[weekNumber].gameDetails.every(
          (game) => game.isOrdered
        );

        setAllOrdersComplete(allOrdersComplete);

        setGame({
          game: res.data,
          weekNumber: weekNumber,
          week: weekData,
          shipmentToBeReceived: shipmentToBeReceived,
          allUserInventory: allUserInventory,
          currGameDetails: currGameDetails,
          currentInventory: currentInventory,
          totalDemandShipped: totalDemandShipped,
          nextWeekBackorder: nextWeekBackorder,
        });
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    if (!game) {
      fetchGameDetails();
    }
  }, [gameid, game, userId, usertype]);

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!allOrdersComplete && game.weekNumber > 0) {
      alert(`Orders are still pending for week ${game.weekNumber}`);
      return;
    }

    const body = {
      gameid: gameid,
      userid: userId,
      userType: usertype,
      orderQuantity: e.target.quantity.value,
      weekNumber: game.weekNumber,
    };

    axios
      .post(`http://localhost:3000/auth/placeOrder`, body)
      .then((res) => {
        console.log(res.data);
        // Refresh the component to update game state
        setGame(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {game && (
        <div className="p-4 bg-gray-100">
          <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
            <div className="flex justify-between items-center">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleClick('index')}
              >
                Back
              </button>
              <div>
                <h2 className="text-2xl font-semibold">{(usertype==='manufacturer')?'Manufacturer' : usertype}</h2>
              </div>
              <div className="flex space-x-4">
                <div className="text-center">
                  <p className="text-sm">Current Week</p>
                  <p className="text-lg font-semibold">{game.weekNumber + 1}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm">Order Lead Time</p>
                  <p className="text-lg font-semibold">1</p>
                </div>
                <div className="text-center">
                  <p className="text-sm">Delivery Lead Time</p>
                  <p className="text-lg font-semibold">
                    {game.game.deliveryLeadTime}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm">Total No. of Weeks</p>
                  <p className="text-lg font-semibold">{game.game.weeks}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md shadow-md mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium">Customer Demand</h3>
                <p className="text-blue-500 text-lg font-semibold">
                  {game.currGameDetails.demand}
                </p>
                <h3 className="text-lg font-medium">Previous Backorder</h3>
                <p className="text-blue-500 text-lg font-semibold">
                  {game.currGameDetails.backOrder}
                </p>
                <h3 className="text-lg font-medium">Total Demand</h3>
                <p className="text-blue-500 text-lg font-semibold">
                  {game.currGameDetails.demand + game.currGameDetails.backOrder}
                </p>
                <h3 className="text-lg font-medium">Previous Inventory</h3>
                <p className="text-blue-500 text-lg font-semibold">
                  {game.currGameDetails.inventory}
                </p>
                <h3 className="text-lg font-medium">Received Inventory</h3>
                <p className="text-blue-500 text-lg font-semibold">
                  {game.currGameDetails.receivedInventory}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  Total Demand shipped (allocated for total demand):
                </h3>
                <p className="text-blue-500 text-lg font-semibold">
                  {game.totalDemandShipped}
                </p>
                <h3 className="text-lg font-medium">Backorder For Next week:</h3>
                <p className="text-blue-500 text-lg font-semibold">
                  {game.nextWeekBackorder}
                </p>
                <h3 className="text-lg font-medium">
                  Shipment to be received (next week):
                </h3>
                <p className="text-blue-500 text-lg font-semibold">
                  {game.shipmentToBeReceived}
                </p>
                <div className="bg-gray-200 p-4 rounded-md shadow-md mt-4 flex items-center">
                  <form className="flex" onSubmit={handlesubmit}>
                    <input
                      type="number"
                      name="quantity"
                      className="border border-gray-300 rounded-md p-2 mr-4 w-full"
                      placeholder="Enter Quantity"
                    />
                    <button
                      className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                      type="submit"
                    >
                      Order
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-800 text-white p-2 rounded-md text-center">
              <h3 className="text-lg font-medium">Factory</h3>
              <p className="text-lg font-semibold">
                {(usertype === "manufacturer" && game.currentInventory) ||
                  game.allUserInventory.find(
                    (user) => user.userType === "manufacturer"
                  ).inventory}
              </p>
            </div>
            <div className="bg-gray-800 text-white p-2 rounded-md text-center">
              <h3 className="text-lg font-medium">Distributor</h3>
              <p className="text-lg font-semibold">
                {(usertype === "distributor" && game.currentInventory) ||
                  game.allUserInventory.find(
                    (user) => user.userType === "distributor"
                  ).inventory}
              </p>
            </div>
            <div className="bg-gray-800 text-white p-2 rounded-md text-center">
              <h3 className="text-lg font-medium">Wholesaler</h3>
              <p className="text-lg font-semibold">
                {(usertype === "wholesaler" && game.currentInventory) ||
                  game.allUserInventory.find(
                    (user) => user.userType === "wholesaler"
                  ).inventory}
              </p>
            </div>
            <div className="bg-gray-800 text-white p-2 rounded-md text-center">
              <h3 className="text-lg font-medium">Retailer</h3>
              <p className="text-lg font-semibold">
                {(usertype === "retailer" && game.currentInventory) ||
                  game.allUserInventory.find(
                    (user) => user.userType === "retailer"
                  ).inventory}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGameDashboard;
