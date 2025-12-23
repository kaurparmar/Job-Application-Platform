import React from 'react'
import {Link} from 'react-router-dom'
import Avatar from '../ui/avatar.jsx'
import Popover from '../ui/Popover.jsx'
import {useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '../../redux/authSlice.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { USER_API_ENDPOINT } from '../../utils/data.js'

function Navbar() {
  const {user} = useSelector((store) => store.auth)
  const dispatch =useDispatch()
        const navigate=useNavigate()
    const logoutHandler = async()=>{

      try{
        const response = await axios.post(`${USER_API_ENDPOINT}/logout`,{},{withCredentials:true});
        
        if(response?.data?.success){
          dispatch(setUser(null));
          navigate("/");
          toast.success("Logged Out Successfully")
          
        }
      }
      catch(error){
        console.log(error);
        toast.error(error.response.data.message)
      }
    }
    
  return (
    <div className="bg-white mx-6">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 ml-7 mr-10">
        <h1 className="text-2xl font-bold">
          Job<span className="text-blue-600">Nest</span>
        </h1>

        <div className="flex items-center gap-3">
          <ul className="flex flex-row items-center gap-6 list-none p-0 m-0 font-medium">
            <li><Link to="/Home" className="cursor-pointer">Home</Link></li>
            <li ><Link to="/Browse"className="cursor-pointer">Browse</Link></li>
            <li><Link to="/Jobs" className="cursor-pointer">Jobs</Link></li>
          </ul>
        {!user ? (
            <div className="flex items-center gap-5">
             <Link to={"/login"}><button className="w-full ml-2 cursor-pointer bg-gray-200 text-gray-800 px-2 py-1 rounded  hover:bg-gray-300">
                            Login
                        </button></Link>
                    
                    <Link to={"/register"}><button className="w-full cursor-pointer bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                        Register
                    </button></Link>
            </div>
            ) : (

    
          <Popover
            content={
            //   popover content: name of account holder, profile and logout buttons
                <div>
                    <div className= "flex gap-3 mb-4 items-center">
                    <Avatar
              src={user?.profile?.profilePhoto || "https://cdn-icons-png.flaticon.com/512/5087/5087579.png"}
              alt="User Avatar"
              size={60}
            />
                    <p className="font-semibold mb-2 text-blue-">John Doe</p>
                    </div>
                    {/* <Link to="/profile"> */}
                        <button className="w-full cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded mb-2 hover:bg-gray-300">
                          <Link to="/Profile">
                            Profile
                            </Link>
                        </button>
                    {/* </Link> */}

                    <button 
                    onClick={logoutHandler} 
                    className="w-full cursor-pointer bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                        Logout
                    </button>
                </div>
                
            }
          >
            <Avatar
              src={user?.profile?.profilePhoto || "https://cdn-icons-png.flaticon.com/512/5087/5087579.png"}
            
              alt="User Avatar"
              size={60}
            />
          </Popover>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
