import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ChevronRight, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="relative bg-gradient-to-b from-[#0a0f1c] to-[#060913] text-white/70 pt-16 pb-8 px-6 md:px-12 font-sans border-t border-white/5 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* BRAND & LOGOS */}
          <div className="flex flex-col md:col-span-6 lg:col-span-3">
            <Link to="/" className="inline-block mb-6 group">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl blur opacity-50 group-hover:opacity-80 transition-opacity"></div>
                  <img loading="lazy" decoding="async"
                    src="/bstbpc_logo.webp"
                    alt={t("footer.logoAlt", "BSTBPC Logo")}
                    className="relative h-14 w-auto object-contain bg-white/10 rounded-xl p-1.5 border border-white/20 backdrop-blur-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">{t("footer.brandName", "BSTBPC")}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold">{t("footer.biharGovt", "Bihar Government")}</span>
                </div>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-6 pr-4">
              {t("footer.description", "Empowering the future of Bihar through accessible, high-quality, and modern educational resources for every student.")}
            </p>

            <div className="flex gap-4">
              <SocialLink href="https://www.facebook.com/people/Bihar-State-Textbook-Publishing-Corporation-Ltd/61569938164362/" icon={<Facebook size={18} />} hoverColor="hover:bg-blue-600 hover:border-blue-500" />
              <SocialLink href="https://x.com/bihartextbooks" icon={<Twitter size={18} />} hoverColor="hover:bg-sky-500 hover:border-sky-400" />
            </div>
          </div>

          {/* SITE NAVIGATION */}
          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="text-white font-bold mb-6 tracking-wider text-sm uppercase relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-blue-500 after:rounded">
              {t("footer.quickNav", "Quick Navigation")}
            </h4>
            <ul className="space-y-3 pt-2">
              <FooterLink to="/" label={t("footer.link.home", "Home")} />
              <FooterLink to="/books/1" label={t("footer.link.textbooks", "Textbooks")} />
              <FooterLink to="/notice" label={t("footer.link.notices", "Notices & Circulars")} />
              <FooterLink to="/tenders" label={t("footer.link.tenders", "Tenders")} />
              <FooterLink to="/gallery/photo" label={t("footer.link.gallery", "Gallery")} />
              <FooterLink to="/csr-policy" label={t("footer.link.csrPolicy", "CSR Policy")} />
              <FooterLink to="/rti" label="RTI" />
              <FooterLink to="/contact" label={t("footer.link.contactUs", "Contact Us")} />
            </ul>
          </div>

          {/* KNOW US */}
          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="text-white font-bold mb-6 tracking-wider text-sm uppercase relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-blue-500 after:rounded">
              {t("footer.knowUs", "Know Us")}
            </h4>
            <ul className="space-y-3 pt-2">
              <FooterLink to="/know-us/md-message" label={t("nav.knowUsLinks.md-message", "MD Message")} />
              <FooterLink to="/know-us/list-md" label={t("nav.knowUsLinks.list-md", "List of MD")} />
              <FooterLink to="/know-us/board-of-directors" label={t("nav.knowUsLinks.board-of-directors", "Board of Directors")} />
              <FooterLink to="/know-us/organisation-structure" label={t("nav.knowUsLinks.organisation-structure", "Organisational Structure")} />
              <FooterLink to="/know-us/employees" label={t("nav.knowUsLinks.employees", "Our Employees")} />
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="md:col-span-6 lg:col-span-3">
            <h4 className="text-white font-bold mb-6 tracking-wider text-sm uppercase relative inline-block after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-blue-500 after:rounded">
              {t("footer.contactInfo", "Contact Information")}
            </h4>

            <div className="space-y-5 text-sm pt-2">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all border border-blue-500/20">
                  <MapPin className="text-blue-400" size={18} />
                </div>
                <span className="text-white/70 leading-relaxed mt-1">
                  <strong className="text-white/90 block mb-1">{t("footer.registeredOffice", "Registered Office:")}</strong>
                  {t("footer.address", "Pathya Pustak Bhawan, Buddh Marg, Fraser Road Area, ")},<br/>
                  {t("footer.addressRegion", "Patna - 800001, Bihar, India")}.
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
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-4 text-xs md:text-sm text-white/40 text-center">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center">
            <p className="font-medium tracking-wide">{t("footer.copyright", "© 2026 BSTBPC. All rights reserved.")}</p>
            <span className="hidden md:inline text-white/10">|</span>
            <p>
              {t("footer.designedBy", "Designed by")}{" "}
              <Link to="/developer" className="font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                 <span style={{ fontFamily: 'italics', letterSpacing: '1px' }}>{t("footer.designerName", "NS Apps Innovations")}</span> - A Product of Startup Bihar
              </Link>
            </p>
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

const SocialLink = ({ icon, hoverColor, href }) => (
  <a href={href || "#"} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/70 border border-white/10 hover:text-white ${hoverColor} transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-lg backdrop-blur-sm`}>
    <span className="group-hover:scale-110 transition-transform duration-300">
      {icon}
    </span>
  </a>
);

export default Footer;
