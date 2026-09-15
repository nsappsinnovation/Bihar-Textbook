import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Galleryconfig } from "../components/gallery/Galleryconfig";
import PhotoGallery from "../components/gallery/sections/Photogallery";
import VideoGallery from "../components/gallery/sections/Videogallery";
import PressRelease from "../components/gallery/sections/Pressrelease";

const componentMap = {
  PhotoGallery: PhotoGallery,
  VideoGallery: VideoGallery,
  PressRelease: PressRelease,
};

const Gallery = () => {
  const { sectionId } = useParams();
  const { t } = useTranslation();

  const sectionData = Galleryconfig.find(
    section => section.id === sectionId
  );

  if (!sectionData) {
    return (
      <div className="min-h-screen pt-32 text-center bg-white">
        <h2 className="text-2xl font-black text-slate-800">{t("galleryPage.errors.notFoundTitle")}</h2>
        <p className="text-slate-500 mt-2">{t("galleryPage.errors.notFoundDesc")}</p>
      </div>
    );
  }

  const ActiveComponent = componentMap[sectionData.component];

  if (!ActiveComponent) {
    return (
      <div className="min-h-screen pt-32 text-center bg-white">
        <h2 className="text-2xl font-black text-slate-800">{t("galleryPage.errors.maintenanceTitle")}</h2>
        <p className="text-slate-500 mt-2">{t("galleryPage.errors.maintenanceDesc")}</p>
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
