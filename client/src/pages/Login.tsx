import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";


const initialFormData = {
  email: "",
  password: "",
}
const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
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
            ...SummeryApi.login,
            data: formData,
            withCredentials: true, // Allow cookies to be sent
        });

        if (response.data.success) {
            toast.success(response.data.message);

            // Store tokens in localStorage
            localStorage.setItem("accessToken", response?.data?.accessToken);
            localStorage.setItem("refreshToken", response?.data?.refreshToken);

            // Fetch user details
            const userDetails = await fetchUserDetails();
            dispatch(setUserDetails(userDetails.data));

            // Reset form and navigate
            setFormData(initialFormData);
            navigate("/");
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
          Welcome to Login Page
        </h1>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid w-full gap-2">
            <label htmlFor="email" className="text-xl font-medium">
              Email:
            </label>
            <input
              className="w-full border-2 border-gray-300 rounded-md p-2 outline-none focus-within:border-transparent
            focus-within:ring-2 ring-green-600
            "
              autoFocus
              onChange={handleChange}
              value={formData.email}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="grid w-full gap-2">
            <label htmlFor="email" className="text-xl font-medium">
              Password:
            </label>
            <div className="relative items-center">
              <input
                className="w-full border-2  border-gray-300 rounded-md p-2 outline-none focus-within:border-transparent
            focus-within:ring-2 ring-green-600
            "
                autoFocus
                onChange={handleChange}
                value={formData.password}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 "
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={!validValue}
            className={` ${validValue
              ? "bg-secondary cursor-pointer hover:bg-green-700 "
              : "bg-gray-400 cursor-not-allowed"
              } text-center
            w-full  text-white tracking-widest p-2 text-xl font-medium  rounded-md `}
          >
            Login
          </button>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center  gap-1.5">
              <p className="text-neutral-700 font-medium">Don't have an account?</p>
              <Link className='font-extrabold text-green-700 text-xl hover:text-green-800 hover:underline ' to={"/register"}>Register</Link>
            </div>
            <Link to={"/forgot-password"} className="text-orange-700 font-medium hover:text-orange-800 hover:underline "  > Forgot password? </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;