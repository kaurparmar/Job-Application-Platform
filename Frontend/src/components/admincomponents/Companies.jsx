import React from 'react'
import Navbar from '../components_lite/Navbar'
import CompaniesTable from './CompaniesTable'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { searchCompanyByText } from '../../redux/companySlice'
function Companies() {
    const navigate=useNavigate()
    const[input,setInput] = useState("")
    useGetAllCompanies()
    const dispatch=useDispatch();
    useEffect(()=>{
      dispatch(searchCompanyByText(input))

    },[input])
  return (
    <div className="">
      <Navbar/>
      <div className="max-w-6xl mx-auto my-10 ">
        <div className="flex items-center justify-between ">
            <input onChange={(e)=>setInput(e.target.value)} className="w-fit border-2 border-gray-100 rounded-md" placeholder="Filter by Name">
        </input>
        <button onClick={()=> navigate("/admin/companies/create")} className=" cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded mb-2 hover:bg-gray-300">
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
