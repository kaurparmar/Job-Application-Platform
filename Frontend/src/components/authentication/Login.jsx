// login page with email password and role selection if no account then register
import React, { useState } from 'react';
import Avatar from '../ui/avatar.jsx';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_ENDPOINT } from '../../utils/data.js';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setLoading,setUser } from '../../redux/authSlice.js';
import { useSelector } from 'react-redux';

export default function Login() {
  const [isRecruiter, setIsRecruiter] = useState(false);
    const handleRoleChange = (role) => {
        setIsRecruiter(role === 'recruiter');
    }   
   const [input,setInput] = useState({
    email:"",
    password:""
    });
  const changeEventHandler = (e) => {
    setInput({
        ...input,
        [e.target.name]: e.target.value,
    });
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading} = useSelector((store) => store.auth);
    const SubmitEventHandler = async (e) => {
        e.preventDefault();

        try
        {
            dispatch(setLoading(true));
            const payload = {
                email: input.email,
                password: input.password,
                role: isRecruiter ? 'recruiter' : 'applicant'
            }

            const res = await axios.post(`${USER_API_ENDPOINT}/login`, payload, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            if(res.data.success)
            {
                dispatch(setUser(res.data.user))
                const welcome = res.data.message || `Welcome back ${res.data.user?.fullname || ''}`;
                
                navigate("/");
                
                toast.success(welcome, { duration: 2000 });
            }
        }
        catch(err)  
        {
            console.log("error in login submission", err);
            toast.error(err.response?.data?.message || 'Login failed');
        }
        finally{
            dispatch(setLoading(false));
        }
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mt-10 mb-10">
            <div className="flex justify-center mb-6">
                <Avatar 
                    src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
                    alt="Login Logo"
                    size={80}
                />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Login to JobNest</h2>
            <div className="flex justify-center mb-4">  
                <button
                    className={`px-4 py-2 rounded-l ${isRecruiter ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                    onClick={() => handleRoleChange('applicant')}
                >
                    Applicant
                </button>   
                <button
                    className={`px-4 py-2 rounded-r ${isRecruiter ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => handleRoleChange('recruiter')}
                >
                    Recruiter
                </button>
            </div>
            <form onSubmit = {SubmitEventHandler}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={input.email}
                        name="email"
                        onChange={ changeEventHandler }
                        id="email"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={input.password}
                        name="password"
                        onChange={ changeEventHandler } 
                        id="password"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {loading? (
                <div className="flex justify-center items-center my-10">
                    <div className="spinner-border text-blue-600" role = "status">
                
                    
                    <span className="sr-only">Loading...</span>
                    </div>
                    </div>)
                     :
                     (
                 <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Login as {isRecruiter ? 'Recruiter' : 'Applicant'}
                </button>)
                    }
               
              {/* if no account then register */}
              <p className="mt-4 text-center text-gray-600">
                  Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>


</p>
            </form>
        </div>
    </div>
  );
}