import { useState } from "react";

import MDMessage from "../components/knowus/sections/MDMessage";
import BoardOfDirectors from "../components/knowus/sections/boardofmeetings";
import ListOfMD from "../components/knowus/sections/ListOfMD";
import OfficersList from "../components/knowus/sections/OfficersList";
import OurEmployee from "../components/knowus/sections/OurEmployee";
import OrgStructure from "../components/knowus/sections/OrgStructure";
import RegisterPrinters from "../components/knowus/sections/RegisterPrinters";
import Wholesellers from "../components/knowus/sections/Wholesellerdepo";
import { useParams } from "react-router-dom";
import { Knowconfig } from "../components/knowus/Knowconfig";

const componentMap = {
  MDMessage,
  BoardOfDirectors,
  ListOfMD,
  OfficersList,
  OurEmployee,
  OrgStructure,
   Wholesellers,
  RegisterPrinters
};

const Know = () => {
  const { sectionId } = useParams();

  // 🔥 EXACTLY LIKE books.json logic
  const sectionData = Knowconfig.find(
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

export default Know;
