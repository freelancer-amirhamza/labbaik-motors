import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummeryApi from '../common/SummeryApi'
import toast from 'react-hot-toast'

const EditOrder =  ({ data, close, fetchData }) => {
    const [formData, setFormData] = useState({
        payment_status: data?.payment_status || "pending",
        order_status:data?.order_status || "pending",
    })

const handleOnChange = (e)=>{
    const {name,value} = e.target;
    setFormData({
        ...formData,
        [name] : value,
    })
}


    const handleSubmit =async(e)=>{
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummeryApi.updateAdminOrder,
                data:{
                    _id:data?._id,
                    orderId: data?.orderId,
                    payment_status:formData?.payment_status,
                    order_status: formData?.order_status,
                }
            })
            if(response.data?.success){
                toast.success(response.data?.message);
                fetchData()
                close()
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className="top-0 bottom-0 p-2 left-0 right-0 bg-neutral-950/90 fixed">
            <div className="max-w-md bg-white p-5 mx-auto mt-20 rounded">

                <div className="flex items-center justify-between">
                    <h1 className="text-neutral-700 text-xl font-semibold">Edit Order</h1>
                    <button onClick={close}
                        className="border rounded text-orange-600 hover:text-white cursor-pointer hover:bg-orange-600">
                        <IoClose size={22} />
                    </button>
                </div>
                <div className="grid gap-2">
                    <div className="flex flex-col">
                        <label className='font-medium text-lg text-neutral-700' htmlFor="payment_status">Payment Status</label>
                        <select
                            value={formData?.payment_status}
                            onChange={handleOnChange}
                            name="payment_status"
                            id="payment_status"
                            className='outline-none border rounded p-1 text-base uppercase focus-within:text-orange-600'
                        >
                            <option value="pending">pending</option>
                            <option value="paid">paid</option>
                            <option value="returned">returned</option>
                            <option value="canceled">canceled</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label className='font-medium text-lg text-neutral-700' htmlFor="order_status">Order Status</label>
                        <select
                         value={formData?.order_status}
                            onChange={handleOnChange}
                            name="order_status"
                            id="order_status"
                            className='outline-none border rounded p-1 text-base uppercase focus-within:text-orange-600'
                        >
                            <option value="pending">pending</option>
                            <option value="confirmed">confirmed</option>
                            <option value="shipping">shipping</option>
                            <option value="delivered">delivered</option>
                            <option value="rejected">rejected</option>
                            <option value="returned">returned</option>
                            <option value="canceled">canceled</option>
                        </select>
                    </div>
                </div>
                <button onClick={handleSubmit} type='submit' className=" border w-full mt-4 p-1 rounded text-green-600
                hover:text-white hover:bg-green-600 cursor-pointer text-lg font-semibold">Update</button>

            </div>
        </section>
    )
}

export default EditOrder