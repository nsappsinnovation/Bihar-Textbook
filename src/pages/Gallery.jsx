import { useState } from "react";
import { useParams } from "react-router-dom";
import { Galleryconfig } from "../components/gallery/Galleryconfig";

const componentMap = {
  // Components for gallery sections would go here
};

const Gallery = () => {
  const { sectionId } = useParams();

  const sectionData = Galleryconfig.find(
    section => section.id === sectionId
  );

  if (!sectionData) {
    return (
      <div className="min-h-screen pt-32 text-center bg-white">
        <h2 className="text-2xl font-black text-slate-800">Section Not Found</h2>
        <p className="text-slate-500 mt-2">The requested gallery section could not be found.</p>
      </div>
    );
  }

  const ActiveComponent = componentMap[sectionData.component];

  if (!ActiveComponent) {
    return (
      <div className="min-h-screen pt-32 text-center bg-white">
        <h2 className="text-2xl font-black text-slate-800">Section Under Maintenance</h2>
        <p className="text-slate-500 mt-2">This gallery section is currently being updated. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ActiveComponent />
    </div>
  );
};

export default Gallery;
