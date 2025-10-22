import React, { useState } from 'react'
import EditProductModal from './EditProductModal';
import ConfirmBox from './ConfirmBox';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import successAlert from '../utils/SuccessAlert';

const AdminProductCard = ({product, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleDelete = async()=>{
    try {
      const response = await Axios({
        ...SummeryApi.deleteProduct,
        data: {
          _id: product?._id,
        }
      })
      if(response?.data?.success){
        successAlert(response?.data?.message)
        setOpenDelete(false)
        fetchProductData()
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div className="w-36 rounded shadow-md p-2 bg-white hover:shadow-lg ">
        <div className="">
            <img src={product.image[0]} alt="" />
        </div>
        <div className="">
            <p className="text-ellipsis text-neutral-800 line-clamp-2 font-medium ">{product?.name} </p>
            <p className="text-neutral-500 text-sm">{product?.unit} </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <button onClick={()=> setEditOpen(true)} className="border px-2 rounded cursor-pointer text-base mt-1 bg-green-100 hover:bg-green-200 border-green-600 ">Edit</button>
          <button onClick={()=> setOpenDelete(true)} className="border px-2 rounded cursor-pointer text-base mt-1 bg-red-100 hover:bg-red-200 border-red-600 ">Delete</button>
        </div>
        {editOpen && <EditProductModal fetchProductData={fetchProductData} product={product} close={()=>setEditOpen(false)} />}
        {openDelete && <ConfirmBox close={()=>setOpenDelete(false)} data={product} confirm={handleDelete}/>}

    </div>

  )
}

export default AdminProductCard