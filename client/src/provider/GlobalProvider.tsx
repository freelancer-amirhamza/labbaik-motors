import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import { setCartItems } from "../store/cartSlice";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { priceWithDiscount } from "../utils/priceWithDiscount";
import { handleAddressSlice } from "../store/addressSlice";
import { handleOrderSlice } from "../store/orderSlice";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const cartItems = useSelector((state) => state.cartItems.cart);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const user = useSelector((state) => state?.user?.user);
    const [notDiscountPrice, setNotDiscountPrice] = useState(0)

    const fetchCartItems = async () => {
        try {
            const response = await Axios({
                ...SummeryApi.getCartItems,
            });
            if (response.data?.success) {
                dispatch(setCartItems(response.data?.data));
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    const updateCartItems = async (id, qty) => {
        try {
            setLoading(false);
            const response = await Axios({
                ...SummeryApi.updateCartItem,
                data: {
                    _id: id,
                    qty: qty,
                },
            });
            if (response.data?.success) {
                // toast.success(response.data?.message);
                fetchCartItems();
                return response.data
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCartItem = async (id) => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummeryApi.deleteCartItem,
                data: {
                    _id: id,
                },
            });
            if (response.data?.success) {
                toast.success(response.data?.message);
                fetchCartItems();
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    useEffect(() => {
        const qty = cartItems.reduce((prev, curr) => {
            return prev + curr.quantity;
        }, 0);
        setTotalQty(qty);

        const tPrice = cartItems.reduce((preve, curr) => {
            const priceAfterDiscount = priceWithDiscount(curr?.productId?.price, curr?.productId?.discount);
            return preve + priceAfterDiscount * curr.quantity;
        }, 0);
        setTotalPrice(tPrice);

        const notDiscountPrice = cartItems.reduce((prev, curr) => {
            return prev + (curr?.productId?.price * curr?.quantity);
        }, 0)
        setNotDiscountPrice(notDiscountPrice);
    }, [cartItems]);

    const handleLogOut = () => {
        localStorage.clear()
        dispatch(setCartItems([]))
    }

    const fetchAddress = async () => {
        try {
            const response = await Axios({
                ...SummeryApi.getAddress,
            });
            if (response.data?.success) {
                dispatch(handleAddressSlice(response.data?.data))
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const fetchOrders = async () => {
        try {
            const response = await Axios({
                ...SummeryApi.getOrderDetails,
            })
            if (response.data?.success) {
                dispatch(handleOrderSlice(response.data?.data));
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    useEffect(() => {
        if (user) {
            fetchCartItems();
            handleLogOut()
            fetchAddress()
            fetchOrders()
        }
    }, [user]);

    return (
        <GlobalContext.Provider
            value={{
                fetchCartItems,
                fetchAddress,
                fetchOrders,
                updateCartItems,
                deleteCartItem,
                notDiscountPrice,
                totalPrice,
                totalQty,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;