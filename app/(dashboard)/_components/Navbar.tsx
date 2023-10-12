import React from 'react'
import { MobileSidebar } from './Mobile-Sidebar'
import Navbarroutes from '@/components/Navbarroutes'

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <Navbarroutes/>
    </div>
  )
}

export default Navbar
