import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Blog from "./components/Blog.jsx";
/* Pages */

import Home from "./pages/Home";
import Tenders from "./pages/Tenders";
import CsrPolicy from "./pages/CsrPolicy";
import KnowUs from "./pages/Know";
import Books from "./pages/Books.jsx";
import BookReader from "./pages/BookReader.jsx";
import Flipbook from "./pages/Flipbook.jsx";
import Gallery from "./pages/Gallery.jsx";
import Document from "./pages/Document.jsx";
import FlagshipDetail from "./pages/FlagshipDetail.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import PublishingMission from "./pages/PublishingMission.jsx";

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
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const location = useLocation();
  const isIsolatedPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.includes("/flip");

  return (
    <>
      <ScrollToTop />
      {!isIsolatedPage && <Nav />}

      <div className="min-h-screen flex flex-col">
        <main className={`flex-grow ${location.pathname !== '/' && !isIsolatedPage ? 'pt-24' : ''}`}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Blog */}
            <Route path="/blog" element={<Blog />} />

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
            {/* {Books} */}
            <Route path="/class/:classId/read/:bookSubject" element={<BookReader />} />

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
            <Route
              path="/flagship-events/:id"
              element={<FlagshipDetail />}
            />

            {/* Flipbook */}
            <Route path="/book/:classId/:bookSubject/:chapterId/flip" element={<Flipbook />} />


            {/* Other */}

            <Route path="/notice" element={<Notice />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/csr-policy" element={<CsrPolicy />} />

            {/* Event Details */}
            <Route path="/events/:eventSlug" element={<EventDetails />} />

            {/* Missions */}
            <Route path="/publishing-mission" element={<PublishingMission />} />
          </Routes>
        </main>

        {!isIsolatedPage && <Footer />}
      </div>
    </>
  );
}

export default App;
