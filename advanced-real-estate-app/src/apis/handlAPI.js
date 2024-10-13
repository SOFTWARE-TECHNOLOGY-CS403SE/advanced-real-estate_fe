import axiosClient from "./axiosClient";

const handleAPI = async (url, data, method = "get", nameToken = "") => {
    return await axiosClient(url, {
        nameToken: nameToken,
        method: method,
        data,
    });
};

export default handleAPI;
