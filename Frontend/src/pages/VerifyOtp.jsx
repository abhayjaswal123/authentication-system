import React, { useContext, useRef, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../api/api.axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
  if (!email) {
    navigate("/login");
  }
}, [email, navigate]);

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(0, 1);
    const updatedOtp = [...otp];
    updatedOtp[index] = digit;
    setOtp(updatedOtp);

    if (digit && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const res = await verifyOtp({
        email,
        otp: finalOtp
      })
      login(res)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen w-full bg-[#0f172a] text-white relative flex flex-col items-center overflow-hidden">

      {error && (
        <p className="text-red-400 text-sm text-center mb-4">
          {error}
        </p>
      )}

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#38bdf8]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FF6B01]/10 rounded-full blur-[120px] animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col justify-center flex-1">

        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="absolute top-28 left-6 group flex items-center gap-2 text-white/40 hover:text-white transition-all duration-300 cursor-pointer w-fit"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#FF6B01]/50 group-hover:bg-[#FF6B01]/10 transition-all">
            <span className="text-lg group-hover:-translate-x-0.5 transition-transform">←</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Back</span>
        </button>

        {/* The Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl mt-12">

          {/* Header */}
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-[#FF6B01]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#FF6B01]/20 rotate-6">
              <span className="text-2xl -rotate-6">🔒</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight mb-3">Two-Step Verification</h2>
            <p className="text-white/40 text-sm font-medium">Enter the 6-digit code sent to your device.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-8">
            {/* 6 OTP Input Fields: Reduced width (w-11 or w-12) to fit 6 in a row */}
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-11 h-14 md:w-12 md:h-16 bg-white/[0.03] border border-white/10 rounded-xl text-center text-xl font-black outline-none focus:border-[#FF6B01]/60 focus:bg-[#FF6B01]/5 transition-all duration-300"
                />
              ))}
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="w-full cursor-pointer bg-[#FF6B01] hover:bg-[#ff8533] text-white font-black py-4 rounded-2xl shadow-[0_20px_40px_rgba(255,107,1,0.2)] hover:shadow-[0_20px_40px_rgba(255,107,1,0.4)] transform transition-all active:scale-[0.97] duration-300"
            >
              {loading ? "Verifying...." : "Verify OTP"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;