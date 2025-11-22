import React, { useEffect, useState } from 'react';
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummeryApi from '../common/SummeryApi';
import ProductCard from '../components/ProductCard';
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from 'react-router-dom';
import nothingImage from "../assets/empty-box.gif"

const SearchPage = () => {
  const [data, setData]= useState([]);
  const [loading, setLoading]= useState(false);
  const loadingArrayCard = new Array(10).fill(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation()
  const textSearch = params?.search?.slice(7)
  console.log(textSearch, "params")

  const fetchSearchProduct = async ()=>{
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.searchProduct,
        data: {
          search: textSearch,
          page: page,
        }
      })
      if(response.data?.page == 1){
        setData(response.data?.data)
      }else{
        setData((preve)=>{
          return[
            ...preve,
            ...response.data?.data
          ]
        })
      }
      setTotalPage(response.data?.totalNoPage)
    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  const handleFetchMore = ()=>{
    if(totalPage > page){
      setPage(prev => prev +1)
    }
  }
  useEffect(()=>{
    fetchSearchProduct()
  },[page, textSearch])
  return (
    <section className="bg-white">
      <div className="container mx-auto p-4">
        <p className="font-semibold text-neutral-600">Search Results:{data.length}</p>
        <InfiniteScroll
        dataLength={data.length}
        next={handleFetchMore}
        hasMore={true}
        >
        <div className="flex flex-wrap gap-4 justify-center items-center my-4">
          {loading ? (
            loadingArrayCard.map((_, index) => (
              <div
                className="border border-blue-200 p-2 grid gap-3 max-w-52 rounded animate-pulse"
                key={index+"loading"}
              >
                <div className="min-h-20 bg-blue-100/80 rounded"></div>
                <div className="p-3 bg-blue-100/80 rounded w-20"></div>
                <div className="p-3 bg-blue-100/80 rounded"></div>
                <div className="p-3 bg-blue-100/80 rounded w-14 "></div>
                <div className="flex items-center justify-between gap-3">
                  <div className="p-3 bg-blue-100/80 rounded w-20  "></div>
                  <div className="p-3 bg-blue-100/80 rounded w-20 "></div>
                </div>
              </div>
            ))
          ) : (
              data.map((product, index)=>{
                return(
                  <ProductCard data={product} key={product?._id+"searchProduct"+index}/>
                )
              })
          )}
        </div>
        </InfiniteScroll>
        {!data[0] && !loading && (
          <div className="flex flex-col w-full items-center justify-center mx-auto">
            <img src={nothingImage} alt="no data" className='w-full h-full max-h-xs max-w-xs rounded-md object-scale-down' />
            <p className="font-semibold my-4 text-2xl text-neutral-500">No Data Found!</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default SearchPage