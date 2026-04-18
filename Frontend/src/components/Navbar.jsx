import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { logout as logoutUser } from "../api/api.axios";

const Navbar = () => {
  const location = useLocation();
  const { user, logout,loading } = useContext(AuthContext);
  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      // Always clear local auth state even if server logout fails.
      console.error("Logout failed:", err);
    } finally {
      logout();
    }
  };

return (
  <>
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-2xl flex items-center justify-between shadow-2xl">
        
        {/* Logo */}
        <Link to="/" className="group">
          <h1 className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
            <span className="bg-[#FF6B01] p-1.5 rounded-lg shadow-[0_0_15px_rgba(255,107,1,0.5)]">
              🔐
            </span>
            Auth<span className="text-[#FF6B01] group-hover:text-white transition">Sys</span>
          </h1>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:text-[#FF6B01] ${
              isActive("/") ? "text-[#FF6B01]" : "text-white/70"
            }`}
          >
            Home
          </Link>

          <div className="h-4 w-[1px] bg-white/20"></div>

          {user ? (
            <button
              onClick={handleLogout}
              className="relative cursor-pointer group px-6 py-2 overflow-hidden rounded-xl bg-transparent font-bold text-white transition-all"
            >
              <span className="absolute inset-0 bg-[#FF6B01] transition-all duration-300 group-hover:scale-105"></span>
              <span className="relative z-10 flex items-center gap-2">
                Logout →
              </span>
            </button>
          ) : (
            <Link to="/login">
              <button className="relative cursor-pointer group px-6 py-2 overflow-hidden rounded-xl bg-transparent font-bold text-white transition-all">
                <span className="absolute inset-0 bg-[#FF6B01] transition-all duration-300 group-hover:scale-105"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Login →
                </span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  </>
)};

export default Navbar;