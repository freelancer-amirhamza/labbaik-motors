import React from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { DisplayPriceInTaka } from '../utils/DisplayPriceInTaka';
import { useGlobalContext } from '../provider/GlobalProvider';
import { FaAngleDoubleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import AddToCartButton from './AddToCartButton';
import { priceWithDiscount } from '../utils/priceWithDiscount';
import emptyCart from "../assets/empty-cart.gif"

const CartMenu = ({ close }) => {
  const { totalPrice, notDiscountPrice,totalQty } = useGlobalContext()
  const cartItems = useSelector((state) => state.cartItems?.cart);
  const navigate = useNavigate()
  const user = useSelector(state=>state?.user?.user)
  const redirectToCheckoutPage = ()=>{
    if(user){
      navigate("/checkout");
      if(close)close()
    }
  }
  return (
    <section className="bg-neutral-900/90 top-0 z-50 fixed bottom-0 left-0 right-0 ">
      <div className="bg-white w-full max-w-sm max-h-screen min-h-screen ml-auto">
        <div className="px-3 py-2 shadow-md flex items-center justify-between">
          <h2 className='text-xl font-semibold text-neutral-700'>Cart</h2>
          <Link to={"/"} className="text-2xl lg:hidden hover:bg-orange-600 border p-0.5 rounded hover:text-white text-neutral-700">
            <IoClose />
          </Link>
          <div onClick={close} className="text-2xl hidden lg:block hover:bg-orange-600 border p-0.5 rounded hover:text-white text-neutral-700">
            <IoClose />
          </div>
        </div>

        <div className="min-h-[75vh]  lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] flex flex-col px-2 ">
          {cartItems[0] ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 mt-2 bg-blue-100 rounded-full  text-sm text-blue-400 font-semibold">
                <p className="">Your total savings</p>
                <p className=""> {DisplayPriceInTaka(notDiscountPrice - totalPrice)} </p>
              </div>
              <div className="grid gap-4 overflow-y-scroll p-4">
                {cartItems[0] && (
                  cartItems.map((item, index) => {
                    return (
                      <div key={index} className="flex w-full gap-2  justify-between">
                        <div className="min-w-16 max-w-16 h-16 bg-white rounded border-neutral-400 border-dotted border ">
                          <img className='object-scale-down rounded-md ' src={item?.productId?.image[0]} alt={item?.productId?.name} />
                        </div>
                        <div className="w-full text-xs max-w-sm">
                          <p className=" text-ellipsis line-clamp-2 ">{item?.productId?.name} </p>
                          <p className="text-neutral-400">{item?.productId?.unit} </p>
                          <p className="font-semibold">{DisplayPriceInTaka(priceWithDiscount(item?.productId?.price, item?.productId?.discount))} </p>
                        </div>
                        <div className="">
                          <AddToCartButton data={item?.productId} />
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
              <div className="grid  px-4 py-1 bg-slate-200 rounded">
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
                <div className="flex items-center justify-between font-semibold ">
                  <p className='text-neutral-00 '>Grand Total:</p>
                  <p className="text-neutral-00 "> {DisplayPriceInTaka(totalPrice)} </p>
                </div>
              </div>
            </>) : (
            <div className="flex w-full flex-col items-center  justify-center h-full">
              <img src={emptyCart} className='object-scale-down' alt="empty-cart" />

              <Link to={"/"} onClick={close} className="bg-green-600 py-1 px-2 rounded text-white cursor-pointer font-semibold text-xl" >Shop Now</Link>

            </div>
          )}
        </div>
        <div className="p-2 mx-auto">
          {cartItems[0] && (
            <div className="flex items-center rounded px-2 justify-between text-neutral-100 bg-green-700 py-4 static bottom-3 ">
              <div>
                {DisplayPriceInTaka(totalPrice)}
              </div>
              <div onClick={redirectToCheckoutPage} className="flex items-center cursor-pointer justify-center gap-2">
                <button className='cursor-pointer'>Procced</button>
                <FaAngleDoubleRight />
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}

export default CartMenu