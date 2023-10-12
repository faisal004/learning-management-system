'use client'

import { Compass, Layout } from 'lucide-react'
import Sidebaritems from './Sidebaritems'

const guestRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
  },
]
const Sidebarroutes = () => {
  const routes = guestRoutes
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <Sidebaritems
          key={route.href}
          icons={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}

export default Sidebarroutes
