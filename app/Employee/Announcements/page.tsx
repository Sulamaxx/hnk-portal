// Announcements.js
"use client";
import React, { useState } from 'react';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    // Sample announcements data (replace with your actual data)
    {
      id: '1',
      title: 'Exciting News!',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida ex at nunc consequat, non blandit urna accumsan.',
      date: '2024-02-10',
    },
    {
      id: '2',
      title: 'Important Update',
      content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed sit amet sapien vel arcu rhoncus scelerisque.',
      date: '2024-02-08',
    },
    // Add more announcements as needed
  ]);

  const [selectedAnnouncement, setSelectedAnnouncement] = useState({});

  const handleViewAnnouncement = (announcementId) => {
    const announcement = announcements.find((a) => a.id === announcementId);
    setSelectedAnnouncement(announcement);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Announcements</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Announcements List */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Latest Announcements</h2>
          <ul className="space-y-4">
            {announcements.map((announcement) => (
              <li key={announcement.id} className="cursor-pointer">
                <div
                  onClick={() => handleViewAnnouncement(announcement.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {announcement.title}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Announcement Details */}
        <div className="col-span-1">
          <h2 className="text-xl font-bold mb-4">Announcement Details</h2>
          {selectedAnnouncement.id && (
            <div className="p-4 border rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <h3 className="text-lg font-bold mb-2">{selectedAnnouncement.title}</h3>
              <p className="text-sm mb-2">{selectedAnnouncement.date}</p>
              <p>{selectedAnnouncement.content}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
