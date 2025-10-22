import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import image from "../assets/order-complete.gif"

const Success = () => {
    const location = useLocation();

    return (
        <section className="mt-2 bg-white">
            <div className="container mx-auto w-full flex justify-center">
                <div className="w-full flex-col gap-1 rounded  md:max-w-full max-w-lg flex p-2 items-center justify-center">
                    <p className="font-semibold text-green-800 text-xl text-center">
                        {location?.state?.text ? location?.state?.text : "Payment"} has been processed successfully!

                    </p>
                    <h2 className='text-center text-base mt-2 font-semibold text-orange-800 ' >Your Order is on it&apos;s way 🏃‍♂️</h2>
                    <div className="w-full lg:max-w-4xl  max-h-88 flex  justify-center">
                        <img src={image} alt="" className='w-full rounded-md h-full object-fill' />
                    </div>
                    <div className="flex justify-between my-2 w-full max-w-lg gap-5">
                        <Link to={"/"} className='border py-1 px-2 rounded text-green-900 hover:text-white hover:bg-green-900 transition-colors duration-200 font-medium'>Go to Home</Link>
                        <Link to={"/dashboard/my-orders"} className='border py-1 px-2 rounded text-orange-600 hover:text-white hover:bg-orange-600 transition-colors duration-200 font-medium'>View Your Orders</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Success