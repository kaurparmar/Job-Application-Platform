import React from 'react'
import Navbar from './Navbar'
import Avatar from '../ui/avatar'
import { useSelector } from 'react-redux'
import {Contact, Mail, Pen} from "lucide-react"
import Badge from '../ui/Badge'
import AppliedJob from './AppliedJob'
import { useState } from 'react'
import EditProfileModal from './EditProfileModal'


function Profile() {
    const [open,setOpen] = useState(false)
    const {user}=useSelector((store)=>store.auth)
    const skills = user?.profile?.skills || [];
    const isResume=user?.profile?.resume;
  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl  mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400">
        <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-5">
            <Avatar
              src={user?.profile?.profilePhoto || "https://cdn-icons-png.flaticon.com/512/5087/5087579.png"}
              alt="User Avatar"
              size={60}
            />
          <div>
            <h1 className="font-medium text-xl">{user?.fullname}</h1>
            <p>{user?.profile?.bio || ""}</p>
          </div>
        </div>
        <button onClick={()=>setOpen(true)} className="text-right p-2 shadow-lg rounded-md cursor-pointer">
            <Pen/>
            </button>
            {/* <Button/> */}
        
        </div>
      
        <div className="my-5 mx-4">
            <div className="flex items-center gap-3 my-2">
                <Mail/>
                <span className="">
                    <a href ={`mailto:$(user?.email)`}>{user?.email}</a>
                </span>

            </div>
            <div className="flex items-center gap-3 my-2">
                <Contact/>
                <span className="">
                    <a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</a></span>
            </div>

        
        <div className="">
            <h1 className="font-bold text-xl">Skills</h1>
            <div className="flex items-center gap-2">
            {skills.length!==0? (skills.map((item,index)=>
                <Badge key={index} className="bg-black p-2 text-white rounded-md ">{item}</Badge>)):
                (
                    <span>NA</span>
                )
            
            }
            
        </div>
        </div>
    </div>
    <div>
        <div className="grid w-full max-w-sm items-center gap-1.5 mx-4">
            <label className="text-md font-bold mb-2">Upload Resume</label>
            <div>
                {
                    isResume? (<a target="_blank"  className="bg-black p-2 rounded-md  text-white" href="http://resume.pdf" download="resume.pdf">Download Resume</a>):
                    (<span>No Resume found</span>)
                }
            </div>
        </div>

       
    </div>
     
    </div>
    <div className="max-w-4xl  bg-white rounded-2xl  flex flex-col items-center mx-auto">
            <h1 className="text-lg my-lg font-bold">Applied Jobs</h1>
            <AppliedJob/>
        </div>
        {/* Edit Profile Model */}
        <EditProfileModal open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile
