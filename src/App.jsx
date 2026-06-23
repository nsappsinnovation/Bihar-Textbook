import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";

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
import VrMission from "./pages/VrMission.jsx";
import SignLanguageMission from "./pages/SignLanguageMission.jsx";
import MultilingualMission from "./pages/MultilingualMission.jsx";
import AudiobooksMission from "./pages/AudiobooksMission.jsx";
import Sign from "./pages/Signlanguage.jsx";
import SignLearn from "./pages/SignLearn.jsx";
import SignModule from "./pages/SignModule.jsx";
import SkillLearn from "./pages/SkillLearn.jsx";
import AiIntelligence from "./pages/AiIntelligence.jsx";
import CyberSecurity from "./pages/CyberSecurity.jsx";
import HeritageArchive from "./pages/HeritageArchive.jsx";
import Vr from "./pages/Vrlab.jsx";
import Linguistics from "./pages/Linguistics.jsx";

import Audio from "./pages/Audiolib.jsx";
import Trend1 from "./pages/TrendingSkills.jsx";
import Quiz2 from "./pages/Skillsquiz.jsx";

import Basicskill from "./pages/Basicskills.jsx";

import LifeSkills from "./pages/LifeSkills.jsx";
import HeritageDashboard from "./pages/HeritageDashboard.jsx";
import AudioLibraryDashboard from "./pages/AudioLibraryDashboard.jsx";
import MyAudioLibrary from "./pages/MyAudioLibrary.jsx";
import AiIntelligenceDashboard from "./pages/AiIntelligenceDashboard.jsx";
import AiQuizChallenge from "./pages/AiQuizChallenge.jsx";
import ExploreAiTools from "./pages/ExploreAiTools.jsx";
import VrDashboard from "./pages/VrDashboard.jsx";
import VrLabsWorlds from "./pages/VrLabsWorlds.jsx";
import CyberSecurityDashboard from "./pages/CyberSecurityDashboard.jsx";
import CollaborativeLearningViewAll from "./pages/CollaborativeLearningViewAll.jsx";

import PustakMela from "./pages/PustakMela.jsx";

import MobileLibrary from "./pages/MobileLibrary.jsx";

/* Components */
import KeyParticipantViewAll from "./components/KeyParticipantsViewAll";
import Contact from "./pages/Contact";
import Notice from "./components/Notice.jsx";
import FlagshipEvents from "./components/FlagshipEvents.jsx";
import Video from "./components/Signcourses.jsx";
import AiCourses from "./components/AiCourses.jsx";
import Audiovideo from "./components/Audiovideo.jsx";
import Vrcourse from "./components/Arvideo.jsx";
import Digitalcourse from "./components/Digitalvideo.jsx";
import MobileCourses from "./components/MobileCourses.jsx";
import ArchiveCourses from "./components/ArchiveCourses.jsx";

/* Auth */
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";

import ScrollToTop from "./components/ScrollToTop";
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
    "/ai-intelligence", "/audio-books", 
    "/cyber-security", "/heritage-archive", 
    "/basic-skills", "/ling/words", "/ling/phrases", "/ling/conversations",
    "/pustak-mela", "/mobile-library",
    "/publishing-mission", "/vr-mission", "/sign-language-mission", "/multilingual-mission", "/audiobooks-mission"
  ].includes(location.pathname);

  const isNoNavPage =
    isIsolatedPage ||
    isMissionPage ||
    location.pathname.startsWith("/ling") ||
    [
      "/sign",
      "/sign-learn",
      "/sign-module",
      "/life-skills",
      "/heritage-dashboard",
      "/audio-library-dashboard",
      "/my-audio-library",
      "/ai-intelligence-dashboard",
      "/vr-dashboard",
      "/vr-labs-worlds",
      "/cyber-security-dashboard",
      "/ai-courses",
      "/ai-quiz-challenge",
      "/explore-ai-tools",
    ].includes(location.pathname);

  const isNoFooterPage =
    isIsolatedPage ||
    isMissionPage ||
    [
      "/life-skills",
      "/heritage-dashboard",
      "/audio-library-dashboard",
      "/my-audio-library",
      "/ai-intelligence-dashboard",
      "/vr-dashboard",
      "/vr-labs-worlds",
      "/cyber-security-dashboard",
      "/ai-courses",
      "/ai-quiz-challenge",
      "/explore-ai-tools",
      "/know-us/md-message",
    ].includes(location.pathname);

  return (
    <ReactLenis root>
      <ScrollToTop />
      {!isNoNavPage && <Nav />}

      <div className="min-h-screen flex flex-col">
        <main
          className={`flex-grow ${location.pathname !== "/" && !isNoNavPage ? "pt-24" : ""
            }`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/*" element={<AdminPortal />} />

            {/* Core */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Learning Modules */}
            <Route path="/sign" element={<Sign />} />
            <Route path="/sign-learn" element={<SignLearn />} />
            <Route path="/sign-module" element={<SignModule />} />
            <Route path="/skill-learn" element={<SkillLearn />} />

            {/* AI */}
            <Route path="/ai-intelligence" element={<AiIntelligence />} />
            <Route path="/ai-intelligence-dashboard" element={<AiIntelligenceDashboard />} />
            <Route path="/ai-courses" element={<AiCourses />} />
            <Route path="/ai-quiz-challenge" element={<AiQuizChallenge />} />
            <Route path="/explore-ai-tools" element={<ExploreAiTools />} />

            {/* VR */}
            <Route path="/vr" element={<Vr />} />
            <Route path="/vr-dashboard" element={<VrDashboard />} />
            <Route path="/vr-labs-worlds" element={<VrLabsWorlds />} />

            {/* Cyber */}
            <Route path="/cyber-security" element={<CyberSecurity />} />
            <Route path="/cyber-security-dashboard" element={<CyberSecurityDashboard />} />

            {/* Heritage */}
            <Route path="/heritage-archive" element={<HeritageArchive />} />
            <Route path="/heritage-dashboard" element={<HeritageDashboard />} />

            {/* Audio */}
            <Route path="/audio-books" element={<Audio />} />
            <Route path="/audio-library-dashboard" element={<AudioLibraryDashboard />} />
            <Route path="/my-audio-library" element={<MyAudioLibrary />} />

            {/* Linguistics */}
            <Route path="/ling" element={<Ling />} />
            <Route path="/ling/words" element={<LingModule type="words" />} />
            <Route path="/ling/phrases" element={<LingModule type="phrases" />} />
            <Route path="/ling/conversations" element={<LingModule type="conversations" />} />
            <Route path="/linguistic" element={<Linguistics />} />

            {/* Courses */}
            <Route path="/courses" element={<Video />} />
            <Route path="/audio-courses" element={<Audiovideo />} />
            <Route path="/ar-courses" element={<Vrcourse />} />
            <Route path="/digital-courses" element={<Digitalcourse />} />
            <Route path="/mobile-courses" element={<MobileCourses />} />
            <Route path="/archive-courses" element={<ArchiveCourses />} />

            {/* Skills */}
            <Route path="/basic-skills" element={<Basicskill />} />
            <Route path="/life-skills" element={<LifeSkills />} />
            <Route path="/trending/:slug" element={<Trend1 />} />
            <Route path="/quiz/:slug" element={<Quiz2 />} />

            {/* Books */}
            <Route path="/books/:classId" element={<Books />} />
            <Route path="/class/:classId/read/:bookSubject" element={<BookReader />} />
            <Route path="/book/:classId/:bookSubject/:chapterId/flip" element={<Flipbook />} />

            {/* Gallery & Docs */}
            <Route path="/gallery/:sectionId" element={<Gallery />} />
            <Route path="/documents/:sectionId" element={<Document />} />

            {/* Know Us */}
            <Route path="/know-us/:sectionId" element={<KnowUs />} />

            {/* Events */}
            <Route path="/flagship-events" element={<FlagshipEvents />} />
            <Route path="/flagship-events/:id" element={<FlagshipDetail />} />
            <Route path="/events/:eventSlug" element={<EventDetails />} />

            {/* Other */}
            <Route path="/notice" element={<Notice />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/csr-policy" element={<CsrPolicy />} />

            {/* Missions */}
            <Route path="/publishing-mission" element={<PublishingMission />} />
            <Route path="/vr-mission" element={<VrMission />} />
            <Route path="/sign-language-mission" element={<SignLanguageMission />} />
            <Route path="/multilingual-mission" element={<MultilingualMission />} />
            <Route path="/audiobooks-mission" element={<AudiobooksMission />} />
            <Route path="/pustak-mela" element={<PustakMela />} />

            <Route path="/mobile-library" element={<MobileLibrary />} />

            {/* Misc */}

            <Route path="/collaborative-learning" element={<CollaborativeLearningViewAll />} />
            <Route path="/key-participants" element={<KeyParticipantViewAll />} />
          </Routes>
        </main>

        {!isNoFooterPage && <Footer />}
      </div>
    </ReactLenis>
  );
}

export default App;