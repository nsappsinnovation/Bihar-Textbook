import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0d0e23] text-white/70 pt-10 pb-6 px-6 md:px-12 font-sans border-t border-white/10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* BRAND & LOGOS */}
        <div>
          <Link to="/" className="inline-block mb-4">
            <div className="flex items-center gap-3">
              <img
                src="/bstbpc_logo.png"
                alt="BSTBPC Logo"
                className="h-12 w-auto object-contain bg-white/5 rounded-lg p-1 border border-white/10"
              />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-tight tracking-tight">BSTBPC</span>
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">Bihar Government</span>
              </div>
            </div>
          </Link>

          <p className="text-white/60 text-sm leading-relaxed mb-4">
            Empowering the future of Bihar through accessible, high-quality, and modern educational resources.
          </p>

          <div className="flex gap-3">
            <SocialLink icon={<Facebook size={18} />} />
            <SocialLink icon={<Twitter size={18} />} />
            <SocialLink icon={<Instagram size={18} />} />
            <SocialLink icon={<Linkedin size={18} />} />
          </div>
        </div>

        {/* SITE NAVIGATION */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Quick Navigation</h4>
          <ul className="space-y-3">
            <FooterLink to="/" label="Home" />
            <FooterLink to="/books/Class1" label="Textbooks" />
            <FooterLink to="/notice" label="Notices & Circulars" />
            <FooterLink to="/tenders" label="Tenders" />
            <FooterLink to="/contact" label="Contact Us" />
          </ul>
        </div>

        {/* DOCUMENTS */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Documents</h4>
          <ul className="space-y-3">
            <FooterLink to="/documents/hrd" label="HRD" />
            <FooterLink to="/documents/registration-form" label="Registration Forms" />
            <FooterLink to="/documents/rti" label="RTI" />
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Contact Information</h4>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="text-blue-400 mt-1 flex-shrink-0" size={18} />
              <span>
                Registered Office:<br />
                Pathya Pustak Bhawan, Buddh Marg, Budh Vihar, Fraser Road Area, Patna - 800001<br />
                Bihar, India
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-blue-400 flex-shrink-0" size={18} />
              <a href="mailto:textbookmd@gmail.com" className="hover:text-white transition-colors">
                textbookmd@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-blue-400 flex-shrink-0" size={18} />
              <span>06122221975</span>
            </div>
          </div>

         
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-[1280px] mx-auto mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <p>© 2026 BSTBPC. All rights reserved.</p>
          <span className="hidden md:inline">|</span>
          <p>Designed by NS Apps Innovations</p>
        </div>
        <div className="flex gap-6">
          <Link to="/csr-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/csr-policy" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/csr-policy" className="hover:text-white transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
};

// Helper Components
const FooterLink = ({ to, label, highlight }) => (
  <li>
    <Link
      to={to}
      className={`text-sm transition-colors duration-200 block ${highlight
          ? "text-blue-400 font-medium hover:text-blue-300"
          : "text-sky-200/80 hover:text-white hover:translate-x-1"
        }`}
    >
      {label}
    </Link>
  </li>
);

const SocialLink = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-sky-800 flex items-center justify-center text-sky-300 hover:bg-white hover:text-sky-900 transition-all duration-300 group">
    <span className="group-hover:scale-110 transition-transform">
      {icon}
    </span>
  </a>
)

export default Footer;
