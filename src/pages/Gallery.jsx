import { useState } from "react";

import PhotoGallery from "../components/gallery/sections/Photogallery";
import VideoGallery from "../components/gallery/sections/Videogallery";
import PressRelease from "../components/gallery/sections/Pressrelease";

import { useParams } from "react-router-dom";

import { Galleryconfig } from "../components/gallery/Galleryconfig";

const componentMap = {
  PhotoGallery,
  VideoGallery,
  PressRelease,
  
};

const Gallery = () => {
  const { sectionId } = useParams();

  // 🔥 EXACTLY LIKE books.json logic
  const sectionData = Galleryconfig.find(
    section => section.id === sectionId
  );

  if (!sectionData) {
    return <p>Invalid Know Us section</p>;
  }

  const ActiveComponent = componentMap[sectionData.component];

  return (
    <div style={{ padding: "20px" }}>
      <h2>{sectionData.title}</h2>

      {/* Content Area — BOOKS STYLE */}
      <div style={{ marginTop: "20px" }}>
        <ActiveComponent />
      </div>
    </div>
  );
};

export default Gallery;
