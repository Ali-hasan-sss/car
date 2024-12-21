"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const AdminLogin: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/login", {
        email,
        password,
      });
      localStorage.setItem("adminToken", response.data.token);
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="w-full items-center justify-between flex h-[100vh] bg-secondary1">
      <div className=" hidden md:block md:w-1/2 w-full min-h-screen  bg_image"></div>
      <div className="flex flex-col items-center md:w-1/2 w-full justify-center min-h-screen">
        <h1 className="text-3xl mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col w-[300px] gap-4">
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 text-xl w-full border rounded"
          />
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 text-xl w-full border rounded"
          />
          <button
            type="submit"
            className="p-2 bg-primary1 hover:bg-blue-700 text-white rounded"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
