import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SummeryApi from '../common/SummeryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { updatedAvatar } from '../store/userSlice';
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaRegUserCircle } from 'react-icons/fa';

const UserProfileAvatarEdit = ({ close }) => {
    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleUploadAvatar = async (e:any) => {
        const file = e.target.files[0];
        if (!file) {
            return
        }
        const formData = new FormData();
        formData.append("avatar", file);
        try {
            setLoading(true)
            const response = await Axios({
                ...SummeryApi.uploadAvatar,
                data: formData,
            })
            setLoading(false);
            console.log(response.data)
            dispatch(updatedAvatar(response.data.data.avatar))
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className="bg-neutral-900/60 fixed top-0 left-0 flex justify-center items-center right-0 bottom-0  z-50">
            <div className=" p-5 flex flex-col  rounded-md min-w-sm bg-amber-50">
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4'>
                    <button className="flex w-fit ml-auto cursor-pointer text-amber-600 hover:bg-amber-600 hover:text-white rounded-full   " onClick={() => close()}>
                        <IoCloseCircleOutline size={26} />
                    </button>
                    <div className="h-24 w-24 justify-center flex rounded-full ">
                        {
                            user?.avatar ? (
                                <img
                                    src={user?.avatar}
                                    alt={user?.name}
                                    className="w-full object-fill border-4 border-amber-400 h-full rounded-full"
                                />
                            ) : (
                                <FaRegUserCircle className="w-20 h-20 text-gray-400" />
                            )
                        }
                    </div>
                    <div className="">
                        <label htmlFor="uploadAvatar">
                            <input onChange={handleUploadAvatar} type="file" id="uploadAvatar" className="hidden" />
                            <div className="border-2 px-2 py-1 rounded-full cursor-pointer border-amber-300 hover:bg-orange-500 hover:text-white font-semibold ">
                                {loading ? 'Uploading...' : 'Upload'}
                            </div>
                        </label>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default UserProfileAvatarEdit