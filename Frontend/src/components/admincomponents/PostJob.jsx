import React, { useState } from "react";
import Navbar from "../components_lite/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../../utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (e) => {
    const selectedCompany = companies.find(
      (company) => company._id === e.target.value
    );
    setInput({ ...input, companyId: selectedCompany?._id || "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-full my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-gray-300 shadow-md rounded-lg w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                placeholder="Enter job title"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Description</label>
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Enter job description"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Enter job location"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Salary */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Salary</label>
              <input
                type="number"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                placeholder="Enter job salary"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Position */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Position</label>
              <input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                placeholder="Enter job position"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Requirements */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Requirements</label>
              <textarea
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                placeholder="Enter job requirements"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Experience */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Experience</label>
              <input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                placeholder="Enter job experience"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Job Type */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Job Type</label>
              <input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                placeholder="Enter job type"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Company Selector */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Company</label>
              {companies.length > 0 ? (
                <select
                  value={input.companyId}
                  onChange={selectChangeHandler}
                  className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-red-600 text-sm mt-1">
                  Please register a company to post jobs.
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-5 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white rounded-md ${
                loading ? "bg-gray-500" : "bg-black hover:bg-blue-600"
              } flex justify-center items-center`}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Please wait" : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
