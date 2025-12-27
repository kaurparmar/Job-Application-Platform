import { useState } from 'react'
import Navbar from './components/components_lite/Navbar.jsx'
import { createBrowserRouter, Route } from 'react-router-dom'
import Login from './components/authentication/Login.jsx'
import Register from './components/authentication/Register.jsx'
import { RouterProvider } from 'react-router-dom'
import Home from './components/components_lite/Home.jsx'
import PrivacyPolicy from './components/components_lite/PrivacyPolicy.jsx'
import TermsOfService from './components/components_lite/TermsOfService.jsx'
import Jobs from './components/components_lite/Jobs.jsx'
import Browse from './components/components_lite/Browse.jsx'
import Profile from './components/components_lite/Profile.jsx'
import Description from './components/components_lite/Description.jsx'
import Companies from './components/admincomponents/Companies.jsx'
import CompanyCreate from './components/admincomponents/CompanyCreate.jsx'
import CompanySetup from './components/admincomponents/CompanySetup.jsx'
import AdminJobs from './components/admincomponents/AdminJobs.jsx'
import PostJob from './components/admincomponents/PostJob.jsx'
import Applicants from './components/admincomponents/Applicants.jsx'
import './App.css'
const appRouter = createBrowserRouter([
  {path:'/',
    element:<Home/>
  },
  {path:'/login',
    element:<Login/>
  },
  {path:'/register',
    element:<Register/>
  },
  {path:'/PrivacyPolicy',
    element:<PrivacyPolicy/>
  },
  {path:'/TermsOfService',
    element:<TermsOfService/>
  },
   {path:'/Jobs',
    element:<Jobs/>
  },
  {path:'/Home',
    element:<Home/>
  },
  {path:'/Browse',
    element:<Browse/>
  },
  {path:'/Profile',
    element:<Profile/>
  },
   {path:'/description/:id',
    element:<Description/>
  },
  
  //admin

  {path:'/admin/companies',
    element:<Companies/>
  },
  {path:'/admin/companies/create',
    element:<CompanyCreate/>
  },
  {path:'/admin/company/:id',
    element:<CompanySetup/>
  },
  {path:'/admin/Jobs',
    element:<AdminJobs/>
  },
  {path:'/admin/jobs/create',
    element:<PostJob/>
  },
  {path:'/admin/jobs/:id/applicants',
    element:<Applicants/>
  },
  
  
])
function App() {


  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App
