import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Loader from './Loading';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa';


const AddToCartButton = ({ data }) => {
    const { fetchCartItems,updateCartItems,deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false);
    const cartItems = useSelector((state) => state.cartItems?.cart)
    const [isAvailable, setIsAvailable] = useState(false)
    const [quantity,setQuantity]= useState(0)
    const [cartItemsDetais, setCartItemsDetails] = useState()

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation()
        try {
            setLoading(true);
            const response = await Axios({
                ...SummeryApi.addToCartItem,
                data: {
                    productId: data?._id,
                }
            })
            if (response.data?.success) {
                toast.success(response.data?.message);
                if (fetchCartItems) {
                    fetchCartItems()
                }
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false)
        }
    }
    const increaseQty= async(e)=>{
        e.preventDefault();
        e.stopPropagation();

        const response = await updateCartItems(cartItemsDetais?._id, quantity+1)

        if(response?.success){
            toast.success(response.message)
        }
    }
    const decreaseQty = async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(quantity === 1){
            deleteCartItem(cartItemsDetais?._id)
        }else{
            const respone = await updateCartItems(cartItemsDetais?._id, quantity-1)
            if(respone.success){
                toast.success("The cart item removed!")
            }
        }
    }

    useEffect(() => {
        const checkCartItems = cartItems.some((item) => item?.productId?._id === data?._id)
        const products = cartItems.find((item)=> item?.productId?._id === data?._id);
        setIsAvailable(checkCartItems);
        setQuantity(products?.quantity)
        setCartItemsDetails(products);
    }, [data, cartItems])
    return (
        <div>
            {
                isAvailable ? (
                    <div className="flex items-center  gap-0.5 ">
                        <button onClick={decreaseQty} className='text-white bg-green-600 hover:bg-green-700 cursor-pointer rounded-sm  py-1 px-1' ><FaMinus/> </button>
                        <p className="m-1 font-semibold text-neutral-700">{quantity}</p>
                        <button onClick={increaseQty} className='text-white bg-green-600 hover:bg-green-700 cursor-pointer rounded-sm  py-1 px-1' ><FaPlus/> </button>
                    </div>
                ) : (
                    <button onClick={handleAddToCart}
                        className="px-2 py-1 rounded text-white font-medium hover:bg-green-700 bg-green-600  ">
                        {loading ? <Loader className='max-h-5 max-w-5 ' /> : "Add"}
                    </button>
                )
            }

        </div>
    )
}

export default AddToCartButton