import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getDirectory } from '../../../services/directoryService';

const ListOfMD = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState(null); // null while loading

  // Past MDs are managed in Admin → Know Us → List of MD
  useEffect(() => {
    getDirectory('past_md')
      .then((rows) => setList(rows.map((row) => ({
        id: row.id,
        name: row.name,
        from: row.tenureFrom,
        to: row.tenureTo,
      }))))
      .catch(() => setList([]));
  }, []);

  const filteredList = (list || []).filter(md => 
    md.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      {/* ================= HERO SECTION ================= */}
      <section className="relative text-center mb-16 px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-[#0d0e23] tracking-tight mb-4"
        >
          {t("knowUsPage.listOfMd.titlePart1", "Legacy of")} <span className="text-blue-600">{t("knowUsPage.listOfMd.titleHighlight", "Leadership")}</span>
        </motion.h1>
        
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          {t("knowUsPage.listOfMd.subtitle", "Honoring the Managing Directors who have shaped the journey and success of Bihar State Text Book Publishing Corporation Ltd.")}
        </p>
      </section>

      {/* ================= TABLE SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="w-full bg-transparent border border-slate-300 overflow-hidden font-sans">
          {/* SEARCH & STATS BAR */}
          <div className="bg-transparent border-b border-slate-300 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
               <div>
                  <h3 className="text-lg font-bold text-[#0d0e23]">{t("knowUsPage.listOfMd.cardTitle", "Official Directory")}</h3>
               </div>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Search className="h-4 w-4 text-slate-400" />
               </div>
               <input
                 type="text"
                 placeholder={t("knowUsPage.listOfMd.searchPlaceholder", "Search by name...")}
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-11 pr-4 py-2 bg-transparent border border-slate-300 text-sm focus:border-blue-500 transition-all outline-none text-[#0d0e23]"
               />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-200 border-b border-slate-300 text-[#0d0e23]">
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">{t("knowUsPage.listOfMd.colSNo", "S.No.")}</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">{t("knowUsPage.listOfMd.colMd", "Managing Director")}</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300 text-center">{t("knowUsPage.listOfMd.colFrom", "From")}</th>
                  <th className="px-6 py-4 text-sm font-bold text-center">{t("knowUsPage.listOfMd.colTo", "To")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {filteredList.map((md, index) => (
                  <tr key={md.id} className="text-[#0d0e23]">
                    <td className="px-6 py-4 text-sm border-r border-slate-300">
                      {(index + 1).toString().padStart(2, '0')}
                    </td>

                    <td className="px-6 py-4 text-sm border-r border-slate-300">
                      <div className="flex flex-col">
                          <span className="font-semibold">{md.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm border-r border-slate-300 text-center">
                        {md.from}
                    </td>

                    <td className="px-6 py-4 text-sm text-center">
                        {md.to}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {list === null ? <div className="flex justify-center gap-1.5 py-10" aria-label="Loading">{[0, 1, 2].map((i) => <span key={i} className="w-2 h-2 rounded-full bg-slate-300 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />)}</div> : filteredList.length === 0 && (
               <div className="text-center py-10">
                  <p className="text-slate-500 text-sm">
                    {list.length === 0
                      ? t("knowUsPage.listOfMd.empty", "The list of Managing Directors will be published here soon.")
                      : t("knowUsPage.listOfMd.noResults", { term: searchTerm, defaultValue: `No records matching "${searchTerm}"` })}
                  </p>
               </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-300 flex justify-end">
             <span className="text-sm text-slate-600">
                {t("knowUsPage.listOfMd.totalRecords", { count: (list || []).length, defaultValue: `Total Records: ${(list || []).length}` })}
             </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListOfMD;
