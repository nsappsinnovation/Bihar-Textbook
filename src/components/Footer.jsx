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
            <FooterLink to="/know-us/board_of_directors" label="About Us" />
            <FooterLink to="/books/Class1" label="Textbooks" />
            <FooterLink to="/notice" label="Notices & Circulars" />
            <FooterLink to="/tenders" label="Tenders" />
            <FooterLink to="/contact" label="Contact Us" />
          </ul>
        </div>

        {/* KEY INITIATIVES */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Key Initiatives</h4>
          <ul className="space-y-3">
            <FooterLink to="/flagship-events/digital-books-portal" label="Digital Library Portal" />
            <FooterLink to="/flagship-events/bihar-state-pustak-mela" label="Bihar Pustak Mela" />
            <FooterLink to="/flagship-events/audio-books-inclusive" label="Audio Books (Inclusive)" />
            <FooterLink to="/flagship-events/regional-content-drive" label="Regional Content" />
            <FooterLink to="/flagship-events" label="View All Programs →" highlight />
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide text-sm uppercase">Contact Information</h4>

          <p className="text-sm">
            Email Us- <br />
            <a
              href="mailto:textbookmd@gmail.com"
              className="text-white hover:underline"
            >
              textbookmd@gmail.com
            </a>
          </p>

          <div className="mt-4 text-sm">
            <p className="font-semibold">Registered Office:-</p>
            <p>Pathya Pustak Bhawan, Buddh Marg, Budh Vihar, Fraser Road Area, Patna - 800001</p>
            <p>Bihar</p>
            <p>India</p>
            <p className="mt-2">Phone: 06122221975</p>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-[1280px] mx-auto mt-6 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
        <p>© 2026 BSTBPC. All rights reserved.</p>
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
