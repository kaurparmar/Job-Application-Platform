import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Loader2 } from 'lucide-react';
import axios from 'axios'; // Added missing import
import { toast } from 'sonner'; // or 'react-hot-toast'
import { USER_API_ENDPOINT } from '../../utils/data';
import { setUser } from '../../redux/authSlice'; // Ensure this path is correct

function EditProfileModal({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: user?.profile?.resume || null
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser( res.data.user));
        toast.success(res.data.message);
       
      }
    } catch (error) {
    // 1. Log the full error to your browser console for debugging
    console.error("FULL ERROR LOG:", error); 

    // 2. Safely access the server's error message
    // error.response only exists if the server actually replied with a 4xx/500 status
    const serverMessage = error.response?.data?.message || "Internal Server Error";

    // 3. Show the toast using the correct variable
    toast.error(serverMessage); 
}finally {
      setLoading(false);
    }
     setOpen(false);
     console.log(input)
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-50 w-full max-w-[500px] bg-white p-6 shadow-lg rounded-xl border animate-in fade-in zoom-in duration-200">
            <button onClick={() => setOpen(false)} className="absolute right-4 top-4 opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-col space-y-1.5 text-left mb-4">
              <h2 className="text-lg font-semibold">Edit Profile</h2>
              <p className="text-sm text-gray-500">Update your account details below.</p>
            </div>

            <form onSubmit={submitHandler} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Name</label>
                <input id="fullname" name="fullname" value={input.fullname} onChange={changeEventHandler} className="col-span-3 h-10 rounded-md border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Email</label>
                <input id="email" name="email" value={input.email} onChange={changeEventHandler} className="col-span-3 h-10 rounded-md border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Number</label>
                <input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3 h-10 rounded-md border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Bio</label>
                <input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3 h-10 rounded-md border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Skills</label>
                <input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} className="col-span-3 h-10 rounded-md border border-gray-200 px-3 text-sm outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label className="text-right text-sm font-medium">Resume</label>
                <input type="file" id="resume" accept="application/pdf" onChange={fileChangeHandler} className="col-span-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-black file:text-white cursor-pointer" />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button type="submit" disabled={loading} className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 flex items-center justify-center">
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfileModal;
