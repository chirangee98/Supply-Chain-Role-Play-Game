import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state for feedback

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/admin/fetchUsers'); // Replace with your API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once

  const toggleUserStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const confirmationMessage = `Are you sure you want to ${newStatus} user ${userId}?`;

    if (window.confirm(confirmationMessage)) {
      try {
     
        const response = await axios.post('http://localhost:3000/admin/updatestatus', {
          userId: userId,
          status: newStatus,
        });

        const updatedUsers = users.map((user) => (user._id === userId ? { ...user, status: newStatus } : user));
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Error toggling user status:', error);
        alert('Error updating user status. Please try again.');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 py-6 w-[95%] m-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      {isLoading ? (
        <div className="text-center mb-4">Loading users...</div>
      ) : (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">User Type</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Mobile</th>
              <th className="px-4 py-2">Status</th>
              {/* <th className="px-4 py-2">Wallet Address</th> */}
              {/* <th className="px-4 py-2 ">
                  <span className="text-sm">Wallet Address</span>
                </th> */}
                {/* <th className="px-4 py-2 truncate whitespace-nowrap">
                    <span className="text-sm">Wallet Address</span>
                </th> */}
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.filter((user) => user.status === "inactive").map((user, index) => (
              <tr key={user._id}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.userType}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.mobile}</td>
                <td className="px-4 py-2">{user.status}</td>
                {/* <td className="px-4 py-2">{user.walletAddress}</td> */}
                {/* <td className="px-4 py-2 truncate whitespace-nowrap">
                    <span className="truncate max-w-[250px] overflow-hidden text-ellipsis">
                      {user.walletAddress}
                    </span>
                  </td> */}
                   {/* <td className="px-4 py-2 truncate whitespace-nowrap ">
                    <span className="truncate max-w-[250px] overflow-hidden text-ellipsis">
                        {user.walletAddress}
                    </span>
                    </td> */}
                <td className="px-4 py-2">
                  <button
                    className={`
                      px-4 py-2 rounded-md text-white 
                      ${user.status === 'active' ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}
                    `}
                    onClick={() => toggleUserStatus(user._id, user.status)}
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserManagement;
