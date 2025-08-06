import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router'


const Dashboard = () => {
  return (
    <section className="bg-amber-50">
      <div className="container mx-auto flex gap-4 p-5">
          {/* left side */}
          <div className=" py-5 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden  lg:block flex-1 border-r-2 border-gray-200">
            <UserMenu/>
          </div>
          {/* right side */}
          <div className="bg-white flex-4 min-h-[75vh] ">
            <Outlet/>
          </div>
      </div>
    </section>
  )
}

export default Dashboard