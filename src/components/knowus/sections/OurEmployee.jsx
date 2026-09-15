import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';
import { getDirectory } from '../../../services/directoryService';

const OurEmployee = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);

  // Employees are managed in Admin → Our Employee (employment type is stored in `tag`)
  useEffect(() => {
    getDirectory('employee')
      .then((rows) => setEmployees(
        rows
          .filter((row) => row.tag !== 'Outsource')
          .map((row) => ({
            id: row.id,
            name: row.name,
            designation: row.designation || '',
            type: row.tag || 'Regular',
            department: row.department || '',
          }))
      ))
      .catch(() => setEmployees([]));
  }, []);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.type || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
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
          {t("knowUsPage.ourEmployee.titlePart1", "Our")} <span className="text-blue-600">{t("knowUsPage.ourEmployee.titleHighlight", "Employees")}</span>
        </motion.h1>
        
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          {t("knowUsPage.ourEmployee.subtitle", "Our team of educators, professionals, and innovators works together to make quality education accessible, inclusive, and impactful for every learner in Bihar.")}
        </p>
      </section>

      
      {/* ================= EMPLOYEE LIST SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="bg-transparent border border-slate-300 overflow-hidden font-sans">
          <div className="p-6 border-b border-slate-300 flex flex-col md:flex-row justify-between items-center gap-6 bg-transparent">
            <div>
              <h3 className="text-lg font-bold text-[#0d0e23]">{t("knowUsPage.ourEmployee.directoryTitle", "Employee Directory")}</h3>
              <p className="text-xs text-slate-500">{t("knowUsPage.ourEmployee.directorySubtitle", "Official registry of BSTBPC staff members")}</p>
            </div>
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder={t("knowUsPage.ourEmployee.searchPlaceholder", "Search by name, role or dept...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-2 bg-transparent border border-slate-300 focus:border-blue-500 transition-all outline-none text-sm text-[#0d0e23]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-200 border-b border-slate-300 text-[#0d0e23]">
                  <th className="w-20 px-4 py-4 text-sm font-bold border-r border-slate-300 text-center">{t("knowUsPage.ourEmployee.colSNo", "S.No.")}</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">{t("knowUsPage.ourEmployee.colName", "Name")}</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">{t("knowUsPage.ourEmployee.colDesignation", "Designation")}</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">{t("knowUsPage.ourEmployee.colType", "Type")}</th>
                  <th className="px-6 py-4 text-sm font-bold">{t("knowUsPage.ourEmployee.colDept", "Department")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {filteredEmployees.map((emp, index) => (
                  <tr key={emp.id} className="text-[#0d0e23]">
                    <td className="px-6 py-4 text-sm border-r border-slate-300 font-mono text-slate-600 font-bold text-center">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm border-r border-slate-300 font-semibold">
                      {emp.name}
                    </td>
                    <td className="px-6 py-4 text-sm border-r border-slate-300">
                      {emp.designation}
                    </td>
                    <td className="px-6 py-4 text-sm border-r border-slate-300">
                      {emp.type}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-600">
                        {emp.department}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="py-10 text-center text-slate-500">
               <p className="text-sm">{t("knowUsPage.ourEmployee.noResults", "No employees found matching your search.")}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OurEmployee;
