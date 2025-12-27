import React from 'react'
import Navbar from '../components_lite/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';
import { toast } from 'sonner';
import { COMPANY_API_ENDPOINT } from '../../utils/data';
function CompanyCreate() {
    const [companyName,setCompanyName] = useState("")
    const navigate=useNavigate();
    const dispatch = useDispatch()
    const registerNewCompany = async()=>{
        //  console.log(res.data);
            if (!companyName || !companyName.trim()) {
                toast.error("Company name is required");
                return;
                }
        try{
            const res=await axios.post(`${COMPANY_API_ENDPOINT}/register`,{name: companyName}
                ,{
                headers:{
                    "Content-Type":"application/json",
                },
                withCredentials:true,
            })
           

            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message);
                const companyId=res.data.company._id;
                navigate(`/admin/company/${companyId}`)
            }
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div className="min-h-screen bg-gray-50">
  <Navbar />

  <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
    
    {/* Header */}
    <h1 className="font-bold text-2xl text-gray-800 mb-2">
      Register Company
    </h1>
    <p className="text-gray-600 mb-8">
      Enter company details to register and continue
    </p>

    {/* Form */}
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">
        Company Name
      </label>

      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   focus:border-indigo-500"
        onChange={(e) => setCompanyName(e.target.value)}
      />
    </div>

    {/* Buttons */}
    <div className="flex items-center gap-4 mt-10">
      
      <button
        onClick={() => navigate("/admin/companies")}
        className="px-6 py-2 border border-gray-300 rounded-lg
                   text-gray-700 hover:bg-gray-100 transition"
      >
        Cancel
      </button>

      <button
        onClick={registerNewCompany}
        className="cursor-pointer px-6 py-2 bg-indigo-600 text-white rounded-lg
                   hover:bg-indigo-700 transition font-medium"
      >
        Continue
      </button>

    </div>
  </div>
</div>

  )
}

export default CompanyCreate
