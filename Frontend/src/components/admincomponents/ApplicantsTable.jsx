import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { APPLICATION_API_ENDPOINT } from "../../utils/data";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const [openId, setOpenId] = useState(null);

  const applicants = useSelector(
    (store) => store.application?.applicants?.application ?? []
  );

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.put(
        `${APPLICATION_API_ENDPOINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setOpenId(null);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <table className="min-w-full border border-gray-200 text-sm">
        <caption className="text-left p-3 font-semibold text-gray-700">
          A list of recent job applicants
        </caption>

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Full Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Contact</th>
            <th className="p-3 border">Resume</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {applicants.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-5 text-gray-500">
                No applicants found
              </td>
            </tr>
          )}

          {applicants.map((item) => (
            <tr key={item._id} className="border hover:bg-gray-50">
              <td className="p-3">{item?.applicant?.fullname}</td>
              <td className="p-3">{item?.applicant?.email}</td>
              <td className="p-3">{item?.applicant?.phoneNumber}</td>

              <td className="p-3">
                {item?.applicant?.profile?.resume ? (
                  <a
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Download
                  </a>
                ) : (
                  <span className="text-gray-400">NA</span>
                )}
              </td>

              <td className="p-3">
                {item?.createdAt?.split("T")[0]}
              </td>

              <td className="p-3 text-right relative">
                <button
                  onClick={() =>
                    setOpenId(openId === item._id ? null : item._id)
                  }
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <MoreHorizontal />
                </button>

                {openId === item._id && (
                  <div className="absolute right-2 mt-2 w-36 bg-white border rounded shadow-lg z-20">
                    {shortlistingStatus.map((status) => (
                      <label
                        key={status}
                        onClick={() => statusHandler(status, item._id)}
                        className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        <input type="radio" readOnly />
                        <span>{status}</span>
                      </label>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
