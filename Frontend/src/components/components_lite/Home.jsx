import React from 'react'
import Navbar from './Navbar.jsx'
import Header from './Header.jsx'
import Categories from './Categories.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './Footer.jsx'
import { useEffect } from 'react'
import useGetAllJobs from '../../hooks/useGetAllJobs.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate=useNavigate()
  useGetAllJobs()
  const {user}=useSelector((store)=> store.auth)
  useEffect(()=>{
    if(user?.role === "recruiter"){
      navigate("/admin/companies");
    }
  },[])
  return (
    <div>
      <Navbar/>
      <Header/>
       <Categories/>
       
      <LatestJobs/>
      <Footer/> 
      
    </div>
  )
}

export default Home
