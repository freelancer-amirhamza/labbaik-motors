import React from 'react';
import banner from '../assets/banner.jpg';
import bannerMobile from '../assets/banner-mobile.jpg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import { validURLConvert } from '../utils/validURLConvart';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

const Home = () => {
    const loadingCategory = useSelector((state) => state.product.loadingCategory);
    const allCategory = useSelector((state) => state.product.allCategory);
    const allSubCategory = useSelector((state) => state.product.allSubCategory);
    const navigate = useNavigate();

    const handleRedirectProductListPage = (categoryId, categoryName) => () => {
        const subcategory = allSubCategory.find((sub) => {
            return sub.category.some((cat) => cat._id === categoryId);
        });
        console.log(allSubCategory, "subcategory");

        if (!subcategory) {
            AxiosToastError({ response: { data: { message: "No subcategory found" } } });
            return;
        }

        const url = `/${validURLConvert(categoryName)}-${categoryId}/${validURLConvert(subcategory.name)}-${subcategory._id}`;
        navigate(url);
    };

    return (
        <section className="my-4 bg-white">
            <div className="container mx-auto">
                <div
                    className={`bg-transparent w-full h-full min-h-48 ${!banner ? "bg-blue-100 animate-pulse" : ""}`}
                >
                    <img
                        src={banner}
                        alt="banner"
                        className="hidden lg:block w-full h-full object-scale-down rounded-md"
                    />
                    <img
                        src={bannerMobile}
                        alt="banner"
                        className="lg:hidden block w-full h-full object-scale-down"
                    />
                </div>
                <div className="container mx-auto grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 my-4 px-4 gap-4">
                    {loadingCategory
                        ? new Array(10).fill(null).map((_, index) => (
                            <div
                                className="bg-white min-h-36 rounded p-4 grid gap-2 shadow animate-pulse"
                                key={index + "loading"}
                            >
                                <div className="bg-blue-100 min-h-20 rounded"></div>
                                <div className="bg-blue-100 h-8 rounded"></div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-blue-100 h-8 rounded"></div>
                                    <div className="bg-blue-100 h-8 rounded"></div>
                                </div>
                            </div>
                        ))
                        : allCategory.map((category) => (
                            <div
                                className="w-full h-full"
                                key={category._id + "category"}
                                onClick={handleRedirectProductListPage(category?._id, category?.name)}
                            >
                                <div>
                                    <img
                                        src={category?.image}
                                        className="w-full h-full object-scale-down"
                                        alt={category.name}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Display category-wise products */}
            <div>
                {allCategory.map((category) => (
                    <CategoryWiseProductDisplay
                        key={category?._id + "categoryWiseProduct"}
                        id={category?._id}
                        name={category?.name}
                    />
                ))}
            </div>
        </section>
    );
};

export default Home;