// Register Page Component with options for recruiter or applicants
import React, { useState } from 'react'
import Avatar from '../ui/avatar.jsx'
import { Link, useNavigate } from 'react-router-dom' 
import axios from 'axios'
import { USER_API_ENDPOINT } from '../../utils/data.js'
import {toast} from 'sonner'
import Navbar from "../components_lite/Navbar.jsx"
import { useDispatch } from 'react-redux';
import { setLoading } from '../../redux/authSlice.js';
import { useSelector } from 'react-redux';

export default function Register() {
  const [isRecruiter, setIsRecruiter] = useState(false);    
    const handleRoleChange = (role) => {
        setIsRecruiter(role === 'recruiter');
    };         
    const [inputValues, setInputValues] = useState({
        fullname: '',
        email: '',
        password: '',
        phone: "",
        file: "",

    });
    const navigate = useNavigate();
    
      const dispatch = useDispatch();
      const {loading} = useSelector((store) => store.auth);
    const changeEventHandler = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    }
    const changeFileHandler = (e) => {
        setInputValues({
            ...inputValues,
            file: e.target.files?.[0]
        });
    }
    const SubmitEventHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", inputValues.fullname);
        formData.append("email", inputValues.email);
        formData.append("password", inputValues.password);
        formData.append("role", isRecruiter ? "recruiter" : "applicant");
        formData.append("phone", inputValues.phone);
        if(inputValues.file){formData.append("file", inputValues.file);}
        
        try
        {
             dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
                withCredentials: true,
            });
            if(res.data.success)
            {
                toast.success(res.data.message, { duration: 2000 });
                // delay navigation until toast disappears so user sees the message
                setTimeout(() => navigate('/login'), 2100);
            }
        }
        catch(err)
        {
            console.log("error in form submission", err);
            toast.error(err.response?.data?.message || 'Registration failed');
        }
        finally{
                    dispatch(setLoading(false));
                }
    }
    return (
        <>
        <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mt-10 mb-10">
            <div className="flex justify-center mb-6">
                <Avatar 
                    src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"   
                    alt="Login Logo"

                    size={80}
                />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Register to JobNest</h2>
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
            <form onSubmit={SubmitEventHandler}>
            {/* // full name field for applicant and recruiter both */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        value={inputValues.fullname}
                        name="fullname"
                        onChange={ changeEventHandler }
                        id="fullname"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your full name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={inputValues.email}
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
                        value={inputValues.password}
                        name="password"
                        onChange={ changeEventHandler }
                        id="password"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your password"       
                        required
                    />
                </div>
                {/* // add phone number field for applicant and recruiter both */}
                    <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        value={inputValues.phone}
                        name="phone"
                        onChange={ changeEventHandler }
                        id="phone"
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Enter your phone number"
                        required
                    />
                </div>
                <div className="flex items-center space-x-2">
                    {/* add profile photo */}
                    <label className="block text-gray-700 mb-2" htmlFor="profilePhoto">Profile Photo</label>
                    <input
                        type="file"
                        name="file"
                        onChange={ changeFileHandler }
                        id="file"
                        className="cursor-pointer w-full px-3 py-2 border rounded"
                        accept="image/*"
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
                    Register as {isRecruiter ? 'Recruiter' : 'Applicant'}
                </button>)
                    }
                
                {/* already account then login */}
                <p className="mt-4 text-center text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
                </p>
            </form> 
        </div>
    </div>

    </>
  )
}   

