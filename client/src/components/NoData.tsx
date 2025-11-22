import React from 'react'
import Image from  "../assets/no-data.png"
const NoData = () => {
  return (
    <div>
      <div className="w-full  mex-w-md  flex justify-center  items-center">
        <img src={Image} alt="deshi motors" className="object-scale-down w-full h-full " />
      </div>
    </div>
  )
}

export default NoData