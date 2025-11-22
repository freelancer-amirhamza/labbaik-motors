import React, { useEffect, useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { useSelector } from 'react-redux';
import { validURLConvert } from '../utils/validURLConvert';

const ProductListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useParams()
  const allSubCategory = useSelector((state) => state?.product?.allSubCategory);
  const [displaySubCategory, setDisplaySubCategory] = useState([])


  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]

  const fetchProductList = async () => {

    try {
      setLoading(true)
      const response = await Axios({
        ...SummeryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 10
        }
      })
      if (response.data?.success) {
        if (response?.data?.page == 1) {
          setData(response.data?.data);
        } else {
          setData([...data, response.data?.data])
        }
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductList()
  }, [params])

  useEffect(() => {
    const sub = allSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id === categoryId
      })
      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub);
  }, [params, allSubCategory]);
  return (
    <section className='sticky top-24 lg:top-20 no-scrollbar'>
      <div className="container sticky top-24 w-full bg-white  mx-auto flex  ">
        {/* sidebar */}
        <div className="min-h-[88vh] max-h-[88vh] overflow-y-scroll  grid gap-1 shadow-md  bg-white py-2 customScrollbar">
          {
            displaySubCategory.map((s, index) => {
               const link = `/${validURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${validURLConvert(s.name)}-${s._id}`
              return (
                <Link to={link} className={`w-full p-2 lg:flex items-center lg:w-full  box-border lg:gap-4 border-b
                  hover:bg-green-100 cursor-pointer border-gray-300
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}>
                  <div className="w-fit mx-auto max-w-28 lg:mx-0 bg-white rounded box-border ">
                    <img src={s.image} alt={s.name}
                    className=' w-14 lg:h-14 lg:w-12 h-full object-scale-down ' />
                  </div>
                  <p className=" text-xs text-center">{s.name} </p>
                </Link>
              )
            })
          }
        </div>




        {/* product list */}
        <div className=" sticky w-full top-20">
          <div className="bg-white shadow-md p-4 z-10 font-semibold sm:text-xl text-neutral-700 w-full ">
            <h2>{subCategoryName}</h2>
          </div>
          <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto no-scrollbar relative">
            <div className="">
              {loading && (<Loader />)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
              {
                data.map((p, index) => {
                  return (
                      <ProductCard data={p}
                        key={p._id + "productSubCategory" + index}
                      />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductListPage