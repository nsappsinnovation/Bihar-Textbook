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
import Ling from "./pages/Ling.jsx";
import LingModule from "./pages/LingModule.jsx";
import PublishingMission from "./pages/PublishingMission.jsx";
import Sign from "./pages/Signlanguage.jsx";
import SignLearn from "./pages/SignLearn.jsx";
import AiIntelligence from "./pages/AiIntelligence.jsx";
import CyberSecurity from "./pages/CyberSecurity.jsx";
import HeritageArchive from "./pages/HeritageArchive.jsx";
import Vr from "./pages/Vrlab.jsx";
import Linguistics from "./pages/Linguistics.jsx";
import Digital from "./pages/DigitalPortal.jsx";
import Audio from "./pages/Audiolib.jsx";
import Trend1 from "./pages/TrendingSkills.jsx";
import Quiz2 from "./pages/Skillsquiz.jsx";
import Ebook  from "./pages/Ebook"
import Basicskill from "./pages/Basicskills.jsx"
import SignModule from "./pages/SignModule.jsx";
import PustakMela from "./pages/PustakMela.jsx"
import AssessmentPlatform from "./pages/AssessmentPlatform.jsx"
import RegionalContent from "./pages/RegionalContent.jsx"
import CurriculumExpo from "./pages/CurriculumExpo.jsx"

import LifeSkills from "./pages/LifeSkills.jsx";
import HeritageDashboard from "./pages/HeritageDashboard.jsx";
import AudioLibraryDashboard from "./pages/AudioLibraryDashboard.jsx";
import MyAudioLibrary from "./pages/MyAudioLibrary.jsx";
import AiIntelligenceDashboard from "./pages/AiIntelligenceDashboard.jsx";
import VrDashboard from "./pages/VrDashboard.jsx";
import CyberSecurityDashboard from "./pages/CyberSecurityDashboard.jsx";
import CollaborativeLearningViewAll from "./pages/CollaborativeLearningViewAll.jsx";

/* Components */
import KeyParticipantViewAll from "./components/KeyParticipantsViewAll";
import Contact from "./pages/Contact";
import Notice from "./components/Notice.jsx";
import FlagshipEvents from "./components/FlagshipEvents.jsx";
import Video from "./components/Signcourses.jsx";
import AiCourses from "./components/AiCourses.jsx";
import Audiovideo from "./components/Audiovideo.jsx";
import Vrcourse from "./components/Arvideo.jsx"
import Digitalcourse from "./components/Digitalvideo.jsx"
import MobileCourses from "./components/MobileCourses.jsx";
import ArchiveCourses from "./components/ArchiveCourses.jsx";

/* Auth */
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";


import ScrollToTop from "./components/ScrollToTop";
import Arvideo from "./components/Arvideo.jsx";
import Linguistic from "./pages/Linguistics.jsx";
import AdminPortal from "./admin/AdminPortal.jsx";


function App() {
  const location = useLocation();
  const isIsolatedPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/admin") ||
    location.pathname.includes("/flip");

  const isMissionPage = [
    "/ling", "/linguistic", "/vr", "/sign", "/sign-learn", "/sign-module",
    "/ai-intelligence", "/digital", "/audio-books", 
    "/cyber-security", "/heritage-archive", 
    "/basic-skills", "/ebook", "/ling/words", "/ling/phrases", "/ling/conversations"
  ].includes(location.pathname);

  // Pages with NO Navbar
  const isNoNavPage = isIsolatedPage || isMissionPage || location.pathname.startsWith("/ling") || location.pathname === "/sign" || location.pathname === "/sign-learn" || location.pathname === "/sign-module" || location.pathname === "/life-skills" || location.pathname === "/heritage-dashboard" || location.pathname === "/audio-library-dashboard" || location.pathname === "/my-audio-library" || location.pathname === "/ai-intelligence-dashboard" || location.pathname === "/vr-dashboard" || location.pathname === "/cyber-security-dashboard" || location.pathname === "/ai-courses";
  
  // Pages with NO Footer
  const isNoFooterPage = isIsolatedPage || isMissionPage || location.pathname === "/life-skills" || location.pathname === "/heritage-dashboard" || location.pathname === "/audio-library-dashboard" || location.pathname === "/my-audio-library" || location.pathname === "/ai-intelligence-dashboard" || location.pathname === "/vr-dashboard" || location.pathname === "/cyber-security-dashboard" || location.pathname === "/ai-courses";

  return (
    <>
      <ScrollToTop />
      {!isNoNavPage && <Nav />}

      <div className="min-h-screen flex flex-col">
        <main className={`flex-grow ${location.pathname !== '/' && !isNoNavPage ? 'pt-24' : ''}`}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* Admin Portal */}
            <Route path="/admin/*" element={<AdminPortal />} />

            {/* Blog */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/sign-learn" element={<SignLearn />} />
            <Route path="/sign-module" element={<SignModule />} />
            <Route path="/vr" element={<Vr />} />
            <Route path="/vr-dashboard" element={<VrDashboard />} />
            <Route path="/cyber-security-dashboard" element={<CyberSecurityDashboard />} />
             <Route path="/linguistic" element={<Linguistics />} />
              <Route path="/ebook" element={<Ebook />} />
            <Route path="/digital" element={<Digital />} />
            <Route path="/audio-books" element={<Audio />} />
            <Route path="/ai-intelligence" element={<AiIntelligence />} />
            <Route path="/ai-intelligence-dashboard" element={<AiIntelligenceDashboard />} />
            <Route path="/cyber-security" element={<CyberSecurity />} />
            <Route path="/heritage-archive" element={<HeritageArchive />} />
            <Route path="/heritage-dashboard" element={<HeritageDashboard />} />
            <Route path="/audio-library-dashboard" element={<AudioLibraryDashboard />} />
            <Route path="/my-audio-library" element={<MyAudioLibrary />} />
            <Route path="/courses" element={<Video />} />
            <Route path="/audio-courses" element={< Audiovideo />} />
            <Route path="/ar-courses" element={< Vrcourse />} />
            <Route path="/digital-courses" element={< Digitalcourse />} />
             <Route path="/ling" element={<Ling />} />
             <Route path="/ling/words" element={<LingModule type="words" />} />
             <Route path="/ling/phrases" element={<LingModule type="phrases" />} />
             <Route path="/ling/conversations" element={<LingModule type="conversations" />} />
            <Route path="/ai-courses" element={<AiCourses />} />
            <Route path="/mobile-courses" element={<MobileCourses />} />
            <Route path="/archive-courses" element={<ArchiveCourses />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/*Basic skills page and cybersecurity*/}
            <Route path="/basic-skills" element={<Basicskill />} />
            <Route path="/life-skills" element={<LifeSkills />} />

            <Route path="/trending/:slug" element={<Trend1 />} />

            <Route path="/quiz/:slug" element={<Quiz2 />} />
            {/* Key Participants */}
            <Route
              path="/key-participants"
              element={<KeyParticipantViewAll />}
            />

            {/* Contact */}
            <Route path="/contact" element={<Contact />} />
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
            <Route path="/pustak-mela" element={<PustakMela />} />
            <Route path="/assessment-platform" element={<AssessmentPlatform />} />
            <Route path="/regional-content" element={<RegionalContent />} />
            <Route path="/curriculum-expo" element={<CurriculumExpo />} />
            

            <Route path="/collaborative-learning" element={<CollaborativeLearningViewAll />} />
          </Routes>
        </main>

        {!isNoFooterPage && <Footer />}
      </div>
    </>
  );
}

export default App;
