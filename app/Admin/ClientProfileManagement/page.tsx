"use client";
import React, { useEffect, useState } from "react";

const ClientProfileManagement = () => {
 
  const initialClient = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectsData: [],
  };

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [file, setFile] = useState();
  const [company, setCompany] = useState();

  const [clients, setClients] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  
  const loadClientDetails = function () {
    fetch("http://localhost:5000/api/user/clients/all", {
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
        alert(data.message);
        if (data.message == "success") {
          setClients(data.clients);
        }
      });
  };

  useEffect(loadClientDetails, []);

  const projectsData = `Project 1: Project Details...
Project 2: Project Details...
Project 3: Project Details...ff
`;

  const [selectedClient, setSelectedClient] = useState(initialClient);

  const handleSelectClient = (client) => {};

  const handleCreateClientProfile = function () {
    const form = new FormData();
    form.append("first_name", firstName);
    form.append("last_name", lastName);
    form.append("email", email);
    form.append("mobile", mobile);
    form.append("username", username);
    form.append("password", password);
    form.append("file", file);
    form.append("companyName", company);
    form.append("role", "client");

    fetch("http://localhost:5000/api/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-Type": "application/json; charset=utf-8",
        "enctype":"multipart/form-data"
      },
      body: form,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert(data.message);
        loadClientDetails();
      });
  };

 
  return (
    <div className="container bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Client Profile Management</h1>

      <div className="w-full p-8  h-96 overflow-y-auto">
        <div>
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.value);
            }}
          />
        </div>

        {/* Profile Management Content */}
        <div>
          <label className="block mb-4">
            First Name:
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label className="block mb-4">
            Last Name:
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label className="block mb-4">
            Email:
            <input
              type="email"
              className="w-full p-2 border border-gray-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block mb-4">
            Mobile:
            <input
              type="tel"
              className="w-full p-2 border border-gray-300"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            Username:
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="block mb-4">
            Password:
            <input
              type="tel"
              className="w-full p-2 border border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            Company:
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCreateClientProfile}
          >
            Create New User
          </button>
        </div>
      </div>
      <div className="w-3/4">
        <h2 className="text-xl font-bold mb-4">Client List</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td className="py-2 px-4 border-b">{client._id}</td>
                <td className="py-2 px-4 border-b">{client.first_name}</td>
                <td className="py-2 px-4 border-b">{client.last_name}</td>
                <td className="py-2 px-4 border-b">{client.email}</td>
                <td className="py-2 px-4 border-b">{client.mobile}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:underline mr-2"
                    onClick={() => handleSelectClient(client)}
                  >
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientProfileManagement;

