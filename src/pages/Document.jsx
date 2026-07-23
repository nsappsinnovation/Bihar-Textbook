import Reg from "../components/documents/sections/Registerationform";
import Rti from "../components/documents/sections/Rti";
import { useParams } from "react-router-dom";
import { Docuconfig } from "../components/documents/Docuconfig";

const componentMap = {
  Reg,
  Rti,
};

const Document = () => {
  const { sectionId } = useParams();

  const sectionData = Docuconfig.find(
    section => section.id === sectionId
  );

  if (!sectionData) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h2 className="text-2xl font-black text-slate-800">Invalid Document Section</h2>
        <p className="text-slate-500 mt-2">The requested section could not be found.</p>
      </div>
    );
  }

  const ActiveComponent = componentMap[sectionData.component];

  return (
    <div className="min-h-screen bg-white">
      {/* No extra wrappers, the components handle their own layout */}
      <ActiveComponent />
    </div>
  );
};

export default Document;
