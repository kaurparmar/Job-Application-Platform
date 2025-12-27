import React from 'react'
import Badge from '../ui/Badge'
import { toast } from 'sonner';
import axios from 'axios'
import  {useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import Navbar from './Navbar.jsx';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {setSingleJob} from '../../redux/jobSlice';
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from '../../utils/data';

function Description() {
   
    const params = useParams()
    const {singleJob} = useSelector((store) => store.jobs)
    const {user} = useSelector((store)=> store.auth);
    const jobId = params.id
    console.log("Job id in des",jobId);
    const dispatch =useDispatch()
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    
     const isInitiallyApplied = 
    singleJob?.application?.some(
        (application)=> application.applicant === user?._id) || false;
        const [isApplied,setIsApplied] = useState(isInitiallyApplied);
    const applyJobHandler = async()=>{
        try{
            const res=await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`,{withCredentials:true});
            if(res.data.success){
                setIsApplied(true);
                const updateSingleJob={...singleJob, application:[...singleJob.application,{applicant:user._id}]}
                dispatch(setSingleJob(updateSingleJob))
                console.log(res.data)
                toast.success(res.data.message)
            }
        }
        catch(error){
            console.log(error.message);
            toast.error(error.response.data.message)
        }
    }
    useEffect(()=>{
    
    const fetchSingleJob = async()=>{
      setLoading(true);
      setError(null);
        try{
            const res=await axios.get(`${JOB_API_ENDPOINT}/${jobId}`,{
                withCredentials:true,
            });
            console.log("API Response: ",res.data);
            if(res.data.status){
                dispatch(setSingleJob(res.data.job || res.data.jobs))
                setIsApplied(res.data.job.application.some(application=> application.applicant === user._id))
            }
            else{
                setError("Failed to fetch jobs.")
            }
        }
        catch(error){
            console.log("Fetch error: ",error);
            setError(error.message || "An error occurred");
        }
        finally{
            setLoading(false);
        }
    }
    fetchSingleJob();

 },[jobId,dispatch])
 if(loading) return <p>Loading...</p>
 if(error) return <p>{error}</p>
 if(!singleJob) return null;
  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center m-15">
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center flex-col justify-between gap-y-7">
        <h1 className="font-bold text-xl">{singleJob.title}</h1>
        <div>
            <div className="flex flex-row gap-2 items-center mt-4 flex-wrap mx-auto">
                          <Badge className={"text-blue-600 font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-blue-600"} variant={"ghost"} >{singleJob.position} Open Positions</Badge>
                          <Badge  className={"text-red-500 font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-red-600"} variant={"ghost"}>{singleJob.salary}</Badge>
                          <Badge  className={"text-purple-600 font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-purple-600"} variant={"ghost"}>{singleJob.location}</Badge>
                          <Badge  className={"text-black font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-black"} variant={"ghost"}>{singleJob.jobType}</Badge>
            </div>
        </div>
         <button onClick={isApplied? null:applyJobHandler}
                        disabled={isApplied} 
                        className={`p-2 rounded-md transition-all duration-300 ${
                            isApplied 
                            ? "bg-gray-400 text-white cursor-not-allowed" 
                            : "bg-[#6A38C2] hover:bg-[#5b30a6] text-white cursor-pointer"
                        }`}
                    >
                        {isApplied ? "Already Applied" : "Apply Now"}
                    </button>
      </div>
    </div>
    
        <h1 className="border-b-2 border-b-gray-400 font-medium py-4">{singleJob.description}</h1>
    <div className="my-4">
        <h1 className="font-bold my-1">
            Role: <span className = "pl-4 font-normal text-gray-800">{singleJob.position} Open Positions</span>
        </h1>

         <h1 className="font-bold my-1">
            Location: <span className = "pl-4 font-normal text-gray-800">{singleJob.location}</span>
        </h1>

         <h1 className="font-bold my-1">
            Salary: <span className = "pl-4 font-normal text-gray-800">{singleJob.salary}</span>
        </h1>
        <h1 className="font-bold my-1">
            Experience: <span className = "pl-4 font-normal text-gray-800">{singleJob.experience} years</span>
        </h1>
        <h1 className="font-bold my-1">
            Job Type: <span className = "pl-4 font-normal text-gray-800">{singleJob.jobType}</span>
        </h1>
        <h1 className="font-bold my-1">
            Total Applicants: <span className = "pl-4 font-normal text-gray-800">{singleJob?.application?.length}</span>
        </h1>
    </div>
    </div>
    </>
  )
}

export default Description
