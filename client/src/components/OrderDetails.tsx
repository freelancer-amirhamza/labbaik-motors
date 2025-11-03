import React, { useState } from 'react'
import {toPng} from "html-to-image";
import {jsPDF} from "jspdf";
import { FaBackwardFast } from "react-icons/fa6";
import { DisplayPriceInTaka } from '../utils/DisplayPriceInTaka';

const OrderDetails = ({close, data}) => {
  const date = new Date()
  const todayDate = date.toLocaleDateString()
  const today = date.toLocaleDateString().replace(/\//g, "")
  const randomNumber = Math.floor( 10 + Math.random() * 90)
  const invoiceNo = `${today}${randomNumber}`;
  const {addressLine, city, state,country, pinCode,phone  } = data?.delivery_address;

  console.log(data, "order data")

  const SaveAsPDFHandler = async () => {
    const dom = document.getElementById("print");
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = dataUrl;
        img.onload = () => {
          const pdf = new jsPDF({
            orientation: "portrait", // Portrait orientation
            unit: "in", // Unit in inches
            format: "a4", // A4 page size
          });

          const imgProps = pdf.getImageProperties(img);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          // Scale the image to fit the A4 page
          const imgWidth = pdfWidth;
          const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

          // Add the image to the PDF
          pdf.addImage(img, "PNG", 0, 0, imgWidth, imgHeight);

          // Save the PDF
          pdf.save("invoice.pdf");
        };
      })
      .catch((error) => {
        console.error("Oops, something went wrong!", error);
      });
  };
  return (
    <section className="fixed top-0 z-40 bottom-0 min-h-full right-0 overflow-y-auto p-5 left-0 bg-neutral-950/90">

        <div  className="bg-white overflow-y-auto  w-full max-w-4xl   mx-auto  rounded-md">
          <div className="px-8 py-12"  id='print'>
          <div className=" text-neutral-800 flex  items-center justify-between">
            <span className="md:text-sm text-xs font-medium">Current data: {todayDate}</span>
            <h1 className="text-xl font-bold">INVOICE</h1>
            <span className="md:text-sm text-xs font-medium">Invoice no:{invoiceNo}</span>
          </div>


          <div className="mt-6 border-dotted border-neutral-300 border-2   md:p-12 rounded-md sm:p-8 p-4">
            <h1 className="text-neutral-700 font-semibold text-4xl pb-5 md:pb-10 uppercase text-center">deshimotors</h1>
            <div className="grid grid-cols-2 max-sm:text-sm mb-4 space-y-4 ">
              <div className="flex flex-col w-full  ">
                <label className='font-bold' htmlFor="customarName">Customer Name:</label>
                <span className="font-semibold"> {data?.userId?.name} </span>
              </div>
              <div className="flex flex-col ">
                <label className='font-bold' htmlFor="customarName">Email:</label>
                <span className="font-semibold  w-full">{data?.userId?.email} </span>
              </div>
              <div className="flex flex-col w-full">
                <label className='font-bold' htmlFor="phone">Phone:</label>
                <span className="font-semibold">{phone}</span>
              </div>

              <div className="flex flex-col w-full">
                <label className='font-bold' htmlFor="customarName">Address:</label>
                <span className="font-semibold">{`${addressLine || ""}${city || ""}${state || ""}-${pinCode || ""}`}</span>
              </div>
            </div>
            <table className="w-full mt-8  text-left">
            <thead>
              <tr className="border-y border-neutral-300   text-sm md:text-base">
                <th className='w-ful py-1'>ITEM</th>
                <th className="text-center py-1">QTY</th>
                <th className="text-center py-1 pr-0.5">UNIT</th>
                <th className="text-right py-1">PRICE</th>
              </tr>
            </thead>
            <tbody>
              {data && data.products?.map((product,index)=>{
                const discountAmount = Math.ceil((product?.product_details?.price * product?.product_details?.discount) / 100);
                const priceAfterDiscount = product?.product_details?.price - discountAmount
                return(
                  <tr key={product?._id+"order items"+index}>
                <td className="w-full line-clamp-2 py-1.5">{product?.product_details?.name} </td>
                <td className="min-w-[50px] text-center py-1.5">{product?.quantity} </td>
                <td className="min-w-[80px] text-center  py-1.5">{product?.product_details?.unit} </td>
                <td className="min-w-[90px] text-right py-1.5">{DisplayPriceInTaka(priceAfterDiscount)}</td>
              </tr>
                )
              })}
            </tbody>
          </table>
          <div className="mt-4 flex flex-col py-5 border-y border-neutral-300 gap-2 items-end">
            <div className="flex w-full  justify-between items-center">
              <span className="font-semibold text-base ">Subtotal:</span>
              <span className="font-medium text-end">{DisplayPriceInTaka(data?.subTotalAmount || 0) || ""} </span>
            </div>
            <div className="flex w-full  justify-between items-center">
              <span className="font-semibold text-base">Discount:</span>
              <span className=""> {DisplayPriceInTaka(data?.subTotalAmount - data?.totalAmount || 0 ) || ""}</span>
            </div>
            <div className="flex w-full  justify-between items-center">
              <span className="font-semibold text-base">Delivery Fee:</span>
              <span className="">{DisplayPriceInTaka(data?.deliveryFee || 0) || ""} </span>
            </div>
          </div>
          <div className="flex w-full mt-4  justify-between items-center">
              <span className="font-bold text-lg">Total:</span>
              <span className="">{DisplayPriceInTaka(data?.totalAmount + data?.deliveryFee || 0) || ""}</span>
            </div>
            <div className="mx-auto flex w-full justify-end  mt-12 ">
            <h1 className="font-semibold border-dotted border-t">Authorized Signture</h1>
          </div>
          </div>
          </div>


          <div className="mt-4 flex space-x-2 px-4 pb-6">
                <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-orange-500 py-2 text-sm text-orange-500 shadow-sm hover:bg-orange-500 hover:text-white"
                  onClick={SaveAsPDFHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download PDF</span>
                </button>
                <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-green-500 py-2 text-sm text-green-500 shadow-sm hover:bg-green-500 hover:text-white"
                  onClick={close}
                >
                  <FaBackwardFast/>
                  <span>Back</span>
                </button>

                {/* <CSVLink
                data={csvData}
                filename='invoiceCsv.csv'
                className="flex w-full items-center justify-center space-x-1 rounded-md border border-green-500 py-2 text-sm text-green-500 shadow-sm hover:bg-green-500 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download CSV</span>
                </CSVLink> */}
              </div>

        </div>
    </section>
  )
}

export default OrderDetails