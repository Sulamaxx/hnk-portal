"use client";
import React, { useState } from 'react';

const EmployeeBiographies = () => {
  const [biographies, setBiographies] = useState([]);
  const [selectedBiography, setSelectedBiography] = useState({});
  const [creatingNewBiography, setCreatingNewBiography] = useState(false);

  const handleCreateBiography = () => {
    setCreatingNewBiography(true);
    setSelectedBiography({});
  };

  const handleViewBiography = (biographyId) => {
    const biography = biographies.find((b) => b.id === biographyId);
    setSelectedBiography(biography);
    setCreatingNewBiography(false);
  };

  const handleUpdateBiography = (biographyId) => {
    const biography = biographies.find((b) => b.id === biographyId);
    setSelectedBiography(biography);
    setCreatingNewBiography(true);
  };

  const handleDeleteBiography = (biographyId) => {
    // Implement delete logic
    const updatedBiographies = biographies.filter((b) => b.id !== biographyId);
    setBiographies(updatedBiographies);
    setSelectedBiography({});
    // Show success message or inform the user about the deletion
    // You may also want to implement a confirmation modal for deletion
  };

  const handleSaveBiography = (biographyDetails) => {
    // Implement save/update logic
    if (creatingNewBiography) {
      const newBiography = {
        id: biographies.length + 1,
        ...biographyDetails,
      };
      setBiographies([...biographies, newBiography]);
    } else {
      const updatedBiographies = biographies.map((b) =>
        b.id === selectedBiography.id ? { ...b, ...biographyDetails } : b
      );
      setBiographies(updatedBiographies);
    }

    setCreatingNewBiography(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Employee Biographies</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Biographies List */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Biographies</h2>
          <ul className="space-y-4">
            {biographies.map((biography) => (
              <li key={biography.id} className="cursor-pointer">
                <span
                  onClick={() => handleViewBiography(biography.id)}
                  className="text-blue-500 hover:underline"
                >
                  {biography.name}
                </span>
                <button
                  onClick={() => handleUpdateBiography(biography.id)}
                  className="text-green-500 hover:underline ml-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBiography(biography.id)}
                  className="text-red-500 hover:underline ml-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            onClick={handleCreateBiography}
          >
            Create New Biography
          </button>
        </div>

        {/* Biography Details Form */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">
            {creatingNewBiography ? 'Create New Biography' : 'Biography Details'}
          </h2>
          {creatingNewBiography ? (
            <BiographyForm onSaveBiography={handleSaveBiography} />
          ) : (
            <div>
              {selectedBiography.id && (
                <div className="p-4 border rounded-md bg-gray-100">
                  <h3 className="text-lg font-bold mb-2">{selectedBiography.name}</h3>
                  <p>{selectedBiography.details}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BiographyForm = ({ onSaveBiography }) => {
  const [biographyDetails, setBiographyDetails] = useState({
    name: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBiographyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Implement validation logic before saving
    onSaveBiography(biographyDetails);
    setBiographyDetails({
      name: '',
      details: '',
    });
  };

  return (
    <form>
      <label className="block mb-4" htmlFor="biographyName">
        Biography Name:
        <input
          type="text"
          id="biographyName"
          name="name"
          className="w-full p-2 border border-gray-300"
          value={biographyDetails.name}
          onChange={handleChange}
        />
      </label>

      <label className="block mb-4" htmlFor="biographyDetails">
        Biography Details:
        <textarea
          id="biographyDetails"
          name="details"
          className="w-full p-2 border border-gray-300"
          value={biographyDetails.details}
          onChange={handleChange}
        />
      </label>

      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSave}
      >
        Save
      </button>
    </form>
  );
};

export default EmployeeBiographies;
