import React, { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUp = () => {
  const [role, setRole] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate server response
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Registration Successful! Please log in.");
      navigate("/login");
    }, 1500);
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
          <img loading="lazy" decoding="async"
            src="https://illustrations.popsy.co/blue/work-from-home.svg"
            alt="Collab Illustration"
            className="max-w-xs lg:max-w-sm drop-shadow-2xl animate-pulse-slow"
          />
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-indigo-900">Admin Portal Setup</h3>
            <p className="text-gray-500 text-sm mt-2 max-w-[280px]">Register a new Administrator account to manage publication databases, textbooks, tenders, and schools.</p>
          </div>
        </div>

        {/* ================= RIGHT SIGNUP FORM ================= */}
        <div className="flex flex-col max-h-[90vh]">
          
          {/* ===== FIXED HEADER ===== */}
          <div className="p-8 pb-4 text-center">
            <img loading="lazy" decoding="async" src="/logo.webp" alt="Logo" className="h-10 mx-auto mb-4" />
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Admin Registration</h2>
            <p className="text-gray-400 text-xs font-semibold mt-1 tracking-wider uppercase">Create a new administrator profile</p>
          </div>

          {/* ===== SCROLLABLE CONTENT ===== */}
          <div className="flex-1 overflow-y-auto px-8 lg:px-14 pb-10 custom-scrollbar">

            {/* ===== FORM ===== */}
            <form className="space-y-4" onSubmit={handleRegister}>
              <Input icon={<FiUser />} label="Full Name" placeholder="e.g. Anushka Nandan" />
              <Input icon={<FiMail />} label="Email Address" placeholder="name@example.com" />

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Password</label>
                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-50 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">Confirm Password</label>
                <div className="relative group">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-50 transition-colors" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-gray-50/30 font-medium text-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-base shadow-[0_10px_30px_-10px_rgba(49,46,129,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(49,46,129,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Registering...</span>
                  </>
                ) : (
                  "Register as Admin"
                )}
              </button>

              <div className="text-center text-xs text-gray-500 font-bold tracking-wide mt-6">
                ALREADY HAVE AN ACCOUNT?{" "}
                <Link to="/login" className="text-indigo-600 hover:text-indigo-800 transition-all ml-1 border-b-2 border-indigo-100 hover:border-indigo-600 pb-0.5">
                  LOG IN
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

/* ===== INPUT COMPONENT ===== */
const Input = ({ icon, label, placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] ml-1">{label}</label>
    <div className="relative group">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-50 text-indigo-500 transition-colors">
        {icon}
      </span>
      <input
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all bg-gray-50/30 font-medium text-gray-700"
      />
    </div>
  </div>
);
