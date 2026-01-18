import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#2c2a7a] to-[#1b1a4d] text-white py-12 px-10 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-[1400px] mx-auto">
        {/* LEFT SECTION */}
        <div className="">
          <img
            src="/logo.png"
            alt="Bihar State Text Book Publishing Corporation Logo"
            className="h-20 w-auto mb-3 object-contain"
          />

          <div className="mt-4">
            <p className="font-semibold mb-2.5">Powered By</p>
            <div className="flex gap-4 items-center">
              <img src="/logo.png" alt="bstbpc" className="h-10 bg-white/10 rounded p-1" />
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Digital_India_logo.svg/1200px-Digital_India_logo.svg.png"
                alt="digital-india"
                className="h-10 bg-white/10 rounded p-1"
              />
              <img src="https://indiaai.gov.in/assets/images/logo.png" alt="indiaai" className="h-10 bg-white/10 rounded p-1" />
            </div>
          </div>
        </div>

        {/* SITE NAVIGATION */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Site Navigation</h4>
          <div className="w-[60px] h-[2px] bg-white/40 mb-4" />
          <ul className="list-none p-0">
            <li className="mb-2.5 text-sm">
              <a href="/media" className="text-white hover:underline">
                Home
              </a>
            </li>
            <li className="mb-2.5 text-sm">
              <a href="/media" className="text-white hover:underline">
                Know Us
              </a>
            </li>
            <li className="mb-2.5 text-sm">
              <a href="/media" className="text-white hover:underline">
                Books
              </a>
            </li>
            <li className="mb-2.5 text-sm">
              <a href="/media" className="text-white hover:underline">
                Gallery
              </a>
            </li>
            <li className="mb-2.5 text-sm">
              <a href="/media" className="text-white hover:underline">
                Documents
              </a>
            </li>
            <li className="mb-2.5 text-sm">
              <a href="/media" className="text-white hover:underline">
                Notice/Circular
              </a>
            </li>
            <li className="mb-2.5 text-sm">
              <a href="/media" className="text-white hover:underline">
                Tenders
              </a>
            </li>
            <li className="mb-2.5 text-sm">
              <a href="/media" className="text-white hover:underline">
                CSR Policy
              </a>
            </li>
            <li className="mb-2.5 text-sm">
              <a href="/media" className="text-white hover:underline">
                Contact List
              </a>
            </li>
            <li className="mb-2.5 text-sm">
              <a href="/media" className="text-white hover:underline">
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* FLAGSHIP EVENTS */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Key Initiatives</h4>
          <div className="w-[60px] h-[2px] bg-white/40 mb-4" />
          <ul className="list-none p-0">
            <li className="mb-2.5 text-sm">e-Lotani: Digital Portal</li>
            <li className="mb-2.5 text-sm">Bihar Pustak Mela 2026</li>
            <li className="mb-2.5 text-sm">Mobile Library Network</li>
            <li className="mb-2.5 text-sm">Curriculum Modernization</li>
            <li className="mb-2.5 text-sm">Free Textbook Distribution</li>
            <li className="mb-2.5 text-sm">Inclusive Learning Access</li>
            <li className="mb-2.5 text-sm">Teacher Training Workshops</li>
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
