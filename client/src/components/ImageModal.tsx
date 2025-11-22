import React from 'react';
import { IoMdClose } from 'react-icons/io';

const ImageModal = ({ url, close }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/70 w-full flex justify-center items-center">
      <div className="bg-white max-w-md flex relative w-full justify-center items-center max-h-[75vh] z-40 rounded h-full">
        <button
          onClick={close}
          className="w-fit top-5 absolute right-5 border p-1 rounded hover:bg-orange-500 hover:text-white hover:shadow-md cursor-pointer"
        >
          <IoMdClose />
        </button>
        <img
          src={url}
          alt="full screen"
          className="w-full h-full object-scale-down max-h-[70vh]"
        />
      </div>
    </div>
  );
};

export default ImageModal;