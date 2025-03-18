import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './mainPage'
import Login from './login'
import Signup from './signup'
import UserRoutes from './userRoutes'
import About from './about'
import AllJobs from "./allJobs"
import PostJob from './postJob'
import Job from './job'
import MyApplications from './myApplications'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/alljobs' element={<UserRoutes><AllJobs/></UserRoutes>} />
        <Route path='/alljobs/:id' element={<UserRoutes><Job/></UserRoutes>} />
        <Route path='/postjob' element={<UserRoutes><PostJob/></UserRoutes>} />
        <Route path='/applications' element={<UserRoutes><MyApplications/></UserRoutes>} />
    </Routes>
  )
}

export default AllRoutes
