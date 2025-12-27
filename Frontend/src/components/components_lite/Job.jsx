import React from 'react'
import BookmarkButton from '../ui/BookmarkButton'
import Avatar from '../ui/avatar'
import  Badge  from '../ui/Badge.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Job({job}) {
  if(!job || Object.keys(job).length === 0){
    return(<h1>Job not found</h1>);
  }
  
  const {
    company,
    title,
    description,
    position,
    salary,
    location,
    jobType,
    _id,
  } = job;
  const navigate=useNavigate()
  const [isBookmarked, setIsBookmarked] = React.useState(false)
  

  // const allJobs = useSelector((state)=>state.jobs?.allJobs || [])
  const jobId="jdfj";
  return (
    <div className="p-5 flex lg:flex-row flex-col flex-wrap items-center rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover-shadow-2xl hover:shadow-blue-200 hover:p-3 ">
      <p className="mr-2">3 days ago </p>
      
        <BookmarkButton/>
      
      <div className="flex flex-col items-center gap-2 my-5">
      <button className="p-6">
        <Avatar
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAye9yffzT_D9mneaR1PPL3iAUGPa0E64H-w&s"
                      alt="User Avatar"
                      size={60}
                    />

      </button>
      <div>
        <h1 className="text-lg font-medium">
        {company?.name || ""}
      </h1>
              <h2 className="font-bold text-lg my-2">{title}</h2>
              <p className="text-sm text-gray-600">{description}
                  
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center mt-4 flex-wrap mx-auto">
              <Badge className={"text-blue-600 font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-blue-600"} variant={"ghost"} >{position} Open Positions</Badge>
              <Badge  className={"text-red-500 font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-red-600"} variant={"ghost"}>{salary}</Badge>
              <Badge  className={"text-purple-600 font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-purple-600"} variant={"ghost"}>{location}</Badge>
              <Badge  className={"text-black font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-black"} variant={"ghost"}>{jobType}</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <button onClick={()=>{navigate(`/description/${_id}`)}} className="p-2 border cursor-pointer hover:bg-gray-100 hover:shadow-md hover:border-gray-300 border-gray-200 font-bold rounded-sm">
                    Details
                </button>
                <button className="p-2 text-white hover:shadow-md hover:shadow-purple-100 hover:border hover:bg-purple-700 bg-purple-600 font-bold rounded-sm cursor-pointer">
                        Save for Later
                </button>

            </div>
      </div>
    </div>
  )
}

export default Job
