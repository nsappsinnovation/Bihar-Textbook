import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

/* Pages */
import Home from "./pages/Home";
import Tenders from "./pages/Tenders";
import CsrPolicy from "./pages/CsrPolicy";
import KnowUs from "./pages/Know";
import Books from "./pages/Books.jsx";
import Gallery from "./pages/Gallery.jsx";
import Document from "./pages/Document.jsx";

/* Components */
import KeyParticipantViewAll from "./components/KeyParticipantsViewAll";
import ContactUs from "./components/ContactUs.jsx";
import Notice from "./components/Notice.jsx";
import FlagshipEvents from "./components/FlagshipEvents.jsx";
import Esec from "./components/EventsSection.jsx";

/* Auth */
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";

/* Gallery Pages */
import PhotoGallery from "./components/gallery/sections/Photogallery";
import VideoGallery from "./components/gallery/sections/Videogallery";
import PressRelease from "./components/gallery/sections/Pressrelease";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Nav />}

      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Key Participants */}
            <Route
              path="/key-participants"
              element={<KeyParticipantViewAll />}
            />

            {/* Contact */}
            <Route path="/contact" element={<ContactUs />} />

            {/* Gallery */}
            
            <Route path="/gallery/:sectionId" element={<Gallery />} />

            {/* Documents */}
            <Route path="/documents/:sectionId" element={<Document />} />

            {/* Books / Classes */}
            <Route path="/books/:classId" element={<Books />} />

            {/* Know Us */}
            <Route path="/know-us/:sectionId" element={<KnowUs />} />

            {/* Events */}
            <Route
              path="/flagship-events"
              element={<FlagshipEvents />}
            />

            {/* Other */}
            <Route path="/notice" element={<Notice />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/csr-policy" element={<CsrPolicy />} />
          </Routes>
        </main>

        {!isAuthPage && <Footer />}
      </div>
    </>
  );
}

export default App;
