
import { useDispatch, useSelector } from "react-redux";
import Divider from "./Devider";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import { logout } from "../store/userSlice";
import { FaExternalLinkAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import isAdmin from "../utils/isAdmin";
import SummeryApi from "../common/SummeryApi";
import Axios from "../utils/Axios";

const UserMenu = ({ close }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const handleLogout = async (e:any) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummeryApi.logout,
            });
            if (response.data.success) {
                if (close) {
                    close();
                }
                dispatch(logout());
                localStorage.clear();
                toast.success(response.data.message);
                navigate("/");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const handleCloseMenu = () => {
        if (close) {
            close();
        }
    };

    return (
        <div>
            <div className="flex  flex-col pt-3 gap-1.5  ">
                <h2 className="font-semibold px-2 text-neutral-800 ">My Account</h2>
                <Link
                    onClick={handleCloseMenu}
                    to={"/dashboard/profile"}
                    className="text-neutral-700 flex gap-4 cursor-pointer hover:bg-amber-100 items-center  font-medium px-2"
                >
                    <span className="">{user?.name || user?.mobile} <span>{user?.role === "admin" ? "(Admin)" : ""}</span> </span>
                    <FaExternalLinkAlt size={16} />
                </Link>
                <Divider />
                <div className="grid gap-2">
                    {isAdmin(user?.role) && (
                        <Link
                            onClick={handleCloseMenu}
                            to={"/dashboard/category"}
                            className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                        >
                            Category
                        </Link>
                    )}

                    {isAdmin(user?.role) && (
                        <Link
                            onClick={handleCloseMenu}
                            to={"/dashboard/sub-category"}
                            className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                        >
                            Sub Category
                        </Link>
                    )}

                    {isAdmin(user?.role) && (
                        <Link
                            onClick={handleCloseMenu}
                            to={"/dashboard/admin-products"}
                            className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                        >
                            Products
                        </Link>
                    )}
                    {isAdmin(user?.role) && (
                        <Link
                            onClick={handleCloseMenu}
                            to={"/dashboard/upload-product"}
                            className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                        >
                            Upload Product
                        </Link>
                    )}

                    <Link
                        onClick={handleCloseMenu}
                        to={"/dashboard/my-orders"}
                        className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                    >
                        My Orders
                    </Link>
                    {isAdmin(user?.role) && (
                        <Link
                            onClick={handleCloseMenu}
                            to={"/dashboard/admin-orders"}
                            className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                        >
                        All Orders
                        </Link>
                    )}
                    <Link
                        onClick={handleCloseMenu}
                        to={"/dashboard/address"}
                        className="text-neutral-600 px-2 font-medium cursor-pointer hover:bg-amber-200"
                    >
                        Save Address
                    </Link>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-neutral-600 text-left hover:bg-amber-200 cursor-pointer mb-2 font-semibold px-2"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserMenu;