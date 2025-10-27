import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { FaAngleDoubleRight, FaShoppingCart } from "react-icons/fa";
import { DisplayPriceInTaka } from '../utils/DisplayPriceInTaka';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MobileCart = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItems = useSelector((state) => state.cartItems?.cart);
  return (
    <>
      {cartItems[0] && (
        <div className="sticky bottom-1  mx-auto ">
          <div className='bg-green-700 py-1.5 rounded w-full px-2 lg:hidden flex gap-3 items-center justify-between text-white'>
            <div className="flex items-center gap-2">
              <div className="bg-green-600 p-2 rounded w-fit">
                <FaShoppingCart />
              </div>
              <div className="text-xs">
                <p>{totalQty} Items</p>
                <p>{DisplayPriceInTaka(totalPrice)} </p>
              </div>
            </div>
            <Link to={"/cart"} className="flex items-center justify-center gap-2">
              <span className='text-sm'>View Cart</span>
              <span><FaAngleDoubleRight /></span>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileCart