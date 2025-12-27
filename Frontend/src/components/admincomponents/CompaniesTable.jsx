import React, { useEffect, useState } from 'react'
import Avatar from '../ui/avatar'
import { useSelector, useDispatch } from 'react-redux'
import { Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_ENDPOINT } from '../../utils/data'
import { setCompanies } from '../../redux/companySlice'

function CompaniesTable() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ✅ Get data from Redux
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  )

  // ✅ Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/get`, {
          withCredentials: true,
        })
        dispatch(setCompanies(res.data.companies))
      } catch (err) {
        console.error(err)
      }
    }

    fetchCompanies()
  }, [dispatch])

  // ✅ Filter companies properly
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchCompanyByText.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      
      <h1 className="text-xl font-semibold mb-6 text-gray-300">
        Your Recently Registered Companies
      </h1>
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700 text-sm font-medium">
            <th className="p-4">Logo</th>
            <th className="p-4">Company Name</th>
            <th className="p-4">Date</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredCompanies.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No Companies Found
              </td>
            </tr>
          ) : (
            filteredCompanies.map((company) => (
              <tr key={company._id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <Avatar
                    src={
                      company.logo ||
                      "https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
                    }
                  />
                </td>

                <td className="p-4 font-medium">{company.name}</td>

                <td className="p-4 text-gray-600">
                  {company.createdAt.split("T")[0]}
                </td>

                <td className="p-4 text-center relative">
                  <button
                    onClick={() => setOpen(open === company._id ? null : company._id)}
                    className="text-xl font-bold"
                  >
                    ⋮
                  </button>

                  {open === company._id && (
                    <div className="absolute right-6 mt-2 bg-white border rounded shadow p-3">
                      <button
                        onClick={() => navigate(`/admin/company/${company._id}`)}
                        className="flex items-center gap-2 hover:bg-gray-100 p-2"
                      >
                        <Pencil size={16} />
                        Edit Company
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
        
      </table>
    </div>
  )
}

export default CompaniesTable
