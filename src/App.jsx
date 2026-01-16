import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FlagshipEvents from "./components/FlagshipEvents.jsx";
import StakeHolder from "./components/StakeHolder.jsx";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Notice from "./pages/Notice";
import Tenders from "./pages/Tenders";
import CsrPolicy from "./pages/CsrPolicy";

// Gallery
import PhotoGallery from "./pages/Photo_gallery";
import VideoGallery from "./pages/Video_gallery";
import PressRelease from "./pages/press_release";

// Documents
import RegistrationForm from "./pages/Registeration_form.jsx";
import Hrt from "./pages/Hrt";
import Rti from "./pages/Rti";

// Classes
import Class1 from "./pages/classes/Class1";
import Class2 from "./pages/classes/Class2";
import Class3 from "./pages/classes/Class3";
import Class4 from "./pages/classes/Class4";
import Class5 from "./pages/classes/Class5";
import Class6 from "./pages/classes/Class6";
import Class7 from "./pages/classes/Class7";
import Class8 from "./pages/classes/Class8";
import Class9 from "./pages/classes/Class9";
import Class10 from "./pages/classes/Class10";
import Class11 from "./pages/classes/Class11";
import Class12 from "./pages/classes/Class12";

// Management
import MdMessage from "./pages/md_mess.jsx";
import BoardOfDirectors from "./pages/board_of_directors.jsx";
import MdList from "./pages/list_of_md.jsx";
import OfficersList from "./pages/officers_list.jsx";
import Employees from "./pages/our_employee.jsx";
import OrgStructure from "./pages/organisational_struc.jsx";
import RegisteredPrinters from "./pages/register_printer.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-grow">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Gallery */}
            <Route path="/photo-gallery" element={<PhotoGallery />} />
            <Route path="/video-gallery" element={<VideoGallery />} />
            <Route path="/press-release" element={<PressRelease />} />

            {/* Documents */}
            <Route path="/registration-form" element={<RegistrationForm />} />
            <Route path="/hrt" element={<Hrt />} />
            <Route path="/rti" element={<Rti />} />

            {/* Classes */}
            <Route path="/class-1" element={<Class1 />} />
            <Route path="/class-2" element={<Class2 />} />
            <Route path="/class-3" element={<Class3 />} />
            <Route path="/class-4" element={<Class4 />} />
            <Route path="/class-5" element={<Class5 />} />
            <Route path="/class-6" element={<Class6 />} />
            <Route path="/class-7" element={<Class7 />} />
            <Route path="/class-8" element={<Class8 />} />
            <Route path="/class-9" element={<Class9 />} />
            <Route path="/class-10" element={<Class10 />} />
            <Route path="/class-11" element={<Class11 />} />
            <Route path="/class-12" element={<Class12 />} />

            {/* Management */}
            <Route path="/md-message" element={<MdMessage />} />
            <Route path="/board-of-directors" element={<BoardOfDirectors />} />
            <Route path="/md-list" element={<MdList />} />
            <Route path="/officers-list" element={<OfficersList />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/organisation-structure" element={<OrgStructure />} />
            <Route
              path="/registered-printers"
              element={<RegisteredPrinters />}
            />

            {/* Flagship Events */}
            <Route path="/flagship-events" element={<FlagshipEvents />} />

            {/* Other */}
            <Route path="/notice" element={<Notice />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/csr-policy" element={<CsrPolicy />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <FlagshipEvents />

        <StakeHolder />

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
