"use client";
import React, { useEffect, useState } from "react";

const ClientProfileManagement = () => {
  // const [clientProfiles, setClientProfiles] = useState([
  //   {
  //     id: 1,
  //     name: "ABC Corp",
  //     logo: "logo-url-abc.jpg",
  //     details: "Some details about ABC Corp",
  //   },
  //   {
  //     id: 2,
  //     name: "XYZ Ltd",
  //     logo: "logo-url-xyz.jpg",
  //     details: "Some details about XYZ Ltd",
  //   },
  // ]);

  // const [selectedClientProfile, setSelectedClientProfile] = useState(null);
  // const [newClientProfile, setNewClientProfile] = useState({
  //   name: "",
  //   logo: "",
  //   details: "",
  // });

 

  // const handleReadClientProfile = (clientId) => {
  //   const clientProfile = clientProfiles.find(
  //     (profile) => profile.id === clientId
  //   );
  //   setSelectedClientProfile(clientProfile);
  // };

  // const handleUpdateClientProfile = () => {
  //   setClientProfiles(
  //     clientProfiles.map((profile) =>
  //       profile.id === selectedClientProfile.id
  //         ? { ...profile, ...selectedClientProfile }
  //         : profile
  //     )
  //   );
  //   setSelectedClientProfile(null);
  // };

  // const handleDeleteClientProfile = () => {
  //   setClientProfiles(
  //     clientProfiles.filter(
  //       (profile) => profile.id !== selectedClientProfile.id
  //     )
  //   );
  //   setSelectedClientProfile(null);
  // };

  const initialClient = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectsData: [],
  };

  const [clients, setClients] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  const handleInputChange = (field, value) => {
    setSelectedClient({ ...selectedClient, [field]: value });
  };

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

  const handleSelectClient = (client) => {
    setSelectedProject(client.folders[0]);
    setSelectedClient(client);
  };

  const handleSaveClient = () => {
    // Add logic to save or update the client profile
    // You can send a request to a server or update the state directly
  };

  return (
    <div className="container bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Client Profile Management</h1>

      <div className="w-full p-8  h-96 overflow-y-auto">
        <img src="./user.png" alt="Logo" className="mb-4" />

        {/* Profile Management Content */}
        <div>
          <label className="block mb-4">
            First Name:
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={selectedClient.first_name}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </label>

          <label className="block mb-4">
            Last Name:
            <input
              type="text"
              className="w-full p-2 border border-gray-300"
              value={selectedClient.last_name}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </label>

          <label className="block mb-4">
            Email:
            <input
              type="email"
              className="w-full p-2 border border-gray-300"
              value={selectedClient.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </label>

          <label className="block mb-4">
            Mobile:
            <input
              type="tel"
              className="w-full p-2 border border-gray-300"
              value={selectedClient.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
            />
          </label>

          <label className="block mb-4">
            <select id="project" value={selectedProject}>
              <option value="" disabled>
                Select a project
              </option>
              <option>project 1</option>
              <option>project 2</option>
            </select>
          </label>

          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
              <tr key={client.id}>
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

// import React from 'react';

// const ClientManagement = () => {
//   return (
//     <div>
//       <h2>Client Management Section</h2>

//     </div>
//   );
// };

// export default ClientManagement;
