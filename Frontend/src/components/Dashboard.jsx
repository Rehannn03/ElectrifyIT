import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Utils/Sidebar'
import Header from '../components/Header'
function Dashboard() {
  return (
    <div className='flex flex-row h-screen w-screen overflow-hidden'>
        <Sidebar className='sticky top-0 h-screen'/>
        <div className='flex flex-col flex-1'>
          <Header className='sticky top-0'/>
          <div className='p-4 h-auto w-auto'>
            <Outlet/>
          </div>
        </div>
    </div>
  )
}

export default Dashboard