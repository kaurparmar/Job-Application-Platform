import React from 'react'
import  Badge  from '../ui/Badge.jsx'

function JobCards({job}) {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover-shadow-2xl hover:shadow-blue-200 hover:p-3 ">
      <div>
        <h1 className="text-lg font-medium">
        {job.company.name || ""}
      </h1>
      <p className="text-sm text-gray-600">{job.location || ""}</p>
      </div>
      <div>
        <h2 className="font-bold text-lg my-2">{job.title || ""}</h2>
        <p className="text-sm text-gray-600">
            {job.description || ""}
        </p>
      </div>
      <div className="flex gap-2 items-center mt-4 flex-wrap">
        <Badge className={"text-blue-600 font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-blue-600"} variant={"ghost"} >{job.position} Open Positions</Badge>
        <Badge  className={"text-red-500 font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-red-600"} variant={"ghost"}> {job.salary}</Badge>
        <Badge  className={"text-purple-600 font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-purple-600"} variant={"ghost"}>{job.location}</Badge>
        <Badge  className={"text-black font-semibold border-2 border-gray-200 rounded-md p-1 hover:border-black"} variant={"ghost"}>{job?.jobType}</Badge>
      </div>
    </div>
  )
}

export default JobCards
