"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container  bg-white ">
      <h1 className="text-2xl font-bold mb-16">Login Page</h1>
      <div className="mb-10 md:w-1/3">
        <label
          htmlFor="username"
          className="block text-sm  text-gray-700 font-semibold"
        >
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-10 md:w-1/3">
        <label
          htmlFor="password"
          className="block text-sm  text-gray-700 font-semibold"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <button
        type="button"
        className="bg-blue-500 text-white px-20 py-2 rounded-md"
      >
        Login
      </button>
    </div>
  );
};

export default Login;

