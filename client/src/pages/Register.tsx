import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AxiosToastError from '../utils/AxiosToastError';
import Axios from "../utils/Axios.js";
import SummeryApi from '../common/SummeryApi';
import { Link, useNavigate } from 'react-router-dom';

const initialFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialFormData)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            toast.error("Password and Confirm Password must be same!")
        }

        try {
            const response = await Axios({
                ...SummeryApi.register,
                data: formData,
            })
            if (response.data.success) {
                toast.success(response.data.message);
                setFormData(initialFormData);
                navigate("/login")
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    const validValue = Object.values(formData).every(el => el);
    return (
        <section className='container w-full mx-auto grid '>
            <div className="w-full grid gap-3 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center "> Welcome to Register Page </h2>
                <form className='grid gap-4' onSubmit={handleSubmit} >
                    <div className="grid gap-2">
                        <label className='font-medium text-xl ' htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            autoFocus
                            onChange={handleChange}
                            value={formData.name}
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                            placeholder="Enter your name" />
                    </div>

                    <div className="grid gap-2">
                        <label className='font-medium text-xl ' htmlFor="email">Email:</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                            placeholder="Enter your email" />
                    </div>

                    <div className="grid gap-2">
                        <label className='font-medium text-xl ' htmlFor="password">Password:</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                autoFocus
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                                placeholder="Enter your password " />
                            <div onClick={() => setShowPassword(!showPassword)} className=" text-xl cursor-pointer absolute right-2 top-2">
                                {showPassword ? (
                                    <FaEye />
                                ) : (
                                    <FaEyeSlash />
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="grid gap-2">
                        <label className='font-medium text-xl ' htmlFor="confirmPassword">Confirm Password:</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                autoFocus
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                                placeholder="Enter your confirm password " />
                            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} className=" text-xl cursor-pointer absolute right-2 top-2">
                                {showConfirmPassword ? (
                                    <FaEye />
                                ) : (
                                    <FaEyeSlash />
                                )}
                            </div>
                        </div>
                    </div>
                    <button disabled={!validValue}
                        className={` ${validValue ? "bg-secondary hover:bg-green-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}
            text-center w-full  text-white tracking-widest p-2 text-xl font-medium  rounded-md `}
                    >Register</button>
                    <div className="flex items-center  gap-3.5">
                        <p className="text-neutral-700 font-medium">Already have an account?</p>
                        <Link className='font-extrabold text-green-700 text-xl hover:text-green-800 hover:underline ' to={"/login" }>Login</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Register