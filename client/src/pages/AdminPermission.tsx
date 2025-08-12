import React from 'react'
import isAdmin from '../utils/isAdmin'
import { useSelector } from 'react-redux'


const AdminPermission = ({children}) => {
  const user = useSelector(state=> state?.user?.user)
  return (
    <>
    {
      isAdmin(user?.role) ? children : <p className="text-2xl text-center rounded text-neutral-600 font-medium bg-amber-100 p-5">Do not have permission..</p>
    }
    </>
  )
}

export default AdminPermission