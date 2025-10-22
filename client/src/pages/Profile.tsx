import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';
import toast from 'react-hot-toast';
const Profile = () => {
  const user = useSelector((state) => state.user.user)
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const [userData, setUserData]= useState({
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile
  })

  useEffect(()=>{
    setUserData({
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile
    })
  },[user])

  const handleOnChange = (e)=>{
    const {name, value} = e.target;
    setUserData((userData)=>{
      return{
        ...userData,
        [name] : value
      }
    })
  }

  const handleOnSubmit =async (e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const response = await Axios({
        ...SummeryApi.updateUserDetails,
        data: userData,
      })
            if(response?.data?.success){
                toast.success(response?.data?.message)
                const userData = await fetchUserDetails()
                dispatch(setUserDetails(userData.data))
            }
    } catch (error) {
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }

  return (
    <section className="">
      <div className="container mx-auto">
        {/* edit avatar image */}
        <div className="flex flex-col items-center justify-center w-full pt-10">
          <div className="w-20 h-20   rounded-full">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-full object-fill border-2 border-amber-400 h-full rounded-full"
              />
            ) : (
              <FaRegUserCircle className="w-20 h-20 text-gray-400" />
            )}
          </div>
          <div className="pt-4">
            <button onClick={()=> setShowProfileEdit(true)}
             className=" border-2 px-2 py-1 rounded-full border-amber-300 hover:bg-orange-500 hover:text-white font-semibold ">Edit Profile</button>
          </div>
          {showProfileEdit && <UserProfileAvatarEdit close={()=>setShowProfileEdit(false)} />}
        </div>
        {/* edit user name email mobile number */}
        <form className="container mx-auto grid grid-cols-1 my-4 ">
          <div className="grid gap-1  border-neutral-500 p-1.5 rounded-sm">
            <label className='text-xl font-medium text-neutral-800' htmlFor="name">Name:</label>
            <input  type="text" name="name" id="name"
            placeholder='Enter your name' required
             value={userData?.name}
             onChange={handleOnChange}
            className="border-2 border-neutral-400 focus-within:border-amber-200 p-1 rounded-sm outline-none " />
          </div>
          <div className="grid gap-1   border-neutral-500 p-1.5 rounded-sm">
            <label className='text-xl font-medium text-neutral-800' htmlFor="name">Email:</label>
            <input  type="email" name="email" id="email" required
            placeholder='Enter your email'
             value={userData?.email}
             onChange={handleOnChange}
            className="border-2 border-neutral-400 focus-within:border-amber-200 p-1 rounded-sm outline-none " />
          </div>
          <div className="grid gap-1   border-neutral-500 p-1.5 rounded-sm">
            <label className='text-xl font-medium text-neutral-800' htmlFor="name">Phone Number:</label>
            <input  type="text" name="mobile" id="mobile" required
            placeholder='Enter your phone number'
             value={userData?.mobile}
             onChange={handleOnChange}
            className="border-2 border-neutral-400 focus-within:border-amber-200 p-1 rounded-sm outline-none " />
          </div>
          <button onClick={handleOnSubmit} className='bg-amber-500 font-medium text-xl p-1 cursor-pointer  rounded-md text-white hover:bg-transparent
           hover:text-amber-600 mx-1 my-2 border-2 border-amber-500 ' type="submit">
            {loading ? "Loading..." : "Update"}
            </button>
        </form>
      </div>
    </section>
  )
}

export default Profile