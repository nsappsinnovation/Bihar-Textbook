import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion'; 



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
  const [list, setList] = useState([
    { id: 1, name: "Sri Sunny Sinha", from: "29/11/2023", to: "29/04/2024" },
    { id: 2, name: "Sri Baidya Nath Yadav, IAS", from: "09/04/2023", to: "29/11/2023" },
    { id: 3, name: "Shri Manoj Kumar I.A.S", from: "05/08/2021", to: "31/12/2022" },
    { id: 4, name: "Dr. Ranjit Kumar Singh I.A.S", from: "18/09/2019", to: "30/07/2021" },
    { id: 5, name: "Shri Arvind Kumar Verma I.A.S", from: "14/05/2018", to: "31/08/2019" },
    { id: 6, name: "Shri M. Ramchandrudu I.A.S", from: "31/10/2016", to: "14/05/2018" },
    { id: 7, name: "Shri Vishaw Mohan Patel I.A.S", from: "04/07/2015", to: "31/10/2016" },
    { id: 8, name: "Shri K. Senthil Kumar I.A.S", from: "06/04/2015", to: "04/07/2015" },
    { id: 9, name: "Shri Dilip Kumar I.A.S", from: "18/12/2014", to: "06/04/2015" },
    { id: 10, name: "Shri J.K.P. Singh I.R.P.S", from: "28/09/2011", to: "18/12/2014" },
    { id: 11, name: "Shri Ashutosh I.A.S", from: "06/05/2009", to: "28/09/2011" },
    { id: 12, name: "Hasnain Ahmad I.A.S", from: "18/03/2008", to: "30/04/2009" },
    { id: 13, name: "Freaq Ahmad I.A.S", from: "11/06/2007", to: "17/03/2008" },
    { id: 14, name: "Shri Ashok Kumar Singh I.A.S", from: "07/05/2007", to: "30/06/2007" },
    { id: 15, name: "Shri Vaidhnath Mishra I.A.S", from: "04/03/2006", to: "30/04/2007" },
    { id: 16, name: "Shri Ashok Kumar Singh I.A.S", from: "10/02/2006", to: "23/02/2006" },
    { id: 17, name: "Shri R.S.B. Singh I.A.S", from: "15/04/2005", to: "31/12/2005" },
    { id: 18, name: "Shri Maheshwar Prasad Singh I.A.S", from: "04/01/2001", to: "14/04/2005" },
    { id: 19, name: "Shri Vaidhnath Prasad I.A.S", from: "16/12/2000", to: "03/01/2001" },
    { id: 20, name: "Shri Avinash Kumar I.A.S", from: "19/05/2000", to: "27/11/2000" },
    { id: 21, name: "Shri Arvind Kumar Choudhary I.A.S", from: "20/08/1999", to: "14/05/2000" },
    { id: 22, name: "Shri W.N. Singh B.A.S", from: "06/10/1998", to: "19/08/1999" },
    { id: 23, name: "Shri Dipak Kumar I.A.S", from: "09/07/1998", to: "05/10/1998" },
    { id: 24, name: "Shri S. Shamimuddin I.A.S", from: "01/12/1997", to: "08/07/1998" },
    { id: 25, name: "Shri Badunath Prasad Rai I.A.S", from: "26/09/1996", to: "30/11/1997" },
    { id: 26, name: "Shri Vishnu Kumar I.A.S", from: "26/07/1996", to: "21/09/1996" },
    { id: 27, name: "Shri Vijay Prakash I.A.S", from: "03/06/1995", to: "26/07/1996" },
    { id: 28, name: "Shri Ram Krishan Khandelwal I.A.S", from: "13/07/1994", to: "13/06/1995" },
    { id: 29, name: "Shri B.P. Choudhary I.A.S", from: "07/12/1992", to: "15/04/1993" },
    { id: 30, name: "Shri Indu Shekhar Chaturvedi I.A.S", from: "01/10/1992", to: "07/12/1992" },
    { id: 31, name: "Shri A.B. Chaturvedi I.A.S", from: "28/02/1992", to: "01/10/1992" },
    { id: 32, name: "Shri Phool Singh I.A.S", from: "28/08/1991", to: "28/02/1992" },
    { id: 33, name: "Shri N.K. Sinha I.A.S", from: "05/06/1991", to: "28/08/1991" },
    { id: 34, name: "Shri B. Ram", from: "14/10/1977", to: "16/12/1977" },
    { id: 35, name: "Shri B.P. Sinha", from: "17/07/1975", to: "14/10/1977" },
    { id: 36, name: "Shri Mithilesh Kumar I.A.S", from: "13/06/1989", to: "05/06/1991" },
    { id: 37, name: "Shri H.K. Prasad I.A.S", from: "07/12/1986", to: "13/06/1989" },
    { id: 38, name: "Shri A.K. Dubey I.A.S", from: "06/12/1986", to: "07/12/1986" },
    { id: 39, name: "Shri Pancham Lal I.A.S", from: "22/05/1986", to: "25/11/1986" },
    { id: 40, name: "Shri B.N. Choudhary I.A.S", from: "12/09/1984", to: "22/05/1986" },
    { id: 41, name: "Shri R.C.P. Verma", from: "15/10/1980", to: "08/06/1981" },
    { id: 42, name: "Shrimati Krishna Singh I.A.S", from: "16/12/1977", to: "07/06/1978" },
    { id: 43, name: "Shri R.N. Rai", from: "08/06/1981", to: "14/07/1981" },
    { id: 44, name: "Shri R.S. Chaube", from: "05/03/1975", to: "17/07/1975" }
  ]);

  useEffect(() => {
    const loadList = () => {
      const saved = localStorage.getItem('module_content_ku-list-md');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setList(parsed.map(item => ({
              id: item.id,
              name: item.name || item.title,
              from: item.from,
              to: item.to
            })));
          }
        } catch (e) {
          console.error("Error loading MD list", e);
        }
      }
    };
    loadList();
    window.addEventListener('storage', loadList);
    return () => window.removeEventListener('storage', loadList);
  }, []);

  const filteredList = list.filter(md => 
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
        <div className="w-full bg-transparent border border-slate-300 overflow-hidden font-sans">
          {/* SEARCH & STATS BAR */}
          <div className="bg-transparent border-b border-slate-300 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
               <div>
                  <h3 className="text-lg font-bold text-[#0d0e23]">Official Directory</h3>
                 
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
                 className="w-full pl-11 pr-4 py-2 bg-transparent border border-slate-300 text-sm focus:border-blue-500 transition-all outline-none text-[#0d0e23]"
               />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-200 border-b border-slate-300 text-[#0d0e23]">
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">S.No.</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Managing Director</th>
                  <th className="px-6 py-4 text-sm font-bold border-r border-slate-300">Appointment Date</th>
                  <th className="px-6 py-4 text-sm font-bold">Tenure End</th>
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

                    <td className="px-6 py-4 text-sm border-r border-slate-300">
                        {md.from}
                    </td>

                    <td className="px-6 py-4 text-sm">
                        {md.to}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredList.length === 0 && (
               <div className="text-center py-10">
                  <p className="text-slate-500 text-sm">No records matching "{searchTerm}"</p>
               </div>
            )}
          </div>

          <div className="p-4 border-t border-slate-300 flex justify-end">
             <span className="text-sm text-slate-600">
                Total Records: {list.length}
             </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ListOfMD;
