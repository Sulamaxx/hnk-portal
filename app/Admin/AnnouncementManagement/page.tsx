"use client";
// AnnouncementManagement.js

import React, { useEffect, useState } from "react";

const AnnouncementManagement = () => {
  const initialAnnouncement = {
    id: "",
    title: "",
    content: "",
  };

  const [announcements, setAnnouncements] = useState([
    // {
    //   id: "1",
    //   title: "Important Announcement",
    //   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    // },
    // {
    //   id: "2",
    //   title: "Upcoming Event",
    //   content: "Save the date for our upcoming event on dd/mm/yyyy.",
    // },
    // Add more announcement objects as needed
  ]);

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState(initialAnnouncement);
  const [creatingNewAnnouncement, setCreatingNewAnnouncement] = useState(false);

  const handleSelectAnnouncement = (announcement) => {
    setSelectedAnnouncement(announcement);
    setCreatingNewAnnouncement(false);
  };

  const handleCreateNewAnnouncement = () => {
    setSelectedAnnouncement(initialAnnouncement);
    setCreatingNewAnnouncement(true);
  };

  const handleSaveAnnouncement = () => {
    // Add logic to save or update the announcement
    // You can send a request to a server or update the state directly
  };

  const handleDeleteAnnouncement = (announcementId) => {
    fetch("http://localhost:5000/api/announcements/" + announcementId, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        if (data.message == "Announcement deleted successfully") {
          loadAnounceMentDetails();
        }
      });
  };

  const [newAnnouncement, setNewAnnouncement] = useState(initialAnnouncement);
  const [anouncementTitle, setAnouncementTitle] = useState("");
  const [anouncementContent, setAnouncementContent] = useState("");

  const clearTextFields = function () {
    setAnouncementTitle("");
    setAnouncementContent("");
  };

  const handleAddAnnouncement = () => {
    var details = JSON.stringify({
      title: anouncementTitle,
      content: anouncementContent,
    });

    fetch("http://localhost:5000/api/announcements", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: details,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        if (data.message == "Announcement create successfully") {
          clearTextFields();
          loadAnounceMentDetails();
        }
      });
  };

  const loadAnounceMentDetails = function () {
    fetch("http://localhost:5000/api/announcements", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(data.allAnnouncements);
      });
  };

  useEffect(loadAnounceMentDetails, []);

  return (
    <div className=" h-screen">
      <h1 className="text-3xl font-bold mb-8">Announcement Management</h1>

      <div className="flex">
        {/* Announcements List */}
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-bold mb-4">Announcements</h2>
          <div className="grid grid-cols-1 gap-4">
            {announcements.map((announcement) => (
              <div
                key={announcement._id}
                onClick={() => handleSelectAnnouncement(announcement)}
                className={`cursor-pointer p-4 border rounded-md ${
                  selectedAnnouncement.id === announcement._id
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300 hover:border-blue-500 hover:bg-gray-100"
                }`}
              >
                <h3 className="text-lg font-bold mb-2">{announcement.title}</h3>
                <p>{announcement.content}</p>
                {/* <p>{announcement.author.first_name}</p> */}
                <button
                  className="text-red-500 hover:underline mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAnnouncement(announcement._id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            onClick={handleCreateNewAnnouncement}
          >
            Create New Announcement
          </button> */}
        </div>

        {/* Selected or Creating Announcement */}
        <div className="w-1/2 pl-4">
          {(creatingNewAnnouncement ||
            (!selectedAnnouncement.id && !creatingNewAnnouncement)) && (
            <div>
              <h1 className="text-3xl font-bold mb-8">Add New Announcement</h1>

              <form>
                <label className="block mb-4" htmlFor="announcementTitle">
                  Announcement Title:
                  <input
                    type="text"
                    id="announcementTitle"
                    name="title"
                    className="w-full p-2 border border-gray-300"
                    value={anouncementTitle}
                    onChange={(e) => setAnouncementTitle(e.target.value)}
                  />
                </label>

                <label className="block mb-4" htmlFor="announcementContent">
                  Announcement Content:
                  <textarea
                    id="announcementContent"
                    name="content"
                    className="w-full p-2 border border-gray-300"
                    value={anouncementContent}
                    onChange={(e) => setAnouncementContent(e.target.value)}
                  />
                </label>

                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleAddAnnouncement}
                >
                  Add Announcement
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementManagement;
