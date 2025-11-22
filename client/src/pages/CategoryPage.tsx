import React, { useEffect, useState } from 'react';
import UploadCategoryModel from '../components/UploadCategoryMedal';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import NoData from '../components/NoData';
import EditCategoryModel from '../components/EditCategoryModal';
import ConfirmBox from '../components/ConfirmBox';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const CategoryPage = () => {
  const [showUploadCategoryModel, setShowUploadCategoryModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEditData, setOpenEditData] = useState(false);
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    image: '',
  });
  const [deleteCategoryData, setDeleteCategoryData] = useState({
    _id: '',
    name: '',
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  useEffect(() => {
    setCategoryData(allCategory);
  }, [allCategory]);

  const handleCategoryDelete = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.deleteCategory,
        data: deleteCategoryData,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setOpenConfirmBox(false);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center shadow-md p-2 bg-white">
        <h1 className="text-xl font-semibold text-neutral-700">Category</h1>
        <button
          onClick={() => setShowUploadCategoryModel(true)}
          className="border border-amber-600 transition-colors duration-300 px-2 py-1 rounded-sm hover:bg-amber-500 hover:text-white font-medium"
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading ? (
        <NoData />
      ) : (
        <div className="flex flex-wrap gap-2 md:gap-4 p-4 justify-center items-center">
          {categoryData.map((category, index) => (
            <div
              className="w-full rounded max-w-34 border h-58 p-1 flex flex-col items-center justify-center border-dotted border-amber-600 hover:shadow-lg overflow-hidden"
              key={index}
            >
              <div className="w-full max-h-46 flex items-center">
                <img
                  src={category.image}
                  alt="Category"
                  className="object-scale-down h-full w-full rounded-t-sm"
                />
              </div>
              <div className="flex items-center justify-between gap-1 px-1">
                <button
                  onClick={() => {
                    setOpenEditData(true);
                    setEditData(category);
                  }}
                  className="border border-green-600 transition-colors duration-300 px-2 py-1 rounded-sm hover:bg-green-500 hover:text-white font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBox(true);
                    setDeleteCategoryData(category);
                  }}
                  className="border border-red-600 transition-colors duration-300 px-2 py-1 rounded-sm hover:bg-red-500 hover:text-white font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showUploadCategoryModel && (
        <UploadCategoryModel
          fetchData={() => setCategoryData(allCategory)}
          close={() => setShowUploadCategoryModel(false)}
        />
      )}
      {openEditData && (
        <EditCategoryModel
          data={editData}
          close={() => setOpenEditData(false)}
          fetchData={() => setCategoryData(allCategory)}
        />
      )}
      {openConfirmBox && (
        <ConfirmBox
          close={() => setOpenConfirmBox(false)}
          confirm={handleCategoryDelete}
          data={deleteCategoryData}
        />
      )}
    </section>
  );
};

export default CategoryPage;