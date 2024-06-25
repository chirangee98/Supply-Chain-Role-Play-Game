import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewOrder = ({userId}) => {
  const [orders, setOrders] = useState([]);
   //alert(userId);
   //console.log(userId);

  // useEffect(() => {
  //   fetchOrders();
  // }, []);


  useEffect(() => {
    // const interval = setInterval(fetchOrders, 100000); // Fetch orders every second

    // return () => clearInterval(interval); // Cleanup interval on component unmount
    if(localStorage.getItem('userid')===null){
      navigate("/");
    }else{
    fetchOrders();
  }
  }, [orders]); // Empty dependency array ensures the effect runs only once

  const fetchOrders = async() => {
    try {
      const response = await axios.post('http://localhost:3000/api/orders/vieworder', {
          userId:localStorage.getItem('userid')
        });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 py-6 w-[80%] m-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">View Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Provider Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{order.quantity}</td>
                <td className="px-4 py-2">{order.providerName}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrder;
