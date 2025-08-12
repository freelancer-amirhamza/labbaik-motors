import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import EditAddress from '../components/EditAddress';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/GlobalProvider';
import ConfirmBox from '../components/ConfirmBox';

const Address = () => {
  const addressList = useSelector(state => state.address.addressList)
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const [openEditAddress,setOpenEditAddress] = useState(false);
  const [openConfirmBox,setOpenConfirmBox] = useState(false)
  const [editData, setEditData]= useState({})
  const [deleteData, setDeleteData]= useState({})
  const {fetchAddress} = useGlobalContext()

  const handleDeleteAddress = async()=>{
    try {
      const response = await Axios({
        ...SummeryApi.deleteAddress,
        data: {
          _id: deleteData._id
        }
      })
      if(response.data?.success){
        toast.success(response.data.message)
        setOpenConfirmBox(false)
        fetchAddress()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className='w-full '>
      <div className="w-full ">
        <div className="flex justify-between w-full items-center py-4">
          <h2 className="text-lg font-semibold text-neutral-700 ">Choose Your Address.</h2>
          <button onClick={() => setOpenAddAddress(true)}
            className="bg-blue-200 hover:shadow-lg hover:shadow-zinc-300 py-1 px-2 rounded
            font-medium hover:bg-blue-300 text-slate-700 border cursor-pointer">Add Address</button>
        </div>
        <div className="w-full flex flex-col gap-4 lg:flex-row">
          {addressList[0] && addressList.map((address, index) => {
            return (<div key={index} className="w-full flex items-start flex-row-reverse justify-between p-2 border-dashed border cursor-pointer bg-white hover:shadow-lg rounded ">
              <div className='flex flex-col items-center justify-between gap-2'>
                <button onClick={()=>{
                  setOpenEditAddress(true)
                  setEditData(address)
                } }
                className=" hover:text-white text-green-600  p-1 rounded text-xl bg-green-100 hover:bg-green-600 "><MdModeEdit /> </button>
                <button onClick={()=>{
                  setOpenConfirmBox(true)
                  setDeleteData(address)
                }  } className=" hover:text-white text-orange-600  p-1 rounded text-xl bg-orange-100 hover:bg-orange-600 "><MdDeleteForever /> </button>
              </div>
              <div>
                <p className="text-neutral-700 font-semibold">Address: <span className='font-medium text-base'>{address?.addressLine}</span> </p>
                <p className="text-neutral-700 font-semibold">City: <span className='font-medium text-base'>{address?.city}</span> </p>
                <p className="text-neutral-700 font-semibold">State: <span className='font-medium text-base'>{address?.state}</span> </p>
                <p className="text-neutral-700 font-semibold">Pincode: <span className='font-medium text-base'>{address?.pinCode}</span> </p>
                <p className="text-neutral-700 font-semibold">Country: <span className='font-medium text-base'>{address?.country}</span></p>
                <p className="text-neutral-700 font-semibold">Phone No: <span className='font-medium text-base'>{address?.phone}</span></p>
              </div>
            </div>)
          })
          }
        </div>
      </div>
      {openAddAddress && <AddAddress close={() => setOpenAddAddress(false)} />}
      {openEditAddress && <EditAddress data={editData} close={()=> setOpenEditAddress(false)}/>}
      {openConfirmBox && <ConfirmBox data={deleteData} confirm={handleDeleteAddress} close={()=> setOpenConfirmBox(false)} />}
    </section>
  )
}

export default Address