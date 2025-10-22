import React, { useEffect, useRef, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";
import {  data, useLocation, useNavigate } from "react-router-dom";

const initialFormData = ["", "", "", "", "", ""];
const VerifyOtp = () => {
    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();
    const location = useLocation();
    const inputRef= useRef([]);


    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    },[])

    const validValue = formData.every((el) => el);
    console.log(validValue, "validValue")
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...SummeryApi.verify_otp,
                data: {
                    otp: formData.join(""),
                    email: location?.state?.email,
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                setFormData(initialFormData);
            navigate("/reset-password",
                {
                    state: {
                        data: response.data,
                        email: location?.state?.email,
                    }
                }
            );
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            AxiosToastError(error);
        }
    };
    return (
        <section className="container w-full mx-auto grid">
            <div className="grid w-full gap-2 max-w-lg p-8 mx-auto bg-white shadow-lg  rounded-lg mt- ">
                <h1 className="text-center  text-4xl font-medium  ">
                    OTP Verification
                </h1>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid w-full gap-2">
                        <label htmlFor="email" className="text-xl font-medium">
                            Enter your OTP:
                        </label>
                        <div className="flex gap-2 items-center justify-between ">
                            {formData.map((_, index:number) => {
                                return (
                                    <input
                                        className="w-full max-w-16  border-2 border-gray-300 rounded-md p-2 outline-none focus-within:border-transparent focus-within:ring-2 ring-green-600"
                                        autoFocus
                                        maxLength={1}
                                        key={"otp"+ index}
                                        value={data[index]}
                                        type="text"
                                        name="otp"
                                        id="otp"
                                        ref={(ref)=>{
                                            inputRef.current[index] = ref;
                                            return ref
                                        }}
                                        onChange={(e)=>{
                                            const value = e.target.value;
                                            const newData = [...formData]
                                            newData[index] = value
                                            setFormData(newData)

                                            if(value && index < 5){
                                                inputRef.current[index+1].focus()
                                            }
                                        }}
                                    />
                                )
                            })}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={` ${validValue
                            ? "bg-secondary cursor-pointer hover:bg-green-700 "
                            : "bg-gray-400 cursor-not-allowed"
                            } text-center
            w-full  text-white tracking-widest p-2 text-xl font-medium  rounded-md `}
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </section>
    );
};

export default VerifyOtp;