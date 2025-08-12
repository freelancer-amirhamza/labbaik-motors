import React, { useState } from 'react'
import { DisplayPriceInTaka } from '../utils/DisplayPriceInTaka'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummeryApi from '../common/SummeryApi'
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { notDiscountPrice, totalPrice, totalQty, fetchCartItems, fetchOrders } = useGlobalContext()
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const addressList = useSelector(state => state.address.addressList)
  const [selectedAddress, setSelectedAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItems?.cart);
  const [deliveryFee, setDeliveryFee] = useState(0)
  const navigate = useNavigate()
console.log(cartItemsList, "cartlist")

  const handleOnlinePayment = async () => {
    try {
      if (deliveryFee === 0) {
        toast.error("Please select your delivery method!")
        return;
      }
      const response = await Axios({
        ...SummeryApi.onlinePayment,
        data: {
          list_items: cartItemsList,
          totalAmount: totalPrice,
          subTotalAmount: notDiscountPrice,
          addressId: addressList[selectedAddress]?._id,
          deliveryFee: deliveryFee,
        }
      })
      if (response.data?.success) {
        toast.success(response.data?.message)
        // After receiving the response from /api/order/online-payment
        window.location.href = response.data.gatewayUrl;
        if (fetchCartItems) {
          fetchCartItems()
        }
        // navigate("/success", {
        //   state: {
        //     text: "Order"
        //   }
        // })
        if (fetchOrders) {
          fetchOrders()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  const handleCashOnDelivery = async () => {
    try {
      if (deliveryFee === 0) {
        toast.error("Please select your delivery method!")
        return;
      }
      const response = await Axios({
        ...SummeryApi.cashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          totalAmount: totalPrice,
          subTotalAmount: notDiscountPrice,
          addressId: addressList[selectedAddress]?._id,
          deliveryFee: deliveryFee,
        }
      })
      if (response.data?.success) {
        toast.success(response.data?.message)
        if (fetchCartItems) {
          fetchCartItems()
        }
        navigate("/success", {
          state: {
            text: "Order"
          }
        })
        if (fetchOrders) {
          fetchOrders()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className="bg-blue-50">
      <div className="container mx-auto gap-2 flex flex-col lg:flex-row items-start justify-between p-4">
        {/* address */}
        <div className="w-full ">
          <div className="flex justify-between w-full items-center py-4">
            <h2 className="text-lg font-semibold text-neutral-700 ">Choose Your Address.</h2>
            <button onClick={() => setOpenAddAddress(true)}
              className="bg-blue-200 hover:shadow-lg hover:shadow-zinc-300 py-1 px-2 rounded
            font-medium hover:bg-blue-300 text-slate-700 border cursor-pointer">Add Address</button>
          </div>
          <div className="w-full flex flex-col gap-4 lg:flex-row">
            {addressList[0] && addressList.map((address, index) => {
              return (
                <label key={index} htmlFor={index} className={`w-full flex flex-row-reverse justify-between px-4 py-3
               border-dashed border ${selectedAddress == index ? "border-blue-700 bg-blue-100" : "bg-white"} cursor-pointer  hover:shadow-lg rounded `}>
                  <div>
                    <input type="radio"
                      value={index}
                      className='w-4 h-4'
                      checked={selectedAddress == index}
                      onClick={(e) => setSelectedAddress(e.target.value)} name="address" id={index} />
                  </div>
                  <div>
                    <p className="text-neutral-700 font-semibold">Address: <span className='font-medium text-base'>{address?.addressLine}</span> </p>
                    <p className="text-neutral-700 font-semibold">City: <span className='font-medium text-base'>{address?.city}</span> </p>
                    <p className="text-neutral-700 font-semibold">State: <span className='font-medium text-base'>{address?.state}</span> </p>
                    <p className="text-neutral-700 font-semibold">Country: <span className='font-medium text-base'>{address?.country}</span></p>
                    <p className="text-neutral-700 font-semibold">Phone No: <span className='font-medium text-base'>{address?.phone}</span></p>
                  </div>
                </label>)
            })
            }
          </div>
        </div>

        {/* Summery */}
        <div className=" w-full lg:max-w-md flex flex-col  ">

          <h2 className="text-lg font-semibold text-neutral-700 ">Order Summery</h2>
          <div className="grid  px-4 max-sm:px-0.5 py-1 bg-slate-200 rounded">
            <h1 className='font-semibold text-neutral-900 '>Bill Details</h1>
            <div className="flex items-center justify-between font-semibold ">
              <p className='text-neutral-700 text-sm'>Sub Total:</p>
              <p className='text-neutral-700 text-sm'>{DisplayPriceInTaka(notDiscountPrice)}</p>
            </div>
            <div className="flex items-center justify-between font-semibold ">
              <p className='text-neutral-700 text-sm'>Discount:</p>
              <p className="text-neutral-500 text-sm line-through"> {DisplayPriceInTaka(notDiscountPrice - totalPrice)} </p>
            </div>
            <div className="flex items-center justify-between font-semibold ">
              <p className='text-neutral-700 text-sm'>Total Quantity:</p>
              <p className="text-neutral-600 text-sm"> {totalQty} Items</p>
            </div>
            <div className="flex flex-col py-1 justify-between font-semibold ">
              <p className='text-neutral-900 '>Delivery Fee:</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span onClick={() => setDeliveryFee(60)} className={`text-sm border-2 px-2 py-0.5 cursor-pointer ${deliveryFee === 60 ? "border-green-600 text-green-700" : "border-neutral-500 text-neutral-600"} font-medium rounded`}>Inside Dhaka</span>
                  <span onClick={() => setDeliveryFee(100)} className={`text-sm border-2 px-2 py-0.5 cursor-pointer ${deliveryFee === 100 ? "border-green-600 text-green-700" : "border-neutral-500 text-neutral-600"} font-medium rounded`}>Outside Dhaka</span>
                </div>
                <p className="text-neutral-600 text-sm"> {DisplayPriceInTaka(deliveryFee)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between font-semibold ">
              <p className='text-neutral-00 '>Grand Total:</p>
              <p className="text-neutral-00 "> {DisplayPriceInTaka(totalPrice + deliveryFee)} </p>
            </div>
          </div>
          <div className="w-full lg:max-w-md grid gap-2 py-4">
            <div className="w-full flex items-center justify-between">
              <button onClick={handleOnlinePayment} className='bg-green-600 hover:bg-green-700 cursor-pointer w-full p-2 rounded text-white font-semibold '>Online Payment</button>
            </div>
            <div className="w-full flex items-center justify-between">
              <button onClick={handleCashOnDelivery} className='border-green-600 border  hover:bg-green-600 cursor-pointer w-full p-2 rounded hover:text-white text-green-600 font-semibold '>Cash On Delivery</button>
            </div>


          </div>
        </div>
      </div>
      {openAddAddress && <AddAddress close={() => setOpenAddAddress(false)} />}
    </section>
  )
}

export default CheckoutPage