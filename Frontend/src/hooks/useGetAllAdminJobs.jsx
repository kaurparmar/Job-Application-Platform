import React from 'react'
import { setAllAdminJobs } from '../redux/jobSlice';
import axios from 'axios'
import  {useEffect} from "react";
import {useDispatch} from 'react-redux';
import { JOB_API_ENDPOINT } from '../utils/data';
function useGetAllAdminJobs() {
    const dispatch = useDispatch()
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null)
 useEffect(()=>{
    
    const fetchAllAdminJobs = async()=>{
        setLoading(true);
        setError(null);
        try{
            const res=await axios.get(`${JOB_API_ENDPOINT}/getadminjobs`,{
                withCredentials:true,
            });
            if(res.data.success){
                dispatch(setAllAdminJobs(res.data.jobs))
            }
            else{
                setError("Failed to fetch jobs");
            }
        }
        catch(error){
            console.log(error)
        }
    }
    fetchAllAdminJobs();

 },[dispatch])
}

export default useGetAllAdminJobs
