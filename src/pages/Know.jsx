import { useState } from "react";

import MDMessage from "../components/knowus/sections/MDMessage";
import BoardOfDirectors from "../components/knowus/sections/boardofmeetings";
import ListOfMD from "../components/knowus/sections/ListOfMD";
import OurEmployee from "../components/knowus/sections/OurEmployee";
import OrgStructure from "../components/knowus/sections/OrgStructure";
import RegisterPrinters from "../components/knowus/sections/RegisterPrinters";

import { useParams } from "react-router-dom";
import { Knowconfig } from "../components/knowus/Knowconfig";

const componentMap = {
  MDMessage,
  BoardOfDirectors,
  ListOfMD,
  OurEmployee,
  OrgStructure,

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
    <div className="min-h-screen">
      <ActiveComponent />
    </div>
  );
};

export default Know;
