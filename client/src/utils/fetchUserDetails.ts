import Axios from "./Axios";
import SummeryApi from "../common/SummeryApi";

const fetchUserDetails = async()=>{
    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await Axios({
            ...SummeryApi.user_details,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export default fetchUserDetails;