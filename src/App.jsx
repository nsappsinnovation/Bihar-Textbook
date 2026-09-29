import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { useTranslation } from "react-i18next";

import Nav from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

/* Lazily loaded Pages & Components */
const Blog = lazy(() => import("./pages/navbar_pages/Blog.jsx"));
const HomeV1 = lazy(() => import("./pages/home/HomeV1.jsx"));
const Tenders = lazy(() => import("./pages/Tenders"));
const CsrPolicy = lazy(() => import("./pages/CsrPolicy"));
const KnowUs = lazy(() => import("./pages/Know"));
const Books = lazy(() => import("./pages/navbar_pages/books/Books.jsx"));
const BookReader = lazy(() => import("./pages/navbar_pages/books/BookReader.jsx"));
const Flipbook = lazy(() => import("./pages/navbar_pages/books/Flipbook.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
const Rti = lazy(() => import("./pages/Rti.jsx"));
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
const AdminPortal = lazy(() => import("./admin/AdminPortal.jsx"));
const Developer = lazy(() => import("./pages/Developer.jsx"));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
    <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin"></div>
  </div>
);

function App() {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleLangChange = (lang) => {
      document.documentElement.lang = lang || 'en';
      if (lang === 'hi') {
        document.documentElement.classList.add('lang-hi');
        document.body.classList.add('lang-hi');
      } else {
        document.documentElement.classList.remove('lang-hi');
        document.body.classList.remove('lang-hi');
      }
    };

    handleLangChange(i18n.language);
    i18n.on('languageChanged', handleLangChange);
    return () => i18n.off('languageChanged', handleLangChange);
  }, [i18n]);

  const isIsolatedPage =
    location.pathname === "/login" ||
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
        {/* pt-[81px] = the fixed navbar's height (4px brand strip + 76px bar + 1px border),
            so pages start right under it with no gap.
            The padding under the fixed navbar is transparent, so the decorative
            body gradient used to show through it as a coloured band. Pages with
            a navbar paint their own white base over it. */}
        <main
          className={`flex-grow ${location.pathname !== "/" && !isNoNavPage ? "pt-[81px] bg-white" : ""
            }`}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* The home page (formerly the /v1 trial); /v1 stays as an alias for links already shared */}
              <Route path="/" element={<HomeV1 />} />
              <Route path="/v1" element={<Navigate to="/" replace />} />
              <Route path="/admin/*" element={<AdminPortal />} />

              {/* Core */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />

              {/* Auth */}
              <Route path="/login" element={<Login />} />

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

              {/* Gallery */}
              <Route path="/gallery/:sectionId" element={<Gallery />} />

              {/* Know Us */}
              <Route path="/know-us/:sectionId" element={<KnowUs />} />

              {/* Events */}
              <Route path="/notice-board" element={<NoticeBoard />} />

              {/* Other */}
              <Route path="/notice" element={<Notice />} />
              <Route path="/tenders" element={<Tenders />} />
              <Route path="/csr-policy" element={<CsrPolicy />} />
              <Route path="/rti" element={<Rti />} />
    
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

