import React from 'react'
import Navbar from './Navbar'
import {useState} from 'react'
import { useSelector} from 'react-redux'
import FilterCard from './FilterCard'
import Job from './Job'
// const jobsArray = [1,2,3,4,5,6,7,8,9]
function Jobs() {
  const {allJobs} =useSelector((store)=>store.jobs)
  const[filters,setFilters]=useState({})
  const filteredJobs=allJobs.filter((job)=>{
    if(filters.Location && job.location!==filters.Location) return false
    if(filters.Experience && job.experience!==filters.Experience) return false
    return true
  })
  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto mt-5 ml-7">
        <div className="flex gap-5">
            <div className="w-[20%] mr-14">
                <FilterCard setFilters={setFilters}/>
            </div>
            {allJobs.length<=0? (
                <span className="">Job not found</span>
            ):
            (
                <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                    <div className="grid sm:grid-cols-3 gap-4 ">
                        {filteredJobs.map((job,index)=>(
                          <div key={job._id}>
                            <Job job={job}/>
                            </div>
                        ))}
                    </div>
                </div>

            )
        }
        </div>
      
      
      
      </div>
    </div>
  )
}

export default Jobs
