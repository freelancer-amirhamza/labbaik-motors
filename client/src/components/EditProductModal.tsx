import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from "../components/UploadImage";
import ImageModel from "../components/ImageModel";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";
import AddMoreField from "../components/AddMoreField";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import successAlert from "../utils/SuccessAlert";



const EditProductModal = ({close, product, fetchProductData}) => {
    const [loading, setLoading] = useState(false);
    const [viewImageURL, setViewImageURL] = useState("");
    const allCategory = useSelector((state) => state.product.allCategory);
    const allSubCategory = useSelector((state) => state.product.allSubCategory);
    const [selectCategory, setSelectCategory] = useState("");
    const [selectSubCategory, setSelectSubCategory] = useState("");
    const [openAddField, setOpenAddField] = useState(false);
    const [fieldName, setFieldName] = useState("");
    const [formData, setFormData] = useState({
        _id: product?._id,
        name:product?.name,
        image: product?.image,
        category:product?.category,
        subCategory: product?.subCategory,
        unit: product?.unit,
        stock: product?.stock,
        price: product?.price,
        discount: product?.discount,
        description: product?.description,
        more_details:product?.more_details || {},
    });
    const initialsFormData = {
        name: "",
        image: [],
        category: [],
        subCategory: [],
        unit: "",
        stock: "",
        price: "",
        discount: "",
        description: "",
        more_details: {},
    }

    console.log("formData", formData);
    const handleOnChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData(() => {
            return {
                ...formData,
                [name]: value,
            };
        });
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        const response = await uploadImage(file);
        const imageUrl = response?.data?.data?.url;
        setFormData((formData) => {
            return {
                ...formData,
                image: [...formData.image, imageUrl],
            };
        });
        setLoading(false);
    };
    const handleDeleteImage = (index) => {
        formData.image.splice(index, 1);
        setFormData((formData) => ({
            ...formData,
        }));
    };
    const handleRemoveCategory = (index) => {
        formData.category.splice(index, 1);
        setFormData((formData) => ({
            ...formData,
        }));
    };

    const handleRemoveSubCategory = (index) => {
        formData.subCategory.splice(index, 1);
        setFormData((formData) => ({
            ...formData,
        }));
    };

    const handleFieldSubmit = () => {
        setFormData((formData) => ({
            ...formData,
            more_details: {
                ...formData.more_details,
                [fieldName]: "",
            },
        }));
        setFieldName("");
        setOpenAddField(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({
                ...SummeryApi.updateProduct,
                data: formData,
            });
            if (response?.data?.success) {
                successAlert(response?.data?.message);
                if(close) close();
                fetchProductData();
                setFormData(initialsFormData);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };
    return (
        <section className="fixed right-0 left-0 top-0 bottom-0 bg-neutral-900/90 ">
            <div className="w-full max-w-4xl mx-auto rounded mt-4 bg-white max-h-[95vh] overflow-y-scroll p-4">
                <div onClick={close} className="w-fit mx-auto border p-1 rounded-full hover:bg-orange-700 hover:text-white
                transition-colors duration-150 text-xl  font-bold mr-4 cursor-pointer">
                    <IoMdClose/>
                </div>
                    <div className="flex justify-between items-center shadow-md p-2 bg-white">
                        <h1 className="text-xl font-semibold text-neutral-700">
                            Upload Products
                        </h1>
                    </div>
                    <form className="" onSubmit={handleSubmit}>
                        <div className="grid gap-3 p-3 ">
                            <div className="grid gap-2">
                                <label
                                    className="text-xl font-medium text-neutral-700"
                                    htmlFor="name"
                                >
                                    Name:
                                </label>
                                <input
                                    onChange={handleOnChange}
                                    value={formData?.name}
                                    className="outline-none border border-neutral-500 rounded p-2 focus-within:border-amber-300 "
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Enter Product name"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label
                                    className="text-xl font-medium text-neutral-700"
                                    htmlFor="description"
                                >
                                    Description:
                                </label>
                                <textarea
                                    rows={3}
                                    onChange={handleOnChange}
                                    value={formData?.description}
                                    multiline
                                    className="outline-none border border-neutral-500 rounded p-2 focus-within:border-amber-300 resize-none "
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="Enter Product description"
                                />
                            </div>
                            <div className="grid gap-2">
                                <label
                                    className="text-xl font-medium text-neutral-700"
                                    htmlFor="imageUpload"
                                >
                                    Image:
                                </label>
                                <div className="flex h-28 items-center justify-center  border border-neutral-400 mt-1 bg-blue-50 rounded">
                                    {
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleUploadImage}
                                                id="uploadImage"
                                                name="image"
                                                className="hidden"
                                            />
                                            <div className={` `}>
                                                <label
                                                    htmlFor="uploadImage"
                                                    disabled={!formData.name}
                                                    className={` ${!formData.name
                                                            ? "cursor-not-allowed text-neutral-400"
                                                            : "text-amber-700 border-dotted border  cursor-pointer"
                                                        } p-7 rounded text-lg w-full items-center flex font-semibold`}
                                                >
                                                    <FaCloudUploadAlt size={30} />
                                                    <span className="ml-2">
                                                        {loading ? "Uploading..." : "Upload Image"}
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    }
                                </div>
                                {/* display images */}
                                <div className="flex items-start justify-center gap-2 flex-wrap">
                                    {formData?.image?.map((img, index) => {
                                        return (
                                            <div
                                                key={img + index}
                                                className="h-20 mt-1 w-20 min-w-20 bg-blue-50 rounded border border-neutral-400 relative group"
                                            >
                                                <img
                                                    src={img}
                                                    alt={img}
                                                    className="w-full h-full object-scale-down cursor-pointer"
                                                    onClick={() => setViewImageURL(img)}
                                                />
                                                <div
                                                    onClick={() => handleDeleteImage(index)}
                                                    className="absolute top-0 right-0 p-0.5  bg-orange-600 hover:bg-orange-600 rounded-sm text-white hidden group-hover:block cursor-pointer"
                                                >
                                                    <MdDelete />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* Select sub category  */}
                            <div className="grid gap-2">
                                <label
                                    htmlFor="category"
                                    className="text-neutral-800 font-medium text-xl"
                                >
                                    Select Category:
                                </label>
                                <div className=" w-full ">
                                    <select
                                        value={selectCategory}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const category = allCategory.find(
                                                (el) => el._id === value
                                            );
                                            setFormData((formData) => {
                                                return {
                                                    ...formData,
                                                    category: [...formData.category, category],
                                                };
                                            });
                                            setSelectCategory("");
                                        }}
                                        className="w-full border outline-none p-2 rounded focus-within:border-amber-500"
                                        name=""
                                        id=""
                                    >
                                        <option value="">Select Category</option>
                                        {allCategory.map((category, index) => {
                                            return (
                                                <option
                                                    value={category._id}
                                                    key={index + "selectCategory"}
                                                >
                                                    {category.name}{" "}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData?.category?.map((categoryItem, index) => {
                                        return (
                                            <div
                                                key={categoryItem._id + index}
                                                className="flex items-center px-0.5 justify-start gap-1 border w-fit rounded shadow-md"
                                            >
                                                <p className="">{categoryItem.name}</p>
                                                <div
                                                    onClick={() => handleRemoveCategory(index)}
                                                    className="cursor-pointer hover:text-orange-800 "
                                                >
                                                    <IoMdClose />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* Select sub category  */}
                            <div className="grid gap-2">
                                <label
                                    htmlFor="subCategory"
                                    className="text-neutral-800 font-medium text-xl"
                                >
                                    Select Sub Category:
                                </label>

                                <div className="grid gap-2">
                                    {/* category select */}
                                    <select
                                        className="w-full border outline-none p-2 rounded focus-within:border-amber-500"
                                        value={selectSubCategory}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const subCategory = allSubCategory.find(
                                                (el) => el._id === value
                                            );
                                            setFormData((formData) => ({
                                                ...formData,
                                                subCategory: [...formData.subCategory, subCategory],
                                            }));
                                            setSelectSubCategory("");
                                        }}
                                        name="subCategory"
                                        id="subCategory"
                                    >
                                        <option value="" className="">
                                            Select Sub Category
                                        </option>
                                        {allSubCategory &&
                                            allSubCategory.map((subCategory, index) => {
                                                return (
                                                    <option
                                                        value={subCategory._id}
                                                        key={index + "subCategory"}
                                                    >
                                                        {subCategory?.name}{" "}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                    {/* category display */}
                                    <div className="flex flex-wrap gap-2">
                                        {formData.subCategory.map((subCategory, index) => {
                                            return (
                                                <div className="flex items-center justify-start gap-1 px-0.5 border w-fit rounded shadow-md">
                                                    <p className="">{subCategory?.name} </p>
                                                    <div
                                                        onClick={() => handleRemoveSubCategory(index)}
                                                        className="cursor-pointer hover:text-orange-800 "
                                                    >
                                                        <IoMdClose />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/* unit  */}
                            <div className="grid gap-2">
                                <label
                                    className="text-xl font-medium text-neutral-700"
                                    htmlFor="unit"
                                >
                                    Unit:
                                </label>
                                <input
                                    className="outline-none border border-neutral-500 rounded p-2 focus-within:border-amber-300 "
                                    required
                                    type="text"
                                    name="unit"
                                    id="unit"
                                    placeholder="Enter Product Unit"
                                    onChange={handleOnChange}
                                    value={formData?.unit}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label htmlFor="stock">Stock:</label>
                                <input
                                    className="outline-none border border-neutral-500 rounded p-2 focus-within:border-amber-300 "
                                    required
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    placeholder="Enter Product Discount"
                                    onChange={handleOnChange}
                                    value={formData?.stock}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label
                                    className="text-xl font-medium text-neutral-700"
                                    htmlFor="price"
                                >
                                    Price:
                                </label>
                                <input
                                    className="outline-none border border-neutral-500 rounded p-2 focus-within:border-amber-300 "
                                    required
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="Enter Product Price"
                                    onChange={handleOnChange}
                                    value={formData?.price}
                                />
                            </div>
                            <div className="grid gap-2">
                                <label
                                    className="text-xl font-medium text-neutral-700"
                                    htmlFor="discount"
                                >
                                    Discount:
                                </label>
                                <input
                                    className="outline-none border border-neutral-500 rounded p-2 focus-within:border-amber-300 "
                                    required
                                    type="number"
                                    name="discount"
                                    id="discount"
                                    placeholder="Enter Product Discount"
                                    onChange={handleOnChange}
                                    value={formData?.discount}
                                />
                            </div>
                            {/* Add more details fields */}
                            <div className="grid gap-2">
                                {Object?.keys(formData?.more_details).map((key, index) => {
                                    return (
                                        <div className="grid gap-2">
                                            <label
                                                className="text-xl font-medium text-neutral-700"
                                                htmlFor="price"
                                            >
                                                {key}:
                                            </label>
                                            <input
                                                className="outline-none border border-neutral-500 rounded p-2 focus-within:border-amber-300 "
                                                placeholder={`Enter Product ${key}`}
                                                type="text"
                                                id={key}
                                                value={formData?.more_details[key]}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    setFormData((formData) => ({
                                                        ...formData,
                                                        more_details: {
                                                            ...formData?.more_details,
                                                            [key]: value,
                                                        },
                                                    }));
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                                <div
                                    className=" w-fit border px-2 py-1 rounded cursor-pointer font-medium border-neutral-600 text-neutral-800 hover:text-white hover:bg-amber-600 hover:border-amber-600 hover:shadow-2xl"
                                    onClick={() => setOpenAddField(true)}
                                >
                                    Add Field
                                </div>
                            </div>
                        </div>
                        <button
                            className=" w-full border px-2 py-1 rounded cursor-pointer font-medium text-white bg-green-600 hover:bg-green-700 border-green-600 hover:shadow-2xl"
                            type="submit"
                        >
                            Upload Product
                        </button>
                    </form>
                    {viewImageURL && (
                        <ImageModel url={viewImageURL} close={() => setViewImageURL("")} />
                    )}
                    {openAddField && (
                        <AddMoreField
                            value={fieldName}
                            onChange={(e) => setFieldName(e.target.value)}
                            submit={handleFieldSubmit}
                            close={() => setOpenAddField(false)}
                        />
                    )}
                </div>
        </section>
    );
};

export default EditProductModal;