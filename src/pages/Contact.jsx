import React from "react";
import { FiPhone, FiMail, FiMapPin, FiSend, FiClock, FiCheckCircle, FiTwitter, FiFacebook, FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-[#0d0e23] pt-32 pb-24 text-center overflow-hidden">
        {/* Soft Gradient Fade Background - STEP 1 & 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[linear-gradient(135deg,#0f172a_0%,#1e3a8a_60%,#f1f5f9_100%)] opacity-100" 
        />
        
        {/* Soft radial light effect behind heading - STEP 3 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold text-[#f8fafc] tracking-tight mb-6"
          >
            Contact <span className="text-blue-500">Us</span>
          </motion.h1>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-8 shadow-[0_0_20px_rgba(37,99,235,0.6)]" 
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[#cbd5e1] max-w-xl mx-auto text-xs md:text-sm font-light leading-relaxed"
          >
            Empowering education through transparent communication. Get in touch for institutional support, textbook inquiries, or corporate assistance.
          </motion.p>
        </div>
      </section>

      {/* ================= MAIN CONTENT (Overlapping Card) - STEP 6 ================= */}
      <section className="relative px-6 pb-24 z-20 -mt-12">
        <div className="max-w-5xl mx-auto">
          <div 
            className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(30,64,175,0.15)] border border-white/50 p-4 md:p-10 relative overflow-hidden"
          >
            {/* Government Watermark (Bihar Emblem Concept) - STEP 4 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none w-[600px] select-none">
               <img src="/bstbpc_logo.png" alt="watermark" className="w-full grayscale" />
            </div>

            <div className="flex flex-col lg:flex-row gap-16 items-start relative z-10">
              {/* LEFT SIDE - Info & Visual Balance - STEP 4 */}
              <div className="lg:w-1/2 space-y-12">
                <div>
                  <h2 className="text-xl md:text-2xl font-black text-[#0f172a] leading-[1.1] mb-4 tracking-tight">
                    Committed to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500">
                      Educational Success.
                    </span>
                  </h2>

                  <p className="text-slate-500 text-xs leading-relaxed max-w-md font-medium">
                    We're here to support every student, teacher, and school across Bihar. Our dedicated helpdesk ensures your queries never go unanswered.
                  </p>
                </div>

                <div className="grid gap-10">
                  <InfoItem icon={<FiMapPin />} title="Visit Our Campus">
                    Bihar State Text Book Publishing Corporation Ltd.
                    <br />
                    Budh Marg, Patna, Bihar - 800001
                  </InfoItem>

                  <div className="flex flex-col md:flex-row gap-10">
                    <InfoItem icon={<FiMail />} title="Email Support">
                      textbookmd@gmail.com
                    </InfoItem>

                    <a href="tel:+916122221975" className="no-underline group">
                      <InfoItem icon={<FiPhone />} title="Office Hotline">
                        +91 612 222 1975
                      </InfoItem>
                    </a>
                  </div>
                </div>

                {/* Operating Info Widget - Visual Balance - STEP 4 */}
                <div className="pt-10 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                      <FiClock className="text-xl" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-[#0f172a]">Public Service Hours</h5>
                      <p className="text-xs text-slate-500 font-medium italic">Monday to Saturday | 10 AM — 5 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                       <SocialIcon icon={<FiTwitter />} />
                       <SocialIcon icon={<FiFacebook />} />
                       <SocialIcon icon={<FiLinkedin />} />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - Premium Form - STEP 2 & 5 */}
              <div className="lg:w-1/2 w-full lg:sticky lg:top-12">
                <div className="bg-[#f8fafc] p-8 md:p-12 rounded-[2.5rem] border border-slate-200/40 shadow-inner relative overflow-hidden group">
                  {/* Form Glow Effect - STEP 2 */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
                  
                  <h3 className="text-xl font-black text-[#0f172a] mb-8 flex items-center gap-4">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full" />
                    Quick Query Form
                  </h3>

                  <form className="space-y-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                      <Input label="Your Name" placeholder="e.g. S. Kumar" />
                      <Input
                        label="Email Address"
                        placeholder="example@mail.com"
                        type="email"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Inquiry Purpose</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-xs text-slate-700 font-medium shadow-sm appearance-none">
                         <option>General Support</option>
                         <option>Textbook Distribution</option>
                         <option>Academic Content</option>
                         <option>Tenders & Procurement</option>
                      </select>
                    </div>

                    <Textarea label="Your Message" />

                    <motion.button 
                      whileHover={{ scale: 1.02, translateY: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 rounded-xl font-black text-white bg-[#0d0e23] hover:bg-blue-700 shadow-[0_20px_40px_rgba(13,14,35,0.25)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center gap-4 text-[11px] uppercase tracking-widest"
                    >
                      <FiSend className="text-base" />
                      Dispatch Message
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Bottom Bar */}
      <div className="w-full h-1.5 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 opacity-20" />
    </div>
  );
};

export default Contact;

/* ================= HELPER COMPONENTS ================= */

const InfoItem = ({ icon, title, children }) => (
  <div className="flex items-start gap-6 group">
    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 shadow-[0_10px_20px_rgba(0,0,0,0.05)] flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110 duration-500 rotate-2 group-hover:rotate-0">
      <span className="text-xl">{icon}</span>
    </div>
    <div>
      <h4 className="text-sm font-black text-[#0f172a] mb-1">{title}</h4>
      <p className="text-slate-500 text-xs leading-relaxed font-medium">{children}</p>
    </div>
  </div>
);

const Input = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-xs text-slate-700 font-medium placeholder:text-slate-200 shadow-sm"
    />
  </div>
);

const Textarea = ({ label }) => (
  <div className="space-y-3">
    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <textarea
      rows="4"
      placeholder="Briefly describe your inquiry..."
      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 outline-none transition-all text-xs text-slate-700 font-medium placeholder:text-slate-200 shadow-sm resize-none"
    />
  </div>
);

const SocialIcon = ({ icon }) => (
  <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:shadow-lg transition-all cursor-pointer">
    {icon}
  </div>
);
