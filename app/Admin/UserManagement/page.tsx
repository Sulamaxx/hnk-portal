"use client";
import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { useRouter } from "next/navigation";

const UserManagement = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const [searchText, setSearchText] = useState();

  const [selectedUserRow, setSelectedUserRow] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [password, setPassword] = useState("");

  const [selectedUserDetails, setSelectedUserDetails] = useState();
  const [selectedUserId, setSelectedUserId] = useState();

  const handleCreateUser = () => {
    var details = JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      email: email,
      address: address,
      mobile: mobile,
      username: username,
      password: password,
      role:selectedRole ,
    });
    fetch("http://localhost:5000/api/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-Type": "application/json; charset=utf-8",
      },
      body: details,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert(data.message);
        if (data.message == "User registered successfully") {
          loadUsers();
          clearTextFields();
        }
      
      });
  };

  const handleReadUser = () => {
    fetch("http://localhost:5000/api/user/employees/search?q=" + searchText, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-Type": "application/json; charset=utf-8",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setUsers(data.employees);
      });
  };

  const loadUsers = function () {
    fetch("http://localhost:5000/api/user/employees/all", {
      method: "GET",
      credentials: "include",
      headers: {
        "content-Type": "application/json; charset=utf-8",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.message == "success") {
          setUsers(data.users);
        } else {
          router.push("/login");
        }
      });
  };
  useEffect(loadUsers, []);

  const handleUpdateUser = () => {
    var details = JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      email: email,
      address: address,
      mobile: mobile,
      username: username,
    });

    // setSelectedUserDetails(details);

    fetch("http://localhost:5000/api/user/update/" + selectedUserId, {
      method: "PUT",
      credentials: "include",
      headers: {
        "content-Type": "application/json; charset=utf-8",
      },
      body: details,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert(data.message);
        clearTextFields();
        loadUsers();
      });
  };

  function clearTextFields() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress("");
    setMobile("");
    setUsername("");
  }

  const handleDeleteUser = () => {
    fetch("http://localhost:5000/api/user/delete/" + selectedUserId, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-Type": "application/json; charset=utf-8",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert(data.message);
        clearTextFields();
        loadUsers();
      });
  };

  const handleSelectUser = (index) => {
    setSelectedUserRow(index);

    setSelectedUserId(users[index]._id);
    setFirstName(users[index].first_name);
    setLastName(users[index].last_name);
    setEmail(users[index].email);
    setAddress(users[index].address);
    setMobile(users[index].mobile);
    setUsername(users[index].username);
  };

  return (
    <div className="container  bg-white ">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* search user start*/}
      <div className="">
        <h2 className="text-lg font-semibold mb-2">Search users</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="User ID"
            className="p-2 border rounded-md"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={handleReadUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
      
      </div>
      {/* search user end*/}

      {/* User details table start */}
      <div className="container mx-auto overflow-y-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b hidden">ID</th>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Mobile</th>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                onClick={() => handleSelectUser(index)}
                className="cursor-pointer"
              >
                <td className="py-2 px-4 border-b hidden">
                  {users[index]._id}
                </td>
                <td className="py-2 px-4 border-b">
                  {users[index].first_name}
                </td>
                <td className="py-2 px-4 border-b">{users[index].last_name}</td>
                <td className="py-2 px-4 border-b">{users[index].email}</td>
                <td className="py-2 px-4 border-b">{users[index].address}</td>
                <td className="py-2 px-4 border-b">{users[index].mobile}</td>
                <td className="py-2 px-4 border-b">{users[index].username}</td>
                <td className="py-2 px-4 border-b">{users[index].role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* User details table end */}

      {/* Create User and update*/}
      <div className="mb-6 w-full">
        <h2 className="text-lg font-semibold mb-2">Create User</h2>
        <div className=" w-full ">
          <input
            type="text"
            placeholder="First Name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-2 border rounded-md  w-full md:w-1/2"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className="p-2 border rounded-md  w-full md:w-1/2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-md  w-full md:w-1/2"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 border rounded-md  w-full md:w-1/2"
          />
          <input
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="p-2 border rounded-md  w-full md:w-1/2"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded-md  w-full md:w-1/2"
          />
          <select
            id="roleSelect"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="block w-72 p-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="SelectRole">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="client">Client</option>
          </select>
          <button
            type="button"
            onClick={handleCreateUser}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create New User
          </button>
          <button
            type="button"
            onClick={handleUpdateUser}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Update User Details
          </button>
          <button
            type="button"
            onClick={handleDeleteUser}
            className="bg-rose-500 text-white px-4 py-2 rounded-md"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
