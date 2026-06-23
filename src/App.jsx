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
import Books from "./books/Books.jsx";
import BookReader from "./books/BookReader.jsx";
import Flipbook from "./books/Flipbook.jsx";
import Gallery from "./pages/Gallery.jsx";
import Document from "./pages/Document.jsx";
import FlagshipDetail from "./pages/FlagshipDetail.jsx";
import EventDetails from "./pages/EventDetails.jsx";
import Ling from "./linguistics/Ling.jsx";
import LingModule from "./linguistics/LingModule.jsx";
import PublishingMission from "./missions/PublishingMission.jsx";
import VrMission from "./missions/VrMission.jsx";
import SignLanguageMission from "./missions/SignLanguageMission.jsx";
import MultilingualMission from "./missions/MultilingualMission.jsx";
import AudiobooksMission from "./missions/AudiobooksMission.jsx";
import Sign from "./signLanguage/Signlanguage.jsx";
import SignLearn from "./signLanguage/SignLearn.jsx";
import SignModule from "./signLanguage/SignModule.jsx";
import SkillLearn from "./skills/SkillLearn.jsx";
import AiIntelligence from "./ai/AiIntelligence.jsx";
import CyberSecurity from "./cyberSecurity/CyberSecurity.jsx";
import HeritageArchive from "./heritage/HeritageArchive.jsx";
import Vr from "./vr/Vrlab.jsx";
import Linguistics from "./linguistics/Linguistics.jsx";

import Audio from "./audio/Audiolib.jsx";
import Trend1 from "./skills/TrendingSkills.jsx";
import Quiz2 from "./skills/Skillsquiz.jsx";

import Basicskill from "./skills/Basicskills.jsx";

import LifeSkills from "./skills/LifeSkills.jsx";
import HeritageDashboard from "./heritage/HeritageDashboard.jsx";
import AudioLibraryDashboard from "./audio/AudioLibraryDashboard.jsx";
import MyAudioLibrary from "./audio/MyAudioLibrary.jsx";
import AiIntelligenceDashboard from "./ai/AiIntelligenceDashboard.jsx";
import AiQuizChallenge from "./ai/AiQuizChallenge.jsx";
import ExploreAiTools from "./ai/ExploreAiTools.jsx";
import VrDashboard from "./vr/VrDashboard.jsx";
import VrLabsWorlds from "./vr/VrLabsWorlds.jsx";
import CyberSecurityDashboard from "./cyberSecurity/CyberSecurityDashboard.jsx";
import CollaborativeLearningViewAll from "./pages/CollaborativeLearningViewAll.jsx";

import PustakMela from "./missions/PustakMela.jsx";

import MobileLibrary from "./missions/MobileLibrary.jsx";

/* Components */
import KeyParticipantViewAll from "./components/KeyParticipantsViewAll";
import Contact from "./pages/Contact";
import Notice from "./components/Notice.jsx";
import NoticeBoard from "./components/NoticeBoard.jsx";
import Video from "./signLanguage/Signcourses.jsx";
import AiCourses from "./ai/AiCourses.jsx";
import Audiovideo from "./audio/Audiovideo.jsx";
import Vrcourse from "./vr/Arvideo.jsx";
import Digitalcourse from "./courses/Digitalvideo.jsx";
import MobileCourses from "./courses/MobileCourses.jsx";
import ArchiveCourses from "./courses/ArchiveCourses.jsx";

/* Auth */
import Login from "./auth/Login.jsx";
import SignUp from "./auth/SignUp.jsx";

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
            <Route path="/notice-board" element={<NoticeBoard />} />
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

