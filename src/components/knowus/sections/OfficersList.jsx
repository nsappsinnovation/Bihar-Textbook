import React from 'react'

const OfficersList = () => {
  return (
    <div>
       <h2 className = "mb-7 text-2xl font-bold ">Officers List</h2>
        <div className=" w-full overflow-x-auto ">
      <table className="w-full border border-gray-300 border-collapse">
        <thead>
          <tr className="bg-[#3e6a8f] text-white">
            <th className="border px-4 py-2">S. No.</th>
            
            <th className="border px-4 py-2">Designation</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Contact No.</th>
            <th className="border px-4 py-2">Photo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td className="border px-4 py-2">1</td>
           
            <td className="border px-4 py-2">Officer</td>
            <td className="border px-4 py-2">Rahul Kumar</td>
            <td className="border px-4 py-2">Support</td> */}
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default OfficersList
