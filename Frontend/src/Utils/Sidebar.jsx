import React,{useState} from 'react'
import { SIDEBAR_LINKS } from './navigation'
import { Link } from 'react-router-dom'
import electrifyit_logo from '../assets/electrifyit_logo.jpeg'

import './Sidebar.css'
function Sidebar() {
    const sideBarLinks=SIDEBAR_LINKS
    const [activeLink, setActiveLink]=useState(null)
  return (
    <div className=" flex flex-col h-screen w-60 sidebar text-white">
      <div className="flex-grow flex flex-col p-4">
        <div className="flex items-center gap-2">
          <img src={electrifyit_logo} alt="ElectrifyIT" className="w-10 h-10"/>
          <span className="text-sm font-semibold">Electrify<span className='it'>it</span></span>
        </div>
        <div className="mt-8">
          {sideBarLinks.map((item)=><SidebarLink key={item.key} 
          item={item}
          isActive={item.key === activeLink}
          onActivate={()=>setActiveLink(item.key)}/>)}
        </div>
        </div>
    </div>

  )
}

function SidebarLink({item,isActive,onActivate}){
  return(
    <Link to={item.path} className={`flex items-center gap-2 font-semibold font-sans px-3 py-2 hover:bg-white hover:rounded-2xl hover:text-sidebartext ${isActive ? 'bg-white rounded-2xl text-sidebartext' : ''}`} onClick={onActivate}> 
            <img src={item.icon} alt="" height={20} width={20}/>
            {item.label}
        </Link>
    )
}
  


export default Sidebar