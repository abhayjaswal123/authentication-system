import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logout as logoutUser } from "../api/api.axios";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      logout();
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 px-5 md:px-8 py-4 rounded-2xl flex items-center justify-between shadow-2xl">

        {/* Logo */}
        <Link to="/" className="group">
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter flex items-center gap-2">
            <span className="bg-[#FF6B01] p-1.5 rounded-lg shadow-[0_0_15px_rgba(255,107,1,0.5)]">
              🔐
            </span>
            Auth<span className="text-[#FF6B01]">Sys</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-semibold uppercase tracking-widest transition hover:text-[#FF6B01] ${
              isActive("/") ? "text-[#FF6B01]" : "text-white/70"
            }`}
          >
            Home
          </Link>

          <div className="h-4 w-[1px] bg-white/20"></div>

          {user ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl bg-[#FF6B01] font-bold text-white hover:scale-105 transition"
            >
              Logout →
            </button>
          ) : (
            <Link to="/login">
              <button className="px-6 py-2 rounded-xl bg-[#FF6B01] font-bold text-white hover:scale-105 transition">
                Login →
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-20 left-1/2 -translate-x-1/2 w-[92%] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-5 text-center">

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`text-sm font-semibold uppercase tracking-widest ${
              isActive("/") ? "text-[#FF6B01]" : "text-white/70"
            }`}
          >
            Home
          </Link>

          <div className="h-[1px] bg-white/10"></div>

          {user ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl bg-[#FF6B01] font-bold text-white"
            >
              Logout →
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="px-6 py-2 rounded-xl bg-[#FF6B01] font-bold text-white">
                Login →
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;