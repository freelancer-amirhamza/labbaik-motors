import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoMdCloseCircleOutline } from "react-icons/io";
const UserMenuMobile = () => {
  return (
    <section className='relative '  >
      <button onClick={()=> window.history.back()} className=' right-3 top-3.5 absolute z-10 hover:bg-amber-200  px-2 py-2 rounded-full ' >
        <IoMdCloseCircleOutline size={24}/>
      </button>
      <div className="flex flex-col container mx-auto px-4 absolute w-full h-full bg-gray-100">

        <UserMenu/>
      </div>
    </section>
  )
}

export default UserMenuMobile