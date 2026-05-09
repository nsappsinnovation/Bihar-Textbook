import React, { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "admin") {
      // Simulate login success and redirect to admin dashboard
      navigate("/admin");
    } else {
      // Logic for regular user login
      console.log("Logging in as user:", { email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-8 relative overflow-hidden">
      
      {/* ================= BACKGROUND ANIMATIONS ================= */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      
      {/* ================= MAIN CARD ================= */}
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 border border-white/20">

        {/* ================= LEFT ILLUSTRATION ================= */}
        <div className="hidden md:flex flex-col items-center justify-center bg-indigo-600/5 p-10 lg:p-16 border-r border-gray-100">
          <img
            src="https://illustrations.popsy.co/blue/studying.svg"
            alt="Studying Illustration"
            className="max-w-xs lg:max-w-sm drop-shadow-2xl animate-pulse-slow"
          />
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-indigo-900">Digital Library Access</h3>
            <p className="text-gray-500 text-sm mt-2 max-w-[250px]">बिहार राज्य पाठ्यपुस्तक प्रकाशन निगम लिमिटेड में आपका स्वागत है।</p>
          </div>
        </div>

        {/* ================= RIGHT LOGIN FORM ================= */}
        <div className="p-8 lg:p-14 flex flex-col justify-center max-h-[90vh] overflow-y-auto custom-scrollbar">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="BSTBPC Logo" className="h-12 w-auto" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-1 font-medium">Please enter your details to sign in</p>
          </div>

          {/* Role Toggle */}
          <div className="flex justify-center p-1 bg-gray-100/80 rounded-2xl mb-8 w-fit mx-auto border border-gray-200">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`px-8 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300
                ${role === "user" ? "bg-white text-indigo-700 shadow-md scale-[1.02]" : "text-gray-500 hover:text-gray-700"}`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`px-8 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300
                ${role === "admin" ? "bg-white text-indigo-700 shadow-md scale-[1.02]" : "text-gray-500 hover:text-gray-700"}`}
            >
              Admin
            </button>
          </div>

          {/* ================= FORM ================= */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Account ID / Email</label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-gray-50/30 font-medium text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Secret Password</label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-gray-50/30 font-medium text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              <div className="flex justify-end pr-1">
                <a href="#" className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors underline decoration-indigo-200 underline-offset-4">Forgot ID or Password?</a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-base shadow-[0_10px_30px_-10px_rgba(49,46,129,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(49,46,129,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] mt-2"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-xs text-gray-500 font-bold tracking-wide">
            DO NOT HAVE AN ACCOUNT?{" "}
            <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 transition-all ml-1 border-b-2 border-indigo-100 hover:border-indigo-600 pb-0.5">
              REGISTER HERE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
