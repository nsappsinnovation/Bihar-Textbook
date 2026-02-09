import { Link, useLocation } from "react-router-dom";
import { Knowconfig } from './knowus/Knowconfig';
import { Galleryconfig } from './gallery/Galleryconfig';
import { Docuconfig } from './documents/Docuconfig';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <header className={`absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 w-full transition-all duration-300 ${isHomePage ? "bg-transparent border-b border-white/10" : "bg-white shadow-sm border-b border-gray-100"
      }`}>

      <div className="flex h-16 w-full items-center justify-between px-6">
        {/* LEFT: Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/logo.png"
              alt="BSTPC Logo"
              className="h-12 md:h-16 w-auto object-contain"
            />
          </Link>
        </div>

        {/* CENTER: Navigation */}
        <nav className={`mx-auto flex items-center gap-10 text-[14px] font-medium transition-colors duration-300 ${isHomePage ? "text-white/90" : "text-gray-700"
          }`}>
          <Link to="/" className={`transition-colors ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>Home</Link>

          <div className="relative group">
            <span className={`cursor-pointer whitespace-nowrap transition-colors ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>
              Know Us <span className="text-xs">▾</span>
            </span>
            <div className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
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
            <span className={`cursor-pointer transition-colors ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>
              Books <span className="text-xs">▾</span>
            </span>
            <div className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
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
            <span className={`cursor-pointer whitespace-nowrap transition-colors ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>
              Gallery <span className="text-xs">▾</span>
            </span>
            <div className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
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
            <span className={`cursor-pointer whitespace-nowrap transition-colors ${isHomePage ? "hover:text-blue-300" : "hover:text-[#211fa9f8]"}`}>
              Documents <span className="text-xs">▾</span>
            </span>
            <div className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
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

        {/* RIGHT: Login Button */}
        <div className="flex items-center">
          <Link to="/login">
            <button className={`relative px-8 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 overflow-hidden group shadow-md ${isHomePage
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
      </div>
    </header>
  );
};

export default Navbar;
