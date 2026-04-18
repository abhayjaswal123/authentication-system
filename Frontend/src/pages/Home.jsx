import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();


  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0f172a] text-white relative overflow-hidden pb-5">
    {loading && (
    <div className="min-h-screen flex items-center justify-center text-white">
      Loading...
    </div>
)}

      {/* Floating background effects */}
      <div className="absolute w-72 h-72 bg-[#FF6B01] rounded-full blur-3xl opacity-20 top-20 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-[#38bdf8] rounded-full blur-3xl opacity-20 bottom-10 right-10 animate-pulse"></div>

      {/* Navbar */}
      {!loading &&(
        <Navbar/>     
      )}


      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 mt-28 relative z-10">

        {user ? (
          <>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 mt-5">
              Welcome back, <br />
              <span className="text-[#38bdf8]">{user.username}</span>
            </h1>

            <p className="max-w-2xl text-white/70 text-lg md:text-xl mb-10">
              You're already authenticated. You can now access protected features
              and explore the system.
            </p>

          </>
        ) : (
          <>
            {/* 🔐 Guest UI */}
            <div className="px-4 py-1 mt-6 mb-6 border border-white/20 rounded-full text-sm text-white/70 backdrop-blur-md">
              🔐 Secure • Fast • Scalable Authentication
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Secure Authentication <br />
              <span className="text-[#FF6B01]">System</span>
            </h1>

            <p className="max-w-2xl text-white/70 text-lg md:text-xl mb-10">
              JWT-based authentication with protected routes, refresh tokens,
              and modern UI experience. Built for real-world applications.
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={() => navigate("/register")}
                className="bg-[#FF6B01] text-white px-8 py-3 rounded-xl text-lg font-semibold
                hover:scale-105 transition duration-300 cursor-pointer shadow-lg hover:shadow-[#FF6B01]/40"
              >
                Get Started
              </button>
            </div>
          </>
        )}

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full">

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">
              {user ? "🔓 Access Granted" : "🔐 Secure Login"}
            </h3>
            <p className="text-white/60 text-sm">
              {user
                ? "You have full access to authenticated routes."
                : "JWT authentication with access & refresh tokens."}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast Access</h3>
            <p className="text-white/60 text-sm">
              {user
                ? "Seamless experience with active session."
                : "Protected routes with automatic session handling."}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">🚀 Scalable</h3>
            <p className="text-white/60 text-sm">
              Built for real-world production applications.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;