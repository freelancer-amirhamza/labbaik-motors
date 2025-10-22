import React from 'react'
import { useForm } from "react-hook-form";
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import toast from 'react-hot-toast';
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from '../provider/GlobalProvider';


const AddAddress = ({close}) => {
    const { register, handleSubmit,formState: { errors }, reset} = useForm();
    const {fetchAddress} = useGlobalContext()
    const onSubmit =async (data)=>{
        console.log(data)
        try {
            const response = await Axios({
                ...SummeryApi.addAddress,
                data: {
                    addressLine :data.addressLine,
                    city : data.city,
                    state : data.state,
                    country : data.country,
                    pinCode : data.pinCode,
                    phone : data.phone
                }
            })
            if(response?.data?.success){
                toast.success(response.data?.message);
                if(close){
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className="bg-neutral-900/90 z-40 top-0 bottom-0 left-0 right-0 fixed h-screen overflow-y-scroll ">
            <div className="w-full max-w-md rounded bg-white p-4 mx-auto mt-2 ">
                <div className="flex items-center justify-between ">
                    <h2 className="font-semibold ">Add Address</h2>
                    <button onClick={close} className="border p-1 rounded-full text-orange-600 hover:bg-orange-600 cursor-pointer hover:text-white "> <IoClose/> </button>
                </div>

                <form className="grid " onSubmit={handleSubmit(onSubmit)} >
                    <div className="grid py-2">
                        <label htmlFor="addressLine">Address Line:</label>
                        <input type="text"
                            className='border p-2 rounded outline-amber-400'
                            name="addressLine"
                            placeholder='Enter Your Address... '
                            {...register("addressLine", { required: true })}
                            id="addressLine" />
                        {errors?.addressLine && <span className="text-orange-600">This field is required</span>}
                    </div>
                    <div className="grid py-2">
                        <label htmlFor="city">City:</label>
                        <input type="text"
                            className='border p-2 rounded outline-amber-400'
                            name="city"
                            placeholder='Enter Your City Name... '
                            {...register("city", { required: true })}
                            id="city" />
                        {errors?.city && <span className="text-orange-600">This field is required</span>}
                    </div>
                    <div className="grid py-2">
                        <label htmlFor="state">State:</label>
                        <input type="text"
                            className='border p-2 rounded outline-amber-400'
                            name="state"
                            placeholder='Enter Your State Name... '
                            {...register("state", { required: true })}
                            id="state" />
                        {errors?.state && <span className="text-orange-600">This field is required</span>}
                    </div>
                    <div className="grid py-2">
                        <label htmlFor="pinCode">Pincode:</label>
                        <input type="text"
                            className='border p-2 rounded outline-amber-400'
                            name="pinCode"
                            placeholder='Enter Your Pincode... '
                            {...register("pinCode", { required: true })}
                            id="pinCode" />
                        {errors?.pinCode && <span className="text-orange-600">This field is required</span>}
                    </div>
                    <div className="grid py-2">
                        <label htmlFor="country">Country:</label>
                        <input type="text"
                            className='border p-2 rounded outline-amber-400'
                            name="country"
                            placeholder='Enter Your Country Name... '
                            {...register("country", { required: true })}
                            id="country" />
                        {errors?.country && <span className="text-orange-600">This field is required</span>}
                    </div>
                    <div className="grid py-2">
                        <label htmlFor="phone">Phone No:</label>
                        <input type="text"
                            className='border p-2 rounded outline-amber-400'
                            name="phone"
                            placeholder='Enter Your Phone Number... '
                            {...register("phone", { required: true })}
                            id="phone" />
                        {errors?.phone && <span className="text-orange-600">This field is required</span>}
                    </div>
                    <input type="submit" className='border p-2 cursor-pointer  rounded bg-green-600 text-white font-semibold hover:bg-green-700 lg:text-xl'/>
                </form>
            </div>
        </section>
    )
}

export default AddAddress