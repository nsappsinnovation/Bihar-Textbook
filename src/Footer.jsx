import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bstbps-footer">
      <div className="footer-wrapper">
        {/* LEFT SECTION */}
        <div className="footer-left">
          <img
            src="/assets/bihar-logo.png"
            alt="Bihar State Text Book Publishing Corporation Logo"
            className="footer-logo"
          />

          <div className="powered-by">
            <p>Powered By</p>
            <div className="powered-logos">
              <img src="/assets/bstbpc.png" alt="---" />
              <img src="/assets/digital-india.png" alt="---" />
              <img src="/assets/indiaai.png" alt="---" />
            </div>
          </div>
        </div>

        {/* SITE NAVIGATION */}
        <div className="footer-column">
          <h4 className="footer-heading">Site Navigation</h4>
          <ul>
            <li>
              <a href="/media">Home</a>
            </li>
            <li>
              <a href="/media">Know Us</a>
            </li>
            <li>
              <a href="/media">Books</a>
            </li>
            <li>
              <a href="/media">Gallery</a>
            </li>
            <li>
              <a href="/media">Documents</a>
            </li>
            <li>
              <a href="/media">Notice/Circular</a>
            </li>
            <li>
              <a href="/media">Tenders</a>
            </li>
            <li>
              <a href="/media">CSR Policy</a>
            </li>
            <li>
              <a href="/media">Contact List</a>
            </li>
            <li>
              <a href="/media">Login</a>
            </li>
          </ul>
        </div>

        {/* FLAGSHIP EVENTS */}
        <div className="footer-column">
          <h4 className="footer-heading">Flagship Events</h4>
          <ul>
            <li>AI for ALL- Global Impact Challenge</li>
            <li>AI by HER: Global Impact Challenge</li>
            <li>YUVAI: Global Youth Challenge</li>
            <li>Research Symposium</li>
            <li>India AI Impact Expo 2026</li>
            <li>India AI Tinkerpreneur</li>
            <li>Casebook on AI Health</li>
            <li>Casebook on AI in Energy</li>
            <li>Casebook on AI & Gender Empowerment</li>
            <li>Casebook on AI in Education</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer-column">
          <h4 className="footer-heading">Contact Us</h4>

          <p>
            Email Us- <br />
            <a href="xyz@gmail.com">xyz@gmail.com</a>
          </p>
          <br />
          <p>
            Bihar State Text Book Publishing Corporation Logo <br />
            Registered Office-
            <br />
            State- Bihar <br />
            Country-India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
