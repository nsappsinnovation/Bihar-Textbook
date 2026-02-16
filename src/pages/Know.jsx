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
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">
        <ActiveComponent />
      </div>
    </div>
  );
};

export default Know;
