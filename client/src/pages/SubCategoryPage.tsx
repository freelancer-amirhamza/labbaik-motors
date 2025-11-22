import React, { useEffect, useState } from 'react';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummeryApi from '../common/SummeryApi';
import NoData from '../components/NoData';
import ConfirmBox from '../components/ConfirmBox';
import toast from 'react-hot-toast';
import UploadSubCategoryModel from '../components/UploadSubCategoryModal';
import EditSubCategoryModel from '../components/EditSubCategoryModal';
import Table from '../components/Table';
import { createColumnHelper } from '@tanstack/react-table';
import ImageModel from '../components/ImageModal';
import { ImPencil } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';

const SubCategoryPage = () => {
  const [showUploadSubCategoryModel, setShowUploadSubCategoryModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [openEditData, setOpenEditData] = useState(false);
  const [openConfirmBox, setOpenConfirmBox] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [editData, setEditData] = useState({ name: '', image: '' });
  const [deleteSubCategoryData, setDeleteSubCategoryData] = useState({ _id: '', name: '' });

  const columnHelper = createColumnHelper();

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({ ...SummeryApi.getSubCategory });
      if (response?.data?.success) {
        setSubCategoryData(response?.data?.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubCategoryDelete = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummeryApi.deleteSubCategory,
        data: deleteSubCategoryData,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        fetchSubCategory();
        setOpenConfirmBox(false);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const column = [
    columnHelper.accessor('name', { header: 'Name' }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <img
            src={row.original?.image}
            alt={row.original?.name}
            onClick={() => setImageUrl(row.original?.image)}
            className="w-10 h-10 cursor-pointer"
          />
        </div>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => (
        <>
          {row.original?.category?.map((categoryItem) => (
            <p key={categoryItem._id} className="flex flex-wrap">
              {categoryItem.name}
            </p>
          ))}
        </>
      ),
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button
            className="text-green-600 hover:text-green-800 bg-green-100 p-0.5 rounded cursor-pointer border"
            onClick={() => {
              setOpenEditData(true);
              setEditData(row?.original);
            }}
          >
            <ImPencil size={18} />
          </button>
          <button
            onClick={() => {
              setOpenConfirmBox(true);
              setDeleteSubCategoryData(row.original);
            }}
            className="text-red-500 hover:text-red-600 bg-red-100 p-0.5 rounded cursor-pointer border"
          >
            <MdDelete size={20} />
          </button>
        </div>
      ),
    }),
  ];

  return (
    <section>
      <div className="flex justify-between items-center shadow-md p-2 bg-white">
        <h1 className="text-xl font-semibold text-neutral-700">Sub Category</h1>
        <button
          onClick={() => setShowUploadSubCategoryModel(true)}
          className="border border-amber-600 transition-colors duration-300 px-2 py-1 rounded-sm hover:bg-amber-500 cursor-pointer hover:text-white font-medium"
        >
          Add Sub Category
        </button>
      </div>
      <div>
        {imageUrl && <ImageModel url={imageUrl} close={() => setImageUrl('')} />}
        {!subCategoryData[0] && !loading ? (
          <NoData />
        ) : (
          <div className="overflow-auto w-full max-w-[92vw]">
            <Table data={subCategoryData} column={column} />
          </div>
        )}
        {showUploadSubCategoryModel && (
          <UploadSubCategoryModel
            fetchData={fetchSubCategory}
            close={() => setShowUploadSubCategoryModel(false)}
          />
        )}
        {openEditData && (
          <EditSubCategoryModel
            data={editData}
            close={() => setOpenEditData(false)}
            fetchData={fetchSubCategory}
          />
        )}
        {openConfirmBox && (
          <ConfirmBox
            close={() => setOpenConfirmBox(false)}
            confirm={handleSubCategoryDelete}
            data={deleteSubCategoryData}
          />
        )}
      </div>
    </section>
  );
};

export default SubCategoryPage;