"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const goToLogin = () => {
  const router = useRouter();
  
  const goToLoginpage = function () {
    router.push("/login");
  };

  return (
    <div className="container  bg-white ">
      <button onClick={goToLoginpage}>Cookie name</button>
    </div>
  );
};

export default goToLogin;
