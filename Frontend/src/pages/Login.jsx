import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginUser } from "../api/api.axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setError("")
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser(form);
      login(res);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white relative flex flex-col items-center overflow-hidden">

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FF6B01]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#38bdf8]/10 rounded-full blur-[120px]"></div>


      {/* Main Container: 
          Added 'pt-32' (Padding Top) to push the card down below the fixed Navbar 
      */}
      <div className="relative z-10 w-full max-w-md px-6 pt-15 pb-12 flex flex-col justify-center min-h-screen">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 text-white/40 hover:text-white transition-all duration-300 mb-4 ml-1 cursor-pointer w-fit"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FF6B01]/50 group-hover:bg-[#FF6B01]/10 transition-all">
            <span className="text-lg group-hover:-translate-x-0.5 transition-transform">←</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Back</span>
        </button>
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl">
          {error && (
            <p className="text-red-400 text-sm text-center mb-4">
              {error}
            </p>
          )}

          {/* Header */}
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Welcome Back</h2>
            <p className="text-white/50 text-sm">Enter your details to continue</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6">
            {/* Email Field */}
            <div className="group">
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2 ml-1 group-focus-within:text-[#FF6B01] transition">
                Email Address
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={form.email}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#FF6B01]/50 focus:ring-2 focus:ring-[#FF6B01]/20 transition-all duration-300 placeholder:text-white/20"
              />
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-xs font-semibold uppercase tracking-widest text-white/40 mb-2 ml-1 group-focus-within:text-[#FF6B01] transition">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-[#FF6B01]/50 focus:ring-2 focus:ring-[#FF6B01]/20 transition-all duration-300 placeholder:text-white/20"
              />
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-[#FF6B01] hover:bg-[#ff8533] text-white font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(255,107,1,0.2)] hover:shadow-[0_10px_25px_rgba(255,107,1,0.4)] transform transition-all active:scale-95 duration-300"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-white/40">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#FF6B01] hover:text-white transition font-medium">
              Join now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;