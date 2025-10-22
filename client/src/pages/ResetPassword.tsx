import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";

const initialFormData = {
    email: "",
    newPassword: "",
    confirmPassword: "",
};
const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (!location?.state?.data?.success) {
            navigate("/");
        }

        if (location?.state?.email) {
            setFormData((prev) => {
                return {
                    ...prev,
                    email: location?.state?.email,
                };
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const validValue = Object.values(formData).every((el) => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.newPassword !== formData.confirmPassword){
            toast.error("New password and Confirm Password must be same!")
        }
        try {
            const response = await Axios({
                ...SummeryApi.reset_password,
                data: formData,
            });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            navigate("/login");
            setFormData(initialFormData);
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className="container w-full mx-auto grid">
            <div className="grid w-full gap-2 max-w-lg p-8 mx-auto bg-white shadow-lg  rounded-lg mt- ">
            <h1 className="text-center  text-4xl font-medium  ">
                    Reset Your Password
                </h1>
                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <label className='font-medium text-xl ' htmlFor="newPassword">New Password:</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                id="newPassword"
                                value={formData.newPassword}
                                autoFocus
                                onChange={handleChange}
                                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent'
                                placeholder="Enter your new password " />
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
                    <button
                        type="submit"
                        className={` ${validValue
                            ? "bg-secondary cursor-pointer hover:bg-green-700 "
                            : "bg-gray-400 cursor-not-allowed"
                            } text-center  w-full  text-white tracking-widest p-2 text-xl font-medium  rounded-md `}
                    >
                        Reset Password
                    </button>
                    <div className="flex items-center  gap-3.5">
                        <p className="text-neutral-700 font-medium">
                            Already have an account?
                        </p>
                        <Link
                            className="font-extrabold text-green-700 text-xl hover:text-green-800 hover:underline "
                            to={"/login"}
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ResetPassword;