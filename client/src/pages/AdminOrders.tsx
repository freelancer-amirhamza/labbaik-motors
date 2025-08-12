import React, { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import NoData from "../components/NoData";
import Table from "../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";
import { ImPencil } from "react-icons/im";
import { TbListDetails } from "react-icons/tb";
import { DisplayPriceInTaka } from "../utils/DisplayPriceInTaka";
import OrderDetails from "../components/OrderDetails";
import Axios from "../utils/Axios";
import SummeryApi from "../common/SummeryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import ConfirmBox from "../components/ConfirmBox";
import EditOrder from "../components/EditOrder";

const AdminOrders = () => {
    // const orderList = useSelector((state) => state.orders?.orderList);
    const columnHelper = createColumnHelper();
    const [openOrderDetails, setOpenOrderDetails] = useState(false);
    const [adminOrderList, setAdminOrderList] = useState([]);
    const [editOrderData, setEditOrderData] = useState({_id:"", orderId: "", payment_status: "", order_status: "" })
    const [deleteOrderData, setDeleteOrderData] = useState({_id: "", orderId: "",})
    const [openConfirmBox, setOpenConfirmBox] = useState(false)
    const [openOrderEditBox,setOpenOrderEditBox] = useState(false)


    const fetchAdminOrderList = async()=>{
        try {
            const response = await Axios({
                ...SummeryApi.getAdminOrdersDetails,
            })
            if(response.data?.success){
                setAdminOrderList(response.data?.data)
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const deleteAdminOrder = async ()=>{
        try {
            const response = await Axios({
                ...SummeryApi.deleteAdminOrder,
                data:{
                    _id:deleteOrderData?._id,
                    orderId:deleteOrderData?.orderId
                }
            })
            if(response.data?.success){
                toast.success(response.data?.message)
                setOpenConfirmBox(false)
                if(fetchAdminOrderList){
                    fetchAdminOrderList()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    useEffect(()=>{
        fetchAdminOrderList()
    },[])

    const column = [
        columnHelper.accessor("orderId", { header: "Order ID" }),
        columnHelper.accessor("image", {
            header: "Image",
            cell: ({ row }) => {
                const firstProduct = row.original?.products[0];
                const firstImage = firstProduct?.product_details?.image[0];
                return (
                    <div className=" flex items-center justify-center">
                        <img
                            src={firstImage}
                            alt={firstProduct?.product_details?.name}
                            className="w-10 h-10 object-scale-down cursor-pointer"
                        />
                    </div>
                );
            },
        }),
        columnHelper.accessor("payment_status", {
            header: "Payment Status",
            cell: ({ row }) => (
                <div className="flex items-center justify-center gap-2">
                    <span className={`h-3 w-3  rounded-full
                    ${row.original?.payment_status === "pending" ? "bg-orange-500 text-orange-500" :
                        row.original?.payment_status === "confirmed" ? "bg-green-600":
                        row.original?.payment_status === "shipping" ? "bg-amber-400" :
                        row.original?.payment_status === "returned" ? "bg-blue-400" :
                        row.original?.payment_status === "paid" ? "bg-green-700" :
                        row.original?.payment_status === "canceled" ? "bg-red-400" : "bg-black"} `} ></span>
                    <p className="uppercase p-0 text-center">
                    {row.original?.payment_status}
                    </p>
                </div>

            ),
        }),
        columnHelper.accessor("order_status", {
            header: "Order Status",
            cell: ({ row }) => (
                <div className="flex items-center justify-center gap-2">
                    <span className={`h-3 w-3  rounded-full
                    ${row.original?.order_status === "pending" ? "bg-orange-500 text-orange-500" :
                        row.original?.order_status === "confirmed" ? "bg-green-600":
                        row.original?.order_status === "rejected" ? "bg-red-400" :
                        row.original?.order_status === "shipping" ? "bg-amber-400" :
                        row.original?.order_status === "returned" ? "bg-blue-400" :
                        row.original?.order_status === "delivered" ? "bg-green-700" :
                        row.original?.order_status === "canceled" ? "bg-gray-500" : "bg-black"} `} ></span>
                    <p className="uppercase p-0 text-center">
                    {row.original?.order_status}
                    </p>
                </div>

            ),
        }),
        columnHelper.accessor("price", {
            header: "Total Price",
            cell: ({ row }) => (
                <p className=" p-0 text-center">
                    {" "}
                    {DisplayPriceInTaka(
                        row.original?.totalAmount + row.original?.deliveryFee
                    )}
                </p>
            ),
        }),
        columnHelper.accessor("quantity", {
            header: "Qty",
            cell: ({ row }) => {
                console.log(row.original, "check");
                const totalQuantity = row.original?.products.reduce(
                    (sum, item) => sum + item?.quantity,
                    0
                );
                return <p className="max-w-10 text-center">{totalQuantity} </p>;
            },
        }),
        columnHelper.accessor("_id", {
            header: "Action",
            cell: ({ row }) => (
                <div className="flex items-center justify-center gap-2">
                    <button
                        className="text-green-600 hover:text-green-800 bg-green-100 p-0.5 rounded cursor-pointer border"
                        onClick={() => {
                            setOpenOrderEditBox(true);
                            setEditOrderData(row?.original);
                        }}
                    >
                        <ImPencil size={18} />
                    </button>
                    <button
                        className="text-green-600 hover:text-green-800 bg-green-100 p-0.5 rounded cursor-pointer border"
                        onClick={() => {
                            setOpenOrderDetails(true);
                            setEditOrderData(row?.original);
                        }}
                    >
                        <TbListDetails size={18} />
                    </button>
                    <button
                        onClick={() => {
                            setOpenConfirmBox(true);
                            setDeleteOrderData(row.original);
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
        <section className="bg-white">
            <div className="">
                <div className="w-full p-2 shadow-md">
                    <h1 className="font-semibold text-xl text-neutral-700">Orders</h1>
                </div>
                <div className="">
                    {adminOrderList[0] ? (
                        <div className="">
                            <div className="overflow-auto w-full max-w-[92vw]">
                                <Table data={adminOrderList} column={column} />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full relative flex flex-col items-center justify-center">
                            <h2 className="text-3xl text-neutral-800 absolute top-20 font-semibold ">
                                No Order Found!
                            </h2>
                            <NoData />
                        </div>
                    )}
                </div>
            </div>
            {openOrderDetails && (
                <OrderDetails
                    data={editOrderData}
                    close={() => setOpenOrderDetails(false)}
                />
            )}

            {openConfirmBox && <ConfirmBox
            confirm={deleteAdminOrder}
            data={deleteOrderData}
            close={()=>setOpenConfirmBox(false)}/>}

            {openOrderEditBox && <EditOrder fetchData={fetchAdminOrderList} data={editOrderData} close={()=>setOpenOrderEditBox(false)} />}
        </section>
    );
};

export default AdminOrders;