import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { DisplayPriceInTaka } from '../utils/DisplayPriceInTaka';
import image1 from "../assets/minute_delivery-Bu9utzxK.png"
import image2 from "../assets/Best_Prices_Offers-CbMh73zQ.png"
import image3 from "../assets/Wide_Assortment-CbRiDBkF.png";
import { priceWithDiscount } from '../utils/priceWithDiscount';


import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setReviewSlice } from '../store/reviewSlice';
import Divider from '../components/Devider';
import AddToCartButton from '../components/AddToCartButton';
import StarRating from '../common/star-rating';

const ProductDetailsPage = () => {
  const params = useParams();
  const [rating, setRating] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch()
  const reviews = useSelector((state) => state.reviewSlice?.reviews);


  const averageReview = reviews && reviews.length > 0 ?
    reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length : 0

  const handleRatingChange = (getRating) => {
    setRating(getRating)
  }
  const handleAddReview = async () => {
    try {
      const response = await Axios({
        ...SummeryApi.addProductReview,
        data: {
          userId: user?._id,
          userName: user?.name,
          productId: productId,
          reviewMessage: reviewMessage,
          reviewValue: rating,
        }
      });
      if (response.data.success) {
        setRating(0);
        setReviewMessage("")
        dispatch(fetchProductReview())
        toast.success(response.data?.message)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }



  const productId = params?.product?.split("-")?.slice(-1)[0]
  const [data, setData] = useState({
    name: "",
    image: [],
  })
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);

  const fetchProductDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummeryApi.getProductDetails,
        data: {
          productId
        }
      })
      if (response.data?.success) {
        setData(response.data?.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  };

  // fetch reviews

  const fetchProductReview = async () => {
    try {
      if (!productId) {
        console.error("Product ID is missing!");
        return;
      }

      const response = await Axios({
        ...SummeryApi.getProductReview,
        data: {
          productId: productId,
        },
      });

      if (response.data?.success) {
        dispatch(setReviewSlice(response.data?.data));
      }
    } catch (error) {

      console.log(error.message);
    }
  };

  const handleScrollLeft = () => {
    if (image > 0) {
      setImage(image - 1)
    }
    if (image < 0) {
      image(data?.image?.length - 1)
    }
  };
  const handleScrollRight = () => {
    if (image < data?.image?.length - 1) {
      setImage(image + 1)
    }
    if (image > data?.image?.length - 1) {
      setImage(data?.image?.length - 1)
    }
  }
  console.log(reviews, "review")

  useEffect(() => {
    fetchProductDetails()
    fetchProductReview()
  }, [params])

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: "instant"
    })
  },[])
  return (
    <section>
      {loading ?
        <section className='container mx-auto p-4 grid gap-4 min-h-screen lg:grid-cols-2 bg-slate-100 '>
          <div className="col-span-1">
            <div className="w-full h-full min-h-56 max-h-56 lg:min-h-[65vh] lg:max-h-[65vh] rounded bg-slate-200 animate-pulse">

            </div>
            <div className="flex justify-center items-center my-2 gap-3 ">
              {data?.image?.map((img, index) => {
                return (
                  <div key={img + index + "point"} className={` bg-slate-200 w-5 h-5 rounded-full ${index === image && "bg-slate-300 animate-pulse "} `}></div>
                )
              })}
            </div>
            <div className="grid relative">
              <div className="flex w-full z-10 items-center justify-center reletive overflow-x-auto gap-2 no-scrollbar my-4">
                {data?.image?.map((img, index) => (
                  <div
                    key={img + index + "point"}
                    className={`w-24 h-24 min-w-20 bg-slate-200 rounded-lg min-h-24 ${index === image ? "border-2 border-slate-300" : ""}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="text-base lg:text-lg gap-4 grid">
              <div className=" bg-slate-200 w-full h-24 rounded-lg"></div>
              <Divider />
              <div className="grid gap-2">
                <div className="flex gap-4">
                  <div className=" bg-slate-200 w-full h-10 rounded-lg"></div>
                  <div className=" bg-slate-200 w-full h-10 rounded-lg"></div>
                </div>
                <div className="flex gap-4">
                  <div className=" bg-slate-200 w-full h-10 rounded-lg"></div>
                  <div className=" bg-slate-200 w-full h-10 rounded-lg"></div>
                </div>
                <div className=" bg-slate-200 w-full h-12 rounded-lg"></div>
                <div className=" bg-slate-200 w-full h-12 rounded-lg"></div>
              </div>
              <Divider />
              <div className="grid gap-2">
                <div className="flex gap-4">
                  <div className=" bg-slate-200 w-full h-10 rounded-lg"></div>
                  <div className=" bg-slate-200 w-full h-10 rounded-lg"></div>
                </div>
                <div className="flex gap-4">
                  <div className=" bg-slate-200 w-full h-10 rounded-lg"></div>
                  <div className=" bg-slate-200 w-full h-10 rounded-lg"></div>
                </div>
                <div className=" bg-slate-200 w-full h-12 rounded-lg"></div>
                <div className=" bg-slate-200 w-full h-12 rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        :
        <section className='container mx-auto p-4 grid lg:grid-cols-2 bg-slate-100 '>
          <div className="col-span-1">
            <div className="w-full h-full min-h-56 max-h-56 lg:min-h-[65vh] lg:max-h-[65vh] rounded bg-white">
              <img
                className='w-full h-full object-scale-down'
                src={data.image[image]} alt={data.name} />
            </div>
            <div className="flex justify-center items-center my-2 gap-3 ">
              {data?.image?.map((img, index) => {
                return (
                  <div key={img + index + "point"} className={` bg-slate-200 w-5 h-5 rounded-full ${index === image && "bg-slate-300  "} `}></div>
                )
              })}
            </div>
            <div className="grid relative">
              <div className="flex w-full z-10 items-center justify-center reletive overflow-x-auto gap-2 no-scrollbar my-4">
                {data?.image?.map((img, index) => (
                  <div
                    key={img + index + "point"}
                    className={`w-24 h-24 min-w-20 rounded-lg min-h-24 ${index === image ? "border-2 border-slate-300" : ""}`}
                  >
                    <img
                      onClick={() => setImage(index)}
                      className="h-full w-full object-scale-down rounded-lg cursor-pointer"
                      src={img}
                      alt={data.name}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute lg:flex hidden items-center w-full h-full -ml-3 justify-between ">
                <button onClick={handleScrollLeft} className=' relative z-10 bg-slate-200 p-1.5 shadow-lg  hover:bg-slate-300  cursor-pointer rounded-full' >
                  <FaAngleLeft />
                </button>
                <button onClick={handleScrollRight} className=' relative z-10 bg-slate-200 p-1.5 shadow-lg  hover:bg-slate-300   cursor-pointer rounded-full' >
                  <FaAngleRight />
                </button>
              </div>
            </div>
            <Divider />
            {data?.description && <div className=" mt-5 lg:grid hidden gap-2">
              <h1 className="text-2xl font-medium text-neutral-700">Product Description</h1>
              <p className="text-sm text font-light">{data?.description}</p>
            </div>}

            {data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div key={element + index} className="lg:grid hidden gap-2">
                  <h1 className="text-2xl font-medium text-neutral-700">{element}</h1>
                  <p className="text-sm text font-light">{data?.more_details[element]}</p>
                </div>
              )
            })}
          </div>

          {/* right  */}
          <div className="col-span-1">
            <div className="text-base lg:text-lg gap-4 grid">
              <div className="">
                <div className="flex gap-3 items-center  text-[1rem] ">
                  <div className="">
                    <StarRating rating={averageReview} />
                  </div>
                  {averageReview !== null ?
                    <p className='bg-slate-100 text-orange-500 font-semibold w-fit px-2 rounded-full'>Rating: {averageReview.toFixed()}</p> : ""}
                </div>
                <h2 className='text-lg font-semibold text-neutral-700 lg:text-3xl'>{data.name}</h2>
                <p className=''>{data.unit}</p>
              </div>
              <Divider />
              <div className="grid gap-2">
                <p className="">Price</p>
                <div className="flex items-center gap-2">
                  <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
                    <p className="text-green-600 font-semibold text-xl">{DisplayPriceInTaka(priceWithDiscount(data?.price, data?.discount))}</p>
                  </div>
                  {data?.discount && (
                    <p className="line-through text-neutral-500 text-xl">{DisplayPriceInTaka(data?.price)} </p>
                  )}
                  {data?.discount && (
                    <div className="flex items-center gap-2">
                      <p className="text-green-600 font-semibold text-3xl">{data?.discount}%</p>
                      <p className="text-xl text-neutral-600">Discount</p>
                    </div>
                  )}
                </div>
                {data?.stock === 0 ? (
                  <p className="text-orange-500 font-semibold text-xl">Out of Stock</p>
                ) : (
                  // <button className='w-fit bg-green-600 hover:bg-green-700 transition-colors duration-200  py-1 px-3 text-xl rounded text-white' >Add</button>
                  <AddToCartButton data={data} />
                )}
              </div>
              <Divider />
              {data?.description && <div className="  grid lg:hidden gap-2">
                <h1 className="text-2xl font-medium text-neutral-700">Product Description</h1>
                <p className="text-sm text font-light">{data?.description}</p>
              </div>}

              {data?.more_details && Object.keys(data?.more_details).map((element, index) => {
                return (
                  <div key={element + index} className="grid lg:hidden gap-2">
                    <h1 className="text-2xl font-medium text-neutral-700">{element}</h1>
                    <p className="text-sm text font-light">{data?.more_details[element]}</p>
                  </div>
                )
              })}
              <Divider />
              <div className="grid gap-2">
                <div className="grid">
                  <h1 className='font-semibold mb-2 text-xl text-neutral-600'>Customer Reviews</h1>
                  <div className="grid gap-2">
                    {reviews !== null ? reviews.map((reviewItem, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="bg-gray-600 text-white h-8 w-8 flex items-center justify-center rounded-full text-2xl font-semibold">
                          {reviewItem.userName[0].toUpperCase()}
                        </div>
                        <div className="grid ">
                          <h1 className="font-semibold ml-1 text-neutral-600"> {reviewItem.userName}</h1>
                          <div className="flex max-sm:flex-col gap-4  ">
                            <StarRating rating={reviewItem?.reviewValue} />
                            <p className="capitalize text-neutral-600">
                              {reviewItem.reviewMessage}
                            </p>
                          </div>

                        </div>
                      </div>
                    )) :
                      <p className="text-neutral-500">No Reveiew Found!</p>
                    }
                  </div>
                </div>
                <div className="grid gap-3">
                  <label className='text-lg text-neutral-700 font-medium' htmlFor="writeReview">Write a review..</label>
                  <div className="flex items-center gap-3">
                    <StarRating rating={rating} handleRatingChange={handleRatingChange} />
                    <input type="text"
                      className='border border-neutral-400 focus-within:border-amber-400 rounded outline-none w-full p-1'
                      placeholder='Write your review...'
                      value={reviewMessage}
                      onChange={(e) => setReviewMessage(e.target.value)}
                    />
                  </div>
                  <button className='w-full border-2 text-green-700 font-medium transition-colors duration-300 cursor-pointer hover:bg-green-600 hover:text-white
               p-1  rounded border-green-600 text-xl'
                    onClick={handleAddReview}
                    disabled={reviewMessage.trim() === ""}
                    type="submit">Submit</button>
                </div>
              </div>
              <div className="grid gap-2">
                <h1 className="text-2xl font-medium text-neutral-800">Why shop from binkeyit?</h1>
                <div className="flex  gap-2 items-center">
                  <img className='min-h-20 max-h-24 min-w-20 max-w-24 object-scale-down'
                    src={image1} alt="Super fast delyvery" />
                  <div className="">
                    <h2 className="text-xl font-semibold">Superfast Delivery</h2>
                    <p className="text-base font-medium">Get your orer delivered to your doorstep at the earliest from dark stores near you.</p>
                  </div>
                </div>
                <div className="flex  gap-2 items-center">
                  <img className='min-h-20 max-h-24 min-w-20 max-w-24 object-scale-down'
                    src={image2} alt="Super fast delyvery" />
                  <div className="">
                    <h2 className="text-xl font-semibold">Best Prices & Offers</h2>
                    <p className="text-base font-medium">Best price destination with offers directly from the nanufacturers.

                    </p>
                  </div>
                </div>
                <div className="flex  gap-2 items-center">
                  <img className='min-h-20 max-h-24 min-w-20 max-w-24 object-scale-down'
                    src={image3} alt="Super fast delyvery" />
                  <div className="">
                    <h2 className="text-xl font-semibold">Wide Assortment</h2>
                    <p className="text-base font-medium">Choose from 5000+ products across food personal care, household & other categories.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      }

    </section>
  )
}

export default ProductDetailsPage