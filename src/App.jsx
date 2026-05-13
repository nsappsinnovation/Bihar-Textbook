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
import PublishingMission from "./pages/PublishingMission.jsx";
import Sign from "./pages/Signlanguage.jsx";
import AiIntelligence from "./pages/AiIntelligence.jsx";
import TeacherTraining from "./pages/TeacherTraining.jsx";
import MobileLibrary from "./pages/MobileLibrary.jsx";
import HeritageArchive from "./pages/HeritageArchive.jsx";
import Vr from "./pages/Vrlab.jsx";
import Linguistics from "./pages/Linguistics.jsx";
import Digital from "./pages/DigitalPortal.jsx";
import Audio from "./pages/Audiolib.jsx";
import Trend1 from "./pages/TrendingSkills.jsx";
import Trend2 from "./pages/Trendingcyber.jsx";
import Quiz1 from "./pages/Quizcyber.jsx";
import Quiz2 from "./pages/Skillsquiz.jsx";
import Cyber from "./pages/CyberSecurity"
import Ebook  from "./pages/Ebook"
import Basicskill from "./pages/Basicskills.jsx"
import PustakMela from "./pages/PustakMela.jsx"
import AssessmentPlatform from "./pages/AssessmentPlatform.jsx"
import RegionalContent from "./pages/RegionalContent.jsx"
import CurriculumExpo from "./pages/CurriculumExpo.jsx"
import EventsViewAll from "./pages/EventsViewAll.jsx";
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
import TeacherCourses from "./components/TeacherCourses.jsx";
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

  return (
    <>
      <ScrollToTop />
      {!isIsolatedPage && <Nav />}

      <div className="min-h-screen flex flex-col">
        <main className={`flex-grow ${location.pathname !== '/' && !isIsolatedPage ? 'pt-24' : ''}`}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* Admin Portal */}
            <Route path="/admin/*" element={<AdminPortal />} />

            {/* Blog */}
            <Route path="/blog" element={<Blog />} />
            {/*Sign Lang*/}
            <Route path="/sign" element={<Sign />} />
            <Route path="/vr" element={<Vr />} />
             <Route path="/linguistic" element={<Linguistics />} />
              <Route path="/ebook" element={<Ebook />} />
            <Route path="/digital" element={<Digital />} />
            <Route path="/audio-books" element={<Audio />} />
            <Route path="/ai-intelligence" element={<AiIntelligence />} />
            <Route path="/teacher-training" element={<TeacherTraining />} />
            <Route path="/mobile-library" element={<MobileLibrary />} />
            <Route path="/heritage-archive" element={<HeritageArchive />} />
            <Route path="/courses" element={<Video />} />
            <Route path="/audio-courses" element={< Audiovideo />} />
            <Route path="/ar-courses" element={< Vrcourse />} />
            <Route path="/digital-courses" element={< Digitalcourse />} />
             <Route path="/ling" element={<Ling />} />
            <Route path="/ai-courses" element={<AiCourses />} />
            <Route path="/teacher-courses" element={<TeacherCourses />} />
            <Route path="/mobile-courses" element={<MobileCourses />} />
            <Route path="/archive-courses" element={<ArchiveCourses />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/*Basic skills page and cybersecurity*/}
            <Route path="/basic-skills" element={<Basicskill />} />

            <Route path="/trending/:slug" element={<Trend1 />} />
            <Route path="/quiz/:slug" element={<Quiz1 />} />

            <Route path="/cyber-security" element={<Cyber />} />
            <Route path="/cyber/trending/:slug" element={<Trend2 />} />
            <Route path="/cyber/quiz/:slug" element={<Quiz2 />} />
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
            
            <Route path="/events-all" element={<EventsViewAll />} />
            <Route path="/collaborative-learning" element={<CollaborativeLearningViewAll />} />
          </Routes>
        </main>

        {!isIsolatedPage && <Footer />}
      </div>
    </>
  );
}

export default App;
