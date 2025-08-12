import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Cancel = () => {
    const location = useLocation();
  return (
    <section className="mt-2 bg-white">
    <div className="container mx-auto w-full flex justify-center">
        <div className="w-full flex-col gap-4 rounded max-w-lg flex p-4 items-center justify-center bg-orange-100">
            <p className="font-semibold text-orange-700 text-xl text-center">
                {location.state?.text ? location.state?.text : "Payment"} has been canceled!
            </p>
            <Link to={"/"} className='border py-1 px-2 rounded text-orange-700 hover:text-white hover:bg-orange-700 transition-colors duration-200 font-medium'>Go to Home</Link>
        </div>
    </div>
</section>
  )
}

export default Cancel