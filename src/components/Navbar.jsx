import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Knowconfig } from './knowus/Knowconfig';
import { Galleryconfig } from './gallery/Galleryconfig';
import { Docuconfig } from './documents/Docuconfig';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <header className={`absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 w-full transition-all duration-300 ${
      isHomePage ? "bg-transparent border-b border-white/10" : "bg-white shadow-sm border-b border-gray-100"
    }`}>

      <div className="flex h-16 w-full items-center justify-between px-2 md:px-6">
        {/* LEFT: Logo */}
        <div className="flex items-center shrink-0">
          {!isHomePage && (
            <Link 
              to="/" 
              className="mr-3 md:mr-5 flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all text-slate-700 group" 
              title="Back to Home"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          )}
          <Link to="/">
            <img
              src="/logo.png"
              alt="BSTPC Logo"
              className="h-10 sm:h-12 md:h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* CENTER: Navigation (Desktop) */}
        <nav className={`hidden lg:flex mx-auto items-center gap-6 xl:gap-10 text-[14px] font-medium transition-colors duration-300 ${
          isHomePage ? "text-white/90" : "text-gray-700"
        }`}>
          <Link to="/" className={`transition-colors ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>Home</Link>

          <div className="relative group">
            <span className={`cursor-pointer whitespace-nowrap transition-colors flex items-center gap-1 ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>
              Know Us <ChevronDown size={14} />
            </span>
            <div data-lenis-prevent="true" className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50 max-h-96 overflow-y-auto scrollbar-hide">
              {Knowconfig.map(item => (
                <Link
                  key={item.id}
                  to={`/know-us/${item.id}`}
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative group">
            <span className={`cursor-pointer transition-colors flex items-center gap-1 ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>
              Books <ChevronDown size={14} />
            </span>
            <div data-lenis-prevent="true" className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50 max-h-96 overflow-y-auto scrollbar-hide">
              {[...Array(12)].map((_, index) => {
                const classId = index + 1;
                return (
                  <Link
                    key={classId}
                    to={`/books/${classId}`}
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    Class {classId}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="relative group">
            <span className={`cursor-pointer whitespace-nowrap transition-colors flex items-center gap-1 ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>
              Gallery <ChevronDown size={14} />
            </span>
            <div data-lenis-prevent="true" className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50 max-h-96 overflow-y-auto scrollbar-hide">
              {Galleryconfig.map(item => (
                <Link
                  key={item.id}
                  to={`/gallery/${item.id}`}
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative group">
            <span className={`cursor-pointer whitespace-nowrap transition-colors flex items-center gap-1 ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>
              Documents <ChevronDown size={14} />
            </span>
            <div data-lenis-prevent="true" className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50 max-h-96 overflow-y-auto scrollbar-hide">
              {Docuconfig.map(item => (
                <Link
                  key={item.id}
                  to={`/documents/${item.id}`}
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/blog" className={`transition-colors ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>Gyan Kendra</Link>
          <Link to="/notice" className={`transition-colors ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>Notice</Link>
          <Link to="/tenders" className={`transition-colors ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>Tenders</Link>
          <Link to="/csr-policy" className={`transition-colors whitespace-nowrap ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>CSR Policy</Link>
          <Link to="/contact" className={`transition-colors ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>Contact</Link>
        </nav>

        {/* RIGHT: Login & Hamburger (Desktop/Mobile) */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Link to="/login">
              <button className={`relative px-8 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 overflow-hidden group shadow-md ${
                isHomePage
                  ? "bg-white/10 text-white border border-white/20 backdrop-blur-md hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 shadow-blue-500/20 hover:shadow-blue-500/40"
                } hover:-translate-y-0.5 active:scale-95`}>
                <span className="relative z-10 flex items-center gap-2">
                  Login
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-xl border transition-all cursor-pointer ${
              isHomePage 
                ? "text-white border-white/20 bg-white/10 hover:bg-white/20" 
                : "text-slate-700 border-slate-200 bg-slate-50 hover:bg-slate-100"
            }`}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu Overlay */}
      {isOpen && (
        <div data-lenis-prevent="true" className="fixed inset-0 top-[80px] z-40 bg-white border-t border-slate-100 lg:hidden flex flex-col overflow-y-auto scrollbar-hide px-6 py-6 space-y-4 animate-fade-in shadow-2xl h-[calc(100vh-80px)]">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-800 py-2 border-b border-slate-50">Home</Link>
          
          {/* Dropdown 1 */}
          <div className="flex flex-col border-b border-slate-50 py-2">
            <button onClick={() => toggleDropdown('know')} className="flex items-center justify-between text-base font-bold text-slate-800 w-full text-left">
              <span>Know Us</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'know' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
            </button>
            {activeDropdown === 'know' && (
              <div className="flex flex-col pl-4 mt-2 gap-2 border-l-2 border-blue-100">
                {Knowconfig.map(item => (
                  <Link key={item.id} to={`/know-us/${item.id}`} onClick={() => setIsOpen(false)} className="text-sm font-semibold text-slate-600 py-1 hover:text-blue-600">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown 2 */}
          <div className="flex flex-col border-b border-slate-50 py-2">
            <button onClick={() => toggleDropdown('books')} className="flex items-center justify-between text-base font-bold text-slate-800 w-full text-left">
              <span>Books</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'books' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
            </button>
            {activeDropdown === 'books' && (
              <div className="grid grid-cols-2 gap-2 pl-4 mt-2 border-l-2 border-blue-100">
                {[...Array(12)].map((_, index) => {
                  const classId = index + 1;
                  return (
                    <Link key={classId} to={`/books/${classId}`} onClick={() => setIsOpen(false)} className="text-sm font-semibold text-slate-600 py-1 hover:text-blue-600">
                      Class {classId}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dropdown 3 */}
          <div className="flex flex-col border-b border-slate-50 py-2">
            <button onClick={() => toggleDropdown('gallery')} className="flex items-center justify-between text-base font-bold text-slate-800 w-full text-left">
              <span>Gallery</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'gallery' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
            </button>
            {activeDropdown === 'gallery' && (
              <div className="flex flex-col pl-4 mt-2 gap-2 border-l-2 border-blue-100">
                {Galleryconfig.map(item => (
                  <Link key={item.id} to={`/gallery/${item.id}`} onClick={() => setIsOpen(false)} className="text-sm font-semibold text-slate-600 py-1 hover:text-blue-600">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown 4 */}
          <div className="flex flex-col border-b border-slate-50 py-2">
            <button onClick={() => toggleDropdown('docs')} className="flex items-center justify-between text-base font-bold text-slate-800 w-full text-left">
              <span>Documents</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === 'docs' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
            </button>
            {activeDropdown === 'docs' && (
              <div className="flex flex-col pl-4 mt-2 gap-2 border-l-2 border-blue-100">
                {Docuconfig.map(item => (
                  <Link key={item.id} to={`/documents/${item.id}`} onClick={() => setIsOpen(false)} className="text-sm font-semibold text-slate-600 py-1 hover:text-blue-600">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/blog" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-800 py-2 border-b border-slate-50">Gyan Kendra</Link>
          <Link to="/notice" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-800 py-2 border-b border-slate-50">Notice</Link>
          <Link to="/tenders" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-800 py-2 border-b border-slate-50">Tenders</Link>
          <Link to="/csr-policy" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-800 py-2 border-b border-slate-50">CSR Policy</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="text-base font-bold text-slate-800 py-2 border-b border-slate-50">Contact</Link>
          
          <div className="pt-4">
            <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full">
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full font-bold text-sm text-center shadow-lg active:scale-98">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
