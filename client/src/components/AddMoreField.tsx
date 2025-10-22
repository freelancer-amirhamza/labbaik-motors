import React from 'react'
import { IoMdClose } from 'react-icons/io'

const AddMoreField = ({value, onChange, submit, close}) => {
  return (
    <section className="fixed bg-neutral-900/80 top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <div className="bg-amber-50 grid gap-2 max-w-md w-full p-3 rounded">
            <div className="flex w-full items-center justify-between">
                <h1 className='text-xl font-medium text-neutral-800'>Add Field</h1>
                <div onClick={close} className="text-xl border w-fit p-0.5 rounded hover:text-white hover:bg-orange-500 cursor-pointer transition-colors duration-300 hover:border-orange-500">
                    <IoMdClose/>
                </div>
            </div>
            <input  className='outline-none border w-full border-neutral-500 rounded p-2 focus-within:border-amber-500 '
             onChange={onChange} value={value} type="text" name="fieldName" id="fieldName" placeholder='Enter Field Title..'  />
             <button onClick={submit} className="border  border-green-600 transition-colors duration-300 px-2 py-1 rounded-sm hover:bg-green-500 cursor-pointer hover:text-white font-medium "
             >Submit</button>
        </div>
    </section>
  )
}

export default AddMoreField