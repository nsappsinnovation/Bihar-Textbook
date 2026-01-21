import { useState } from "react";

import Hrt from "../components/documents/sections/Hrt";
import Reg from "../components/documents/sections/Registerationform";
import Rti from "../components/documents/sections/Rti";

import { useParams } from "react-router-dom";

import { Docuconfig } from "../components/documents/Docuconfig";

const componentMap = {
  Hrt,
  Reg,
  Rti,
  
};

const Document = () => {
  const { sectionId } = useParams();

  // 🔥 EXACTLY LIKE books.json logic
  const sectionData = Docuconfig.find(
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

export default Document;
