import React from "react";
import { 
  Phone, Mail, MapPin, Clock, Twitter, Facebook, Linkedin, 
  GraduationCap, PenTool, Send, User, ChevronDown, BookOpen, MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-24 pb-56 text-center overflow-hidden bg-gradient-to-br from-[#0b2b4f] to-[#124d9c]">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 md:left-32 grid grid-cols-3 gap-2 opacity-20">
            {[...Array(9)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>)}
        </div>
        <div className="absolute bottom-40 right-10 md:right-32 grid grid-cols-3 gap-2 opacity-20">
            {[...Array(9)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white"></div>)}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-[58px] font-display font-black tracking-tight mb-4 text-white"
          >
            Contact <span className="text-blue-300">Us</span>
          </motion.h1>

          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-blue-500 mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-blue-50/80 text-[15px] md:text-[17px] font-medium leading-relaxed max-w-xl mx-auto"
          >
            Empowering education through transparent communication.<br className="hidden md:block" />
            Get in touch for institutional support, textbook inquiries, or corporate assistance.
          </motion.p>
        </div>

        {/* CSS Wave Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg className="relative block w-full h-[60px] md:h-[120px]" preserveAspectRatio="none" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M0 0C480 130 960 130 1440 0V100H0V0Z" fill="#FAFAFA" />
          </svg>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 z-20 -mt-44 pb-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Central Card */}
          <div className="bg-white rounded-[32px] shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] border border-slate-100 p-8 md:p-14 mb-8">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              
              {/* LEFT SIDE - Info */}
              <div className="lg:w-[45%] flex flex-col">
                <div className="mb-10">
                   
                    <h2 className="text-2xl md:text-[28px] font-black text-slate-900 leading-tight mb-4">
                        Committed to <br />
                        <span className="text-blue-600">Educational Success</span>
                    </h2>
                    <p className="text-[14.5px] text-slate-500 font-medium leading-relaxed">
                        We're here to support every student, teacher, and school across Bihar. Our dedicated helpdesk ensures your queries never go unanswered.
                    </p>
                </div>

                <div className="space-y-8 flex-grow">
                  <InfoItem icon={<MapPin className="w-5 h-5" />} title="Registered Office">
                    Pathya Pustak Bhawan, Buddh Marg, Budh Vihar, Fraser Road Area, Patna - 800001<br />
                    Bihar, India
                  </InfoItem>

                  <InfoItem icon={<Mail className="w-5 h-5" />} title="Email Id">
                    textbookmd@gmail.com
                  </InfoItem>

                  <InfoItem icon={<Phone className="w-5 h-5" />} title="Phone Number">
                    06122221975
                  </InfoItem>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-blue-600 shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-black text-slate-900 mb-1">Service Hours</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[13px] text-slate-500 font-medium italic">Monday to Saturday</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold tracking-wide">10 AM — 5 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                
              </div>

              {/* RIGHT SIDE - Form Card */}
              <div className="lg:w-[55%]">
                <div className="bg-[#FAFAFA] rounded-[32px] p-8 md:p-10 border border-slate-100">
                    <div className="flex items-center gap-4 mb-2">
                        
                        <div>
                            <h3 className="text-xl font-black text-slate-900">Quick Query Form</h3>
                            <p className="text-[13px] text-slate-500 font-medium">We'll get back to you as soon as possible.</p>
                        </div>
                    </div>

                    <form className="mt-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-[12px] font-black text-slate-700">Your Name <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input 
                                        type="text" 
                                        placeholder="e.g. S. Kumar" 
                                        className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-slate-200 bg-white text-[14px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                                    />
                                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                                </div>
                            </div>
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-[12px] font-black text-slate-700">Email Address <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input 
                                        type="email" 
                                        placeholder="example@mail.com" 
                                        className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-slate-200 bg-white text-[14px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                                    />
                                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Dropdown */}
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-700">Inquiry Purpose <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-slate-200 bg-white text-[14px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer">
                                    <option>General Support</option>
                                    <option>Textbook Inquiries</option>
                                    <option>Corporate Assistance</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Textarea */}
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-700">Your Message <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <textarea 
                                    rows="5"
                                    placeholder="Briefly describe your inquiry..." 
                                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white text-[14px] font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none placeholder:text-slate-400"
                                ></textarea>
                                <div className="absolute bottom-3 right-4 text-[10px] font-bold text-slate-400">0 / 500</div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button 
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-[14px] flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-700/20"
                        >
                            <Send className="w-4 h-4" />
                            Send Message
                        </motion.button>
                    </form>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </section>
    </div>
  );
};

export default Contact;

/* ================= HELPER COMPONENTS ================= */

const InfoItem = ({ icon, title, children }) => (
  <div className="flex items-start gap-5">
    <div className="w-12 h-12 rounded-2xl bg-[#EEF5FF] flex items-center justify-center text-blue-600 shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-[15px] font-black text-slate-900 mb-1">{title}</h4>
      <p className="text-[13px] text-slate-500 leading-relaxed font-medium">{children}</p>
    </div>
  </div>
);
