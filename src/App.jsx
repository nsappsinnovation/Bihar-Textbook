
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Navbar.jsx";

import KnowUs from "./pages/Know";
import Books from './pages/Books.jsx';
import Gallery from "./pages/Gallery.jsx";
import Document from "./pages/Document.jsx";
import Footer from "./components/Footer.jsx";

import FlagshipEvents from "./components/FlagshipEvents.jsx";
import StakeHolder from "./components/StakeHolder.jsx";
import KeyParticipant from "./components/KeyParticipant.jsx";
import ContactUs from "./components/ContactUs.jsx";


import Home from "./pages/Home";
import KeyParticipantViewAll from "./components/KeyParticipantsViewAll";
import Contact from "./pages/Contact";
import Notice from "./pages/Notice";
import Tenders from "./pages/Tenders";
import CsrPolicy from "./pages/CsrPolicy";
import Esec from './components/EventsSection.jsx'





function App() {
  return (
    <BrowserRouter>
      {/* Home */}
      <Nav />

      <div className='min-h-screen flex flex-col'>
        <main className="flex-grow">
          <Routes>


      
    
            {/* Home */}

    <div className='min-h-screen flex flex-col'>
       <Esec ></Esec>
    <main className="flex-grow">
        <Routes>
                  {/* Gallery */}
            <Route path="/gallery/:sectionId" element={<Gallery />} />
          {/* Documents */}
         <Route path="/documents/:sectionId" element={<Document />} />

          {/* Classes */}
           <Route path="/books/:classId" element={<Books />} />
          {/* Management */}
           <Route path="/know-us/:sectionId" element={<KnowUs />} />

      

           

         

            <Route path="/" element={<Home />} />
 

            {/* Key Participants View All Page */}
            <Route path="/key-participants" element={<KeyParticipantViewAll />} />

            {/* Gallery */}
          

           
            {/* Classes */}
          

            {/* Flagship Events */}
            <Route path="/flagship-events" element={<FlagshipEvents />} />

            {/* Other */}
            <Route path="/notice" element={<Notice />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/csr-policy" element={<CsrPolicy />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
