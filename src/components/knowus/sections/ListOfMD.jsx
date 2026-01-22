import React from 'react'

const ListOfMD = () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-2xl font-bold mb-4  text-black">
        MD List
      </h1>

      <div className="w-full overflow-x-auto">
        <table className="w-full border border-gray-300 border-collapse">
          <thead>
            <tr className="bg-[#3e6a8f] text-white">
              <th className="border px-3 py-2">S. No.</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">From</th>
              <th className="border px-3 py-2">To</th>
              <th className="border px-3 py-2">Photo</th>
            </tr>
          </thead>

          <tbody>
            {[
              [1,"Sri Sunny Sinha","29/11/2023","29/04/2024","/Admin/List_Of_MD/58.jpg"],
              [2,"Sri Baidya Nath Yadav, IAS","09/04/2023","29/11/2023",""],
              [3,"Shri Manoj Kumar I.A.S","05/08/2021","31/12/2022",""],
              [4,"Dr. Ranjit Kumar Singh I.A.S","18/09/2019","30/07/2021",""],
              [5,"Shri Arvind Kumar Verma I.A.S","14/05/2018","31/08/2019",""],
              [6,"Shri M. Ramchandrudu I.A.S","31/10/2016","14/05/2018",""],
              [7,"Shri Vishaw Mohan Patel I.A.S","04/07/2015","31/10/2016",""],
              [8,"Shri K. Senthil Kumar I.A.S","06/04/2015","04/07/2015",""],
              [9,"Shri Dilip Kumar I.A.S","18/12/2014","06/04/2015",""],
              [10,"Shri J.K.P. Singh I.R.P.S","28/09/2011","18/12/2014",""],
              [11,"Shri Ashutosh I.A.S","06/05/2009","28/09/2011",""],
              [12,"Hasnain Ahmad I.A.S","18/03/2008","30/04/2009",""],
              [13,"Freaq Ahmad I.A.S","11/06/2007","17/03/2008",""],
              [14,"Shri Ashok Kumar Singh I.A.S","07/05/2007","30/06/2007",""],
              [15,"Shri Vaidhnath Mishra I.A.S","04/03/2006","30/04/2007",""],
              [16,"Shri Ashok Kumar Singh I.A.S","10/02/2006","23/02/2006",""],
              [17,"Shri R.S.B. Singh I.A.S","15/04/2005","31/12/2005",""],
              [18,"Shri Maheshwar Prasad Singh I.A.S","04/01/2001","14/04/2005",""],
              [19,"Shri Vaidhnath Prasad I.A.S","16/12/2000","03/01/2001",""],
              [20,"Shri Avinash Kumar I.A.S","19/05/2000","27/11/2000",""],
              [21,"Shri Arvind Kumar Choudhary I.A.S","20/08/1999","14/05/2000",""],
              [22,"Shri W.N. Singh B.A.S","06/10/1998","19/08/1999",""],
              [23,"Shri Dipak Kumar I.A.S","09/07/1998","05/10/1998",""],
              [24,"Shri S. Shamimuddin I.A.S","01/12/1997","08/07/1998",""],
              [25,"Shri Badunath Prasad Rai I.A.S","26/09/1996","30/11/1997",""],
              [26,"Shri Vishnu Kumar I.A.S","26/07/1996","21/09/1996",""],
              [27,"Shri Vijay Prakash I.A.S","03/06/1995","26/07/1996",""],
              [28,"Shri Ram Krishan Khandelwal I.A.S","13/07/1994","13/06/1995",""],
              [29,"Shri B.P. Choudhary I.A.S","07/12/1992","15/04/1993",""],
              [30,"Shri Indu Shekhar Chaturvedi I.A.S","01/10/1992","07/12/1992",""],
              [31,"Shri A.B. Chaturvedi I.A.S","28/02/1992","01/10/1992",""],
              [32,"Shri Phool Singh I.A.S","28/08/1991","28/02/1992",""],
              [33,"Shri N.K. Sinha I.A.S","05/06/1991","28/08/1991",""],
              [34,"Shri B. Ram","14/10/1977","16/12/1977",""],
              [35,"Shri B.P. Sinha","17/07/1975","14/10/1977",""],
              [36,"Shri Mithilesh Kumar I.A.S","13/06/1989","05/06/1991",""],
              [37,"Shri H.K. Prasad I.A.S","07/12/1986","13/06/1989",""],
              [38,"Shri A.K. Dubey I.A.S","06/12/1986","07/12/1986",""],
              [39,"Shri Pancham Lal I.A.S","22/05/1986","25/11/1986",""],
              [40,"Shri B.N. Choudhary I.A.S","12/09/1984","22/05/1986",""],
              [41,"Shri R.C.P. Verma","15/10/1980","08/06/1981",""],
              [42,"Shrimati Krishna Singh I.A.S","16/12/1977","07/06/1978",""],
              [43,"Shri R.N. Rai","08/06/1981","14/07/1981",""],
              [44,"Shri R.S. Chaube","05/03/1975","17/07/1975",""]
            ].map(([no,name,from,to,photo]) => (
              <tr key={no}>
                <td className="border px-3 py-2 text-center">{no}</td>
                <td className="border px-3 py-2">{name}</td>
                <td className="border px-3 py-2">{from}</td>
                <td className="border px-3 py-2">{to}</td>
                <td className="border px-3 py-2 text-center">
                  {photo ? (
                    <img
                      src={photo}
                      alt={name}
                      className="w-[60px] h-[80px] object-cover mx-auto border"
                    />
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListOfMD
