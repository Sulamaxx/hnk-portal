"use client";
import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleCreateUser = () => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ name: '', email: '' });
  };

  const handleReadUser = (userId: number) => {
    // Implement logic for reading a specific user by its identifier
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
  };

  const handleUpdateUser = () => {
    // Implement logic for updating a user
    // Validate input, update user details, show success message, etc.
    // For simplicity, just update the selected user with the new details
    setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, ...selectedUser } : user)));
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    // Implement logic for deleting a user
    // Confirm deletion, remove user from the list, show success message, etc.
    // For simplicity, just remove the selected user from the list
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Create User */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Create User</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="p-2 border rounded-md w-1/2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="p-2 border rounded-md w-1/2"
          />
          <button
            type="button"
            onClick={handleCreateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create
          </button>
        </div>
      </div>

      {/* Read User */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Read User</h2>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="User ID"
            onChange={(e) => setSelectedUser(null)} // Clear selected user when searching
            className="p-2 border rounded-md"
          />
          <button
            type="button"
            onClick={() => handleReadUser(Number(selectedUser))}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
        {selectedUser && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">User Details</h3>
            <p>ID: {selectedUser.id}</p>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
          </div>
        )}
      </div>

      {/* Update User */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Update User</h2>
        {selectedUser && (
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="New Name"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              className="p-2 border rounded-md w-1/2"
            />
            <input
              type="email"
              placeholder="New Email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              className="p-2 border rounded-md w-1/2"
            />
            <button
              type="button"
              onClick={handleUpdateUser}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
          </div>
        )}
      </div>

      {/* Delete User */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Delete User</h2>
        {selectedUser && (
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleDeleteUser}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Confirm Deletion
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
