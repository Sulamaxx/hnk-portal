"use client";
import React, { useState } from "react";
const EmployeeGroupManagement = () => {
  const initialGroup = {
    id: "",
    name: "",
    description: "",
  };

  const [employeeGroups, setEmployeeGroups] = useState([
    {
      id: "1",
      name: "Development Team",
      description: "Responsible for software development",
    },
    {
      id: "2",
      name: "Marketing Team",
      description: "Handles marketing activities",
    },
    // Add more group objects as needed
  ]);

  const [selectedGroup, setSelectedGroup] = useState(initialGroup);
  const [creatingNewGroup, setCreatingNewGroup] = useState(false);

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    setCreatingNewGroup(false);
  };

  const handleCreateNewGroup = () => {
    setSelectedGroup(initialGroup);
    setCreatingNewGroup(true);
  };

  const handleDeleteGroup = (groupId) => {
    // Add logic to delete the employee group
    // You can send a request to a server or update the state directly
    const updatedGroups = employeeGroups.filter((group) => group.id !== groupId);
    setEmployeeGroups(updatedGroups);
    setSelectedGroup(initialGroup);
  };

  const handleSaveGroup = () => {
    // Add logic to save or update the employee group
    // You can send a request to a server or update the state directly
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Employee Group Management</h1>

      <div className="flex">
        {/* Employee Groups List */}
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-bold mb-4">Employee Groups</h2>
          <ul className="mb-4">
            {employeeGroups.map((group) => (
              <li
                key={group.id}
                onClick={() => handleSelectGroup(group)}
                className={`cursor-pointer ${
                  selectedGroup.id === group.id ? "text-blue-500 font-bold" : ""
                }`}
              >
                {group.name}
                <button
                  className="text-red-500 hover:underline ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteGroup(group.id);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleCreateNewGroup}
          >
            Create New Group
          </button>
        </div>

        {/* Selected Employee Group */}
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-bold mb-4">
            {creatingNewGroup ? "Create New Group" : "Selected Group"}
          </h2>

          <form>
            <label className="block mb-2" htmlFor="groupName">
              Group Name:
              <input
                type="text"
                id="groupName"
                className="w-full p-2 border border-gray-300"
                value={selectedGroup.name}
                onChange={(e) =>
                  setSelectedGroup({ ...selectedGroup, name: e.target.value })
                }
              />
            </label>

            <label className="block mb-2" htmlFor="groupDescription">
              Group Description:
              <textarea
                id="groupDescription"
                className="w-full p-2 border border-gray-300"
                value={selectedGroup.description}
                onChange={(e) =>
                  setSelectedGroup({
                    ...selectedGroup,
                    description: e.target.value,
                  })
                }
              />
            </label>

            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSaveGroup}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeGroupManagement;
