import React from 'react'
import Navbar from './Navbar.jsx'
import Header from './Header.jsx'
import Categories from './Categories.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './Footer.jsx'
import useGetAllJobs from '../../hooks/useGetAllJobs.jsx'
const Home = () => {
  useGetAllJobs()
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
