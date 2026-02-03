import React, { useState } from 'react';
import { Search, Calendar, User, Clock } from 'lucide-react';

const mdList = [
  { id: 1, name: "Sri Sunny Sinha", from: "29/11/2023", to: "29/04/2024", photo: "/Admin/List_Of_MD/58.jpg", current: false },
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
    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden font-sans">
      {/* HEADER */}
      <div className="bg-slate-50 border-b border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h2 className="text-xl font-bold text-slate-800">Legacy of Leadership</h2>
            <p className="text-slate-500 text-sm">Managing Directors who have served BSTBPC</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <Search className="h-4 w-4 text-slate-400" />
           </div>
           <input
             type="text"
             placeholder="Search name..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all outline-none"
           />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Managing Director</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date of Appointment</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tenure End</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredList.map((md, index) => (
              <tr key={md.id} className="hover:bg-slate-50 transition-colors group">
                {/* ID */}
                <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                  {md.id}
                </td>

                {/* Name & Photo */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full flex-shrink-0 bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-sm overflow-hidden">
                       {md.photo ? (
                           <img src={md.photo} alt="" className="w-full h-full object-cover" />
                       ) : (
                           <span>{getInitials(md.name)}</span>
                       )}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">
                            {md.name}
                        </div>
                        {index === 0 && !searchTerm && (
                             <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] uppercase font-bold rounded-full">
                                Latest
                             </span>
                        )}
                    </div>
                  </div>
                </td>

                {/* From Date */}
                <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={14} className="text-slate-400" />
                        {md.from}
                    </div>
                </td>

                {/* To Date */}
                <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={14} className="text-slate-400" />
                        {md.to}
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredList.length === 0 && (
           <div className="text-center py-12 text-slate-500 text-sm">
              No results found for "{searchTerm}"
           </div>
        )}
      </div>

      <div className="bg-slate-50 p-4 border-t border-slate-200 text-xs text-slate-400 text-center">
         Total Records: {mdList.length}
      </div>
    </div>
  );
}

export default ListOfMD;
