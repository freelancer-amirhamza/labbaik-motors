import React, { useState } from 'react';
import banner1 from '../assets/bannar1.jpg';
import banner2 from '../assets/bannar2.jpg';
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css"
import bannerMobile from '../assets/banner-mobile.jpg';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay,Navigation,Pagination} from "swiper/modules";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import { validURLConvert } from '../utils/validURLConvert';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

const Home = () => {
    const loadingCategory = useSelector((state) => state.product.loadingCategory);
    const allCategory = useSelector((state) => state.product.allCategory);
    const allSubCategory = useSelector((state) => state.product.allSubCategory);
    const navigate = useNavigate();
    const [currentSlide,setCurrentSlide] = useState(0)

    const handleRedirectProductListPage = (categoryId, categoryName) => () => {
        const subcategory = allSubCategory.find((sub) => {
            return sub.category.some((cat) => cat._id === categoryId);
        });


        if (!subcategory) {
            AxiosToastError({ response: { data: { message: "No subcategory found" } } });
            return;
        }

        const url = `/${validURLConvert(categoryName)}-${categoryId}/${validURLConvert(subcategory.name)}-${subcategory._id}`;
        navigate(url);
    };

    console.log("category at home", allCategory)
    return (
        <section className="my-4 bg-white">
            <Swiper
                navigation={true}
                autoplay={{
                    delay:3000,
                    disableOnInteraction:false,
                }}
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable:true
                }}
                modules={[Autoplay, Navigation, Pagination]}
                >
                    <SwiperSlide>
                        <img
                        src={banner1}
                        alt="banner"
                        className=" w-full h-full object-scale-down rounded "
                    />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                        src={banner2}
                        alt="banner"
                        className=" w-full h-full object-scale-down rounded  "
                    />
                    </SwiperSlide>
                </Swiper>
            <div className="container mx-auto">
                {/* <div
                    className={`bg-transparent w-full h-full min-h-48 ${!banner1 ? "bg-blue-100 animate-pulse" : ""}`}
                >
                    <img
                        src={banner1}
                        alt="banner"
                        className="hidden lg:block w-full h-full object-scale-down rounded-md"
                    />
                    <img
                        src={bannerMobile}
                        alt="banner"
                        className="lg:hidden block w-full h-full object-scale-down"
                    />
                </div> */}
                <div className="container mx-auto flex flex-wrap items-center justify-center my-4  px-4 gap-4">

                    {allCategory ? <div className="grid grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {new Array(10).fill(null).map((_, index) => (
                            <div
                                className="bg-white min-h-66 w-full max-w-xs rounded p-4 grid gap-2 shadow animate-pulse"
                                key={index + "loading"}
                            >
                                <div className="bg-blue-100 min-h-20 rounded"></div>
                                <div className="bg-blue-100 h-8 rounded"></div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-blue-100 h-8 rounded"></div>
                                    <div className="bg-blue-100 h-8 rounded"></div>
                                </div>
                            </div>
                        ))}
                        </div>
                        : allCategory.map((category) => (
                            <div
                                className=" h-full"
                                key={category._id + "category"}
                                onClick={handleRedirectProductListPage(category?._id, category?.name)}
                            >
                                <div className=' hover:shadow-2xl w-full h-full min-w-[135px] min-h-[135px] rounded-md p-1 max-w-[135px] hover:scale-102 duration-300
                                  max-h-[135px]  flex flex-col items-center justify-center   bg-slate-200'>
                                    <img
                                        src={category?.image}
                                        className="w-full h-full border-3 border-slate-500 max-w-24 min-w-24 min-h-24   max-h-24 rounded-full object-fill "
                                        alt={category.name}
                                    />
                                    <p className="text-xs font-medium text-neutral-700 uppercase text-center">{category?.name} </p>
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