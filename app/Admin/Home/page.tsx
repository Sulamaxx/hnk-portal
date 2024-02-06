import React from "react";
import AdminLayout from "../AdminLayout";

const AdminHome = () => {
  return (
    <div className="h-screen">
      <AdminLayout>
        <div className="flex justify-center mt-40">
          <h1 className="font-medium ">Welcome to Admin Home Page</h1>
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminHome;
