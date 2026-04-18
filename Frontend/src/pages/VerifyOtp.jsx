import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../api/api.axios";
import { AuthContext } from "../context/AuthContext";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) navigate("/login");
  }, [email, navigate]);

  const [error, setError] = useState("");
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

      const res = await verifyOtp({ email, otp: finalOtp });
      login(res);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-white relative flex flex-col items-center px-4 py-10 overflow-hidden">

      {/* Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#38bdf8]/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#FF6B01]/10 rounded-full blur-[120px] animate-pulse"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/login")}
        className="absolute top-6 left-4 md:top-10 md:left-10 flex items-center gap-2 text-white/40 hover:text-white transition"
      >
        <span className="text-xl">←</span>
        <span className="text-xs font-bold uppercase tracking-widest">Back</span>
      </button>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md mt-16 md:mt-24 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-[#FF6B01]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-[#FF6B01]/20 rotate-6">
            <span className="text-2xl -rotate-6">🔒</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black">Two-Step Verification</h2>
          <p className="text-white/40 text-xs md:text-sm mt-2">
            Enter the 6-digit code sent to your device.
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">

          {/* OTP Inputs (mobile-safe grid) */}
          <div className="grid grid-cols-6 gap-2 md:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-full h-12 md:h-16 bg-white/[0.03] border border-white/10 rounded-lg md:rounded-xl text-center text-lg md:text-xl font-black outline-none focus:border-[#FF6B01]/60 focus:bg-[#FF6B01]/5 transition"
              />
            ))}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#FF6B01] hover:bg-[#ff8533] text-white font-black py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg transition active:scale-95"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;