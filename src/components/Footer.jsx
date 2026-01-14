import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#2c2a7a] to-[#1b1a4d] text-white py-12 px-10 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-[1400px] mx-auto">
        {/* LEFT SECTION */}
        <div className="">
          <img
            src="/assets/bihar-logo.png"
            alt="Bihar State Text Book Publishing Corporation Logo"
            className="w-[200px] mb-3"
          />

          <div className="mt-4">
            <p className="font-semibold mb-2.5">Powered By</p>
            <div className="flex gap-4 items-center">
              <img src="/assets/bstbpc.png" alt="bstbpc" className="h-10" />
              <img
                src="/assets/digital-india.png"
                alt="digital-india"
                className="h-10"
              />
              <img src="/assets/indiaai.png" alt="indiaai" className="h-10" />
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
          <h4 className="text-lg font-semibold mb-3">Flagship Events</h4>
          <div className="w-[60px] h-[2px] bg-white/40 mb-4" />
          <ul className="list-none p-0">
            <li className="mb-2.5 text-sm">
              AI for ALL- Global Impact Challenge
            </li>
            <li className="mb-2.5 text-sm">
              AI by HER: Global Impact Challenge
            </li>
            <li className="mb-2.5 text-sm">YUVAI: Global Youth Challenge</li>
            <li className="mb-2.5 text-sm">Research Symposium</li>
            <li className="mb-2.5 text-sm">India AI Impact Expo 2026</li>
            <li className="mb-2.5 text-sm">India AI Tinkerpreneur</li>
            <li className="mb-2.5 text-sm">Casebook on AI Health</li>
            <li className="mb-2.5 text-sm">Casebook on AI in Energy</li>
            <li className="mb-2.5 text-sm">
              Casebook on AI &amp; Gender Empowerment
            </li>
            <li className="mb-2.5 text-sm">Casebook on AI in Education</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <div className="w-[60px] h-[2px] bg-white/40 mb-4" />

          <p className="text-sm">
            Email Us- <br />
            <a
              href="mailto:xyz@gmail.com"
              className="text-white hover:underline"
            >
              xyz@gmail.com
            </a>
          </p>

          <div className="mt-4 text-sm">
            <p>Bihar State Text Book Publishing Corporation Logo</p>
            <p>Registered Office-</p>
            <p>State- Bihar</p>
            <p>Country-India</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
