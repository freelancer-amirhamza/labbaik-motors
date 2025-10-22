import  { useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const initialFormData = {
    email: "",
};
const ForgotPassword = () => {
    const [formData, setFormData] = useState(initialFormData);
    const navigate = useNavigate();
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
        try {
            const response = await Axios({
                ...SummeryApi.forgot_password,
                data: formData,
            });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            navigate("/verify-otp",
                {state:formData});
            setFormData(initialFormData);

        } catch (error) {
            AxiosToastError(error);
        }
    };
    return (
        <section className="container w-full mx-auto grid">
            <div className="grid w-full gap-2 max-w-lg p-8 mx-auto bg-white shadow-lg  rounded-lg mt- ">
                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid w-full gap-2">
                        <label htmlFor="email" className="text-xl font-medium">
                            Email:
                        </label>
                        <input
                            className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus-within:border-transparent
            focus-within:ring-2 ring-green-600"
                            autoFocus
                            onChange={handleChange}
                            value={formData.email}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        type="submit"
                        className={` ${validValue
                            ? "bg-secondary cursor-pointer hover:bg-green-700 "
                            : "bg-gray-400 cursor-not-allowed"
                            } text-center
            w-full  text-white tracking-widest p-2 text-xl font-medium  rounded-md `}
                    >
                        Send OTP
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

export default ForgotPassword;