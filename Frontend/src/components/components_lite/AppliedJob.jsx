import React, { useEffect } from "react";
import Badge from "../ui/Badge";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllAppliedJobs } from "../../redux/jobSlice";
import { APPLICATION_API_ENDPOINT } from "../../utils/data";

const AppliedJob = () => {
  const dispatch = useDispatch();
  const allAppliedJobs = useSelector(
    (store) => store.jobs?.allAppliedJobs ?? []
  );

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.data));
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="relative w-full overflow-auto border rounded-md mx-auto">
        <table className="w-full caption-bottom text-sm">
          <caption className="mt-4 text-sm text-slate-500 italic">
            Recent Applied Jobs
          </caption>

          <thead className="[&_tr]:border-b bg-slate-50/50">
            <tr className="border-b transition-colors">
              <th className="h-12 px-4 text-left font-medium text-slate-500">
                Date
              </th>
              <th className="h-12 px-4 text-left font-medium text-slate-500">
                Job Title
              </th>
              <th className="h-12 px-4 text-left font-medium text-slate-500">
                Company
              </th>
              <th className="h-12 px-4 text-right font-medium text-slate-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="[&_tr:last-child]:border-0">
            {allAppliedJobs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  No applied jobs found
                </td>
              </tr>
            ) : (
              allAppliedJobs.map((item) => (
                <tr
                  key={item._id}
                  className="border-b transition-colors hover:bg-slate-50/50"
                >
                  <td className="p-4">{item?.createdAt?.split("T")[0] || "NA"}</td>
                  <td className="p-4">{item?.job?.title || "NA"}</td>
                  <td className="p-4">{item?.company?.name || "NA"}</td>
                  <td className="p-4 text-right">
                    <Badge>{item?.status || "Pending"}</Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedJob;
