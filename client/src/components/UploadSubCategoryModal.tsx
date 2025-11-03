import React, { useState } from 'react';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import uploadImage from './UploadImage';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const UploadSubCategoryModel = ({ close, fetchData }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        category: []
    });

    const allCategory = useSelector(state => state?.product?.allCategory);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        try {
            const response = await uploadImage(file);
            setFormData((prev) => ({
                ...prev,
                image: response?.data?.data?.url
            }));
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummeryApi.addSubCategory,
                data: formData,
            });
            if (response?.data?.success) {
                toast.success(response?.data?.message);
                close();
                fetchData();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveSelectedCategory = (categoryId) => {
        const updatedCategories = formData.category.filter(el => el._id !== categoryId);
        setFormData((prev) => ({
            ...prev,
            category: updatedCategories
        }));
    };

    const handleClearImage = () => {
        setFormData((prev) => ({
            ...prev,
            image: ''
        }));
    };

    return (
        <section className="fixed top-0 left-0 p-2 right-0 bottom-0 flex items-center justify-center bg-neutral-900/80">
            <div className="max-w-2xl w-full p-4 rounded-sm bg-white">
                <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-neutral-700">Sub Category</h1>
                    <button onClick={close} className="text-lg font-semibold hover:text-amber-600 cursor-pointer text-neutral-700">
                        <IoMdCloseCircleOutline size={30} />
                    </button>
                </div>
                <form className="mt-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-xl font-medium text-neutral-700">Name</label>
                        <input
                            onChange={handleOnChange}
                            type="text"
                            value={formData.name}
                            placeholder="Enter Sub Category Name.."
                            name="name"
                            id="name"
                            className="border border-neutral-200 p-2 rounded-sm focus:outline-none focus:border-amber-600"
                        />
                    </div>
                    <div className="flex flex-col mt-2">
                        <label htmlFor="image" className="text-xl font-medium text-neutral-700">Image</label>
                        <div className="flex h-36 items-center justify-center border border-neutral-400 mt-1 bg-blue-50 rounded">
                            {formData.image ? (
                                <div className="flex items-start justify-center w-full h-full">
                                    <img
                                        src={formData.image}
                                        alt="subCategory"
                                        className="h-36 p-1 object-cover rounded"
                                    />
                                    <button
                                        onClick={handleClearImage}
                                        className="text-lg rounded-full m-4 text-red-600 cursor-pointer hover:bg-red-600 hover:text-white transition-colors duration-300"
                                    >
                                        <IoMdCloseCircleOutline size={23} />
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <input type="file" onChange={handleUploadImage} id="uploadImage" name="image" className="hidden" />
                                    <label
                                        htmlFor="uploadImage"
                                        className={`text-amber-700 border-dotted border cursor-pointer p-7 rounded text-lg w-full items-center flex font-semibold`}
                                    >
                                        <FaCloudUploadAlt size={30} />
                                        <span className="ml-2">{loading ? "Uploading..." : "Upload Image"}</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-2">
                        <label className="text-xl font-medium text-neutral-700" htmlFor="selectCategory">Select Category</label>
                        <div>
                            <select
                                className="flex w-full p-2 focus-within:border-amber-300 rounded border border-neutral-600 outline-none justify-between"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const categoryDetails = allCategory.find((el) => el._id === value);
                                    if (categoryDetails && !formData.category.some((cat) => cat._id === value)) {
                                        setFormData((prev) => ({
                                            ...prev,
                                            category: [...prev.category, categoryDetails]
                                        }));
                                    }
                                }}
                            >
                                <option value="">Select Category</option>
                                {allCategory.map((category) => (
                                    <option value={category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-wrap gap-2 p-2">
                            {formData?.category?.map((categoryItems) => (
                                <span
                                    key={categoryItems._id}
                                    className="flex items-center gap-1 px-1 rounded border shadow-md border-neutral-500"
                                >
                                    {categoryItems?.name}
                                    <IoIosClose
                                        className="cursor-pointer text-2xl"
                                        onClick={() => handleRemoveSelectedCategory(categoryItems?._id)}
                                    />
                                </span>
                            ))}
                        </div>
                    </div>
                    <div
                        onClick={handleSubmit}
                        className={`${
                            !formData?.name || !formData?.image ? "cursor-not-allowed text-neutral-400"
                                : "hover:bg-green-600 hover:text-white border-green-600 w-full cursor-pointer"
                        } border p-1 mt-4 text-center text-xl rounded-sm transition-colors font-medium duration-300`}
                    >
                        Add Sub Category
                    </div>
                </form>
            </div>
        </section>
    );
};

export default UploadSubCategoryModel;