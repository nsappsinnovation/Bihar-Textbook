import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getDirectory } from '../../../services/directoryService';

const BoardOfDirectors = () => {
  const { t, i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [items, setItems] = React.useState([]);

  // Board members are managed in Admin → Know Us → Board of Directors
  React.useEffect(() => {
    getDirectory('board_member')
      .then((rows) => setItems(rows.map((row) => ({
        id: row.id,
        name: row.name,
        designation: row.designation,
        from: row.tenureFrom || (isHindi ? "वर्तमान" : "Current"),
        status: row.status || "Active",
      }))))
      .catch(() => setItems([]));
  }, [isHindi]);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative text-center mb-16 px-6">
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-[#0d0e23] tracking-tight mb-4"
        >
          {t("knowUsPage.boardOfDirectors.titlePart1", "Board of")} <span className="text-blue-600">{t("knowUsPage.boardOfDirectors.titleHighlight", "Directors")}</span>
        </motion.h1>
        
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          {t("knowUsPage.boardOfDirectors.subtitle", "The governing body responsible for strategic decision making and oversight of the Corporation's operations.")}
        </p>
      </section>

      {/* ================= DIRECTORS TABLE ================= */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
         <div className="overflow-x-auto bg-transparent border border-slate-300">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-200 border-b border-slate-300 text-[#0d0e23]">
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">{t("knowUsPage.boardOfDirectors.colName", "Name")}</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">{t("knowUsPage.boardOfDirectors.colDesignation", "Designation")}</th>
                  <th className="px-6 py-4 text-sm font-bold">{t("knowUsPage.boardOfDirectors.colSince", "Since")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {items.map((member) => (
                  <tr key={member.id} className="text-[#0d0e23]">
                    <td className="px-6 py-4 text-sm border-r border-slate-300 font-semibold">{member.name}</td>
                    <td className="px-6 py-4 text-sm border-r border-slate-300">{member.designation}</td>
                    <td className="px-6 py-4 text-sm">{member.from}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </section>
    </div>
  );
};

export default BoardOfDirectors;
