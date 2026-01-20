
import logo from '/logo.png'
import { Link } from "react-router-dom";

import { Knowconfig } from './knowus/Knowconfig';
import { Galleryconfig } from './gallery/Galleryconfig';
import { Docuconfig } from './documents/Docuconfig';
const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 w-full bg-white/80 backdrop-blur-md border-b shadow-sm">

      <div className="flex h-16 w-full   items-center justify-between px-6 ">
        {/* LEFT: Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-15 w-auto" />
        </div>

        {/* CENTER: Navigation (even spacing between items) */}
        <nav className="mx-auto flex items-center gap-12 text-[14px] font-medium text-gray-700">


          <Link to="/" className="hover:text-[#211fa9f8]">Home</Link>


            <div className="relative group">
            <span className="cursor-pointer hover:text-[#211fa9f8]   whitespace-nowrap ">
              Know Us
              <span className="text-xs">▾</span>
            </span>
            <div className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg
                          opacity-0 invisible group-hover:visible group-hover:opacity-100
                          transition-all duration-200 z-50">
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
  <span className="cursor-pointer hover:text-[#211fa9f8]">
    Books <span className="text-xs">▾</span>
  </span>

  <div
    className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg
    opacity-0 invisible group-hover:visible group-hover:opacity-100
    transition-all duration-200 z-50"
  >
    {[...Array(12)].map((_, index) => {
      const classId = index + 1;
      return (
        <Link
          key={classId}
          to={`/books/${classId}`}
          className="block px-4 py-2 hover:bg-gray-100"
        >
          Class {classId}
        </Link>
      );
    })}
  </div>
</div>

         <div className="relative group">
            <span className="cursor-pointer hover:text-[#211fa9f8]   whitespace-nowrap ">
              Gallery
              <span className="text-xs">▾</span>
            </span>
            <div className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg
                          opacity-0 invisible group-hover:visible group-hover:opacity-100
                          transition-all duration-200 z-50">
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
            <span className="cursor-pointer hover:text-[#211fa9f8]   whitespace-nowrap ">
              Documents
              <span className="text-xs">▾</span>
            </span>
            <div className="dropdown-menu absolute left-0 top-full mt-3 w-64 rounded-md bg-white shadow-lg
                          opacity-0 invisible group-hover:visible group-hover:opacity-100
                          transition-all duration-200 z-50">
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
          <Link to="/notice" className="hover:text-[#211fa9f8]">Notice</Link>
          <Link to="/tenders" className="hover:text-[#211fa9f8]">Tenders</Link>
          <Link to="/csr-policy" className="hover:text-[#211fa9f8] whitespace-nowrap">CSR Policy</Link>
          <Link to="/contact" className="hover:text-[#211fa9f8]">Contact</Link>

        </nav>

        {/* RIGHT: Login Button */}
        <div className="flex items-center">
          <button className="bg-[#211fa9f8] w-48 text-white px-[18px] py-[10px] rounded-[6px] text-[14px] font-semibold">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
