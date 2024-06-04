import SideNav from '../../components/SideNav'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'

import { SideNavData } from '../../components/SideNav'

export const Route = createLazyFileRoute('/__auth/pengaturan')({
  component: Pengaturan 
})

const menu = [
  {
    label: "Kampus",
    link: "/pengaturan/kampus"
  } as SideNavData,
  {
    label: "Unit",
    link: "/pengaturan/unit"
  } as SideNavData,
  {
    label: "Gedung",
    link: "/pengaturan/gedung"
  } as SideNavData,
]

function Pengaturan() {
  return (
  <div className={`flex grow w-full bg-blue-900`}>
    <SideNav data={menu} />
    <div className='grow p-2 sm:p-6 lg:p-8 bg-white rounded shadow'>
      <Outlet />
    </div>
  </div>)
}