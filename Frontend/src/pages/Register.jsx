import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import { register } from "../api/api.axios";

const Register = () => {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setError("");
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must be at least 6 characters and include uppercase, lowercase, number & special character"
      );
      return;
    };

    setLoading(true)
    try {
      const res = await register(form);

      if (res?.otpSent) {
        navigate('/verify-otp', {
          state: { email: form.email }
        });
      } else {
        setError(res?.message || "Something went wrong");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-full bg-[#0f172a] text-white relative flex flex-col items-center overflow-hidden">

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#38bdf8]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FF6B01]/10 rounded-full blur-[120px] animate-pulse"></div>


      <div className="relative z-10 w-full max-w-md px-6 pt-13 pb-6 flex flex-col justify-center flex-1">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 text-white/40 hover:text-white transition-all duration-300 mb-4 ml-1 cursor-pointer w-fit"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FF6B01]/50 group-hover:bg-[#FF6B01]/10 transition-all">
            <span className="text-lg group-hover:-translate-x-0.5 transition-transform">←</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Back</span>
        </button>
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">

          {error && (
            <p className="text-red-400 text-sm text-center mb-4">
              {error}
            </p>
          )}

          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight mb-1">Create Account</h2>
            <p className="text-white/50 text-sm">Join AuthSys and start building</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4">
            {/* Full Name Field */}
            <div className="group">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1.5 ml-1 group-focus-within:text-[#FF6B01] transition">
                Full Name
              </label>
              <input
                name="username"
                onChange={handleChange}
                value={form.username}
                type="text"
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#FF6B01]/50 focus:ring-2 focus:ring-[#FF6B01]/10 transition-all duration-300 placeholder:text-white/10 text-sm"
              />
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1.5 ml-1 group-focus-within:text-[#FF6B01] transition">
                Email Address
              </label>
              <input
                value={form.email}
                type="email"
                onChange={handleChange}
                name="email"
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#FF6B01]/50 focus:ring-2 focus:ring-[#FF6B01]/10 transition-all duration-300 placeholder:text-white/10 text-sm"
              />
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-1.5 ml-1 group-focus-within:text-[#FF6B01] transition">
                Password
              </label>
              <input
                type="password"
                onChange={handleChange}
                value={form.password}
                name="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#FF6B01]/50 focus:ring-2 focus:ring-[#FF6B01]/10 transition-all duration-300 placeholder:text-white/10 text-sm"
              />
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-[#FF6B01] hover:bg-[#ff8533] text-white font-bold py-3.5 rounded-xl shadow-[0_10px_20px_rgba(255,107,1,0.2)] transform transition-all active:scale-95 duration-300 mt-2"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-white/40">
            Already have an account?{" "}
            <Link to="/login" className="text-[#FF6B01] hover:text-white transition font-bold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;