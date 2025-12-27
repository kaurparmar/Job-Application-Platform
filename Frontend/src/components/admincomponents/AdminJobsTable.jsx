import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Pencil, Eye } from 'lucide-react'
import { COMPANY_API_ENDPOINT, JOB_API_ENDPOINT } from '../../utils/data'
import { setCompanies } from '../../redux/companySlice'

// Simple Avatar component
const Avatar = ({ src }) => (
  <img
    src={src}
    alt="company-logo"
    className="h-10 w-10 rounded-full object-cover"
  />
)

function AdminJobsTable() {
  const [openId, setOpenId] = useState(null)
  const [adminJobs, setAdminJobs] = useState([]) // local state for admin jobs
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const dropdownRef = useRef(null)

  const { searchJobByText = '' } = useSelector((store) => store.jobs)

  // Fetch companies and jobs
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

    const fetchAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/admin/jobs`, {
          withCredentials: true,
        })
        setAdminJobs(res.data.jobs)
      } catch (err) {
        console.error('Error fetching admin jobs:', err)
      }
    }

    fetchCompanies()
    fetchAdminJobs()
  }, [dispatch])

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Filter jobs by title or company name
  const filteredJobs = adminJobs.filter((job) => {
    const searchText = searchJobByText.toLowerCase()
    const jobTitle = job.title?.toLowerCase() || ''
    const companyName = job.company?.name?.toLowerCase() || ''
    return jobTitle.includes(searchText) || companyName.includes(searchText)
  })

  return (
    <div className="m-7 max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-xl text-center font-semibold mb-6 text-gray-700">
        Your Recently Posted Jobs
      </h1>

      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700 text-sm font-medium">
            <th className="p-4 w-20">Logo</th>
            <th className="p-4 w-1/4">Company</th>
            <th className="p-4 w-1/4">Role</th>
            <th className="p-4 w-1/4">Date</th>
            <th className="p-4 w-20 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredJobs.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No Jobs Found
              </td>
            </tr>
          ) : (
            filteredJobs.map((job) => (
              <tr
                key={job._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  <Avatar
                    src={
                      job.company?.logo ||
                      'https://cdn-icons-png.flaticon.com/512/5087/5087579.png'
                    }
                  />
                </td>

                <td className="p-4 font-medium">{job.company?.name || 'N/A'}</td>

                <td className="p-4">{job.title}</td>

                <td className="p-4 text-gray-600">
                  {job.createdAt?.split('T')[0]}
                </td>

                <td className="p-4 text-center relative" ref={dropdownRef}>
                  <button
                    onClick={() =>
                      setOpenId(openId === job._id ? null : job._id)
                    }
                    className="text-xl font-bold"
                  >
                    ⋮
                  </button>

                  {openId === job._id && (
                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-md p-2 flex flex-col z-10 w-40">
                      <button
                        onClick={() => navigate(`/admin/jobs/${job._id}`)}
                        className="flex items-center gap-2 hover:bg-gray-100 p-2 text-sm rounded"
                      >
                        <Pencil size={16} />
                        Edit Job
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 hover:bg-gray-100 p-2 text-sm rounded mt-1"
                      >
                        <Eye size={16} />
                        Applicants
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

export default AdminJobsTable
