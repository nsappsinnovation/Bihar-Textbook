import React, { useState } from 'react';
import { Search, Calendar, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion'; 

const mdList = [
  { id: 1, name: "Sri Sunny Sinha", from: "29/11/2023", to: "29/04/2024", photo: "", current: false },
  { id: 2, name: "Sri Baidya Nath Yadav, IAS", from: "09/04/2023", to: "29/11/2023", photo: "", current: false },
  { id: 3, name: "Shri Manoj Kumar I.A.S", from: "05/08/2021", to: "31/12/2022", photo: "", current: false },
  { id: 4, name: "Dr. Ranjit Kumar Singh I.A.S", from: "18/09/2019", to: "30/07/2021", photo: "", current: false },
  { id: 5, name: "Shri Arvind Kumar Verma I.A.S", from: "14/05/2018", to: "31/08/2019", photo: "", current: false },
  { id: 6, name: "Shri M. Ramchandrudu I.A.S", from: "31/10/2016", to: "14/05/2018", photo: "", current: false },
  { id: 7, name: "Shri Vishaw Mohan Patel I.A.S", from: "04/07/2015", to: "31/10/2016", photo: "", current: false },
  { id: 8, name: "Shri K. Senthil Kumar I.A.S", from: "06/04/2015", to: "04/07/2015", photo: "", current: false },
  { id: 9, name: "Shri Dilip Kumar I.A.S", from: "18/12/2014", to: "06/04/2015", photo: "", current: false },
  { id: 10, name: "Shri J.K.P. Singh I.R.P.S", from: "28/09/2011", to: "18/12/2014", photo: "", current: false },
  { id: 11, name: "Shri Ashutosh I.A.S", from: "06/05/2009", to: "28/09/2011", photo: "", current: false },
  { id: 12, name: "Hasnain Ahmad I.A.S", from: "18/03/2008", to: "30/04/2009", photo: "", current: false },
  { id: 13, name: "Freaq Ahmad I.A.S", from: "11/06/2007", to: "17/03/2008", photo: "", current: false },
  { id: 14, name: "Shri Ashok Kumar Singh I.A.S", from: "07/05/2007", to: "30/06/2007", photo: "", current: false },
  { id: 15, name: "Shri Vaidhnath Mishra I.A.S", from: "04/03/2006", to: "30/04/2007", photo: "", current: false },
  { id: 16, name: "Shri Ashok Kumar Singh I.A.S", from: "10/02/2006", to: "23/02/2006", photo: "", current: false },
  { id: 17, name: "Shri R.S.B. Singh I.A.S", from: "15/04/2005", to: "31/12/2005", photo: "", current: false },
  { id: 18, name: "Shri Maheshwar Prasad Singh I.A.S", from: "04/01/2001", to: "14/04/2005", photo: "", current: false },
  { id: 19, name: "Shri Vaidhnath Prasad I.A.S", from: "16/12/2000", to: "03/01/2001", photo: "", current: false },
  { id: 20, name: "Shri Avinash Kumar I.A.S", from: "19/05/2000", to: "27/11/2000", photo: "", current: false },
  { id: 21, name: "Shri Arvind Kumar Choudhary I.A.S", from: "20/08/1999", to: "14/05/2000", photo: "", current: false },
  { id: 22, name: "Shri W.N. Singh B.A.S", from: "06/10/1998", to: "19/08/1999", photo: "", current: false },
  { id: 23, name: "Shri Dipak Kumar I.A.S", from: "09/07/1998", to: "05/10/1998", photo: "", current: false },
  { id: 24, name: "Shri S. Shamimuddin I.A.S", from: "01/12/1997", to: "08/07/1998", photo: "", current: false },
  { id: 25, name: "Shri Badunath Prasad Rai I.A.S", from: "26/09/1996", to: "30/11/1997", photo: "", current: false },
  { id: 26, name: "Shri Vishnu Kumar I.A.S", from: "26/07/1996", to: "21/09/1996", photo: "", current: false },
  { id: 27, name: "Shri Vijay Prakash I.A.S", from: "03/06/1995", to: "26/07/1996", photo: "", current: false },
  { id: 28, name: "Shri Ram Krishan Khandelwal I.A.S", from: "13/07/1994", to: "13/06/1995", photo: "", current: false },
  { id: 29, name: "Shri B.P. Choudhary I.A.S", from: "07/12/1992", to: "15/04/1993", photo: "", current: false },
  { id: 30, name: "Shri Indu Shekhar Chaturvedi I.A.S", from: "01/10/1992", to: "07/12/1992", photo: "", current: false },
  { id: 31, name: "Shri A.B. Chaturvedi I.A.S", from: "28/02/1992", to: "01/10/1992", photo: "", current: false },
  { id: 32, name: "Shri Phool Singh I.A.S", from: "28/08/1991", to: "28/02/1992", photo: "", current: false },
  { id: 33, name: "Shri N.K. Sinha I.A.S", from: "05/06/1991", to: "28/08/1991", photo: "", current: false },
  { id: 34, name: "Shri B. Ram", from: "14/10/1977", to: "16/12/1977", photo: "", current: false },
  { id: 35, name: "Shri B.P. Sinha", from: "17/07/1975", to: "14/10/1977", photo: "", current: false },
  { id: 36, name: "Shri Mithilesh Kumar I.A.S", from: "13/06/1989", to: "05/06/1991", photo: "", current: false },
  { id: 37, name: "Shri H.K. Prasad I.A.S", from: "07/12/1986", to: "13/06/1989", photo: "", current: false },
  { id: 38, name: "Shri A.K. Dubey I.A.S", from: "06/12/1986", to: "07/12/1986", photo: "", current: false },
  { id: 39, name: "Shri Pancham Lal I.A.S", from: "22/05/1986", to: "25/11/1986", photo: "", current: false },
  { id: 40, name: "Shri B.N. Choudhary I.A.S", from: "12/09/1984", to: "22/05/1986", photo: "", current: false },
  { id: 41, name: "Shri R.C.P. Verma", from: "15/10/1980", to: "08/06/1981", photo: "", current: false },
  { id: 42, name: "Shrimati Krishna Singh I.A.S", from: "16/12/1977", to: "07/06/1978", photo: "", current: false },
  { id: 43, name: "Shri R.N. Rai", from: "08/06/1981", to: "14/07/1981", photo: "", current: false },
  { id: 44, name: "Shri R.S. Chaube", from: "05/03/1975", to: "17/07/1975", photo: "", current: false }
];

// Helper to generate initials
const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

const ListOfMD = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = mdList.filter(md => 
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
          Legacy of <span className="text-blue-600">Leadership</span>
        </motion.h1>
        
        <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed font-medium">
          Honoring the Managing Directors who have shaped the journey and success of Bihar State Text Book Publishing Corporation.
        </p>
      </section>

      {/* ================= TABLE SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="w-full bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden font-sans">
          {/* SEARCH & STATS BAR */}
          <div className="bg-slate-50/50 border-b border-slate-100 p-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-100">
                  <User />
               </div>
               <div>
                  <h3 className="text-lg font-black text-[#0d0e23]">Official Directory</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Chronological List of MDs</p>
               </div>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
               <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                 <Search className="h-4 w-4 text-slate-400" />
               </div>
               <input
                 type="text"
                 placeholder="Search by name..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium"
               />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">#</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Managing Director</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Appointment Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tenure End</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredList.map((md, index) => (
                  <tr key={md.id} className="hover:bg-blue-50/30 transition-all group">
                    <td className="px-8 py-6 text-sm text-slate-400 font-bold">
                      {md.id.toString().padStart(2, '0')}
                    </td>

                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl flex-shrink-0 bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs ring-4 ring-white shadow-sm overflow-hidden group-hover:bg-blue-600 group-hover:text-white transition-all">
                           {md.photo ? (
                               <img src={md.photo} alt="" className="w-full h-full object-cover" />
                           ) : (
                               <span>{getInitials(md.name)}</span>
                           )}
                        </div>
                        <div>
                            <div className="text-sm font-black text-[#0d0e23] group-hover:text-blue-600 transition-colors">
                                {md.name}
                            </div>
                            {index === 0 && !searchTerm && (
                                 <span className="inline-flex mt-1.5 px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] uppercase font-black rounded-md tracking-tighter">
                                    Current MD
                                 </span>
                            )}
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-6">
                        <div className="flex items-center gap-2.5 text-xs text-slate-600 font-bold">
                            <Calendar size={14} className="text-blue-500" />
                            {md.from}
                        </div>
                    </td>

                    <td className="px-8 py-6">
                        <div className="flex items-center gap-2.5 text-xs text-slate-500 font-medium">
                            <Clock size={14} className="text-slate-300" />
                            {md.to}
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredList.length === 0 && (
               <div className="text-center py-20 bg-slate-50/20">
                  <User className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-bold text-sm">No records matching "{searchTerm}"</p>
               </div>
            )}
          </div>

          <div className="bg-slate-50/50 p-6 border-t border-slate-100 flex justify-between items-center px-8">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Archive Integrity Verified</span>
             <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
                {mdList.length} Total Records
             </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListOfMD;
