"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const goToLogin = () => {
  const router = useRouter();
  
  const goToLoginpage = function () {
    router.push("/login");
  };

  return (
    <div className="container mx-auto bg-white p-8 text-center">
  <h1 className="text-3xl font-bold mb-4">Welcome</h1>
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    onClick={goToLoginpage}
  >
    Go To the Login page
  </button>
</div>
  );
};

export default goToLogin;
