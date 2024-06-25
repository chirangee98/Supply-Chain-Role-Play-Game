import React, { useState, useEffect } from 'react';
import axios from "axios";

const StartGameForm = () => {
  const [formData, setFormData] = useState({
    weeks: '',
    initialInventory: '',
    deliveryLeadTime: '',
    holdingCost: '',
    backorderCost: '',
    retailer: '',
    distributor: '',
    wholesaler: '',
    manufacturer: '',
  });
  const [customers, setCustomers] = useState([]);
  const userId = localStorage.getItem('userid');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/allactiveuser');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/admin/startgame", { userId, ...formData }).then((res) => {
        if (res.data === "success") {
          alert("Game started successfully");
        } else {
          alert("Failed to start game");
        }
      }).catch((error) => {
        console.error(error);
        alert("Failed to start game");
      });
    } catch (error) {
      console.error(error);
      alert("Failed to start game");
    }
  };

  const renderDropdown = (name, label, role) => (
    <div className="col-span-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}:</label>
      <select
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Select {label}</option>
        {customers
          .filter((customer) => customer.userType === role)
          .map((customer) => (
            <option key={customer._id} value={customer._id}>
              {`${customer.name} - ${customer.mobile}`}
            </option>
          ))}
      </select>
    </div>
  );

  return (
    <div className="start-game bg-gray-100 p-6 rounded shadow-md mx-auto max-w-xl mt-2">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Start Game</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <label htmlFor="weeks" className="block text-sm font-medium text-gray-700">
              Number of Weeks:
            </label>
            <input
              type="number"
              id="weeks"
              name="weeks"
              min="5"
              value={formData.weeks}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="initialInventory" className="block text-sm font-medium text-gray-700">
              Initial Inventory:
            </label>
            <input
              type="number"
              id="initialInventory"
              name="initialInventory"
              min="0"
              value={formData.initialInventory}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="deliveryLeadTime" className="block text-sm font-medium text-gray-700">
              Delivery Lead Time:
            </label>
            <input
              type="number"
              id="deliveryLeadTime"
              name="deliveryLeadTime"
              min="1"
              max="4"
              value={formData.deliveryLeadTime}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="holdingCost" className="block text-sm font-medium text-gray-700">
              Holding Cost:
            </label>
            <input
              type="number"
              id="holdingCost"
              name="holdingCost"
              min="0"
              value={formData.holdingCost}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-1">
            <label htmlFor="backorderCost" className="block text-sm font-medium text-gray-700">
              Backorder Cost:
            </label>
            <input
              type="number"
              id="backorderCost"
              name="backorderCost"
              min="0"
              value={formData.backorderCost}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {renderDropdown('retailer', 'Retailer', 'retailer')}
          {renderDropdown('distributor', 'Distributor', 'distributor')}
          {renderDropdown('wholesaler', 'Wholesaler', 'wholesaler')}
          {renderDropdown('manufacturer', 'Manufacturer', 'manufacturer')}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default StartGameForm;
