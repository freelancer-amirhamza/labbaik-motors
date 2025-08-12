import React, { useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import SummeryApi from '../common/SummeryApi';
import Loader from '../components/Loading';
import AdminProductCard from '../components/AdminProductCard';
import { IoSearch } from 'react-icons/io5';

const AdminProducts = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.getProduct,
        data: {
          page,
          limit: 12,
          search,
        },
      });

      if (response?.data?.success) {
        setTotalPage(response?.data?.totalNoPage);
        setProductData(response?.data?.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleNext = () => {
    if (page < totalPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleOnChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProductData();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  return (
    <section>
      <div className="flex items-center sm:justify-between justify-center rounded shadow-md p-2">
        <h1 className="text-xl font-medium hidden sm:block text-neutral-800">Products</h1>
        <div className="rounded shadow-md border text-neutral-600 focus-within:border-amber-400 flex items-center p-2 gap-2">
          <IoSearch className="text-xl" />
          <input
            type="text"
            placeholder="Search Product"
            value={search}
            className="outline-none"
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="p-4 bg-blue-50 min-h-[75vh] flex flex-col justify-between">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {productData.map((product, index) => (
                <AdminProductCard fetchProductData={fetchProductData} key={index} product={product} />
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 bg-white p-1 rounded shadow-sm">
              <button
                onClick={handlePrev}
                className="text-neutral-900 border hover:bg-orange-600 px-3 font-semibold hover:text-white transition-colors duration-300 py-1.5 rounded"
              >
                Prev
              </button>
              <span className="text-neutral-900">
                Page {page}/{totalPage}
              </span>
              <button
                onClick={handleNext}
                className="text-neutral-900 border hover:bg-orange-600 px-3 font-semibold hover:text-white transition-colors duration-300 py-1.5 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminProducts;