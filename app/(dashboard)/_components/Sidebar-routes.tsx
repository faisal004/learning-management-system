'use client'

import { BarChart, Compass, Layout, List } from 'lucide-react'
import Sidebaritems from './Sidebaritems'
import { usePathname } from 'next/navigation'

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
const TeacherRoutes = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
]
const Sidebarroutes = () => {
  const pathname= usePathname()
  const isTeacherpage=pathname?.includes("/teacher")
  const routes = isTeacherpage ? TeacherRoutes : guestRoutes;
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
