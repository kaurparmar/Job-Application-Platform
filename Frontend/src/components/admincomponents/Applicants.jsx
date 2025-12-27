import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../redux/applicationSlice";
import { JOB_API_ENDPOINT } from "../../utils/data";
import Navbar from "../components_lite/Navbar";

const Applicants = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const applicants = useSelector(
    (store) => store.application?.applicants
  );

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/${id}/applicants`,
          { withCredentials: true }
        );

        // backend returns job
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchAllApplicants();
  }, [id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.application?.length || 0}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
