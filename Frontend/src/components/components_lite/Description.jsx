// import React from 'react'
// import Badge from '../ui/Badge'

// import axios from 'axios'
// import  {useEffect} from "react";
// import {useDispatch} from 'react-redux';
// import { setSingleJob } 
// import { JOB_API_ENDPOINT } from '../../utils/data';
function Description() {
//     const isApplied = false;
//     const params = useParams()
//     const jobId = params.id
//     console.log("Job id in des",jobId);
//     const dispatch =useDispatch()
    
//     useEffect(()=>{
    
//     const fetchSingleJob = async()=>{
//         try{
//             const res=await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`,{
//                 withCredentials:true,
//             });
//             if(res.data.success){
//                 dispatch(setSingleJob(res.data.jobs))
//             }
//         }
//         catch(error){
//             console.log(error)
//         }
//     }
//     fetchSingleJob();

//  },[jobId,dispatch,setSingleJob])
  return (
    <></>
    // <div>
//       <div className="max-w-7xl mx-auto my-10">
//         <div className="flex items-center justify-between">
//         <h1 className="font-bold text-xl">Title</h1>
//         <div>
//             <div className="flex flex-row gap-2 items-center mt-4 flex-wrap mx-auto">
//                           <Badge className={"text-blue-600 font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-blue-600"} variant={"ghost"} >10 Position</Badge>
//                           <Badge  className={"text-red-500 font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-red-600"} variant={"ghost"}>20 LPA</Badge>
//                           <Badge  className={"text-purple-600 font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-purple-600"} variant={"ghost"}>Remote</Badge>
//                           <Badge  className={"text-black font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-black"} variant={"ghost"}>Full Time</Badge>
//             </div>
//         </div>
//          <button 
//                         disabled={isApplied} 
//                         className={`p-2 rounded-md transition-all duration-300 ${
//                             isApplied 
//                             ? "bg-gray-400 text-white cursor-not-allowed" 
//                             : "bg-[#6A38C2] hover:bg-[#5b30a6] text-white cursor-pointer"
//                         }`}
//                     >
//                         {isApplied ? "Already Applied" : "Apply Now"}
//                     </button>
//       </div>
//     </div>
    
//         <h1 className="border-b-2 border-b-gray-400 font-medium py-4">Job Description</h1>
//     <div className="my-4">
//         <h1 className="font-bold my-1">
//             Role: <span className = "pl-4 font-normal text-gray-800">Software Engineer</span>
//         </h1>

//          <h1 className="font-bold my-1">
//             Location: <span className = "pl-4 font-normal text-gray-800">Remote</span>
//         </h1>

//          <h1 className="font-bold my-1">
//             Salary: <span className = "pl-4 font-normal text-gray-800">$50,000 - $80,000</span>
//         </h1>
//         <h1 className="font-bold my-1">
//             Experience: <span className = "pl-4 font-normal text-gray-800">$50,000 - $80,000</span>
//         </h1>
//         <h1 className="font-bold my-1">
//             Job Type: <span className = "pl-4 font-normal text-gray-800">$50,000 - $80,000</span>
//         </h1>
//         <h1 className="font-bold my-1">
//             Total Applicants: <span className = "pl-4 font-normal text-gray-800">$50,000 - $80,000</span>
//         </h1>
//     </div>
//     </div>
  )
}

export default Description
