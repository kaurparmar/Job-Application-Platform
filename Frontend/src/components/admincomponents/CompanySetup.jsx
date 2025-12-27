import React, { useState } from 'react'
import Navbar from '../components_lite/Navbar'
import { ArrowLeft } from 'lucide-react'
import { COMPANY_API_ENDPOINT } from '../../utils/data'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'sonner'

function CompanySetup() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ correct param

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files[0],
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  const fetchCompany = async () => {
    try {
      const res = await axios.get(
        `${COMPANY_API_ENDPOINT}/get/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setInput({
          name: res.data.company.name || "",
          description: res.data.company.description || "",
          website: res.data.company.website || "",
          location: res.data.company.location || "",
          logo: res.data.company.logo || "",
        });
      }
    } catch (error) {
      toast.error("Failed to load company data");
    }
  };

  fetchCompany();
}, [id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/admin/companies")}
            className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-blue-600">
            Company Setup
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Company Description
            </label>
            <textarea
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Company Website
            </label>
            <input
              type="text"
              name="website"
              value={input.website}
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Company Location
            </label>
            <input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Company Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:bg-blue-50 file:text-blue-600
                         hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold
                       hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Company"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
