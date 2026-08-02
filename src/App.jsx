import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";

import Nav from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

/* Lazily loaded Pages & Components */
const Blog = lazy(() => import("./pages/navbar_pages/Blog.jsx"));
const Home = lazy(() => import("./pages/Home"));
const Tenders = lazy(() => import("./pages/Tenders"));
const CsrPolicy = lazy(() => import("./pages/CsrPolicy"));
const KnowUs = lazy(() => import("./pages/Know"));
const Books = lazy(() => import("./pages/navbar_pages/books/Books.jsx"));
const BookReader = lazy(() => import("./pages/navbar_pages/books/BookReader.jsx"));
const Flipbook = lazy(() => import("./pages/navbar_pages/books/Flipbook.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
const Document = lazy(() => import("./pages/Document.jsx"));
const Ling = lazy(() => import("./linguistics/Ling.jsx"));
const LingModule = lazy(() => import("./linguistics/LingModule.jsx"));
const Sign = lazy(() => import("./signLanguage/Signlanguage.jsx"));
const SignLearn = lazy(() => import("./signLanguage/SignLearn.jsx"));
const Linguistics = lazy(() => import("./linguistics/Linguistics.jsx"));
const Audio = lazy(() => import("./audio/Audiolib.jsx"));
const Basicskill = lazy(() => import("./skills/Basicskills.jsx"));
const LifeSkills = lazy(() => import("./skills/LifeSkills.jsx"));
const HeritageDashboard = lazy(() => import("./heritage/HeritageDashboard.jsx"));
const AudioLibraryDashboard = lazy(() => import("./audio/AudioLibraryDashboard.jsx"));
const MyAudioLibrary = lazy(() => import("./audio/MyAudioLibrary.jsx"));
const AiIntelligenceDashboard = lazy(() => import("./ai/AiIntelligenceDashboard.jsx"));
const VrDashboard = lazy(() => import("./vr/VrDashboard.jsx"));
const CyberSecurityDashboard = lazy(() => import("./cyberSecurity/CyberSecurityDashboard.jsx"));
const VrTechLearning = lazy(() => import("./vr/VrTechLearning.jsx"));
const Contact = lazy(() => import("./pages/Contact"));
const Notice = lazy(() => import("./pages/navbar_pages/Notice.jsx"));
const NoticeBoard = lazy(() => import("./pages/navbar_pages/NoticeBoard.jsx"));
const Login = lazy(() => import("./auth/Login.jsx"));
const SignUp = lazy(() => import("./auth/SignUp.jsx"));
const AdminPortal = lazy(() => import("./admin/AdminPortal.jsx"));
const Developer = lazy(() => import("./pages/Developer.jsx"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
    <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
  </div>
);

function App() {
  const location = useLocation();

  const isIsolatedPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/admin") ||
    location.pathname.includes("/flip") ||
    location.pathname === "/ling/conversations";

  const isMissionPage = [
    "/ling", "/linguistic", "/vr", "/sign", "/sign-learn", "/sign-module",
     "/audio-books", 
    "/cyber-security", "/heritage-archive", 
    "/basic-skills", "/ling/words", "/ling/phrases", "/ling/conversations",
    "/pustak-mela", "/mobile-library"
  ].includes(location.pathname);

  const isNoNavPage = isIsolatedPage;

  const isNoFooterPage =
    isIsolatedPage ||
    [
      "/know-us/md-message",
    ].includes(location.pathname);

  return (
    <ReactLenis root>
      <Toaster position="top-right" />
      <ScrollToTop />
      {!isNoNavPage && <Nav />}

      <div className="min-h-screen flex flex-col">
        <main
          className={`flex-grow ${location.pathname !== "/" && !isNoNavPage ? "pt-24" : ""
            }`}
        >
          <Suspense fallback={<LoadingFallback />}>
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

              {/* AI */}
              
              <Route path="/ai-intelligence-dashboard" element={<AiIntelligenceDashboard />} />
              
              {/* VR */}
              <Route path="/vr-dashboard" element={<VrDashboard />} />
              

              {/* Cyber */}
             
              <Route path="/cyber-security-dashboard" element={<CyberSecurityDashboard />} />

              {/* Heritage */}
             
              <Route path="/heritage-dashboard" element={<HeritageDashboard />} />

              {/* Audio */}
              <Route path="/audio-books" element={<Audio />} />
              <Route path="/audio-library-dashboard" element={<AudioLibraryDashboard />} />
              <Route path="/my-audio-library" element={<AudioLibraryDashboard />} />

              {/* Linguistics */}
              <Route path="/ling" element={<Ling />} />
              <Route path="/ling/words" element={<LingModule type="words" />} />
              <Route path="/ling/phrases" element={<LingModule type="phrases" />} />
              <Route path="/ling/conversations" element={<LingModule type="conversations" />} />
              <Route path="/linguistic" element={<Linguistics />} />

              {/* Courses */}




              {/* Skills */}
              <Route path="/basic-skills" element={<Basicskill />} />
              <Route path="/life-skills" element={<LifeSkills />} />


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

              {/* Other */}
              <Route path="/notice" element={<Notice />} />
              <Route path="/tenders" element={<Tenders />} />
              <Route path="/csr-policy" element={<CsrPolicy />} />
    
              {/* Misc */}
              <Route path="/developer" element={<Developer />} />
            </Routes>
          </Suspense>
        </main>

        {!isNoFooterPage && <Footer />}
      </div>
    </ReactLenis>
  );
}

export default App;

