import SummeryApi from "../common/SummeryApi.jsx";
import Axios from "../utils/Axios.js";

const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await Axios({
            ...SummeryApi.uploadImage,
            data: formData,
        });
        return response;
    } catch (error) {
        return error;
    }
}

export default uploadImage;