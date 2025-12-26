import React from 'react'
import Navbar from '../components_lite/Navbar'
import CompaniesTable from './CompaniesTable'
function Companies() {
  return (
    <div className="">
      <Navbar/>
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between ">
            <input className="w-fit border-2 border-gray-100 rounded-md" placeholder="Filter by Name">
        </input>
        <button className=" cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded mb-2 hover:bg-gray-300">
                          Add Company
                        </button>
        </div>
        <div>
            <CompaniesTable/>
        </div>
      </div>
    </div>
  )
}

export default Companies
