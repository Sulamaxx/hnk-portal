// EmployeeSection.js

import Link from 'next/link';

const EmployeeLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Employee Section</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Navigation Links */}
        <div className="col-span-1">
          <ul className="space-y-4">
            <li>
              <Link href="/project-management"className="text-blue-500 hover:underline">
               Project Management
              </Link>
            </li>
            <li>
              <Link href="/knowledge-search"className="text-blue-500 hover:underline">
               Knowledge Search
              </Link>
            </li>
            <li>
              <Link href="/employee-biographies"className="text-blue-500 hover:underline">
              Employee Biographies
              </Link>
            </li>
            <li>
              <Link href="/credential-packages"className="text-blue-500 hover:underline">
              Credential Packages
              </Link>
            </li>
            <li>
              <Link href="/announcements"className="text-blue-500 hover:underline">
               Announcements
              </Link>
            </li>
          </ul>
        </div>

        {/* Content Section */}
        <div className="col-span-1">
          {/* Content for each section can be added here */}
          <p className="text-gray-700">
            Welcome to the Employee Section! Use the navigation links to explore different areas.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;
