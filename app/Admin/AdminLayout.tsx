import React from "react";
import Link from "next/link";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link
              className="text-white hover:text-gray-300"
              href="UserManagement"
            >
              User Management
            </Link>
          </li>
          <li>
            <Link
              href="ClientProfileManagement"
              className="text-white hover:text-gray-300"
            >
              Client Profile Management
            </Link>
          </li>
          <li>
            <Link
              href="EmployeeGroupManagement"
              className="text-white hover:text-gray-300"
            >
              Employee Group Management
            </Link>
          </li>
          <li>
            <Link
              className="text-white hover:text-gray-300"
              href="AnnouncementManagement"
            >
              Announcement Management
            </Link>
          </li>
          <li>
            <Link
              href="ProjectManagement"
              className="text-white hover:text-gray-300"
            >
              Project Management
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
