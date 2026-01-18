import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 w-full bg-white/80 backdrop-blur-md border-b shadow-sm">

      <div className="flex h-16 w-full   items-center justify-between px-6 ">
        {/* LEFT: Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src="/logo.png" alt="BSTPC Logo" className="h-12 md:h-16 w-auto object-contain" />
          </Link>
        </div>

        {/* CENTER: Navigation (even spacing between items) */}
        <nav className="mx-auto flex items-center gap-12 text-[14px] font-medium text-gray-700">


          <Link to="/" className="hover:text-[#211fa9f8]">Home</Link>


          <div className="relative group">
            <span className="cursor-pointer hover:text-[#211fa9f8]   whitespace-nowrap ">
              Know Us
              <span className="text-xs">▾</span>
            </span>
            <div
              className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg
                          opacity-0 invisible group-hover:visible group-hover:opacity-100
                          transition-all duration-200 z-50"
            >
              <Link
                to="/md-message"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                MD Message
              </Link>

              <Link
                to="/board-of-directors"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Board of Directors
              </Link>

              <Link to="/md-list" className="block px-4 py-2 hover:bg-gray-100">
                List of MD
              </Link>

              <Link
                to="/officers-list"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Officers List
              </Link>

              <Link
                to="/employees"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Our Employee
              </Link>

              <Link
                to="/organisation-structure"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Organisational Structure
              </Link>

              <Link
                to="/registered-printers"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Register Printers
              </Link>
            </div>
          </div>
          <div className="relative group">
            <span className="cursor-pointer hover:text-[#211fa9f8]">
              Books
              <span className="text-xs">▾</span>
            </span>
            <div
              className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg
                          opacity-0 invisible group-hover:visible group-hover:opacity-100
                          transition-all duration-200 z-50"
            >
              <Link to="/class-1" className="block px-4 py-2 hover:bg-gray-100">
                Class 1
              </Link>

              <Link to="/class-2" className="block px-4 py-2 hover:bg-gray-100">
                Class 2
              </Link>
              <Link to="/class-3" className="block px-4 py-2 hover:bg-gray-100">
                Class 3
              </Link>
              <Link to="/class-4" className="block px-4 py-2 hover:bg-gray-100">
                Class 4
              </Link>
              <Link to="/class-5" className="block px-4 py-2 hover:bg-gray-100">
                Class 5
              </Link>
              <Link to="/class-6" className="block px-4 py-2 hover:bg-gray-100">
                Class 6
              </Link>
              <Link to="/class-7" className="block px-4 py-2 hover:bg-gray-100">
                Class 7
              </Link>
              <Link to="/class-8" className="block px-4 py-2 hover:bg-gray-100">
                Class 8
              </Link>
              <Link to="/class-9" className="block px-4 py-2 hover:bg-gray-100">
                Class 9
              </Link>
              <Link
                to="/class-10"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Class 10
              </Link>
              <Link
                to="/class-11"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Class 11
              </Link>
              <Link
                to="/class-12"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Class 12
              </Link>
            </div>
          </div>
          <div className="relative group">
            <span className="cursor-pointer hover:text-[#211fa9f8]">
              Gallery
              <span className="text-xs">▾</span>
            </span>
            <div
              className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg
                          opacity-0 invisible group-hover:visible group-hover:opacity-100
                          transition-all duration-200 z-50"
            >
              <Link
                to="/photo-gallery"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Photo Gallery
              </Link>

              <Link
                to="/video-gallery"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Video Gallery
              </Link>

              <Link
                to="/press-release"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Press Release
              </Link>
            </div>
          </div>
          <div className="relative group">
            <span className="cursor-pointer hover:text-[#211fa9f8]">
              Documents
              <span className="text-xs">▾</span>
            </span>
            <div
              className="dropdown-menu absolute left-0 top-full mt-1 w-64 rounded-md bg-white shadow-lg
                          opacity-0 invisible group-hover:visible group-hover:opacity-100
                          transition-all duration-200 z-50">

              <Link to="/registration-form" className="block px-4 py-2 hover:bg-gray-100">
                Registration Form
              </Link>

              <Link to="/hrt" className="block px-4 py-2 hover:bg-gray-100">
                HRT
              </Link>

              <Link to="/rti" className="block px-4 py-2 hover:bg-gray-100">
                RTI
              </Link>
            </div>
          </div>

          <Link to="/notice" className="hover:text-[#211fa9f8]">Notice</Link>
          <Link to="/tenders" className="hover:text-[#211fa9f8]">Tenders</Link>
          <Link to="/csr-policy" className="hover:text-[#211fa9f8] whitespace-nowrap">CSR Policy</Link>
          <Link to="/contact" className="hover:text-[#211fa9f8]">Contact</Link>

        </nav>

        {/* RIGHT: Login Button */}
        <div className="flex items-center">
          <Link to="/login">
            <button className="bg-[#211fa9f8] w-48 text-white px-[18px] py-[10px] rounded-[6px] text-[14px] font-semibold">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
