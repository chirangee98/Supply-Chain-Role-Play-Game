import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const PlaceOrderForm = ({ distributors , userId}) => {
    const [orderQuantity, setOrderQuantity] = useState('');
    const [selectedDistributor, setSelectedDistributor] = useState('');
    const [selectedDistributorname, setselectedDistributorname] = useState('');
    // alert(userId);

    // userId = userId;
    // const [selectedDistributorname, setselectedDistributorname] = useState('');
   // const providerName=selectedDistributor.name;


   async function handleOrderSubmit  (e) {
        e.preventDefault();
        // alert(orderQuantity+" "+selectedDistributor+" "+selectedDistributorname)
       
        try {
            await axios
              .post("http://localhost:3000/api/orders", {
              userId,  
              orderQuantity,
                selectedDistributor,
                selectedDistributorname,
              
              })
              .then((res) => {
                if (res.data == "success") {
                  alert("order placed successfully");
                } else if (res.data == "fail") {
                  alert("failed to place order");
                 
                }
              })
              .catch((e) => {
                console.log(e);
                alert("wrong details");
                console.log(e);
              });
          } catch (e) {
            console.log(e);
          }


        // Implement logic to submit order
    };

    return (
        <div className="bg-white shadow-md rounded px-8 py-6 w-[80%] m-auto mt-10">
            <h2 className="text-2xl font-semibold mb-4">Place Order</h2>
            <form onSubmit={handleOrderSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderQuantity">
                        Order Quantity
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="orderQuantity"
                        type="number"
                        placeholder="Order Quantity"
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="selectedDistributor">
                        Select Provider
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="selectedDistributor"
                        value={selectedDistributor}
                        onChange={(e) => {setSelectedDistributor(e.target.value)
                        setselectedDistributorname(distributors.find(d => d._id === e.target.value).name)}}
                        required
                    >
                        <option value="">Select Provider</option>
                        {distributors.map(distributor => (
                            <option  key={distributor._id} value={distributor._id}>{distributor.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PlaceOrderForm;
