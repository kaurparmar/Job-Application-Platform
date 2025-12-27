import React from 'react'
import Navbar from '../components_lite/Navbar'
import AdminJobsTable from './AdminJobsTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { searchCompanyByText } from '../../redux/companySlice'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
function AdminJobs() {
  useGetAllAdminJobs
  const navigate=useNavigate()
      const[input,setInput] = useState("")
      useGetAllCompanies()
      const dispatch=useDispatch();
      useEffect(()=>{
        dispatch(searchCompanyByText(input))
  
      },[input])
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 mt-8">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* Search input */}
          <input
            type="text"
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Filter by name"
            onChange={(e) => {
              setInput(e.target.value)
            }}
          />

          {/* Button */}
          <button
            onClick={() => navigate("/admin/jobs/create")}
            className="px-5 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
          >
            Post a New Job
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  )
}

export default AdminJobs
