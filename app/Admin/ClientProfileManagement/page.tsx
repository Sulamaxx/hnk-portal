"use client";
import React, { useState } from "react";

const ClientProfileManagement = () => {
  const [clientProfiles, setClientProfiles] = useState([
    {
      id: 1,
      name: "ABC Corp",
      logo: "logo-url-abc.jpg",
      details: "Some details about ABC Corp",
    },
    {
      id: 2,
      name: "XYZ Ltd",
      logo: "logo-url-xyz.jpg",
      details: "Some details about XYZ Ltd",
    },
   
  ]);

  const [selectedClientProfile, setSelectedClientProfile] = useState(null);
  const [newClientProfile, setNewClientProfile] = useState({
    name: "",
    logo: "",
    details: "",
  });

  const handleCreateClientProfile = () => {
   
    setClientProfiles([
      ...clientProfiles,
      { id: clientProfiles.length + 1, ...newClientProfile },
    ]);
    setNewClientProfile({ name: "", logo: "", details: "" });
  };

  const handleReadClientProfile = (clientId) => {
    const clientProfile = clientProfiles.find(
      (profile) => profile.id === clientId
    );
    setSelectedClientProfile(clientProfile);
  };

  const handleUpdateClientProfile = () => {
    setClientProfiles(
      clientProfiles.map((profile) =>
        profile.id === selectedClientProfile.id
          ? { ...profile, ...selectedClientProfile }
          : profile
      )
    );
    setSelectedClientProfile(null);
  };

  const handleDeleteClientProfile = () => {
    setClientProfiles(
      clientProfiles.filter(
        (profile) => profile.id !== selectedClientProfile.id
      )
    );
    setSelectedClientProfile(null);
  };

  return (
    <div className="container mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Client Profile Management</h1>

      {/* Create Client Profile */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Create Client Profile</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Client Name"
            value={newClientProfile.name}
            onChange={(e) =>
              setNewClientProfile({ ...newClientProfile, name: e.target.value })
            }
            className="p-2 border rounded-md w-1/2"
          />
          <input
            type="url"
            placeholder="Logo URL"
            value={newClientProfile.logo}
            onChange={(e) =>
              setNewClientProfile({ ...newClientProfile, logo: e.target.value })
            }
            className="p-2 border rounded-md w-1/2"
          />
          <textarea
            placeholder="Client Details"
            value={newClientProfile.details}
            onChange={(e) =>
              setNewClientProfile({
                ...newClientProfile,
                details: e.target.value,
              })
            }
            className="p-2 border rounded-md w-full h-20"
          />
          <button
            type="button"
            onClick={handleCreateClientProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create
          </button>
        </div>
      </div>

      {/* Read Client Profile */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Read Client Profile</h2>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Client ID"
            onChange={(e) => setSelectedClientProfile(null)} 
            className="p-2 border rounded-md"
          />
          <button
            type="button"
            onClick={() =>
              handleReadClientProfile(Number(selectedClientProfile))
            }
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </div>
        {selectedClientProfile && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">
              Client Profile Details
            </h3>
            <p>ID: {selectedClientProfile.id}</p>
            <p>Name: {selectedClientProfile.name}</p>
            <p>Logo: {selectedClientProfile.logo}</p>
            <p>Details: {selectedClientProfile.details}</p>
          </div>
        )}
      </div>

      {/* Update Client Profile */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Update Client Profile</h2>
        {selectedClientProfile && (
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="New Client Name"
              value={selectedClientProfile.name}
              onChange={(e) =>
                setSelectedClientProfile({
                  ...selectedClientProfile,
                  name: e.target.value,
                })
              }
              className="p-2 border rounded-md w-1/2"
            />
            <input
              type="url"
              placeholder="New Logo URL"
              value={selectedClientProfile.logo}
              onChange={(e) =>
                setSelectedClientProfile({
                  ...selectedClientProfile,
                  logo: e.target.value,
                })
              }
              className="p-2 border rounded-md w-1/2"
            />
            <textarea
              placeholder="New Client Details"
              value={selectedClientProfile.details}
              onChange={(e) =>
                setSelectedClientProfile({
                  ...selectedClientProfile,
                  details: e.target.value,
                })
              }
              className="p-2 border rounded-md w-full h-20"
            />
            <button
              type="button"
              onClick={handleUpdateClientProfile}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
          </div>
        )}
      </div>

      {/* Delete Client Profile */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Delete Client Profile</h2>
        {selectedClientProfile && (
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleDeleteClientProfile}
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
