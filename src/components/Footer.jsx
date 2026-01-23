import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#2c2a7a] to-[#1b1a4d] text-white py-12 px-10 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-[1400px] mx-auto">
        {/* LEFT SECTION */}
        <div className="">
          <Link to="/">
            <img
              src="/logo.png"
              alt="Bihar State Text Book Publishing Corporation Logo"
              className="h-20 w-auto mb-3 object-contain hover:opacity-80 transition-opacity cursor-pointer"
            />
          </Link>

          <div className="mt-4">
            <p className="font-semibold mb-2.5">Powered By</p>
            <div className="flex gap-4 items-center">
              <img
                src="/logo.png"
                alt="bstbpc"
                className="h-10 bg-white/10 rounded p-1"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Digital_India_logo.svg/1200px-Digital_India_logo.svg.png"
                alt="digital-india"
                className="h-10 bg-white/10 rounded p-1"
              />
              <img
                src="https://indiaai.gov.in/assets/images/logo.png"
                alt="indiaai"
                className="h-10 bg-white/10 rounded p-1"
              />
            </div>
          </div>
        </div>

        {/* SITE NAVIGATION */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Site Navigation</h4>
          <div className="w-[60px] h-[2px] bg-white/40 mb-4" />
          <ul className="list-none p-0">
            <li className="mb-2.5 text-sm">
              <Link to="/" className="text-white hover:underline">
                Home
              </Link>
            </li>
            <li className="mb-2.5 text-sm">
              <Link
                to="/know-us/board_of_directors"
                className="text-white hover:underline"
              >
                Know Us
              </Link>
            </li>
            <li className="mb-2.5 text-sm">
              <Link to="/books/Class1" className="text-white hover:underline">
                Books
              </Link>
            </li>
            <li className="mb-2.5 text-sm">
              <Link to="/photo-gallery" className="text-white hover:underline">
                Gallery
              </Link>
            </li>
            <li className="mb-2.5 text-sm">
              <Link to="/documents/hrt" className="text-white hover:underline">
                Documents
              </Link>
            </li>
            <li className="mb-2.5 text-sm">
              <Link to="/notice" className="text-white hover:underline">
                Notice/Circular
              </Link>
            </li>
            <li className="mb-2.5 text-sm">
              <Link to="/tenders" className="text-white hover:underline">
                Tenders
              </Link>
            </li>
            <li className="mb-2.5 text-sm">
              <Link to="/csr-policy" className="text-white hover:underline">
                CSR Policy
              </Link>
            </li>
            <li className="mb-2.5 text-sm">
              <Link to="/contact" className="text-white hover:underline">
                Contact List
              </Link>
            </li>
            <li className="mb-2.5 text-sm">
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* FLAGSHIP EVENTS */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Key Initiatives</h4>
          <div className="w-[60px] h-[2px] bg-white/40 mb-4" />
          <ul className="list-none p-0">
            <li className="mb-2.5 text-sm cursor-pointer">
              <Link
                to="/know-us/board_of_directors"
                className="text-white hover:underline"
              >
                e-Lotani: Digital Portal
              </Link>
            </li>
            <li className="mb-2.5 text-sm cursor-pointer">
              <Link
                to="/flagship-events"
                className="text-white hover:underline"
              >
                Bihar Pustak Mela 2026
              </Link>
            </li>
            <li className="mb-2.5 text-sm cursor-pointer">
              <Link
                to="/know-us/board_of_directors"
                className="text-white hover:underline"
              >
                Mobile Library Network
              </Link>
            </li>
            <li className="mb-2.5 text-sm cursor-pointer">
              <Link
                to="/know-us/board_of_directors"
                className="text-white hover:underline"
              >
                Curriculum Modernization
              </Link>
            </li>
            <li className="mb-2.5 text-sm cursor-pointer">
              <Link to="/books/Class1" className="text-white hover:underline">
                Free Textbook Distribution
              </Link>
            </li>
            <li className="mb-2.5 text-sm cursor-pointer">
              <Link to="/documents/hrt" className="text-white hover:underline">
                Inclusive Learning Access
              </Link>
            </li>
            <li className="mb-2.5 text-sm cursor-pointer">
              <Link
                to="/know-us/board_of_directors"
                className="text-white hover:underline"
              >
                Teacher Training Workshops
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <div className="w-[60px] h-[2px] bg-white/40 mb-4" />

          <p className="text-sm">
            Email Us- <br />
            <a
              href="mailto:bstbpc.patna@gmail.com"
              className="text-white hover:underline"
            >
              bstbpc.patna@gmail.com
            </a>
          </p>

          <div className="mt-4 text-sm">
            <p>Bihar State Text Book Publishing Corporation Ltd.</p>
            <p>Bhawan, Budh Marg, Patna - 800001</p>
            <p>State- Bihar</p>
            <p>Country-India</p>
            <Link
              to="/contact"
              className="text-white hover:underline mt-2 inline-block"
            >
              View Contact Details →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
