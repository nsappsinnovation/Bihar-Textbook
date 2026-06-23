import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ChevronRight, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#0a0f1c] to-[#060913] text-white/70 pt-16 pb-8 px-6 md:px-12 font-sans border-t border-white/5 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* BRAND & LOGOS */}
          <div className="flex flex-col">
            <Link to="/" className="inline-block mb-6 group">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl blur opacity-50 group-hover:opacity-80 transition-opacity"></div>
                  <img
                    src="/bstbpc_logo.png"
                    alt="BSTBPC Logo"
                    className="relative h-14 w-auto object-contain bg-white/10 rounded-xl p-1.5 border border-white/20 backdrop-blur-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">BSTBPC</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold">Bihar Government</span>
                </div>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-8 pr-4">
              Empowering the future of Bihar through accessible, high-quality, and modern educational resources for every student.
            </p>

            <div className="flex gap-4">
              <SocialLink icon={<Facebook size={18} />} hoverColor="hover:bg-blue-600 hover:border-blue-500" />
              <SocialLink icon={<Twitter size={18} />} hoverColor="hover:bg-sky-500 hover:border-sky-400" />
              <SocialLink icon={<Instagram size={18} />} hoverColor="hover:bg-pink-600 hover:border-pink-500" />
              <SocialLink icon={<Linkedin size={18} />} hoverColor="hover:bg-blue-700 hover:border-blue-600" />
            </div>
          </div>

          {/* SITE NAVIGATION */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase relative inline-block">
              Quick Navigation
              
            </h4>
            <ul className="space-y-4">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/books/Class1" label="Textbooks" />
              <FooterLink to="/notice" label="Notices & Circulars" />
              <FooterLink to="/tenders" label="Tenders" />
              <FooterLink to="/contact" label="Contact Us" />
            </ul>
          </div>

          {/* DOCUMENTS */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase relative inline-block">
              Documents
              
            </h4>
            <ul className="space-y-4">
              <FooterLink to="/documents/hrd" label="HRD" />
              <FooterLink to="/documents/registration-form" label="Registration Forms" />
              <FooterLink to="/documents/rti" label="RTI" />
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase relative inline-block">
              Contact Information
             
            </h4>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all border border-blue-500/20">
                  <MapPin className="text-blue-400" size={18} />
                </div>
                <span className="text-white/70 leading-relaxed mt-1">
                  <strong className="text-white/90 block mb-1">Registered Office:</strong>
                  Pathya Pustak Bhawan, Buddh Marg, Fraser Road Area, Patna - 800001
                </span>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all border border-blue-500/20">
                  <Mail className="text-blue-400" size={18} />
                </div>
                <a href="mailto:textbookmd@gmail.com" className="hover:text-blue-400 transition-colors text-white/70">
                  textbookmd@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all border border-blue-500/20">
                  <Phone className="text-blue-400" size={18} />
                </div>
                <span className="text-white/70 font-medium tracking-wide">06122221975</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6 text-sm text-white/50">
          
            <p className="font-medium tracking-wide">© 2026 BSTBPC. All rights reserved.</p>
            
            <p>Designed by <span className="text-white font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">NS Apps Innovations</span></p>
         
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 font-medium">
            <Link to="/csr-policy" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300">Privacy Policy</Link>
            <Link to="/csr-policy" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300">Terms of Service</Link>
            <Link to="/csr-policy" className="hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-blue-500 hover:after:w-full after:transition-all after:duration-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const FooterLink = ({ to, label, highlight }) => (
  <li className="group">
    <Link
      to={to}
      className={`text-sm transition-all duration-300 flex items-center ${highlight
          ? "text-blue-400 font-medium hover:text-blue-300"
          : "text-white/70 hover:text-white"
        }`}
    >
      <ChevronRight size={16} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blue-500 mr-1" />
      <span className="group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white">{label}</span>
    </Link>
  </li>
);

const SocialLink = ({ icon, hoverColor }) => (
  <a href="#" className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/70 border border-white/10 hover:text-white ${hoverColor} transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-lg backdrop-blur-sm`}>
    <span className="group-hover:scale-110 transition-transform duration-300">
      {icon}
    </span>
  </a>
);

export default Footer;
