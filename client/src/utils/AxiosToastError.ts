import toast from "react-hot-toast"

const AxiosToastError = (error: unknown) => {
    toast.error(
        error?.response?.data?.message
    )
    console.log(error)
}

export default AxiosToastError