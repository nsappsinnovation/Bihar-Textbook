import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../services/authService";
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheck, FiAlertCircle } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Backend sets the HttpOnly JWT cookie on success
      await login(email, password);

      setLoginSuccess(true);
      toast.success("Login Successful! Redirecting to Admin Portal.");

      // Navigate after success message displays
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error) {
      const message = error.response
        ? error.response.data?.message || "Invalid email or password"
        : "Unable to reach the server. Please try again later.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-8 relative overflow-hidden font-sans">
      
      {/* ================= BACKGROUND ANIMATIONS ================= */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      
      {/* ================= MAIN CARD ================= */}
      <div className="w-full max-w-5xl bg-white/85 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 border border-white/20">

        {/* ================= LEFT ILLUSTRATION ================= */}
        <div className="hidden md:flex flex-col items-center justify-center bg-indigo-600/5 p-10 lg:p-16 border-r border-gray-100/80">
          <img loading="lazy" decoding="async"
            src="https://illustrations.popsy.co/blue/studying.svg"
            alt="Studying Illustration"
            className="max-w-xs lg:max-w-sm drop-shadow-2xl animate-pulse-slow"
          />
          <div className="mt-8 text-center px-4">
            <h3 className="text-xl font-bold text-indigo-950 flex items-center justify-center gap-2">
              <span>Bihar Digital Library</span>
            </h3>
            <p className="text-gray-500 text-sm mt-2 max-w-[280px] mx-auto">
              बिहार राज्य पाठ्यपुस्तक प्रकाशन निगम लिमिटेड में आपका स्वागत है।
            </p>
           
          </div>
        </div>

        {/* ================= RIGHT LOGIN FORM ================= */}
        <div className="flex flex-col justify-center p-8 lg:p-14 max-h-[90vh]">
          {/* Logo & Welcome Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-indigo-50/50 rounded-3xl border border-indigo-100/30 mb-4 shadow-sm">
              <img loading="lazy" decoding="async" src="/logo.webp" alt="BSTBPCL Logo" className="h-12 w-auto object-contain" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-950 tracking-tight">
              Admin Portal Access
            </h2>
            <p className="text-gray-400 text-xs font-semibold mt-2 tracking-wider uppercase">
              Sign in to manage textbook records
            </p>
          </div>

          {/* SUCCESS STATE BANNER */}
          {loginSuccess && (
            <div className="bg-emerald-50/80 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 mb-6 animate-pop backdrop-blur-md">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
                <FiCheck className="text-lg" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-950">Access Authorized</h4>
                <p className="text-xs text-emerald-600 font-medium mt-0.5">Redirecting to administrator console...</p>
              </div>
            </div>
          )}

          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Address Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
                Email Address
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <FiMail size={18} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  placeholder="name@example.com"
                  className={`w-full pl-11 pr-4 py-4 rounded-2xl border ${
                    errors.email 
                      ? "border-red-400 focus:ring-red-100 focus:border-red-500" 
                      : "border-slate-200/80 bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:ring-indigo-100/50"
                  } focus:outline-none focus:ring-4 transition-all duration-350 font-medium text-slate-700 placeholder:text-slate-400 text-sm`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs font-bold flex items-center gap-1.5 ml-1 animate-pop">
                  <FiAlertCircle /> {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  Password
                </label>
              </div>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <FiLock size={18} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-11 py-4 rounded-2xl border ${
                    errors.password 
                      ? "border-red-400 focus:ring-red-100 focus:border-red-500" 
                      : "border-slate-200/80 bg-slate-50/50 focus:bg-white focus:border-indigo-600 focus:ring-indigo-100/50"
                  } focus:outline-none focus:ring-4 transition-all duration-350 font-medium text-slate-700 placeholder:text-slate-400 text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs font-bold flex items-center gap-1.5 ml-1 animate-pop">
                  <FiAlertCircle /> {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me checkbox */}
            <div className="flex items-center justify-between px-1 py-1">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4.5 h-4.5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 transition-colors cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 group-hover:text-slate-600 font-bold tracking-wider transition-colors">
                  KEEP ME SIGNED IN
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || loginSuccess}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-950 hover:from-indigo-900 hover:to-indigo-800 text-white font-bold text-sm tracking-wide shadow-[0_12px_25px_-8px_rgba(49,46,129,0.35)] hover:shadow-[0_20px_35px_-8px_rgba(49,46,129,0.45)] hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 disabled:opacity-50 disabled:-translate-y-0 cursor-pointer mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : loginSuccess ? (
                <>
                  <FiCheck className="text-lg animate-bounce" />
                  <span>Verified</span>
                </>
              ) : (
                <span>Access Admin Portal</span>
              )}
            </button>


          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
